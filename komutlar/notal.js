const Discord = require("discord.js");
const database = require("quick.db");

exports.run = async (client, message, args) => {
  if (!args[0])
    return message.channel.send(
      "Alınacak notu girmedlisin\n**Örnek**: /not-al Yarın ders var."
    );

  const not = await database.fetch(message.author.id);
  await database.set(message.author.id, {
    bir: args.slice(0).join(" "),
    iki: not ? not.iki : false ? not.iki : false,
    üç: not ? not.üç : false ? not.üç : false,
    dört: not ? not.dört : false ? not.dört : false,
    beş: not ? not.beş : false ? not.beş : false
  });
  return message.channel.send("Başarıyla **Not 1**'e kaydedildi.");
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["not-al"],
  permLevel: 0,
  kategori: "kişisel"
};

exports.help = {
  name: "not-al1",
  description: "Not Yeri 1",
  usage: "not-al1"
};
