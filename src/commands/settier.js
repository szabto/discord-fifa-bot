const { SlashCommandBuilder } = require('discord.js');

const tiers = ['S','A','B','C','D','E','F','G','H','I','J'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-tier')
        .setDescription('Sets a tier for you.')
        .addStringOption(option =>
            option.setName('tier')
                .setDescription('Your tier level')
                .setRequired(true)
                .addChoices.apply(option, tiers.map((x,y) => { return { name: x, value: y.toString() }; }))),
    async execute(interaction) {
        return new Promise((resolve, reject) => {
            const user = interaction.user;
            const tier = interaction.options.getString('tier');

            console.log(user.id);
            const sql = "SELECT * FROM players WHERE id = '" + user.id + "'";
            db.query(sql, function (err, result) {
                if (result.length > 0) {
                    db.query("UPDATE players SET tier='"+tiers[tier]+"' WHERE id='"+user.id+"'", function (err2, result2) {
                        if (err2) {
                            reject();
                            throw err2;
                        }
                        interaction.reply(':tada: You are in tier `' + tiers[tier] + '` from now.');
                        resolve();
                    })
                } else {
                    db.query("INSERT INTO players (id, name, tier) VALUES('"+user.id+"', '"+user.globalName+"', '"+tiers[tier]+"')", function (err2, result2) {
                        if (err2) {
                            console.log()
                            reject();
                            throw err2;
                        }
                        interaction.reply(':tada: You are in tier `' + tiers[tier] + '` from now.');
                        resolve();
                    })
                }
            });
        });
    },
};
