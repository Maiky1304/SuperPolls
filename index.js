const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const {token, prefix} = require('./config.json');

// Command Map
client.commands = new Discord.Collection();

// React Map
client.reacts = new Discord.Collection();

// Commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log('[Command] [Loaded] ' + file)
}

// Events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		if (event.async) {
            client.on(event.name, async (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }
	}
    console.log("[Event] [Loaded] " + file);
}

client.login(token);