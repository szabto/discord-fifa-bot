const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Generates a random score.'),
    async execute(interaction) {
        const user = interaction.user;

        let rnd = 0.5 + Math.random() * 4.5;
        const score = Math.round(rnd / 0.5) * 0.5;
        await interaction.reply('Picked score is: ' + score);
    },
};
