const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join-battle')
        .setDescription('Joins you a specific battle by battle id.'),
    async execute(interaction) {
        const user = interaction.user;
        await interaction.reply('TBD');
    },
};
