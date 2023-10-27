const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("mute")
        //.setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .setDescription("Mute members.")
        .addMentionableOption((opt) => opt
            .setName("member")
            .setDescription("Who do you want to mute today?")
            .setRequired(true)
        )
        .addNumberOption((opt) => opt
            .setName("duration")
            .setDescription("How long they should be muted? (In miliseconds)")
            .setRequired(true)
            .addChoices(
                { name: "60 SECS", value: 60000 },
                { name: "5 MINS", value: 300000 },
                { name: "10 MINS", value: 600000 },
                { name: "1 HOUR", value: 3600000 },
                { name: "1 DAY", value: 86400000 },
                { name: "1 WEEK", value: 604800000 }
            )
        )
        .addStringOption((opt) => opt
            .setName("reason")
            .setDescription("Why do you want to mute them?")
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const memberOption = interaction.options.getMember("member");
        const numberOption = interaction.options.getNumber("duration") || 60000;
        const stringOption = interaction.options.getString("reason") || "No reason provided.";

        await interaction.deferReply();

        const memberMute = interaction.guild.members.fetch(memberOption.id);
        if (!memberMute) {
            await interaction.editReply(`Commander: [libRoot] An error occured during muting: User cannot be muted since they doesn't exist in this server.`);
            return;
        } else if (memberMute.id === interaction.guild.ownerId) {
            await interaction.editReply(`Commander: [libRoot] An error occured during muting: User cannot be muted since they are the owner of this server.`);
            return;
        }
        const targetUserRolePosition = (await memberMute).roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply(`Commander: [libRoot] An error occured during muting: You can't mute the user becuse they are on different level.`);
            return;
        }
        else if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply(`Commander: [libRoot] An error occured during muting: Muting this person would cause so much chaos.`);
            return;
        }
        try {
            await (await memberMute).timeout(numberOption, stringOption);
            await interaction.editReply(`Commander: [libRoot] Member succesfuly muted with reason: **"${stringOption}"** for **${numberOption / 60000} second(s)**.`);
        } catch (error) {
            await interaction.editReply(`Commander: [libRoot] An error occured during muting: ${error}`);
        }
    }
}