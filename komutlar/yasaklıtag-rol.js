const Discord = require("discord.js");
const data = require("quick.db");

exports.run = async (client, message, args) => {
  // if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()//.setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png').setImage('https://cdn.glitch.com/0c8ef551-5187-48a8-9daf-f2cc35630f21%2Fyoneticigif.gif').setTitle('Bir hata oldu!').setDescription(`• \`${client.ayarlar.prefix}yasaklı-tag-role\` **kullanmak için,** \`Yönetici\` **yetkisine sahip olman gerekiyor.**`));

  if (!message.mentions.roles.first())
    return message.channel.send(
      new Discord.RichEmbed()
        .setColor("#00011")
        .setDescription("Bir rol etiketlemeyi unuttunuz.")
    );
  let mentionRole = message.mentions.roles.first();
  data.set(`yasaklı.tag.role.${message.guild.id}`, mentionRole.id);
  message.channel.send(
    new Discord.RichEmbed().setDescription(
      `Yasaklı tag da kullanılacak: ${mentionRole} rolü olarak seçtiniz.`
    )
  );
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4,
  kategori: "koruma"
};

exports.help = {
  name: "yasaklı-tag-rol",
  description: "Yasaklı tag rolü ayarlarınız"
};
