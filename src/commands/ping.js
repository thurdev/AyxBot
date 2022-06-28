module.exports = {
    name: 'ping',
    description: 'Replies with pong! 😊',
    // options: [
    //     {
    //         type: 'string',
    //         name: 'message',
    //         description: 'The message to send with the ping.',
    //         required: false
    //     }
    // ],
    run: (interaction, client) => {
        interaction.reply('Pong!');
    }
}