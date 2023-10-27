const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const botSettings = require("../../settings.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("togglerole")
        .setDescription("Toggable Role manager")
        .addStringOption((opt) => opt
            .setName("role")
            .setDescription("Enter role's global string.")
            .setRequired(true)
        )
        .addBooleanOption((opt) => opt
            .setName("toggle")
            .setDescription("Specify role's global string")
            .setRequired(false)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, member, client) {
        if (botSettings.libRole.roleToggleRoles.roleIDs.length < botSettings.libRole.roleToggleRoles.roleNames.length) return interaction.reply({ content: "Number of IDs does not match number of Roles" });
        if (botSettings.libRole.roleToggleRoles.roleIDs.length > botSettings.libRole.roleToggleRoles.roleNames.length) return interaction.reply({ content: "Number of IDs does not match number of Roles" });

        const stringOption = interaction.options.getString("role");
        const booleanOption = interaction.options.getBoolean("toggle");


        var roleID = botSettings.libRole.roleToggleRoles.roleNames.indexOf(stringOption);
        switch (booleanOption) {
            case true:
                interaction.guild.members.cache.get(interaction.member.id).roles.add(botSettings.libRole.roleToggleRoles.roleIDs[roleID]);
                interaction.reply(`Commander: [libRole] Added role ${stringOption} to you`).then(() => {
                    console.log(`Commander: [libRole] Added role ${stringOption} to ${interaction.guild.members.cache.get(interaction.member.id).displayName} (${interaction.guild.members.cache.get(interaction.member.id).id})`)
                });
                break;
            case false:
                interaction.guild.members.cache.get(interaction.member.id).roles.remove(botSettings.libRole.roleToggleRoles.roleIDs[roleID]);
                interaction.reply(`Commander: [libRole] Removed role ${stringOption} from you`).then(() => {
                    console.log(`Commander: [libRole] Removed role ${stringOption} from ${interaction.guild.members.cache.get(interaction.member.id).displayName} (${interaction.guild.members.cache.get(interaction.member.id).id})`)
                });
                break;
            case null:
                if (interaction.guild.members.cache.get(interaction.member.id).roles.cache.has(botSettings.libRole.roleToggleRoles.roleIDs[roleID])) {
                    interaction.guild.members.cache.get(interaction.member.id).roles.remove(botSettings.libRole.roleToggleRoles.roleIDs[roleID]);
                    interaction.reply(`Commander: [libRole] Removed role ${stringOption} from you`).then(() => {
                        console.log(`Commander: [libRole] Removed role ${stringOption} from ${interaction.guild.members.cache.get(interaction.member.id).displayName} (${interaction.guild.members.cache.get(interaction.member.id).id})`)
                    });
                }
                else {
                    interaction.guild.members.cache.get(interaction.member.id).roles.add(botSettings.libRole.roleToggleRoles.roleIDs[roleID]);
                    interaction.reply(`Commander: [libRole] Added role ${stringOption} to you`).then(() => {
                        console.log(`Commander: [libRole] Added role ${stringOption} to ${interaction.guild.members.cache.get(interaction.member.id).displayName} (${interaction.guild.members.cache.get(interaction.member.id).id})`)
                    });

                }
        }
    }
}