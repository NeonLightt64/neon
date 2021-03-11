const Discord = require("discord.js");

exports.run = function(client, message, args) {
  let type = args.slice(0).join(" ");

  return message.channel.send(
    "Lütfen önerinizi yazın. Örnek kullanım: ``/öneri <öneriniz>``"
  );
  message
    .reply(
      "Öneri gönderilsin mi? Gönderilmesini istiyorsan `evet` yazman yeterlidir."
    )
    .then(() => {
      message.channel
        .awaitMessages(response => response.content === "evet", {
          max: 1,
          time: 10000,
          errors: ["time"]
        })
        .then(collected => {
          message.reply(
            "<a:maviyildiz:780445154422554644> Öneriniz İçin Teşekkürler. <a:maviyildiz:780445154422554644>"
          );
          const embed2 = new Discord.RichEmbed()
            .setColor("GREEN")
            .addField(`Kullanıcı ID`, message.author.id, true)
            .addField(`Kullanıcı Adı`, message.author.username, true)
            .addField(`Kullanıcı Tagı`, message.author.discriminator, true)
            .addField(`Sunucu`, message.guild.name, true)
            .addField("Öneri", type)
            .setTimestamp()
            .setFooter("Öneriyi gönderdiği saat ")
            .setThumbnail(message.author.avatarURL);

          client.channels.get("769542505834217522").send(embed2);
        });
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "genel",
  permLevel: 0
};

exports.help = {
  name: "öneri",
  description: "Bot için tavsiye bildirirsiniz",
  usage: "tavsiye <tavsiyeniz>"
};
