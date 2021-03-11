const Discord = require("discord.js");
const fs = require("fs");
//var ayarlar = require('../ayarlar.json');
//let rol = JSON.parse(fs.readFileSync("././jsonlar/otoR.json", "utf8"));

exports.run = async (client, message, args) => {
  const db = require("quick.db");
  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;
  let channel =
    message.mentions.channels.first() ||
    message.guild.channels.find(c => c.name === args.slice(0).join(" "));

  if (args[0] === "kapat") {
    if (db.has(`otoRK_${message.guild.id}`) === true) {
      message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            `<a:yesil_onay:727045346852601908> Bu özellik başarıyla kapatıldı.`
          )
          .setColor("GREEN")
      );
      db.delete(`otoRK_${message.guild.id}`);
      return;
    }
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription(`Otorol Kanalı Zaten Ayarlanmış.`)
        .setColor("RED")
    );
    return;
  }

  if (db.has(`otoR_${message.guild.id}`) === false)
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `<a:neoncarpi:780444956849340416> Önce Otorol Ayarlamalısın.`
        )
        .setColor("RED")
    );

  if (!channel) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `<a:neoncarpi:780444956849340416> Uygun Kullanım\n${prefix}otorol-kanal <#kanal>`
        )
        .setColor("RED")
    );
  }

  db.set(`otoRK_${message.guild.id}`, channel.id);

  const embed = new Discord.RichEmbed()
    .setDescription(
      `<a:yesil_onay:727045346852601908> Otorol kayıtları kanalı başarıyla ${channel} olarak ayarlandı!\nKapatmak İçin: ${prefix}oto-rol-kanal kapat.`
    )
    .setColor("GREEN");
  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "oto-rol-kanal-ayarla",
    "oto-rol-kanal-belirle",
    "otorolkanal",
    "otorol-kanal"
  ],
  permLevel: 4,
  kategori: "ayarlar"
};

exports.help = {
  name: "oto-rol-kanal",
  description: "Otomatik rol kayıtlarının gönderileceği kanalı ayarlar.",
  usage: "oto-rol-kanal [#kanal/kanal adı]"
};
