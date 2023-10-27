const { ChatInputCommandInteraction, SlashCommandBuilder, Client } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pong")
        .setDescription("Will respond with ping."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        interaction.reply({ content: `Ping: ${client.ws.ping} ms` });
    },
};
