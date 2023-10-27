const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("rename_member")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
        .setDescription("Rename member.")
        .addMentionableOption((opt) => opt
            .setName("member")
            .setDescription("Who do you want to rename?")
            .setRequired(true)
        )
        .addStringOption((opt) => opt
            .setName("new_name")
            .setDescription("How the member should be called?")
            .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const memberOption = interaction.options.getMember("member");
        const stringOption = interaction.options.getString("new_name");

        await interaction.deferReply();

        const memberRename = interaction.guild.members.fetch(memberOption.id);
        if (!memberRename) {
            await interaction.editReply(`Commander: [libRoot] An error occured during renaming: User cannot be renamed since they doesn't exist in this server.`);
            return;
        } else if (memberRename.id === interaction.guild.ownerId) {
            await interaction.editReply(`Commander: [libRoot] An error occured during renaming: User cannot be renamed since they are the owner of this server.`);
            return;
        }
        const targetUserRolePosition = (await memberRename).roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply(`Commander: [libRoot] An error occured during renaming: You can't rename the user becuse they are on different level.`);
            return;
        }
        else if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply(`Commander: [libRoot] An error occured during renaming: Renaming this person would cause so much chaos.`);
            return;
        }
        try {
            await (await memberRename).setNickname(stringOption);
            await interaction.editReply(`Commander: [libRoot] Member succesfuly renamed to: **"${stringOption}"**.`);
        } catch (error) {
            await interaction.editReply(`Commander: [libRoot] An error occured during renaming: ${error}`);
        }
    }
}