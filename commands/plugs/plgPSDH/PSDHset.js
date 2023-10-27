const { ChatInputCommandInteraction, SlashCommandBuilder, Client, PermissionFlagsBits } = require("discord.js");
var botSettings = require("../../../settings.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("psdh_set")
        .setDefaultMemberPermissions(PermissionFlagsBits.EmbedLinks)
        .setDescription("Set PSDH video URL.")
        .addStringOption(opt => opt
            .setName("video_url")
            .setDescription("Enter video URL.")
            .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (botSettings.plugs.plgPSDH) {
            await interaction.deferReply();

            const stringOption = interaction.options.getString("video_url")

        } else interaction.reply("Plugs: Pllugin not enabled.");
    }
};
