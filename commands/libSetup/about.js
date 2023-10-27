const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    Client
} = require("discord.js");
const { uptimeConv } = require("../../functions/botUptime")
var botSettings = require("../../settings.json");
var nodeVersions = require("../../package.json");
const memoryData = process.memoryUsage();

function bytesToMB(bytes) { const mb = bytes / 1024 ** 2; return mb.toFixed(0) + " MB"; }

module.exports = {
    data: new SlashCommandBuilder()
        .setName("about")
        .setDescription("About TheChaOS"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const aboutEmbed = new EmbedBuilder()
            .setTitle("About The ChaOS")
            .setDescription(`The ChaOS - developer codename **${botSettings.botVersions.botCodename}**
A Discord bot written in JavaScript with some useful features (originaly made for Simp Club)`)
            .setFooter({ text: "Made with LOVE by Pisek" })
            .setAuthor({ name: "Písek Pískovec", iconURL: "https://avatars.githubusercontent.com/u/77384152?v=4", url: "https://github.com/pisekpiskovec" })
            .setColor(botSettings.libSetup.accentColor)
            .setThumbnail(client.user.avatarURL())
            .addFields(
                { name: "The ChaOS Version", value: botSettings.botVersions.botChaOS + ` "${botSettings.botVersions.botCodename}"`, inline: true },
                { name: "Commander Version", value: botSettings.botVersions.botCommander, inline: true },
                { name: "Event Handling System Version", value: botSettings.botVersions.botEventHandlingSystem, inline: true },
                { name: "The Cyclops Version", value: botSettings.botVersions.botCyclops, inline: true },
                { name: "\u200B", value: "\u200B" },
                { name: "Memory Usage", value: `RSS: ${bytesToMB(memoryData.rss)}, External: ${bytesToMB(memoryData.external)}, Heap (Used): ${bytesToMB(memoryData.heapUsed)}, Heap (Total): ${bytesToMB(memoryData.heapTotal)}` },
                { name: "Uptime", value: uptimeConv(client.uptime), inline: true },
                { name: "Ping", value: client.ws.ping + " ms", inline: true },
                { name: "\u200B", value: "\u200B" },
                { name: "Library: Node.js", value: process.version, inline: true },
                { name: "Ascii Table", value: nodeVersions.dependencies["ascii-table"].replace("^", "v"), inline: true },
                { name: "node-cron", value: nodeVersions.dependencies["cron"].replace("^", "v"), inline: true },
                { name: "discord.js", value: nodeVersions.dependencies["discord.js"].replace("^", "v"), inline: true },
                { name: "dotenv", value: nodeVersions.dependencies["dotenv"].replace("^", "v"), inline: true },
                { name: "Glob", value: nodeVersions.dependencies["glob"].replace("^", "v"), inline: true },
                { name: "Edit JSON File", value: nodeVersions.dependencies["edit-json-file"].replace("^", "v"), inline: true },
            )
        interaction.reply({ embeds: [aboutEmbed] });
    },
};
