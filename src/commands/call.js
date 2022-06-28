const Call = require('../utils/call');

module.exports = {
    name: 'call',
    description: 'Call someone',
    options: [
        {
            type: 'string',
            name: 'phone',
            description: 'Enter the phone number that you want to call to',
            required: true
        },
        {
            type: 'string',
            name: 'message',
            description: 'Enter the message you want to send',
            required: true
        }
    ],
    run: async (interaction, client) => {

        var credits = 0;
        
        const dbRes = await client.db.findOne(
            {
                table: 'users',
                where: {
                    discordId: interaction.user.id
                },
                attributes: ['credits']
            }
        );
        
        if(!dbRes){
            await client.db.create({
                table: 'users',
                values: {
                    discordId: interaction.user.id,
                    credits: 0
                }
            })
        }else{
            credits = dbRes.credits;
        }

        if(credits <= parseFloat(process.env.CALL_PRICE)){
            interaction.reply(`You don't have enough credits to call someone.`);
            return;
        }

        new Call({
            phone: interaction.options.getString('phone'),
            message: interaction.options.getString('message')
        }).send().then(() => {
            interaction.reply({ ephemeral: true, content: `Calling ${interaction.options.getString('phone')}...` });
            client.db.update({
                table: 'users',
                values: {
                    credits: credits - parseFloat(process.env.CALL_PRICE)
                }
            })
            // TODO LOG SYSTEM
            // client.db.create({
            //
            // })
        }).catch((err) => {
            interaction.reply({ ephemeral: true, content: err });
        })
    }
}