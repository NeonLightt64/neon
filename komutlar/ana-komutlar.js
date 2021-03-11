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
        `**${prefix}canlı-destek** = Canlı destek ekibini çağırırsınız.
**${prefix}davet** = Botu sunucunuza eklersiniz.
**${prefix}deprem-bilgi** = Gün içerisinde olan son depremleri gösterir.
**${prefix}hata-bildir** = Botla ilgili hataları bildirirsiniz.
**${prefix}kitap-ara** : Yazılan kitabın bilgisini gösterir.
**${prefix}oy-ver** = Oy Verme Linkine gidersiniz
**${prefix}sunucu** = Bulunduğun sunucu hakkında bilgi verir.
**${prefix}tdk** = Tdk'den kelime,sözcük ararsınız
**${prefix}öneri** = Bot için öneri bildirirsiniz`
      )

      .setColor("#0000c8")
      .addField(
        `» Bağlantılar`,
        `[📧 Sunucuna Ekle](https://discordapp.com/oauth2/authorize?client_id=730790799289090179&scope=bot&permissions=8) | [📬 Oy Ver](https://top.gg/bot/730790799289090179/vote) | [📞Destek Sunucusu](https://discord.gg/UftMaJaBfd)`,
        false
      )
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ana komutlar"],
  permLevel: 0
  //kategori:'seviye'
};

exports.help = {
  name: "ana-komutlar"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
