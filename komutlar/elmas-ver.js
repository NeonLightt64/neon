const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let x = /(-)/;
  let user = message.mentions.users.first();

  if (!user)
    return message.reply(
      new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(`Elmas göndereceğim kişiyi etiketle`)
    );
  if (user.bot === true)
    return message.reply("Elması bir bota yollarsan sen zararlı çıkarsın!");

  let mesaj = args.slice(1).join(" ");
  if (!mesaj)
    return message.reply(
      new Discord.RichEmbed()
        .setDescription("Göndereceğin miktarı gir.")
        .setColor("RED")
    );

  if (user.id === message.author.id)
    return message.reply(
      `${client.emojis.get(
        client.emojiler.kendineParaYollama
      )} Kendine elmasmı yollayacaksın ciddimisin?`
    );

  if (mesaj.match(x)) return message.reply("Lütfen bir sayı gir.");
  if (isNaN(args[1])) return message.channel.send("Lütfen bir sayı gir.");

  let elmas = await db.fetch(`elmascıklar_${message.author.id}`);
  let altın = await db.fetch(`altıncıklar_${message.author.id}`);
  let para = await db.fetch(`paracık_${message.author.id}`);

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  if (elmas < mesaj) {
    let bulunanP = await db.fetch(`elmascıklar_${message.author.id}`);
    message.channel.send(
      `Yeterince elmasın bulunmuyor, sende olan elmas:  ${
        bulunanP === null ? "0" : `${bulunanP}`
      }`
    );
  } else if (elmas > mesaj) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        `${user} Adlı kullanıcıya elmas yollandı, yollanılan miktar: ${mesaj}`
      );
    message.channel.send(embed);
    db.add(`elmascıklar_${user.id}`, mesaj);
    db.add(`elmascıklar_${message.author.id}`, -mesaj);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["elmas-ver", "elmasyolla"],
  permLevel: 0,
  kategori: "profil"
};

exports.help = {
  name: "elmas-gönder",
  description: "İstediğiniz kişiye elmas yollayabilirsiniz.",
  usage: "elmas-yolla <@üye> <miktar>"
};
