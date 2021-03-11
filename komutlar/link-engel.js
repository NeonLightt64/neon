const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message) => {
  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;
  let args = message.content.split(" ").slice(1);
  const secenekler = args.slice(0).join(" ");

  if (secenekler.length < 1)
    return message.reply(
      new Discord.RichEmbed()
        .setDescription(
          `<a:neoncarpi:780444956849340416> Uygun Kullanım :\n${prefix}reklam-engel aç`
        )
        .setColor("RED")
    );

  if (
    secenekler !== "aç" &&
    secenekler !== "kapat" &&
    secenekler !== "on" &&
    secenekler !== "off"
  )
    return message.reply(
      new Discord.RichEmbed()
        .setDescription(
          `<a:neoncarpi:780444956849340416> Uygun Kullanım :\n${prefix}reklam-engel aç`
        )
        .setColor("RED")
    );

  if (secenekler === "aç" || secenekler === "on") {
    var i = db.set(`linkE_${message.guild.id}`, "acik");

    const embed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(
        `<a:yesil_onay:727045346852601908> Reklam Engeli Başarıyla açıldı\nKapatmak İçin : ${prefix}link-engel kapat`
      );
    message.channel.send(embed);
  }

  if (secenekler === "kapat") {
    db.delete(`linkE_${message.guild.id}`);

    message.channel.send(
      new Discord.RichEmbed().setDescription(
        `<a:yesil_onay:727045346852601908> Özellik Başarıyla Kapatıldı`
      )
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "link-engel",
    "link-engelleme",
    "reklam-engel",
    "ad-block",
    "reklam-engel",
    "link-engelle"
  ],
  permLevel: 4,
  kategori: "ayarlar"
};

exports.help = {
  name: "reklam-engel",
  description: "Link engelleme sistemini açıp kapatmanızı sağlar.",
  usage: "link-engelle <aç/kapat>"
};
