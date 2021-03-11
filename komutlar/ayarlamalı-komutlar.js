const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, msg) => {
  const ayarlar = require("../ayarlar.json");

  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

  /*var s = 'tr'
  var a = client.commands.get('yardım').help.name
    if(db.has(`dil_${msg.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('yardım').help.enname
    }
    const dil = client[s]
    const o = a*/

  message.channel.send(
    new Discord.RichEmbed()

      .setDescription(
        `**${prefix}büyükharf-engelle** = Büyük harf engelleme sistemini açıp kapatmanızı sağlar.
**${prefix}destek-kanal-ayarla** = Gelişmiş Destek Sistemindeki destek kanalını değiştirmenizi sağlar.
**${prefix}destek-rol-ayarla** = Gelişmiş Destek Sistemindeki destek ekibi rolünü değiştirmenizi sağlar.
**${prefix}hg-bb-kapat** = Resimli hoşgeldeldin güle güle kanalı ayarlar.
**${prefix}giriş-mesaj-ayarla** = Giriş mesajını değiştirmenizi sağlar.
**${prefix}giriş-çıkış-ayarla** = Giriş çıkış kanalını ayarlar.
**${prefix}hg-bb** = Resimli hoşgeldin görüşürüz kanalı ayarlar.
**${prefix}güvenlik** = Güvenlik kanalı ayarlar.
**${prefix}küfür** = Küfür engelleme sistemini açıp kapatmanızı sağlar.
**${prefix}reklam-engel** = Rengelleme sistemini açıp kapatmanızı sağlar.
**${prefix}oto-rol-ayarla** = Sunucuya birisi katıldıgında verilecek rolü ayarlar.
**${prefix}oto-rol-kanal** = Otomatik rol kayıtlarının gönderileceği kanalı ayarlar.
**${prefix}ön-ek** = Botun ön-ekini ayarlar.
**${prefix}sa-as** = Selam sistemini açar.
**${prefix}sayaç-ayarla** = Sayacı ayarlar.
**${prefix}sayaç-kanal-ayarla** = Sayaç kanalını ayarlar.
**${prefix}tag-kanal-ayarla** = Tag kayıtlarının gönderileceği kanalı ayarlar.
**${prefix}tag-ayarla** = Sunucuya katılan üyeye otomatik tag verir
**${prefix}çıkış-mesaj-ayarla** = Çıkış mesajını değiştirmenizi sağlar.

`
      )

      .setColor("#0000c8")
      .addField(
        `» Bağlantılar`,
        `[📧 Sunucuna Ekle](https://discordapp.com/oauth2/authorize?client_id=730790799289090179&scope=bot&permissions=8) | [📬 Oy Ver](https://top.gg/bot/730790799289090179/vote) | [📞 Destek Sunucudu](https://discord.gg/UftMaJaBfd)`,
        false
      )
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
  //kategori:'seviye'
};

exports.help = {
  name: "ayarlamalı-komutlar"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
