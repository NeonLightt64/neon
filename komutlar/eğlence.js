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
        `**${prefix}adamasmaca** =Adam asmaca oynarınız.
**${prefix}ascii** = Ascii şeklinde yazı yazmanızı sağlar.
**${prefix}ateş-et** = İstediğiniz kişinin kafasına sıkar.
**${prefix}balıktut** = Balık Tutarsın.
**${prefix}bayramlar** = Bayramlara kalan süreyi gösterir.
**${prefix}dans-yazı** = Yazdığınız yazıyı dans :tada: ascii şekline çevirir.
**${prefix}espri** = Rastgele Espri Yapar
**${prefix}kuş-dili** = Yazdığınız mesajı kuş diline çeviri
**${prefix}romen** = Yazdığınız sayının romen karşılığını yazar.
**${prefix}sayı-tahmin** = Botun aklında tuttuğu sayıyı bilmeye çalışırsınız.
**${prefix}yazan-kazanır** = Botun verdiği kelimeyi ilk yazan kazanır oyunu!
**${prefix}yoda** = Yazdığınız yazıyı yoda söylermiş gibi yazar.
**${prefix}yılbaşı** = Yılbaşının kutlanmasına kalan süreyi gösterir.
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
  name: "eğlence"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
