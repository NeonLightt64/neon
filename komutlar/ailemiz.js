const Discord = require("discord.js");
exports.run = (bot, message) => {
  const guildArray = bot.guilds.array();
  while (guildArray.length) {
    const guilds = guildArray.splice(0, 25);
    for (const guild of guilds) {
      const embed = new Discord.RichEmbed();
      embed.addField(
        `**${guild.name}** - ÜYE SAYISI : **${guild.memberCount}**`,
        guild.id
      );
      embed.setColor("#D97634");
      embed.setTitle("Ailemiz");
      embed.setDescription(
        `Büyük bir ailedeyiz !. Ailemde **${bot.guilds.size}** kadar sunucu var !`
      );
      message.channel.send(embed);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  //   kategori: 'yapımcı',
  permLevel: 5
};

exports.help = {
  name: "ailemiz"
  /* description: "Shows all the servers the bot is in.",
  usage: "ailemiz"*/
};
