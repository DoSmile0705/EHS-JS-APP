const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require("discord.js");
const botSettings = require("../../settings.json");
const editJsonFile = require("edit-json-file");
let file = editJsonFile("settings.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("togglerole-add")
        .setDescription("Add roles to Toggable Role manager")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addRoleOption((opt) => opt
            .setName("role_to_add")
            .setDescription("What role do you want to add?")
            .setRequired(true))
        .addStringOption((opt) => opt
            .setName("name")
            .setDescription("Display name of the role")
            .setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, member, client) {
        const stringOption = interaction.options.getString("name");
        const roleOption = interaction.options.getRole("role_to_add");

        file.append("libRole.roleToggleRoles.roleNames", stringOption);
        file.append("libRole.roleToggleRoles.roleIDs", roleOption.id);
        file.save();
        interaction.reply(`Commander: [libRole] Added role ${stringOption} to roleToggle pool`).then(() => {
            console.log(`Commander: [libRole] User ${interaction.guild.members.cache.get(interaction.member.id).displayName} (${interaction.guild.members.cache.get(interaction.member.id).id}) added role ${stringOption} to roleToggle pool`)
        });
    }
}