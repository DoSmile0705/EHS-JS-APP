var rarities = [
  {
    msg: "Welcome aboard Captain, all systems online.",
    chance: 0,
  },
  {
    msg: "Welcome aboard Captain, some systems need attention.",
    chance: 20,
  },
  {
    msg: "Engine powering up...",
    chance: 35,
  },
  {
    msg: "You are the best captain on the planet, I'm not even squiddin'.",
    chance: 10,
  },
  {
    msg: "I love it when you come inside me.",
    chance: 5,
  },
];
function startMessage() {
  var filler =
    100 - rarities.map((r) => r.chance).reduce((sum, current) => sum + current);
  if (filler <= 0) {
    console.log("chances sum is higher than 100!");
    return;
  }
  var probability = rarities
    .map((r, i) => Array(r.chance === 0 ? filler : r.chance).fill(i))
    .reduce((c, v) => c.concat(v), []);
  var pIndex = Math.floor(Math.random() * 100);
  var rarity = rarities[probability[pIndex]];

  return rarity.msg;
}
const { loadCommands } = require("../../handlers/commandHandler");
module.exports = {
  name: "ready",
  once: true,
  async execute (client){
    await loadCommands(client);
    console.log(`Cyclops: ${startMessage()}`);
  },
};
