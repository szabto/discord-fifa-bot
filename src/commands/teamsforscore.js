const { SlashCommandBuilder } = require('discord.js');

const attacks = {
    '0.5': 60,
    '1': 62,
    '1.5': 64,
    '2': 66,
    '2.5': 69,
    '3': 72,
    '3.5': 74,
    '4': 77,
    '4.5': 80,
    '5': 83,
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-team-for-score')
        .setDescription('Returns possible teams for given stars.')
        .addStringOption(option =>
            option.setName('stars')
                .setDescription('Stars of team')
                .setRequired(true)
                .addChoices(
                    { name: '0.5', value: '0.5' },
                    { name: '1', value: '1' },
                    { name: '1.5', value: '1.5' },
                    { name: '2', value: '2' },
                    { name: '2.5', value: '1.5' },
                    { name: '3', value: '3' },
                    { name: '3.5', value: '1.5' },
                    { name: '4', value: '4' },
                    { name: '4.5', value: '4.5' },
                    { name: '5', value: '5' },
                )),
    async execute(interaction) {
        return new Promise((resolve, reject) => {
            const stars = interaction.options.getString('stars');

            const sql = "SELECT * FROM fifa_teams WHERE stars = " + parseFloat(stars);
            db.query(sql, function (err, result) {
                if (err) {
                    reject();
                    throw err;
                }
                const teams = {};
                for (let i = 0; i < result.length; i++) {
                    if (result[i].att > attacks[stars]) continue;

                    if (!teams.hasOwnProperty(result[i].country)) {
                        teams[result[i].country] = [];
                    }
                    teams[result[i].country].push(result[i]);
                }
                let replyString = "";
                for (let country in teams) {
                    replyString += "- " + country + "\n";
                    for (let team of teams[country]) {
                        replyString += " - " + team.name + " `"+team.att+"` / " + "`"+team.mid+"` / " + "`"+team.def+"`" + "\n";
                    }
                }

                replyString = replyString.substring(0, 2000-59);

                interaction.reply('Possible teams for ' + stars + ' stars are the following:\n' + replyString);
                resolve();
            });
        });
    },
};
