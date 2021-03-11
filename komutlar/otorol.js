const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {
  const db = require("quick.db");

  let role =
    message.mentions.roles.first() ||
    message.guild.roles.find(r => r.name === args.slice(0).join(" "));
  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  if (args[0] === "kapat") {
    if (db.has(`otoR_${message.guild.id}`) === true) {
      message.channel.send(`Otorol başarıyla kaldırıldı`);
      db.delete(`otoR_${message.guild.id}`);
      return;
    }
    message.channel.send(`Otorol ayarlanmış.`);
    return;
  }

  if (!role) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `<a:neoncarpi:780444956849340416> Uygun Kullanım\n${prefix}oto-rol <@rol>`
        )
        .setColor("RED")
    );
  }

  db.set(`otoR_${message.guild.id}`, role.id);

  const embed = new Discord.RichEmbed()
    .setDescription(
      `<a:yesil_onay:727045346852601908> Otorol başarıyla ayarlandı: **${role.name}**\nKapatmak İçin ${prefix}otorol kapat`
    )
    .setColor("GREEN");
  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oto-rol", "oto-rol-belirle", "otorol"],
  permLevel: 4,
  kategori: "ayarlar"
};

exports.help = {
  name: "oto-rol-ayarla",
  description: "Sunucuya birisi katıldıgında verilecek rolü ayarlar.",
  usage: "oto-rol-ayarla <@rol>"
};
