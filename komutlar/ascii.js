var figlet = require("figlet");
const Discord = require("discord.js");

module.exports.run = (client, message, args, tools) => {
  var maxLen = 75; // Kendiniz en yüksek harf sayısını ayarlayabilirsiniz

  if (args.join(" ").length > maxLen)
    return message.channel.send(
      `Çok karakter yazdınız. En fazla ${maxLen} karakter yazabilirsin!`
    );
  if (!args[0]) return message.channel.send("Lütfen geçerli yazı giriniz.");

  figlet(`${args.join(" ")}`, function(err, data) {
    if (err) {
      console.log("Bir hata var...");
      console.dir(err);
      return;
    }

    message.channel.send(`${data}`, { code: "AsciiArt" });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "eğlence",
  permLevel: 0
};
exports.help = {
  name: "ascii",
  description: "Ascii şeklinde yazı yazmanızı sağlar.",
  usage: "ascii <mesaj>"
};
