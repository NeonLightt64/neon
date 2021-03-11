const Discord = require("discord.js");
const ms = require("parse-ms");

exports.run = async (client, message, args, bot) => {
  /*  const db = require('quick.db');
  
  
  
 
     var s = 'tr'
  var a = bot.commands.get('bayramlar').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = bot.commands.get('bayramlar').help.enname
    }*/

  let rzm = new Date("2021-05-03 00:00:00");
  let ramazan = ms(rzm - Date.now());

  message.channel.send(
    `Ramazan bayramına **${ramazan.days}** gün **${ramazan.hours}** saat **${ramazan.minutes}** dakika kaldı!`
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "eğlence",
  permLevel: 0
};

exports.help = {
  name: "bayramlar",
  enanme: "bayramlar",
  description:
    "Bayramlara kaç gün kaç saat kaç dakika kaç saniye kaldığını gösterir.",
  usage: "bayramlar"
};
