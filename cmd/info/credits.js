module.exports = {
    name: "credits",
      aliases: ["credit", "phone"],
      description: "See your credits",
      usage: "<input>",
      cooldown: 30,
    run: (client, message, args, db) => {
    db.collection('userInfo').doc(message.author.id).get().then((q) => {
          if (q.exists) {
        let credits = q.data().credits;
        let plan = q.data().plan;
            let planName;
            if(plan == "normal"){
              planName = "15000 Credits Plan";
            }else if(plan == "vip"){
              planName = "VIP Plan";
            }else if(plan == "normal"){
              planName = "5000 Credits Plan";
            }

          const Discord = require("discord.js");
          const channel = message.channel;
          let embed2 = new Discord.RichEmbed()
          .setTitle('📲 My Phone Info  ')
          .setColor('#1e90ff')
          .addField('Credits:',`${credits}`,true)
          .addField('Plan:',`${planName}`,true)
          .setTimestamp(new Date())
          .setFooter(message.author.username, message.author.avatarURL)
          channel.sendMessage(embed2);


      }
      });
      
    }
  }
