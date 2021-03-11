const Discord = require("discord.js");
const modül = require("sozluk-api");

exports.run = async (client, message, args) => {
  if (!args[0]) return message.reply("bir kelime girmelisin");
  let kelime = await modül.tdk(args[0]);
  const embed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setThumbnail(
      "https://upload.wikimedia.org/wikipedia/commons/5/51/Türk_Dil_Kurumu_logo.png"
    )
    .addField("Anlam:", kelime.anlam)
    .addField("Lisan:", kelime.lisan)
    .addField("Örnek:", `${kelime.örnek} -**${kelime.Yazar}**`)
    .addField("Atasözü:", kelime.Atasözü);
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tdk"],
  permLevel: 0,
  kategori: "genel"
};

exports.help = {
  name: "tdk",
  description: "Tdk'den kelime,sözcük ararsınız",
  usage: "tdk"
};
