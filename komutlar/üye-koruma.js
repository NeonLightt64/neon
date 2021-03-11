const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  let p = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  let ws = args[0];

  if (!ws)
    return message.channel.send(
      new Discord.RichEmbed().setDescription(
        `**Kullanım Şekli:** ${p}koruma \`aç\`/\`kapat\` \n**Parametreler:** \`aç\`, \`kapat\``
      )
    );

  if (ws != "aç" && ws != "kapat")
    return message.channel.send(
      new Discord.RichEmbed().setDescription(
        `**Kullanım Şekli:** ${p}koruma \`aç\`/\`kapat\``
      )
    );

  if (ws === "aç") {
    let role = message.mentions.roles.first();
    if (!role)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(`Bir rol etiketlemelisin!`)
      );
    let channels = message.mentions.channels.first();
    if (!channels)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(`Bir kanal etiketlemelisin!`)
      );
    var a = db.fetch(`koruma_${message.guild.id}`) === "acik";
    if (a)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(`Oppss! Bu sistem zaten açık.`)
      );
    message.channel.send(
      new Discord.RichEmbed().setDescription(
        `Koruma sistemini bu sunucuda aktif hale getirdim! Kanalı <#${channels.id}> olarak ayarladım!`
      )
    );
    db.set(`koruma_${message.guild.id}`, "acik");
    db.set(`rol_${message.guild.id}`, role.id);
    db.set(`kanal_${message.guild.id}`, channels.id);
  }

  if (ws === "kapat") {
    var a = db.fetch(`koruma_${message.guild.id}`) === "kapali";
    if (a)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(`Oppss! Bu sistem zaten kapalı.`)
      );
    message.channel.send(
      new Discord.RichEmbed().setDescription(
        `Koruma sistemini bu sunucuda deaktif hale getirdim!`
      )
    );
    db.set(`koruma_${message.guild.id}`, "kapali");
    db.delete(`kanal_${message.guild.id}`);
    db.delete(`rol_${message.guild.id}`);
  }
};

exports.conf = {
  aliases: ["üye-koruma"],
  permLevel: 4
};

exports.help = {
  name: "koruma-üye"
};
