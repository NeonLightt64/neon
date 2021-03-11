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
        `**${prefix}altın-al** = Paranızla altın alıp marketten eşya satın alabilirsiniz.
**${prefix}altın-gönder** = İstediğiniz kişiye altın yollayabilirsiniz.
**${prefix}elmas-al** = Altınınızla elmas alıp marketten eşya satın alabilirsiniz.
**${prefix}elmas-gönder** = İstediğiniz kişiye elmas yollayabilirsiniz.
**${prefix}paralarım** = Olan paranızı, altınlarınızı ve elmaslarınızı gösterir
**${prefix}gold-durum** = Gold Durumunuzu kontrol eder.
**${prefix}günlük-ödül** = Günlük maaşınızı verir.
**${prefix}kazı-kazan** = Kazı kazan oynarsınız ve rastgele para çıkarırsınız.
**${prefix}market** = Rozet satın alırsınız.
**${prefix}meslek** = Meslek sahibi olarak daha hızlı para kazanabilirsiniz.
**${prefix}para-gönder** = Etiketlediğiniz kişiye para gönderirsiniz.
**${prefix}rozetler** = Rozetlerinizi veya bir başkasının rozetlerini görürsünüz.
`
      )

      .setColor("#0000c8")
      .addField(
        `» Bağlantılar`,
        `[📧 Sunucuna Ekle](https://discordapp.com/oauth2/authorize?client_id=730790799289090179&scope=bot&permissions=8) | [📬 Oy Ver](https://top.gg/bot/730790799289090179/vote) | [📞 Destek Sunucusu](https://discord.gg/UftMaJaBfd)`,
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
  name: "ekonomi"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
