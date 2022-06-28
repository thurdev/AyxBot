module.exports = {
    name: 'credits',
    description: 'See your credits',
    options: [
        {
            type: 'user',
            name: 'user',
            description: 'The user to see their credits',
            required: false
        }
    ],
    run: async (interaction, client) => {

        

        var credits = 0;
        
        const dbRes = await client.db.findOne(
            {
                table: 'users',
                where: {
                    discordId: interaction.options.getUser('user') ? interaction.options.getUser('user').id : interaction.user.id
                },
                attributes: ['credits']
            }
        );
        
        if(!dbRes){
            await client.db.create({
                table: 'users',
                values: {
                    discordId: interaction.options.getUser('user') ? interaction.options.getUser('user').id : interaction.user.id,
                    credits: 0
                }
            })
        }else{
            credits = dbRes.credits;
        }

        interaction.reply({ ephemeral: true, content: `${interaction.options.getUser('user') ? `<@${interaction.options.getUser('user').id}>` : 'You'} have \`\`$${parseFloat(credits).toFixed(2)}\`\` credits.` });
    }
}