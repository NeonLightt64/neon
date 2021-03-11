const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  let logk = message.mentions.channels.first();
  let logkanal = await db.fetch(`log_${message.guild.id}`);

  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if (!logkanal)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `<a:neoncarpi:780444956849340416> Mod Log Kanalı Ayarlı Değil\nAyarlamak İçin ${prefix}mod-log <#kanal>`
        )
      );
    db.delete(`log_${message.guild.id}`);
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `<a:yesil_onay:727045346852601908> Mod-log Kanalı Başarıyla Kapatıldı.`
        )
        .setColor("GREEN")
    );

    return;
  }

  if (!logk)
    return message.channel.send(
      new Discord.RichEmbed().setDescription(
        `<a:neoncarpi:780444956849340416> Uygun Kullanım\n${prefix}mod-log <#kanal>`
      )
    );

  db.set(`log_${message.guild.id}`, logk.id);

  message.channel.send(
    new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(
        `<a:yesil_onay:727045346852601908> Mod-Log kanalı başarıyla ${logk} olarak ayarlandı.`
      )
  );
  // message.react('607634966959882250)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "mod-log",
    "modlog",
    "log-ayarlama",
    "logayarla",
    "log",
    "logkanal"
  ],
  permLevel: 2,
  kategori: "moderasyon"
};

exports.help = {
  name: "mod-log",
  description: "Mod-Log kanalını belirler.",
  usage: "mod-log <#kanal>"
};
