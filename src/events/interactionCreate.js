const fs = require('fs');
module.exports = {
    run: async (client, interaction) => {

        var commands = fs.readdirSync('src/commands/', 'utf-8');

        commands = commands.map((commandName) => commandName.split('.')[0]);

        if (interaction.isCommand()) {
            const { commandName } = interaction;
            if (commands.includes(commandName)) {
                const command = require(`../commands/${commandName}`);
                if (command.run) {
                    command.run(interaction, client);
                }
            }
        }
        
    }
}