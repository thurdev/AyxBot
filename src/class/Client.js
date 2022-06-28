const { Client } = require('discord.js');
const { Database } = require('./Database');

class Bot extends Client{
    constructor(options){
        super(options);
        this.db = new Database('db.sqlite');
    }
}

module.exports = Bot;