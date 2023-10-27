const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDescription("Ban members.")
        .addMentionableOption((opt) => opt
            .setName("member")
            .setDescription("Who do you want to ban today?")
            .setRequired(true)
        )
        .addStringOption((opt) => opt
            .setName("reason")
            .setDescription("Why do you want to ban them?")
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const memberOption = interaction.options.getMember("member");
        const stringOption = interaction.options.getString("reason") || "No reason provided.";

        await interaction.deferReply();

        const memberBan = interaction.guild.members.fetch(memberOption.id);
        if (!memberBan) {
            await interaction.editReply(`Commander: [libRoot] An error occured during banning: User cannot be banned since they doesn't exist in this server.`);
            return;
        } else if (memberBan.id === interaction.guild.ownerId) {
            await interaction.editReply(`Commander: [libRoot] An error occured during banning: User cannot be banned since they are the owner of this server.`);
            return;
        }
        const targetUserRolePosition = (await memberBan).roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply(`Commander: [libRoot] An error occured during banning: You can't ban the user becuse they are on different level.`);
            return;
        }
        else if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply(`Commander: [libRoot] An error occured during banning: Banning this person would cause so much chaos.`);
            return;
        }
        try {
            await (await memberBan).ban(stringOption);
            await interaction.editReply(`Commander: [libRoot] Member succesfuly banned with reason: **"${stringOption}"**  .`);
        } catch (error) {
            await interaction.editReply(`Commander: [libRoot] An error occured during banning: ${error}`);
        }
    }
}