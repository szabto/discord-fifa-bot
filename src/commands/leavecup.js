const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave-cup')
        .setDescription('Leaves you from the current cup.'),
    async execute(interaction) {
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
                        if (result1.length > 0) {
                            db.query("DELETE FROM cup_players WHERE cup_id=" + row.id + " AND player_id='" + user.id + "'", function (err2, result2) {
                                if (err2) {
                                    reject();
                                    return;
                                }
                                interaction.reply('Sikeresen lejelentkeztél a kupáról!');
                            });
                        } else {
                            interaction.reply('Nem jelentkeztél még az aktív kupára!');
                        }
                    });
                } else {
                    interaction.reply('Jelenleg nincs kupa amiről ki tudsz lépni!');
                }
            })
        })
    },
};
