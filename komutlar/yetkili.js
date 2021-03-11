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
        `**${prefix}yasakla** = Etiketlediğiniz kişiyi sunucudan yasaklar.
**${prefix}güvenlik-sorgu** = Etiketlediğniz kişinin güvenliğini sorgular.
**${prefix}kanalaç** = Etiketlediğiniz kişi ile özel kanal açarsınız
**${prefix}at ** = Etiketlediğiniz kişiyi sunucudan atar.
**${prefix}mod-log** = Günlük (log) kanallarının gönderileceği kanalı ayarlar.
**${prefix}reklam-taraması** = Kullanıcıların oynuyor mesajlarındaki ve kullanıcı adlarındaki reklamları tarar.
**${prefix}temizle-üye** = Etiketlenen kişinin yazdığınız miktarda mesajlarını siler.
**${prefix}temizle** = Yazdığınız miktarda mesaj siler.
**${prefix}unban** = Etiketlenen kişinin yasağını kaldırır.
**${prefix}uyar** = Etiketlenen kişiyi uyarır.
**${prefix}uyarı-kaldır** = Etiketlenen kişinin uyarılarını kaldırır.
**${prefix}uyarılar** = Etiketlenen kişinin uyarılarını gösterir.
**${prefix}yavaş-mod** = Kanalın yavaşmod süresini ayarlar.
**${prefix}ayarlar** = Sunucu ayarlarını gösterir.
**${prefix}dil-değiştir** = Botun dilini değiştirir.
**${prefix}emojiler** =Sunucuda bulunan emojileri gösterir.
**${prefix}oylama** = Girdiğiniz metinle oylama yapar.
**${prefix}renk-değiştir** = İsmini girdiğiniz rolün rengini değiştirir.
**${prefix}roller** = Sunucudaki rolleri gösterir.
**${prefix}sesli-çekiliş** = Sesli Çekiliş yapar.
**${prefix}çekiliş-yap** = Klasik Çekiliş yapar. 
**${prefix}seviye-bilgi** = Seviye bilgi komutları hakkında daha fazla bilgi verir
**${prefix}seviye** = Seviye kartınızı gösterir.
**${prefix}seviye-kanal** = Seviye kayıt kanalını ayarlar.
**${prefix}seviye-sistem** = Seviye sistemini açar.
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
  name: "yetkili"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
