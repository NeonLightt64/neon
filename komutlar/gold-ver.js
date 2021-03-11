const Discord = require("discord.js");
const db = require("quick.db");
const fs = require('fs');
const client = new Discord.Client();

exports.run = async (args, client, message, params,bot) => {
  
  //let user = client.users.get(args.slice(0).join(' '));
let user = message.mentions.users.first() || message.guild.users.get(args[0]) || message.author;
   
  let nesne = args[0]
  
   if (!nesne) return message.reply('Herhangi bir ID belirtiniz.')
  
  message.channel.send(`:white_check_mark: **${nesne}** ID'li kişi, özel üyelik sistemine eklendi.`)
  db.set(`üyelikk_${nesne}`, 'üyelik')
  setTimeout(function() {
    return console.log("cue");
}, 10000);
//db.delete(`üyelikk.${message.author.id}`)
  
  db.delete(`üyelikk_${nesne}`)
}
exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [],
  permLevel: 5, 
  //kategori:'taslak'
};

exports.help = {
  name: "goldd-ver", 
  description: "", 
  usage: ""
};