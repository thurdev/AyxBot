module.exports = {
    once: (client) => {
        console.log(`Bot ${client.user.tag} has logged in!`);
    }
}