const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  var s = "tr";
  var a = client.commands.get("ayarlar").help.name;
  if (db.has(`dil_${message.guild.id}`) === true) {
    var s = "en";
    var a = client.commands.get("ayarlar").help.enname;
  }
  const dil = client[s];
  const o = a;
  let y = "• ";
  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  var ac = "<a:yesil_onay:727045346852601908>";

  const sayfa = [
    `:gear: Sunucu Ayarları

${y}Sunucu prefixi ``${prefix}``
${y}**Mod \ Log ${dil.ayarlar.errors.channel}** ${
      db.has(`log_${message.guild.id}`)
        ? ac + message.guild.channels.get(db.fetch(`log_${message.guild.id}`))
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}modlog #kanal**`
    }
${y}**Resimli Giriş-Çıkış ${dil.ayarlar.errors.channel}** ${
      db.has(`gcc_${message.guild.id}`)
        ? ac + message.guild.channels.get(db.fetch(`gcc_${message.guild.id}`))
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}hg-bb #kanal**`
    }  
${y}**Güvenlik ${dil.ayarlar.errors.channel}** ${
      db.has(`guvenlik3_${message.guild.id}`)
        ? ac +
          message.guild.channels.get(db.fetch(`guvenlik3_${message.guild.id}`))
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}güvenlik #kanal**`
    } 
${y}**Link engeli ${dil.ayarlar.errors.system}** ${
      db.has(`linkE_${message.guild.id}`)
        ? `${ac} ${dil.ayarlar.errors.acik}`
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}reklam-engelle**`
    }
${y}**Küfür engeli ${dil.ayarlar.errors.system}** ${
      db.has(`küfürE_${message.guild.id}`)
        ? `${ac} ${dil.ayarlar.errors.acik}`
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}küfür-engelle**`
    }
${y}**Selam ${dil.ayarlar.errors.system}** ${
      db.has(`ss_${message.guild.id}`)
        ? `${ac} ${dil.ayarlar.errors.acik}`
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}sa-as**`
    }
${y}**Büyük Harf Engeli ${dil.ayarlar.errors.system}** ${
      db.has(`capsE_${message.guild.id}`)
        ? `${ac} ${dil.ayarlar.errors.acik}`
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}caps-lock**`
    }
${y}**Seviye ${dil.ayarlar.errors.system}** ${
      db.has(`lvll_${message.guild.id}`)
        ? `${ac} ${dil.ayarlar.errors.acik}`
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}seviye-sistem aç**`
    }
${y}**Otorol** ${
      db.has(`otoR_${message.guild.id}`)
        ? `${ac} \`@${
            message.guild.roles.get(db.fetch(`otoR_${message.guild.id}`)).name
          }\``
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}oto-rol**`
    }
${y}**Otorol Kayıt ${dil.ayarlar.errors.channel}** ${
      db.has(`otoRK_${message.guild.id}`)
        ? `${ac} \`${
            message.guild.channels.get(db.fetch(`otoRK_${message.guild.id}`))
              .name
          }\``
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}oto-rol-kanal**`
    }
${y}**Sayaç ${dil.ayarlar.errors.channel}** ${
      db.has(`sKanal_${message.guild.id}`)
        ? `${ac} ${
            message.guild.channels.get(db.fetch(`sKanal_${message.guild.id}`))
              .name
          }`
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}sayaç-kanal-ayarla** `
    }
${y}**Sayaç Sayısı ${dil.ayarlar.errors.system}** ${
      db.has(`sayac_${message.guild.id}`)
        ? `${ac} ${db.fetch(`sayac_${message.guild.id}`)}`
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}sayaç-ayarla**`
    }
${y}**Otomatik Tag ${dil.ayarlar.errors.system}** ${
      db.has(`tagB_${message.guild.id}`)
        ? ac + db.fetch(`tagB_${message.guild.id}`)
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}tag-ayarla**`
    }
${y}**Otomatik Tag ${dil.ayarlar.errors.channel}** ${
      db.has(`tagKanal_${message.guild.id}`)
        ? ac +
          message.guild.channels.get(db.fetch(`tagKanal_${message.guild.id}`))
            .name
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}tag-kanal-ayarla**`
    }
${y}**Giriş Çıkış ${dil.ayarlar.errors.channel}** ${
      db.has(`gc_${message.guild.id}`)
        ? `${ac} ${client.channels.get(db.fetch(`gc_${message.guild.id}`))}`
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}giriş-çıkış-ayarla** `
    }
${y}**Giriş mesajı** ${
      db.has(`girisM_${message.guild.id}`)
        ? db
            .fetch(`girisM_${message.guild.id}`)
            .replace("{kullanıcı}", "**{kullanıcı}**")
            .replace("{user}", "**{user}**")
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}giriş-mesaj-ayarla**`
    }
${y}**Çıkış mesajı** ${
      db.has(`cikisM_${message.guild.id}`)
        ? db
            .fetch(`cikisM_${message.guild.id}`)
            .replace("{kullanıcı}", "**{kullanıcı}**")
            .replace("{user}", "**{user}**")
        : `<a:neoncarpi:780444956849340416> ${dil.ayarlar.errors.notset} **${prefix}çıkış-mesaj-ayarla**`
    }  
`
  ];

  const ayarReis = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(sayfa)
    .setTimestamp();
  message.channel.send(ayarReis);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["settings"],
  permLevel: 4,
  kategori: "sunucu"
};

exports.help = {
  name: "ayarlar",
  description: "Sunucu ayarlarını gösterir.",
  usage: "ayarlar"
};
