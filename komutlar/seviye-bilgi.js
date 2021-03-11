const Discord = require("discord.js");

exports.run = (client, message, params) => {
  message.channel.send(
    new Discord.RichEmbed()

      .setTitle(
        "<:bilgi:733995740082208828>** BİLGİ **<:bilgi:733995740082208828>"
      )

      .setColor("RANDOM")
      .setDescription(
        "/seviye renk <renk-kodu> Seviye kartınızın rengini değiştirir\n/seviye saydamlık <sayı> Seviye kartınızın saydamlığını değiştirir\n/seviye resim <url> Seviye kartınızın arkaplan resmini değiştirisiniz."
      )
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "seviye"
};

exports.help = {
  name: "seviye-bilgi",
  description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  usage: "seviye-bilgi"
};
