async function loadCommands(client) {
  const { loadFiles } = require("../functions/fileLoader");
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("Commands", "Status");

  await client.commands.clear();

  let commandsArray = [];
  const Files = await loadFiles("commands");
  Files.forEach((file) => {
    const command = require(file);
    client.commands.set(command.data.name, command);

    commandsArray.push(command.data.toJSON());
    table.addRow(command.data.name, "Available");
  });
  client.application.commands.set(commandsArray);
  return console.log(
    "Commander > Status: Online\nCommander: \n",
    table.toString()
  );
}
module.exports = {loadCommands}