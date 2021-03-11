const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args, client) => {
  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  let sk = message.mentions.channels.first();
  let kanal = await db.fetch(`sk_${message.guild.id}`);

  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if (!kanal)
      return message.channel.send(
        `Seviye kanal sistemini kapatmak için \`seviye kanalının\` seçili olması lazım örnek kullanım: \`${prefix}seviye-kanal #kanal\``
      );

    db.delete(`sk_${message.guild.id}`);

    message.channel.send(`Seviye kanalı başarıyla kapatıldı.`);

    return;
  }

  if (!sk)
    return message.channel.send(
      "Seviye kanalını bulamadım. Kullanım ${prefix}seviye-kanal #kanal"
    );

  db.set(`sk_${message.guild.id}`, sk.id);

  message.channel.send(
    `Seviye kanalı ${sk} olarak ayarlandı\nSıfırlamak için ${prefix}seviye-kanal sıfırla`
  );
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["seviye-kanal"],
  kategori: "seviye",
  permLevel: 4
};

module.exports.help = {
  name: "seviye-kanal",
  description: "Seviye kanalını ayarlar",
  usage: "seviye-kanal"
};
