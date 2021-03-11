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
        `**${prefix}koruma-rollimit kapat** = Rollimit sistemini kapatır.
**${prefix}koruma-rollimit** = Rol Koruma Limiti Ayarlar.
**${prefix}yasaklı-tag-rol-sil** = Yasaklı tag rolü siler.
**${prefix}yasaklı-tag** = Yasaklı tagı ayarlarsınız.
**${prefix}yasaklı-tag-kapat** = Yasaklı tagı sıfırlar.
**${prefix}yasaklı-tag-rol** = Yasaklı tag rolü ayarlarınız.
**${prefix}üye-koruma** = Sunucuya hesabı yeni oluşturulmuş kişiyi yasaklarb(Yapımda)
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
  name: "koruma"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
