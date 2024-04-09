const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('print-scoreboard')
        .setDescription('Prints the current scoreboard of the cup.'),
    async execute(interaction) {
        const user = interaction.user;
        await interaction.reply('TBD');
    },
};
