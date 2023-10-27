const { ChatInputCommandInteraction } = require("discord.js");
var botSettings = require("../../settings.json");
module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "This command is outdated.",
        ephemeral: true,
      });
    if (command.developer && interaction.user.id !== botSettings.devUserInfo.devUserID)
      return interaction.reply({
        content: `This command is only for ${botSettings.devUserInfo.devUserNickname}`,
        ephemeral: true,
      });
    command.execute(interaction, client);
  },
};
