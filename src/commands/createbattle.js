const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-battle')
        .setDescription('Starts a new versus battle session.'),
    async execute(interaction) {
        const user = interaction.user;
//    - matchid
        await interaction.reply('TBD');
    },
};
