const Discord = require("discord.js");
const moment = require("moment");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  //const duration = moment.duration(client.uptime).format(" D [Gün], H [Saat], m [Dakika], s [Saniye]");

  const shardi = client.shard.id + 1;

  const promises = [
    client.shard.fetchClientValues("guilds.size"),
    client.shard.broadcastEval(
      "this.guilds.reduce((acc, guild) => acc + guild.memberCount, 0)"
    )
  ];

  Promise.all(promises).then(results => {
    const server = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
    const member = results[1].reduce(
      (acc, memberCount) => acc + memberCount,
      0
    );

    const justice = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor("BLUE")
      .setTimestamp()
      .setTitle("» İSTATİSTİKLER «")
      .addField("**Kullanıcılar**", member, true)
      .addField("**Sunucular**", server, true)
      .addField("**Gecikme**", client.ping + " ms", true)
      .addField("Shard ID", shardi, true);
    message.channel.send(justice);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["istatistik", "STATISTICS", "statics", "iinfo"],
  permlevel: 0
};

exports.help = {
  name: "ping",
  description: "",
  usage: "information"
};
