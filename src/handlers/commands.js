// You can also make the other options if you want:
// ❌ SUB_COMMAND sets the option to be a subcommand
// ❌SUB_COMMAND_GROUP sets the option to be a subcommand group
// ✔️ STRING sets the option to require a string value
// ❌INTEGER sets the option to require an integer value
// ❌BOOLEAN sets the option to require a boolean value
// ✔️ USER sets the option to require a user or snowflake as value
// ❌CHANNEL sets the option to require a channel or snowflake as value
// ❌ROLE sets the option to require a role or snowflake as value
// ❌MENTIONABLE sets the option to require a user, role or snowflake as value
// ❌NUMBER sets the option to require a decimal (also known as a floating point) value
// ❌ATTACHMENT sets the option to require an attachment

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = () => {
    
    var commandsFiles = fs.readdirSync('src/commands/', 'utf-8');

    var commands = [];
    
    commandsFiles.forEach((commandName) => {
        const commandFile = require(`../commands/${commandName}`);
        
        var command = new SlashCommandBuilder();
        
        if(!commandFile.name) return console.warn(`Command ${commandName} has no name!`);

        command.setName(commandFile.name);

        if(commandFile.description) command.setDescription(commandFile.description);

        if(commandFile.options) {
            commandFile.options.forEach((option) => {
                if(option.type === 'string') {
                    command.addStringOption(addStringOption.bind(null, option));
                }

                if(option.type == 'user') {
                    command.addUserOption(addUserOption.bind(null, option));
                }
            });
        }

        commands.push(command);
    })

    const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

    rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        // Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), // Use this to register the commands to a specific guild
        {
            body: commands.map(command => command.toJSON()) 
        }
    )
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

}


function addStringOption(opt, option){
    option.setName(opt.name);

    if(opt.description) option.setDescription(opt.description);

    if(opt.required) option.setRequired(opt.required);

    return option;
}

function addUserOption(opt, option){
    option.setName(opt.name);

    if(opt.description) option.setDescription(opt.description);

    if(opt.required) option.setRequired(opt.required);
    
    return option;
}