const Discord = require('discord.js');
const db = require('quick.db')
const data = require('quick.db')



exports.run = async (bot, message, args) => {
  
  const ayarlar = require('../ayarlar.json');
  
 let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
	
  
let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`guvenlik3_${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat" ) {
    if(!logkanal) return message.channel.send(
    new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`<a:neoncarpi:780444956849340416> Uygun Kullanım:\n${prefix}güvenlik <#kanal>`)
    
    );
    
   db.delete(`guvenlik3_${message.guild.id}`)
  
   message.channel.send(
   new Discord.RichEmbed()
     .setColor("GREEN")
     .setDescription(`<a:yesil_onay:727045346852601908> Güvenlik Kanalı Başarıyla Kapatıldı`)
   );
 
  
    return
  }
  
if (!logk) return message.channel.send( new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`<a:neoncarpi:780444956849340416> Uygun Kullanım:\n${prefix}güvenlik <#kanal>.`)
                                      ); 

   db.set(`guvenlik3_${message.guild.id}`, logk.id)
 
 message.channel.send(
   
   new Discord.RichEmbed()
       .setColor("GREEN")
   .setDescription(`Güvenlik kanalı ${logk} olarak ayarlandı\nKapatmak İçin:\n ${prefix}güvenlik-kapat`)
)




}


  
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['güvenlik'],
    kategori: "ayarlar",
  permLevel: 3
};

module.exports.help = {
  name: 'güvenlik',
  description: 'Güvenlik kanalı ayarlar',
  usage: 'güvenlik'
};