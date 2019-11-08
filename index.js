const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
var path = require("path");
app.get("/", (request, response) => {
	console.log(Date.now() + " Ping Received");
	response.sendStatus(200);
});
setInterval(() => {
	http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require('discord.js');
const chalk = require('chalk');
const tag = "[Ayx]";


const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");


const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});



let prefix = process.env.PREFIX;
const token = process.env.TOKEN;
const owner = process.env.OWNER;

const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();




client.on("message", async message => {
    const prefix = ".";
    const cooldowns = new Discord.Collection();

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) command.run(client, message, args,db);
  
});

client.on("guildMemberAdd", async member => {
  
});

/*
client.on('guildCreate', async(gData) => {
	db.collection('guilds').doc(gData.id).set({
		'guildId': gData.id,
		'guildName': gData.name,
		'guildOwner': gData.owner.user.username,
		'guildOwnerID': gData.owner.id,
		'guildMemberCount': gData.memberCount,
		'guildNotifyChat': null,
		'prefix': 'm!'
	});
});
*/

client.on("ready", () => {
    console.log(`${client.user.username} is now online!`);
    client.user.setActivity('~Ayx~', {type: 1, url: 'http://twitch.tv/thurdev'});
});


client.login(token);