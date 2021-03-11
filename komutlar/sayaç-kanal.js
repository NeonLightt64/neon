const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {
  const db = require("quick.db");

  let channel =
    message.mentions.channels.first() ||
    message.guild.channels.find(c => c.name === args.slice(0).join(" "));
  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  if (!channel) {
    return message.reply(
      new Discord.RichEmbed()
        .setDescription(
          `<a:neoncarpi:780444956849340416> Uygun Kullanım\n${prefix}sayaç-kanal <#kanal>`
        )
        .setColor("RED")
    );
  }

  if (args[0] === "kapat") {
    if (db.has(`sKanal_${message.guild.id}`) === true) {
      db.delete(`sKanal_${message.guild.id}`);

      if (db.has(`sayac_${message.guild.id}`) === true) {
        db.delete(`sayac_${message.guild.id}`);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription(
              `<a:yesil_onay:727045346852601908> Sayaç ve sayaç kanalı kapatıldı.`
            )
            .setColor("GREEN")
        );
        return;
      }

      message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            `<a:yesil_onay:727045346852601908> Bu özellik başarıyla kapatıldı`
          )
          .setColor("GREEN")
      );
      return;
    }
    message.channel.send(`Sayaç kanalı ayarlanmış.`);
    return;
  }

  db.set(`sKanal_${message.guild.id}`, channel.id);

  const embed = new Discord.RichEmbed()
    .setDescription(
      `<a:yesil_onay:727045346852601908> Sayaç kanalı başarıyla ayarlandı: ${channel}\nKapatmak İçin:${prefix}sayaçkanal kapat`
    )
    .setColor("GREEN");
  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "sayaç-kanal-belirle",
    "sayaç-kanal",
    "sayaçkanal",
    "sayac-kanal",
    "sayackanal"
  ],
  permLevel: 4,
  kategori: "ayarlar"
};

exports.help = {
  name: "sayaç-kanal-ayarla",
  description: "Sayaç kanalını ayarlar.",
  usage: "sayaç-kanal-ayarla <#kanal>"
};
