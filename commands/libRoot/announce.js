const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client } = require("discord.js");
const botSettings = require("../../settings.json");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("announce")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .setDescription("Share your big news!")
        .addStringOption((opt) => opt
            .setName("announcement")
            .setDescription("Your big news!")
            .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        const stringOption = interaction.options.getString("announcement");

        await interaction.deferReply();

        await client.channels.fetch(botSettings.libRoot.announceChannelID)
            .then(channel => channel.send(stringOption));

        await interaction.editReply(`Commander: [libRoot] Annoucment sent to ${client.channels.fetch(botSettings.libRoot.announceChannelID).then(channel => channel.name)}`)
            .then(() => console.log(`Commander: [libRoot] User ${interaction.guild.members.cache.get(interaction.member.id).displayName} (${interaction.guild.members.cache.get(interaction.member.id).id}) sent annoucment to Annoucment channle.`))
    }
}