const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require("discord.js");
const botSettings = require("../../settings.json");
const editJsonFile = require("edit-json-file");
let file = editJsonFile("settings.json");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("autoban")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDescription("Automatic Ban manager: Automatically ban members.")
        .addSubcommand((opt) => opt
            .setName("toggle")
            .setDescription("Toggle AutoBan")
            .addBooleanOption((opt) => opt
                .setName("bool")
                .setDescription("T01")
                .setRequired(true)
            )
        )
        .addSubcommand((opt) => opt
            .setName("add")
            .setDescription("Add AutoBan rule")
            .addStringOption((opt) => opt
                .setName("sensitive_string")
                .setDescription("User with this string will be banned on joining")
                .setRequired(true)
            )
        )
        .addSubcommand((opt) => opt
            .setName("list")
            .setDescription("List AutoBan rules")
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {
        const subCommand = interaction.options.getSubcommand();
        const boolOption = interaction.options.getBoolean("bool");
        const stringOption = interaction.options.getString("sensitive_string");
        switch (subCommand) {
            case "toggle":
                file.set("libRoot.autoBanToggle", boolOption);
                interaction.reply(`[libRoot] ${interaction.guild.members.cache.get(interaction.member.id).displayName} toggled ${boolOption ? "on" : "off"} Auto Ban`).then(() => {
                    console.log(`Cyclops: [libRoot] ${interaction.guild.members.cache.get(interaction.member.id).displayName} (${interaction.guild.members.cache.get(interaction.member.id).id}) toggled ${boolOption ? "on" : "off"} Auto Ban`);
                });
                break;
            case "add":
                file.append("libRoot.autoBanRules", stringOption)
                interaction.reply(`[libRoot] ${interaction.guild.members.cache.get(interaction.member.id).displayName} added rule ${stringOption} to Auto Ban list.`).then(() => {
                    console.log(`Cyclops: [libRoot] ${interaction.guild.members.cache.get(interaction.member.id).displayName} (${interaction.guild.members.cache.get(interaction.member.id).id}) added rule "${stringOption}" to Auto Ban list.`);
                });
                break;
            case "list":
                let finalString = "";
                for (let i = 0; i < botSettings.libRoot.autoBanRules.length; i++) {
                    finalString += botSettings.libRoot.autoBanRules[i] + ", ";
                }
                interaction.reply(`[libRoot] Here's the list of all rules: ${finalString}`).then(() => {
                    console.log(`Cyclops: [libRoot] ${interaction.guild.members.cache.get(interaction.member.id).displayName} (${interaction.guild.members.cache.get(interaction.member.id).id}) summonet Auto Ban rules list.`);
                });
                break;
        }
        file.save();
    }
}