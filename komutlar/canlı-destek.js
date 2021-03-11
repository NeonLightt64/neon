const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  //    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`:x: Bu Komutu Kullanmak İçin **Yönetici** Olmalısın !`);

  var link = await client.channels.get(message.channel.id).createInvite();
  var sebep = args.slice(0).join(" ");
  if (!sebep) return message.channel.send(`:x: Lütfen Bir Sebep Belirtiniz`);

  const embed = new Discord.RichEmbed()
    .setDescription(
      `Destek talebiniz başarıyla iletildi eğer destek ekibi sunucunuza gelmezse destek sunucuma gelerek yardım alabilirsiniz.`
    )
    .setTimestamp()
    .setFooter(`Destek Talebi`)
    .setColor("RANDOM");
  message.channel.send(embed);
  message.delete();

  client.users.get("727372765782343701").send(
    new Discord.RichEmbed()
      .setDescription(
        `\nKullanıcı Adı: **${message.author.tag}** \nSunucu Adı: **${message.guild.name}** Davet Linki: [Tıkla](${link}) \nDestek Sebebi: **${sebep}**`
      )
      .setTimestamp()
      .setTitle(`Destek Sebebi`)
      // .setFooter(`Destek Talebi`)
      .setColor(`RANDOM`)
      .setThumbnail(`${message.author.avatarURL}`)
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sahip-destek", "destek"],
  permLevel: 4,
  kategori: "genel"
};

exports.help = {
  name: "canlı-destek",
  description: "Canlı destek çağrırsınız",
  usage: "sahip-destek (sebep)"
};
