module.exports = {
    name: "call",
    aliases: [""],
    description: "Call to a desired number",
    usage: "<input>",
    run: (client, message, args, db) => {
      message.delete(1);
      const Discord = require("discord.js");
      let number = args[0];
      let text = args[1];
      let cashEmoji = client.emojis.get("638527628059475988");
      let vipEmoji = client.emojis.get("638527627925258241");
      let phoneEmoji = client.emojis.get("638527627464015882");
      let messageEmoji = client.emojis.get("638527235401187358");
      let userEmoji = client.emojis.get("638527133400039426");
      let pricePerCallVip = 250;
      let pricePerCall = 250;
      db.collection("userInfo")
        .doc(message.author.id)
        .get()
        .then(q => {
          if (q.exists) {
            let credits = q.data().credits;
            let plan = q.data().plan;
            let planName;
            if (plan == "normal") {
              planName = "15000 Credits Plan";
            } else if (plan == "vip") {
              planName = "VIP Plan";
            } else if (plan == "normal") {
              planName = "5000 Credits Plan";
            }
            if (plan == "vip") {
              if (credits < pricePerCallVip) {
                return message.reply("You don't have have credits to call.");
              }
            } else if (plan == "normal") {
              if (credits < pricePerCall) {
                return message.reply("You don't have have credits to call.");
              }
            } else if (plan == "normal2") {
              if (credits < pricePerCall) {
                return message.reply("You don't have have credits to call.");
              }
            }
            if (!number) {
              const embed = new Discord.RichEmbed()
                .setColor("#FF0000")
                .setTitle("☎️ Call Error")
                .setDescription(
                  "Please specify a number to call. [Country Code Number + Number]"
                )
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL);
              message.channel.send(embed);
              return;
            }
  
            if (!text) {
              const embed = new Discord.RichEmbed()
                .setColor("#FF0000")
                .setTitle("☎️ Call Error")
                .setDescription("Please specify a text to say.")
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL);
              message.channel.send(embed);
              return;
            }
            let textToSend = args.slice(0, 20).join(' ');
  
            const Nexmo = require("nexmo");
            let privateKey = "private.key";
            const nexmo = new Nexmo({
              apiKey: "ffd44cf1",
              apiSecret: "TG3OFxeGfGgqK13q",
              applicationId: "f6b1f6e1-0227-4bf9-82b8-4200b9dbd25b",
              privateKey: privateKey
            });
  
            const ncco = [
              {
                action: "talk",
                voiceName: "Vitoria",
                text: textToSend
              }
            ];
  
            nexmo.calls.create(
              {
                to: [{ type: "phone", number: number }],
                from: { type: "phone", number: number },
                ncco
              },
              (err, result) => {
                if (err) {
                  return console.log(err);
                }
                const embed = new Discord.RichEmbed()
                  .setColor("#7289da")
                  .setTitle("📱 Calling to +" + number)
                  .setDescription("Message: " + textToSend)
                  .setTimestamp()
                  .setFooter(message.author.tag, message.author.avatarURL);
                message.channel.send(embed);
              }
            );
            let newCreditsVip = credits - pricePerCallVip;
            let newCredits = credits - pricePerCall;
            if (plan == "vip") {
              db.collection("userInfo")
                .doc(message.author.id)
                .update({
                  credits: newCreditsVip
                });
              client.channels
                .get("637205150859264022")
                .send(
                  `**\n ㅤ ㅤ[CALL INFO]** \n${userEmoji}Client: __${
                    message.author.tag
                  }__ \n${phoneEmoji}Called to: __${
                    args[0]
                  }__ \n${messageEmoji}Message: __${textToSend}__ \n${cashEmoji}OldCredits: __${credits}__ \n${cashEmoji}NewCredits: __${newCreditsVip}__ \n${vipEmoji}Plan: __Vip__`
                );
            } else if (plan == "normal") {
              db.collection("userInfo")
                .doc(message.author.id)
                .update({
                  credits: newCredits
                });
              client.channels
                .get("637205150859264022")
                .send(
                  `**\n ㅤ ㅤ[CALL INFO]** \nClient: __${
                    message.author.tag
                  }__ \nCalled to: __${
                    args[0]
                  }__ \nMessage: __${textToSend}__ \nOldCredits: __${credits}__ \nNewCredits: __${newCredits}__ \nPlan: __Normal__`
                );
            }
          } else {
            return message.reply("You don't have a plan.");
          }
        });
    }
  };
  
