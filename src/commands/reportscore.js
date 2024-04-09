const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report-battle-score')
        .setDescription('Sets result of a specific battle. Need to enter your goals and enemy goals too.'),
    async execute(interaction) {
        const user = interaction.user;
        await interaction.reply('TBD');


// once entered by both players, it creates another match if needed
// if battle ended returns
//    - graph of matches, and scoreboard
    },
};
