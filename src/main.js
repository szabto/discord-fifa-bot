const { Client, Events, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');
const mysql = require('mysql');
const config = require('./config');

const con = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
});

con.connect(onDbConnected);

global.db = con;



function onDbConnected(err) {
    if (err) throw err;
    console.log("Connected!");
    const client = new Client({ intents: [GatewayIntentBits.Guilds] }); //creates new client

    const foldersPath = path.join(__dirname, 'commands');
    const commandsFolder = fs.readdirSync(foldersPath);
    const commands = [];

    client.commands = new Collection();

    const commandFiles = commandsFolder.filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(foldersPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }

    client.once(Events.ClientReady, readyClient => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    });

    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    });

    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(config.token);

    // and deploy your commands!
    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationGuildCommands(config.appid, config.guildId),
                { body: commands },
            );

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    })();

    //this line must be at the very end
    client.login(config.token); //signs the bot in with token
}

// https://discord.com/oauth2/authorize?client_id=1226842278279118888&permissions=51200&scope=bot

// admin commands
// /set-battle-score {matchid} {scorea}-{scoreb}

// /set-player-tier {name} {TIER}
