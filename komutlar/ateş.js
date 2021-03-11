const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let guild = message.guild;
  let reason = args.slice(1).join(" ");
  let user = message.mentions.users.first() /*|| message.user.id*/
  if (message.mentions.users.size < 1)
    return message
      .reply("Kime ateş edeceksen etiketle.")
      .catch(console.error);
  message.channel
    .send("Ateş ediliyor....")
    .then(nmsg => nmsg.edit("https://goo.gl/91Y2az"))
    .then(nmsg => nmsg.edit("https://goo.gl/fWHUqt"))
    .then(nmsg => nmsg.edit("https://goo.gl/fWHUqt"))
    .then(nmsg => nmsg.edit("https://goo.gl/91Y2az"))
    .then(nmsg => nmsg.edit("https://goo.gl/91Y2az"))
    .then(nmsg => nmsg.edit(`${Rastgele[ateşet]}`));
  var Rastgele = [
    "Reis sen ne yaptın? Adam öldü.",
    "Cazibene dayanamayıp adam kendini öldürdü.",
    "Adam yoğun bakımda, Kaç.",
    "Iskaladın tekrar dene.",
    "Rüzgarın etkisiyle mermi sağa saptı"
  ];
  var ateşet = Math.floor(Math.random() * Rastgele.length);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ateş", "ateşet"],
  kategori: "eğlence",
  permLevel: 0
};

exports.help = {
  name: "ateş-et",
  description: "İstediğiniz kişinin kafasına sıkar.",
  usage: "ateş-et <@kullanıcı>]"
};
