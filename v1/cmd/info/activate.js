module.exports = {
    name: "activate",
    aliases: [""],
    description: "Activate a Plan",
    usage: "<input>",
    run: (client, message, args, db) => {
      let Discord = require("discord.js");
      let member = message.author.id;
      let key = args.join(' ');
      let viprole = "640929809366515722";
      let normalrole = "637207128888836096";
      let normalrole2 = "641195528142454794";
      let cashEmoji = client.emojis.get("638527628059475988");
  let vipEmoji = client.emojis.get("638527627925258241");
  let phoneEmoji = client.emojis.get("638527627464015882");
  let messageEmoji = client.emojis.get("638527235401187358");
  let userEmoji = client.emojis.get("638527133400039426");
      db.collection("userInfo")
        .doc(message.author.id)
        .get()
        .then(q => {
          if (q.exists) {
            return message.reply("You already have a plan.");
          } else {
            db.collection("keys")
              .doc(message.author.id)
              .get()
              .then(q => {
                if (q.exists) {
                  console.log(key);
                  let dbKey = q.data().key;
                  let dbCredits = q.data().credits;
                  let dbPlan = q.data().plan;
                  if (dbKey == key) {
                    let definePlan;
                    let credits;
                    if (dbPlan == "normal") {
                      definePlan = "15000 Credits Plan";
                      credits = 15000;
                    } else if (dbPlan == "normal2") {
                      definePlan = "5000 Credits Plan";
                      credits = 5000;
                    } else if (dbPlan == "vip") {
                      definePlan = "30000 VIP Credits Plan";
                      credits = 30000;
                    }
  
                    db.collection("userInfo").doc(message.author.id).set({
                        credits: credits,
                        plan: dbPlan
                      }).then(() => {
                        if (dbPlan == "normal") {
                          message.reply(
                            `Success! You activated the **${dbPlan}** Plan, now you have access to __${credits}__ credits`
                          );
                          client.channels.get("637205150859264022").send(`**[ACTIVATION INFO]** \n${userEmoji}Client: __${message.author.tag}__ \n${vipEmoji}Activated Plan: __${dbPlan}__ \n${cashEmoji}Credits: __${credits}__`);
                          let member = message.guild.members.get(message.author.id);
                          member.addRole(normalrole);
                          db.collection("keys").doc(message.author.id).delete({});
                        } else if (dbPlan == "normal2") {
                          message.reply(
                            `Success! You activated the **${dbPlan}** Plan, now you have access to __${credits}__ credits`
                          );
                          client.channels.get("637205150859264022").send(`**[ACTIVATION INFO]** \n${userEmoji}Client: __${message.author.tag}__ \n${vipEmoji}Activated Plan: __${dbPlan}__ \n${cashEmoji}Credits: __${credits}__`);
                          let member = message.guild.members.get(message.author.id);
                          member.addRole(normalrole2);
                          db.collection("keys").doc(message.author.id).delete({});
                        } else if (dbPlan == "vip") {
                          message.reply(
                            `Success! You activated the **${dbPlan}** Plan, now you have access to __${credits}__ credits`
                          );
                          client.channels.get("637205150859264022").send(`**[ACTIVATION INFO]** \n${userEmoji}Client: __${message.author.tag}__ \n${vipEmoji}Activated Plan: __${dbPlan}__ \n${cashEmoji}Credits: __${credits}__`);
                          let member = message.guild.members.get(message.author.id);
                          member.addRole(viprole);
                          db.collection("keys").doc(message.author.id).delete({});
                        }
                      });
                  } else {
                    return message.reply("Invalid key.");
                  }
                } else {
                  return message.reply("You don't have a plan to use.");
                }
              });
          }
        });
    }
  };
  
