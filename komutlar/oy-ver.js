const Discord = require("discord.js");

exports.run = async (message, args, client) => {
  message.channel.send(
    new Discord.RichEmbed().setDescription(
      "❄ Bota oy vererek botun yaygınlaşmasında yardımcı olabilirsin\n❄ [Oy Ver] (https://top.gg/bot/730790799289090179/vote)"
    )
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "genel"
};

exports.help = {
  name: "oy-ver",
  description: "Oy Verme Linkine gidersiniz",
  usage: ""
};
