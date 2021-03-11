const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, params, args) => {
  //if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('<:ak:617145990742278144> Hoşgeldin kanalı silmek için `Yönetici` yetkisine sahip olman gerek.')

  db.delete(`gcc_${message.guild.id}`);

  message.channel.send(
    new Discord.RichEmbed()
      .setDescription(
        "<a:yesil_onay:727045346852601908> Bu Özellik Başarıyla Kapatıldı."
      )
      .setColor("GREEN")
  );
};

exports.conf = {
  kategori: "ayarlar",
  aliases: [
    "resim-kanal-sil",
    "gkanal-kapat",
    "gkanal-sil",
    "hg-bb-sil",
    "gkanal-kapat",
    "hg-bb kapat"
  ],
  permLevel: 4
};

exports.help = {
  name: "hg-bb-kapat",
  description: "Resimli hoşgeldeldin güle güle kanalı ayarlar.",
  usage: "gkanal"
};
