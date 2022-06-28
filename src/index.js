'use strict';

require('dotenv').config();

// Require the necessary discord.js classes
const Bot = require('./class/Client');
const { Intents } = require('discord.js');

// Create a new client instance
const client = new Bot({ intents: [Intents.FLAGS.GUILDS] });

['events', 'commands'].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});
// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);