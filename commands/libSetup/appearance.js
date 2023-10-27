const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Client, ActivityType, PresenceUpdateStatus } = require("discord.js");
const editJsonFile = require("edit-json-file");
let file = editJsonFile("settings.json");
var botSettings = require("../../settings.json");
const getURLBasedOnContentType = require("../../functions/getURLBasedOnContentType");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("appearance")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Setup TheChaOS's appearance")
        .addAttachmentOption(opt => opt
            .setName("bot_avatar_path")
            .setDescription("Sets bot's profile picture")
            .setRequired(true)
        )
        .addStringOption(opt => opt
            .setName("bot_accent_color")
            .setDescription("Enter accent color from the profile picture.")
            .setMinLength(6)
            .setMaxLength(7)
        )
        .addStringOption(opt => opt
            .setName("username")
            .setDescription("Enter bot's new username.")
        )
        .addStringOption(opt => opt
            .setName("activity")
            .setDescription("Enter bot's activity.")
        )
        .addStringOption(opt => opt
            .setName("activity_type")
            .setDescription("Sets bot's activity type (ex. Watching..., Playing...).")
            .addChoices(
                { value: "competing", name: "Competing" },
                { value: "listening", name: "Listening" },
                { value: "playing", name: "Playing" },
                { value: "streaming", name: "Streaming" },
                { value: "watching", name: "Watching" }
            )
        )
    ,
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        await interaction.deferReply();

        const attachmentOption = interaction.options.getAttachment("bot_avatar_path");
        const stringOptionA = interaction.options.getString("bot_accent_color");
        const stringOptionB = interaction.options.getString("username") ?? "The ChaOS";
        const stringOptionC = interaction.options.getString("activity") ?? "";
        const stringOptionD = interaction.options.getString("activity_type") ?? "playing";

        /*
        function getURLBasedOnContentTypeO() {
            if (attachmentOption.contentType == "image/jpeg" | "image/png" | "image/webp")
                return attachmentOption.url
            else return "resources/beta1.jpg"
        }
        */

        function getHash() {
            if (stringOptionA == null) { return "#B57AB8" }
            else if (stringOptionA.startsWith("#") && stringOptionA.length == 7) { return stringOptionA.toUpperCase() }
            else if (stringOptionA.startsWith("#") && stringOptionA.length == 6) { return stringOptionA.toUpperCase() + "0" }
            else if (!stringOptionA.startsWith("#") && stringOptionA.length == 6) { return "#" + stringOptionA.toUpperCase() }
        }

        await file.set("libSetup.botAvatarFileURL", getURLBasedOnContentType(attachmentOption, "resources/beta1.jpg"));
        await file.set("libSetup.accentColor", getHash());
        await file.set("libSetup.activity", stringOptionC);
        await file.set("libSetup.activityType", stringOptionD);
        await file.save();

        await client.user.setAvatar(getURLBasedOnContentType(attachmentOption, "resources/beta1.jpg"));
        if (stringOptionB != "") { await client.user.setUsername(stringOptionB); }


        switch (stringOptionD) {
            case "competing":
                client.user.setActivity(stringOptionC, { type: ActivityType.Competing });
                break;
            case "listening":
                client.user.setActivity(stringOptionC, { type: ActivityType.Listening });
                break;
            case "playing":
                client.user.setActivity(stringOptionC, { type: ActivityType.Playing });
                break;
            case "streaming":
                client.user.setActivity(stringOptionC, { type: ActivityType.Streaming });
                break;
            case "watching":
                client.user.setActivity(stringOptionC, { type: ActivityType.Watching });
                break;
        }


        const appearanceEmbed = new EmbedBuilder()
            .setTitle("The ChaOS Appearance Setup")
            .setColor(botSettings.libSetup.accentColor)
            .addFields(
                { name: "Accent color:", value: getHash() },
                { name: "Activity", value: stringOptionC == "" ? "\u200B" : stringOptionC },
                { name: "Activity Type:", value: stringOptionD },
                { name: "Username:", value: client.user.username },
                { name: "Profile Picture URL", value: getURLBasedOnContentType(attachmentOption, "resources/beta1.jpg") },
            )
            .setImage(client.user.avatarURL())
            .setFooter({ text: "Profile Picture" })

        await interaction.editReply({ embeds: [appearanceEmbed] });
    },
};
