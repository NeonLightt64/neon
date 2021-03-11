const db = require("quick.db");
const Discord = require("discord.js");
const moment = require("moment");
exports.run = async (client, message, args) => {
  let u = message.mentions.members.first();
  if (!args[0])
    return message.channel.send(
      new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle(
          "**<:brawl_pass:733999963671101510> NeonLight Premium <:brawl_pass:733999963671101510> **"
        )
        .setDescription(
          `
**NeonLight Premium Nedir?**\nNeonLight Premium, bot gelişimini desteklemek için alabileceğiniz bir aboneliktir. NeonLight kullanmak zorunlu değildir, ancak alırsanız özel özelliklerin kilidini açmanızı sağlar.\n**Premium Özellikleri Nelerdir?**\nÖzel Koruma Sistemleri\nPlan Süresi Boyunca Gold Üyelik\nÖzel Çekiliş Sistemleri\n**Paketler Neler?**\n 1 Aylık Plan 11.95 ₺\n6 Aylık Plan 81.70 ₺\n1 Yıllık Plan 163.40 ₺\nÖmür Boyu Plan 83.90 ₺\n**Premium Kodunuz Mu Var?**\n Kullanmak İçin /premium kullan <kod>
`
        )
        .setFooter("NeonLight")
    );

  if (args[0] == "mmake" || args[0] == "ggive") {
    if (message.author.id !== "727372765782343701")
      if (!u)
        //727372765782343701
        return message.channel.send(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription("Birini Etiketle")
        );
    function makeid(length) {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    let kod = makeid(25);
    console.log(kod + ` Kodunu ${u} İçin Oluşturdum!`);
    db.push(`pre.${u.id}`, { code: kod });
    console.log(db.fetch(`pre.${u.id}`).code);
    u.send(
      new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle(`Premium`)
        .setDescription(
          `Bu Kodu İstediğin Bir Sunucuda Kullanabilirsin!\nKodun: ${kod} \nKodu Kullanmak İçin: /premium kullan <kod>`
        )
    );
    message.channel.send(
      new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Kod Oluşturuldu.`)
    );
  }
  if (args[0] == "sil" || args[0] == "al") {
    if (message.author.id !== "727372765782343701")
      if (!args[1])
        return message.channel.send(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`Bir Sunucunun ID'sini Gir.`)
        );
    let id = args[1];
    if (isNaN(id))
      return message.channel.send(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(`Sadece Sayı Girebilirsin.`)
      );

    if (!client.guilds.get(id))
      return message.channel.send(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(`**${id}**li Sunucusunu Bulamıyorum.`)
      );
    let pr = await db.fetch(`premium.${id}`);
    if (!pr)
      return message.channel.send(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            `**${client.guilds.get(id).name}** Zaten Premium Aktif Değil.`
          )
      );

    db.delete(`premium.${id}`);
    message.channel.send(
      `${
        client.guilds.get(id).name
      } İsimli Sunucu İçin **PREMIUM** de-aktif Edildi!`
    );
  } else if (args[0] == "kontrol") {
    let cmd = db.fetch(`premium.${message.guild.id}`);
    if (!cmd)
      return message.channel.send(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .addField("Premium:", "Aktif Değil")
      );
    let as = "";
    cmd.map(async k => (as += `${k.date}`));
    if (cmd) {
      message.channel.send(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .addField("Premium:", "Aktif")
          .addField("Premium Başlangıç Tarihi:", as)
      );
    }
  } else if (args[0] == "kullan") {
    let cmd = db.fetch(`pre.${message.author.id}`);
    if (!cmd)
      return message.channel.send(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription("Hiç Premium Kodun Yok!")
      );
    let a = cmd.find(a => a.code === args[1]);
    let pre = db.fetch(`premium.${message.guild.id}`);
    if (!args[1])
      return message.channel.send(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            "Bir Premium Kodu Girmelisin! \nKodlarının Listesini Görmek için **/premium kodum** Yaz!"
          )
      );
    if (pre)
      return message.channel.send(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription("Sunucu Zaten **Premium**")
      );
    if (a) {
      if (cmd.length === 1) {
        db.delete(`pre.${message.author.id}`);
        message.channel.send(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`Başarıyla Kod Kullanıldı.`)
        );
        db.push(`premium.${message.guild.id}`, {
          date: moment().format("DD-MM-YYYY"),
          pre: true
        });
      } else {
        let ex = [];
        cmd.forEach(dbs => {
          if (dbs.code === args[1]) return;
          ex.push(dbs);
          db.set(`pre.${message.author.id}`, ex);
        });
        message.channel.send(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`Başarıyla Kod Kullanıldı.`)
        );
        db.push(`premium.${message.guild.id}`, {
          date: moment().format("DD-MM-YYYY"),
          pre: true
        });
      }
    } else {
      message.channel.send(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(`Premim`)
          .setDescription(`Kod Hatalı Veya Kullanılmış!`)
          .setFooter(`Hata!`)
      );
    }
  } else if (args[0] == "kodum") {
    const a = await db.fetch(`pre.${message.author.id}`);
    if (a) {
      let i = 0;
      let as = "";
      a.map(async k => {
        i++;
        as += `${i}) **${k.code}** \n`;
      });
      let msgs = "";
      if (a.length === 1) msgs = "Kodun:";
      else msgs = "Kodların:";
      message.member.send(
        new Discord.RichEmbed().setColor("RANDOM").addField(msgs, as)
      );
      let msg = "";
      if (a.length === 1) msg = "Kodunu DM'ne Gönderdim!";
      else msg = "Kodlarını DM'ne Gönderdim!";
      message.channel.send(
        new Discord.RichEmbed().setColor("RANDOM").setDescription(msg)
      );
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pre"],
  permLevel: 0,
  kategori: "sunucu"
};

exports.help = {
  name: "premium",
  description: "Premium sistemi hakkında bilgi verir",
  usage: "premium"
};
