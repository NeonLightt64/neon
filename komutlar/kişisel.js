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
        `**${prefix}ku** = K.U moduna girersiniz (yapımda).
**${prefix}hesapla** = Belirtilen işlemi yapar.
**${prefix}kullanıcı-bilgi** = İstediğiniz kullanıcını bilgilerini gösterir.
**${prefix}not-al1** = Not Alırsınız.
**${prefix}not-al2** = Not Bölmesi 2
**${prefix}not-al3** = Not Bölmesi 3
**${prefix}not-sil** = (Yakında...)
**${prefix}notlarım** = Notlarınızı gösterir (DM Kutunuza gönderir)`
      )

      .setColor("#0000c8")
      .addField(
        `» Bağlantılar`,
        `[📧 Sunucuna Ekle](https://discordapp.com/oauth2/authorize?client_id=730790799289090179&scope=bot&permissions=8) [📬 Oy Ver](https://top.gg/bot/730790799289090179/vote) [📞 Destek Sunucusu](https://discord.gg/UftMaJaBfd)`,
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
  name: "kişisel"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
