const Discord = require("discord.js");
const fs = require("fs");

exports.run = (client, message, args) => {
  const db = require("quick.db");

  if (!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS"))
    return message.reply("<a:neoncarpi:780444956849340416> Gerekli izinim yok");
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(" ");
  //  let modlog = message.guild.channels.get(db.fetch(`log_${message.guild.id}`).replace("<#", "").replace(">", ""));
  if (message.mentions.users.size < 1)
    return message.reply(
      new Discord.RichEmbed()
        .setTitle("Komut : Yasaklama")
        .setColor("GREEN")
        .setDescription(
          `İşlem Geçersiz\nUygun Kullanım /yasakla <@kullanıcı>,\n/yasakla <@kullanıcı> <sebep>.`
        )
    );

  if (user.id === message.author.id)
    return message.reply(":rolling_eyes: Kendini Yasaklayamazsın.");

  /*const embedd0 = new Discord.RichEmbed()
    .setColor("GREEN")
    .addField("İşlem", "Yasaklama")
    .addField("Yasaklanan üye", `${user.tag} (${user.id})`)
    .addField(
      "Yasaklayan yetkili yetkili",
      `${message.author.username}#${message.author.discriminator}`
    )
    .addField("Yasaklanma sebebi", "```" + reason + "```");
  message.reply(embedd0);*/
  user.send(
    `\`${message.guild.name}\` Adlı Sunucudan yasaklandınız\nSebep: \`${reason}\``
  );

  message.guild.ban(user, 2);

  const embed225 = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`Başarıyla yasaklandı`);
  message.channel.send(embed225);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ban", "yasakla", "banla", "engelle"],
  permLevel: 3,
  kategori: "moderasyon"
};

exports.help = {
  name: "yasakla",
  description: "İstediğiniz kişiyi sunucudan yasaklar.",
  usage: "yasakla <@kullanıcı> <sebep>"
};
