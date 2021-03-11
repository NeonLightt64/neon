const Discord = require('discord.js');
const db = require('quick.db');


exports.run = async (client, message, params, args) => {
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
   
  let hgkanali = message.mentions.channels.first();
  if (!hgkanali) return message.channel.send(
    new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(`<:hata:746320500359430184> Uygun Kullanım :\n ${prefix}hb-bb <#kanal>`)
    
    
    )
    db.set(`gcc_${message.guild.id}`, message.mentions.channels.first().id)
  let i = await db.fetch(`gcc_${message.guild.id}`)
 
  message.channel.send(`<:onay:746367770731741205> Hoşgeldin kanalı, <#${i}> olarak ayarlandı.\nKapatmak İçin : ${prefix}hg-bb kapat .`)   
  //message.react('617413726768988160')

};

exports.conf = {
  kategori: 'ayarlar',
 aliases: ['welcome','resim-kanal','gkanal','resimli-hoşgeldin-kanal','hoşgeldin-ayarla', 'welcome-set','gelen-giden','welcome-channel'],
 permLevel: 3
};

exports.help = {
 name: 'hg-bb',
 description: 'Resimli hoşgeldin güle güle kanalı ayarlar.',
 usage: 'gkanal'
};