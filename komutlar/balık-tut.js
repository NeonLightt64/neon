const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = (client, message) => {
  message.channel.send("Sanarım oltana balık düştü.").then(message => {
    var espriler = [
      "Sazan Tuttun! :fish:",
      "Köpek Balığı Tuttun.",
      "Uskumru Tuttun! :fish:",
      "Mezgit Tuttun! :fish:",
      "Japon Balığı Tuttun Yemeyi Düşünmüyorsun Herhalde?",
      "Hamsi Tuttun! :fish:",
      "Levrek Tuttun! :fish:",
      "Hiçbirşey Tutamadın Maalesef! :wastebasket:",
      "Alabalık Tuttun! :fish:",
      "Maalesef Balık Oltadan Kaçtı! :wastebasket:",
      "İstavrit Tuttun! :fish:"
    ];
    var espri = espriler[Math.floor(Math.random() * espriler.length)];
    message.edit(`${espri}`);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["balık tut", "balık-tut", "balık-tut", "balık tut", "balık"],
  permLevel: 0,
  kategori: "eğlence"
};

exports.help = {
  name: "balıktut",
  description: "Balık Tutarsın.",
  usage: "balıktut"
};
