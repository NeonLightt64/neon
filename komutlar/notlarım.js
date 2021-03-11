const Discord = require("discord.js");
const database = require("quick.db");

exports.run = async (client, message, args) => {
  const not = await database.fetch(message.author.id);
  if (!not) return message.channel.send("Hiç not almamışsın.");

  const embed = new Discord.RichEmbed()
    .setTitle("Notların:")
    .setColor("#fffff0");

  let notlar = [];

  if (not.bir) notlar.push(`**1**:\n${not.bir}`);
  if (not.iki) notlar.push(`**2**:\n${not.iki}`);
  if (not.üç) notlar.push(`**3**:\n${not.üç}`);
  if (not.dört) notlar.push(`**4**:\n${not.dört}`);
  if (not.beş) notlar.push(`**5**:\n${not.beş}`);

  notlar.forEach(a => {
    embed.addField(a.split("\n")[0], a.split("\n")[1]);
  });

  return message.author.send(embed).catch(error => {
    console.log(error);
    return message.channel.send(embed);
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "kişisel"
};

exports.help = {
  name: "notlarım",
  description: "Notlarınızı gösterir (DM Kutunuza gönderir)"
};
