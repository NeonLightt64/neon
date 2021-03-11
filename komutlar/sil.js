const Discord = require("discord.js");
const talkedRecently = new Set();
//const ayarlar = require('../ayarlar.json');
const db = require("quick.db");
exports.run = async function(client, message, args) {
  if (talkedRecently.has(message.author.id)) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("5 Saniyede Bir Mesaj Silebilirim.")
        .setColor("RED")
    );
  } else {
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      message.delete();
      talkedRecently.delete(message.author.id);
    }, 5000);
  }

  var x = args.slice(0).join(" ");
  var user = message.author;

  var s = "tr";
  var a = client.commands.get("afk").help.name;
  if (db.has(`dil_${message.guild.id}`) === true) {
    var s = "en";
    var a = client.commands.get("afk").help.enname;
  }
  const dil = client[s];

  if (!x) return message.reply(`${dil.temizle.mesajsayı}`);

  2;

  if (x < 2) return message.reply(`${dil.temizle.iki}`);
  if (x > 100) return message.reply(`${dil.temizle.yüz}`);

  let fetched = await message.channel.fetchMessages({ limit: args[0] });

  message.channel.bulkDelete(fetched).catch(error => message.channel.send(``));
  message.channel.fetchMessages({ limit: args[0] }).then(mesajlar => {
    let silindi = mesajlar.array().length;
    message.channel.bulkDelete(mesajlar);
    message.channel
      .send(
        `<a:mavi:780445124060643358>  \`${silindi}\` ${dil.temizle.silindi}`
      )
      .then(msg => msg.delete(2000));
  });
  message.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sil", "mesaj-sil", "mesajları-sil", "clear", "clean"],
  permLevel: 2,
  kategori: "moderasyon"
};

exports.help = {
  name: "temizle",
  category: "moderasyon",
  description: "Belirtilen miktarda mesaj siler.",
  usage: "temizle <miktar>"
};
