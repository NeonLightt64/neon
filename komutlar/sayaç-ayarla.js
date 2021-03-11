const Discord = require("discord.js");
const fs = require("fs");
//const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  const db = require("quick.db");

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;
  //if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);

  if (!args[0]) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `<a:neoncarpi:780444956849340416> Uygun Kullanım\n${prefix}sayaç <sayı>`
        )
        .setColor("RED")
    );
  }

  //let profil = JSON.parse(fs.readFileSync("./jsonlar/sayac.json", "utf8"));

  if (args[0] === "kapat") {
    if (db.has(`sayac_${message.guild.id}`) === true) {
      db.delete(`sayac_${message.guild.id}`);

      if (db.has(`sKanal_${message.guild.id}`) === true) {
        db.delete(`sKanal_${message.guild.id}`);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription(
              `<a:yesil_onay:727045346852601908> Bu özellik Başarıyla Kapatıldı`
            )
            .setColor("GREEN")
        );
        return;
      }

      message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            `<a:yesil_onay:727045346852601908> Bu özellik Başarıyla Kapatıldı`
          )
          .setColor("GREEN")
      );
      return;
    }
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription(`<a:neoncarpi:780444956849340416> Sayaç ayarlanmamış.`)
        .setColor("RED")
    );
    return;
  }

  if (isNaN(args[0])) {
    return message.reply("Sadece sayı!");
  }

  if (args[0] <= message.guild.members.size) {
    // const embed = new Discord.RichEmbed();
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(`Lütfen sunucu sayısından daha yüksek bir değer girin`)
        .setColor("RED")
    );
  }

  db.set(`sayac_${message.guild.id}`, args[0]);

  const embed = new Discord.RichEmbed().setDescription(
    `Sayaç başarıyla ayarlandı: ${
      args[0]
    }\nSayaç kayıtları kanalı ayarlamak için ${prefix}sayaç-kanal #kanal`
  );
  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sayacayarla", "sayac", "sayaç"],
  permLevel: 4,
  kategori: "ayarlar"
};

exports.help = {
  name: "sayaç-ayarla",
  description: "Sayacı ayarlar.",
  usage: "saya-çayarla <sayı>"
};
