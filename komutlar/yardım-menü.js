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
        `• Bottaki Herhangi Bir Hatayı,öneriyi,şikayeti ${prefix}bildir ile geliştiriciye bildirebilirsiniz.\nEğer botla ilgili herhangi bir desteğe ihtiyaç duyuyorsanız, ${prefix}destek komutunu kullanarak size gerekli yardımı en kısa sürede yaparız.`
      )
      .addField("** **", "⚡️ Kategoriler")
      .addField(
        `:eyes: ${prefix}ana-komutlar`,
        `Botun Ana Komutlarını gösterir`,
        false
      )
      .addField(
        `:performing_arts: ${prefix}eğlence`,
        `Botun Eğlence Komutlarını gösterir`,
        false
      )
      .addField(
        `:briefcase:  ${prefix}yetkili`,
        `Botun Yetkili Komutlarını gösterir`,
        false
      )
      .addField(
        `:shield: ${prefix}koruma`,
        `Botun Koruma Komutlarını gösterir`,
        false
      )
      .addField(
        `:gear: ${prefix}ayarlamalı-komutlar`,
        `Botun Ayarlamalı Komutlarını gösterir`,
        false
      )
      .addField(
        `:bust_in_silhouette: ${prefix}kişisel`,
        `Botun Kişisel Komutlarını gösterir`,
        false
      )
      .addField(
        `:classical_building: ${prefix}ekonomi`,
        `Botun Ekonomi Komutlarını gösterir`,
        false
      )
      //     .addField(`:no_entry_sign: ${prefix}yasaklı-tag`, `Botun Yasaklı Tag Komutlarını gösterir`, false)
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
  aliases: [
    "help",
    "komutlar",
    "commands",
    "yardım menüsü",
    "yardım-menüsü",
    "komut-menüsü"
  ],
  permLevel: 0
  //kategori:'seviye'
};

exports.help = {
  name: "yardım"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
