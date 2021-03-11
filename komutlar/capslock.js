const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");

exports.run = async (client, message) => {
  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;
  let args = message.content.split(" ").slice(1);
  const secenekler = args.slice(0).join(" ");

  if (secenekler.length < 1)
    return message.reply(
      `**${prefix}caps-engelle aç** veya **${prefix}caps-engelle kapat** yazınz `
    );
  //if(secenekler === "aç" || "kapat") return message.channel.send(errembed);

  if (
    secenekler !== "aç" &&
    secenekler !== "kapat" &&
    secenekler !== "on" &&
    secenekler !== "off"
  )
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `<a:neoncarpi:780444956849340416> Uygun Kullanım\n${prefix}caps-lock aç`
        )
        .setColor("RED")
    );

  if (secenekler === "aç" || secenekler === "on") {
    var i = db.set(`capsE_${message.guild.id}`, "acik");

    const embed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(
        `<a:yesil_onay:727045346852601908> Bu Özellik Başarıyla Açıldı.`
      );
    message.channel.send(embed);
  }

  if (secenekler === "kapat" || secenekler === "off") {
    //var i = db.set(`küfürE_${message.guild.id}`, "kapali")

    db.delete(`capsE_${message.guild.id}`);

    message.channel.send(
      new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(
          `<a:yesil_onay:727045346852601908> Bu Özellik Başarıyla Kapatıldı.`
        )
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "büyük-harf-engelle",
    "büyük-harf-engel",
    "büyükharfengelle",
    "caps-engelle",
    "capsengelle",
    "büyükharf-engel",
    "caps-lock",
    "capslock",
    "büyükharf",
    "capsengel",
    "caps-engel"
  ],
  permLevel: 4,
  kategori: "ayarlar"
};

exports.help = {
  name: "büyükharf-engelle",
  description: "Büyük harf engelleme sistemini açıp kapatmanızı sağlar.",
  usage: "büyükharf-engelle <aç/kapat>"
};
