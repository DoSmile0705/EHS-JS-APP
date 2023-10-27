const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDescription("Kick members.")
        .addMentionableOption((opt) => opt
            .setName("member")
            .setDescription("Who do you want to kick today?")
            .setRequired(true)
        )
        .addStringOption((opt) => opt
            .setName("reason")
            .setDescription("Why do you want to kick them?")
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const memberOption = interaction.options.getMember("member");
        const stringOption = interaction.options.getString("reason") || "No reason provided.";

        await interaction.deferReply();

        const memberKick = interaction.guild.members.fetch(memberOption.id);
        if (!memberKick) {
            await interaction.editReply(`Commander: [libRoot] An error occured during kicking: User cannot be kicked since they doesn't exist in this server.`);
            return;
        } else if (memberKick.id === interaction.guild.ownerId) {
            await interaction.editReply(`Commander: [libRoot] An error occured during kicking: User cannot be kicked since they are the owner of this server.`);
            return;
        }
        const targetUserRolePosition = (await memberKick).roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply(`Commander: [libRoot] An error occured during kicking: You can't kick the user becuse they are on different level.`);
            return;
        }
        else if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply(`Commander: [libRoot] An error occured during kicking: Kicking this person would cause so much chaos.`);
            return;
        }
        try {
            await (await memberKick).kick(stringOption);
            await interaction.editReply(`Commander: [libRoot] Member succesfuly kicked with reason: **"${stringOption}"**.`);
        } catch (error) {
            await interaction.editReply(`Commander: [libRoot] An error occured during kicking: An error occured during kicking: ${error}`);
        }
    }
}