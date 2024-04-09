const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start-cup')
        .setDescription('Starts the current cup. Only cup owner can start it.'),
    async execute(interaction) {
        const user = interaction.user;
        await interaction.reply('TBD');


//    - graph of matches
    },
};
