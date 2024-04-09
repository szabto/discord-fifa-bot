const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start-battle')
        .setDescription('Starts a battle by battle id. Only battle owner can start it.'),
    async execute(interaction) {
        const user = interaction.user;
        await interaction.reply('TBD');


//    - picked score
//    - attach possible teams for each player
    },
};
