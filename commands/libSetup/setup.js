const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const editJsonFile = require("edit-json-file");
let file = editJsonFile("settings.json");
var botSettings = require("../../settings.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Setup TheChaOS")
        .addStringOption(opt => opt
            .setName("local_developer_nickname")
            .setDescription("Enter local developer's nickname.")
            .setRequired(true)
        )
        .addStringOption(opt => opt
            .setName("local_developer_id")
            .setDescription("Enter local developer's user ID.")
            .setRequired(true)
        )
        .addBooleanOption(opt => opt
            .setName("librole_autorole_toggle")
            .setDescription("Enable AutoRole service?")
            .setRequired(false)
        )
        .addRoleOption(opt => opt
            .setName("librole_autorole_role_id")
            .setDescription("Role assigned on member joining?")
            .setRequired(false)
        )
        .addChannelOption(opt => opt
            .setName("libroot_announce_channel_id")
            .setDescription("In which channel should announcements be sent?")
            .setRequired(false)
            .addChannelTypes(ChannelType.GuildText)
        )
        .addBooleanOption(opt => opt
            .setName("libroot_autoban_toggle")
            .setDescription("Enable AutoBan service?")
            .setRequired(false)
        )
    ,
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        await interaction.deferReply();

        const stringOptionA = interaction.options.getString("local_developer_nickname");
        const stringOptionB = interaction.options.getString("local_developer_id");
        const booleanOptionA = interaction.options.getBoolean("librole_autorole_toggle") || false;
        const roleOption = interaction.options.getRole("librole_autorole_role_id") || `""`;
        const channelOption = interaction.options.getChannel("libroot_announce_channel_id") || `""`;
        const booleanOptionB = interaction.options.getBoolean("libroot_autoban_toggle") || false;

        await file.set("devUserInfo.devUserNickname", stringOptionA);
        await file.set("devUserInfo.devUserID", stringOptionB);
        await file.set("libRole.roleAutoToggle", booleanOptionA);
        await file.set("libRole.roleAutoRoleID", roleOption.id);
        await file.set("libRoot.announceChannelID", channelOption.id);
        await file.set("libRoot.autoBanToggle", booleanOptionB);
        await file.save();

        const setupEmbed = new EmbedBuilder()
            .setTitle("The ChaOS Setup")
            .setColor(botSettings.libSetup.accentColor)
            .addFields(
                { name: "Local developer's name:", value: stringOptionA },
                { name: "libRole: Enable AutoRole?", value: booleanOptionA ? "True" : "False" },
                { name: "libRole: AutoRole role:", value: "\@" + roleOption.name },
                { name: "libRoot: Announcement Channel:", value: "\#" + channelOption.name },
                { name: "libRoot: Enable AutoBan?", value: booleanOptionB ? "True" : "False" },
            )

        await interaction.editReply({ embeds: [setupEmbed] });
    },
};
