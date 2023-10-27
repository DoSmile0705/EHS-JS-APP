const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("rename_channel")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .setDescription("Rename channel.")
        .addChannelOption((opt) => opt
            .setName("channel")
            .setDescription("What channel do you want to rename?")
            .setRequired(true)
        )
        .addStringOption((opt) => opt
            .setName("new_name")
            .setDescription("How the channel should be named?")
            .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const channelOption = interaction.options.getChannel("channel");
        const stringOption = interaction.options.getString("new_name");

        await interaction.deferReply();

        const channelRename = interaction.guild.channels.fetch(channelOption.id)
        if (!channelRename) {
            await interaction.editReply(`Commander: [libRoot] An error occured during renaming: Channel cannot be renamed since they doesn't exist in this server.`);
            return;
        }
        try {
            await (await channelRename).setName(stringOption);
            await interaction.editReply(`Commander: [libRoot] Channel succesfuly renamed to: **"${stringOption}"**.`);
        } catch (error) {
            await interaction.editReply(`Commander: [libRoot] An error occured during renaming: ${error}`);
        }

    }
}