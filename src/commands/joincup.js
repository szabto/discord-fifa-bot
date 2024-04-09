const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join-cup')
        .setDescription('Joins you the current cup.'),
    async execute(interaction) {
        const user = interaction.user;
        return new Promise((resolve, reject) => {
            const user = interaction.user;

            db.query("SELECT * FROM cups WHERE status=0", function (err, result) {
                if (err) {
                    reject();
                    return;
                }

                if (result.length > 0) {
                    const row = result[0];
                    db.query("SELECT * FROM cup_players WHERE cup_id=" + row.id + " AND player_id='" + user.id + "'", function (err1, result1) {
                        if (err1) {
                            reject();
                            return;
                        }
                        if (result1.length == 0) {
                            db.query("INSERT INTO cup_players (cup_id, player_id) VALUES(" + row.id + ", '" + user.id + "')", function (err2, result2) {
                                if (err2) {
                                    reject();
                                    return;
                                }
                                interaction.reply('Sikeresen jelentkeztél a kupára!');
                            });
                        } else {
                            interaction.reply('Már jelentkeztél a kupára!');
                        }
                    });
                } else {
                    interaction.reply('Jelenleg nincs kupa amiről ki tudsz lépni!');
                }
            })
        })
    },
};
