const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  const ayarlar = require("../ayarlar.json");

  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

  if (!args[0])
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `<a:neoncarpi:780444956849340416> Uygun Kullanım\n${prefix}sa-as aç`
        )
        .setColor("RED")
    );

  if (args[0] == "aç") {
    db.set(`ss_${message.guild.id}`, "açık");
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `<a:yesil_onay:727045346852601908> Bu özellik başarıyla açıldı.`
        )
        .setColor("GREEN")
    );
  }
  if (args[0] == "kapat") {
    db.delete(`ss_${message.guild.id}`, "kapat");
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `<a:yesil_onay:727045346852601908> Bu özellik başarıyla kapatıldı.`
        )
        .setColor("GREEN")
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sa", "as"],
  kategori: "ayarlar",
  permLevel: 3
};

exports.help = {
  name: "sa-as",
  description: "Selamün aleyküm, Aleyküm selam",
  usage: "sa-as"
};
