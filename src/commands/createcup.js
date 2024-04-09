const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-cup')
        .setDescription('Creates a new fifa cup.')
        .addStringOption(option =>
            option
                .setName('name')
                .setRequired(true)
                .setDescription('What is the name of the cup?')),
    async execute(interaction) {
        return new Promise((resolve, reject) => {
            const user = interaction.user;
            const name = interaction.options.getString('name');

            db.query("SELECT * FROM cups WHERE status<>2", function (err, result) {
                if (err) {
                    reject();
                    return;
                }

                if (result.length > 0) {
                    interaction.reply('Már van folyamatban egy kupa, addig nem hozhatsz létre új kupát!');
                } else {
                    db.query("INSERT INTO cups (name, owner_id, created_at, status) VALUES('"+name+"', '"+user.id+"', now(), 0)")
                    interaction.reply('Sikeres kupa létrehozás!');
                }
            })
        })
    },
};
