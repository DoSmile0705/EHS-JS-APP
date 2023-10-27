const { Client, ActivityType, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
require("dotenv").config();
var botSettings = require("./settings.json")

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

const { loadEvents } = require("./handlers/eventHandler");

client.events = new Collection();
client.commands = new Collection();
loadEvents(client);

client.on("messageCreate", (message) => {
  if (message.content == "|m") {
    message.channel.send("🗿");
  }
  if (message.content == "stfu bitch") {
    message.channel.send("no");
  }
});

client.on("guildMemberAdd", async (member) => {
  const roleToAdd = await member.guild.roles.cache.get(botSettings.libRole.roleAutoRoleID);
  if (botSettings.libRole.roleAutoToggle === true) {
    if (botSettings.libRole.roleAutoRoleID = "") return console.log("EHS: [libRole] Failed to assign role due to: Role ID for AutoRole is missing.");
    else await member.roles.add(roleToAdd)
      .catch(() => { console.log("EHS: [libRole] Failed to assign role due to: Role hierarchy.") });
  }
});

client.on("guildMemberAdd", async (member) => {
  var banID = await botSettings.libRoot.autoBanRules.indexOf(member.user.username);

  if (botSettings.libRoot.autoBanToggle === true) {
    if (botSettings.libRoot.autoBanRules.length = 0) return console.log("EHS: [libRoot] Failed to ban member due to: Ruels for AutoBan are missing.");
    else if (banID != "-1") {
      try { await member.ban({ reason: "You've been banned by The ChaOS 2nd Generation's AutoBan feature." }) }
      catch (error) { console.log(`EHS: [libRoot] Failed to ban member due to: ${error}`) }
    }
  }
});

client
  .login(process.env.TOKEN)
  .then(() => {
    switch (botSettings.libSetup.activityType) {
      case "competing":
        client.user.setActivity(botSettings.libSetup.activity, { type: ActivityType.Competing });
        break;
      case "listening":
        client.user.setActivity(botSettings.libSetup.activity, { type: ActivityType.Listening });
        break;
      case "playing":
        client.user.setActivity(botSettings.libSetup.activity, { type: ActivityType.Playing });
        break;
      case "streaming":
        client.user.setActivity(botSettings.libSetup.activity, { type: ActivityType.Streaming });
        break;
      case "watching":
        client.user.setActivity(botSettings.libSetup.activity, { type: ActivityType.Watching });
        break;
    }
  });
