const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, args) => {
  let mesaj = args.slice(0).join(" ");

  if (mesaj === "id") {
    const emojiList = message.guild.emojis
      .map((e, x) => x + " | " + e)
      .join("\n");
    var emojis = message.guild.emojis.array();
    if (emojiList.length > 2000)
      return message.reply("Bu sunucuda fazla emoji var");
    const embed2 = new Discord.RichEmbed()
      .setColor("#0000c8")
      .setFooter(`Sadece emojileri görmek için /emojiler`)
      .setDescription(
        `\`\`\`js
Sunucuda Bulunan Emojiler (${emojis.length} adet)
${emojiList}
\`\`\``
      )
      .setTimestamp();
    message.channel.send(embed2);
    return;
  }
  message.channel
    .send(
      new Discord.RichEmbed()
        .setTitle("😀 Sunucuda Bulunan Emojiler")
        .setDescription(
          "" + message.guild.emojis.map(emoji => emoji).join(" | ")
        )
    )

    .setColor("#0000c8");
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["emoji"],
  permLevel: 0,
  kategori: "sunucu"
};

exports.help = {
  name: "emojiler",
  description: "Sunucuda bulunan emojileri gösterir.",
  usage: "emojiler"
};
