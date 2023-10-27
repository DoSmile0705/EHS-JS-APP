const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require("discord.js");
const botSettings = require("../../settings.json");
const editJsonFile = require("edit-json-file");
let file = editJsonFile("settings.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("autorole")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .setDescription("Automatic Role manager: Gives role to joining members.")
        .addSubcommand((opt) => opt
            .setName("toggle")
            .setDescription("Toggle AutoRole")
            .addBooleanOption((opt) => opt
                .setName("bool")
                .setDescription("Enable AutoRole")
                .setRequired(true)
            )
        )
        .addSubcommand((opt) => opt
            .setName("role")
            .setDescription("Sets role to add on join")
            .addRoleOption((opt) => opt
                .setName("role")
                .setDescription("Role to add on join")
                .setRequired(true)
            )
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {
        const subCommand = interaction.options.getSubcommand();
        const boolOption = interaction.options.getBoolean("bool");
        const roleOption = interaction.options.getRole("role");
        switch (subCommand) {
            case "toggle":
                file.set("libRole.roleAutoToggle", boolOption);
                interaction.reply(`Commander: [libRole] ${interaction.guild.members.cache.get(interaction.member.id).displayName} toggled ${boolOption ? "on" : "off"} on Auto Role`).then(() => {
                    console.log(`Commander: [libRole] ${interaction.guild.members.cache.get(interaction.member.id).displayName} (${interaction.guild.members.cache.get(interaction.member.id).id}) toggled ${boolOption} on Auto Role`);
                });
                break;
            case "role":
                file.set("libRole.roleAutoRoleID", roleOption.id)
                interaction.reply(`Commander: [libRole] ${interaction.guild.members.cache.get(interaction.member.id).displayName} set role ${roleOption.name} on Auto Role`).then(() => {
                    console.log(`Commander: [libRole] ${interaction.guild.members.cache.get(interaction.member.id).displayName} (${interaction.guild.members.cache.get(interaction.member.id).id}) set role ${roleOption.name} on Auto Role`);
                });
                break;
        }
        file.save();
    }
}