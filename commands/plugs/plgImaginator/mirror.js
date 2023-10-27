const { ChatInputCommandInteraction, SlashCommandBuilder, Client, PermissionFlagsBits } = require("discord.js");
var botSettings = require("../../../settings.json");
const { createCanvas, loadImage } = require('canvas');
const { getURLBasedOnContentType } = require("../../../functions/getURLBasedOnContentType");
const sizeOf = require("image-size");
const url = require("url");
const http = require("http");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mirror")
        .setDefaultMemberPermissions(PermissionFlagsBits.AttachFiles)
        .setDescription("Will mirror image.")
        .addAttachmentOption(opt => opt
            .setName("image_file")
            .setDescription("Image you want to mirror.")
        )
        .addStringOption(opt => opt
            .setName("image_url")
            .setDescription("Enter image URL.")
        )
        .addStringOption(opt => opt
            .setName("axis")
            .setDescription("Do you want to flip horizontaly or verticaly?")
            .setChoices(
                { name: "x", value: "x" },
                { name: "y", value: "y" }
            )
            .setMaxLength(1)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (botSettings.plugs.plgImaginator) {
            await interaction.deferReply();

            const imageURL = getURLBasedOnContentType(interaction.options.getAttachment("image_file"), "resources/beta1.jpg") || interaction.options.getAttachment("image_file").url;
            const flipAxis = interaction.options.getString("axis") ?? "x";
            if (imageURL == null) await interaction.editReply("Error: No image provided.");
            else {

            }
        } else interaction.reply("Plugs: Pllugin not enabled.");
    }
};
