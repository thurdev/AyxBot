module.exports = {
    name: "setplan",
      aliases: [""],
      description: "Define a plan to a user",
      usage: "<input>",
    run: (client, message, args, db) => {
      let Discord = require('discord.js');
      let member = message.mentions.members.first();
      let plan = args[1];
      if(!member){
        const embed = new Discord.RichEmbed()
        .setColor('#FF0000')
        .setDescription('Please specify a member to set his plan')
        .setTimestamp()
        .setAuthor(message.author.tag, message.author.avatarURL);
        message.channel.send(embed);
        return;
      }
      
      if(!plan){
        const embed = new Discord.RichEmbed()
        .setColor('#FF0000')
        .setDescription('Please specify a plan to set.')
        .setTimestamp()
        .setAuthor(message.author.tag, message.author.avatarURL);
        message.channel.send(embed);
        return;
      }
      
      let definePlan;
      
      if(plan == 100){
        definePlan = 'normal';
      }if(plan == 'vip'){
        definePlan = 'vip';
      }
      
      let namePlan;
      
      if(definePlan == 'normal'){
        namePlan = '100 Credits Plan';
      }else if(definePlan == "vip"){
        namePlan = 'VIP Plan';
      }
      
      db.collection('userInfo').doc(member.id).get().then((q) => {
          if (q.exists) {
              return message.reply("This member already have a plan.");
          }else{
        db.collection('userInfo').doc(member.id).set({
          'credits': plan,
          'plan': definePlan
        }).then(() => {
          message.channel.send('')
          const embed = new Discord.RichEmbed()
          .setColor('#1e90ff')
          .setDescription(`Now have access to \n**__${namePlan}__**`)
          .setTimestamp()
          .setThumbnail(member.user.avatarURL)
          .setAuthor(member.user.tag);
          message.channel.send(embed);
          member.addRole('637207128888836096');
        });
      }
      });
      
    }
  }
