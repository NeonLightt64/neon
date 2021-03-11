const ms = require("parse-ms");
const Discord = require("discord.js");
const client = new Discord.Client();
const bot = new Discord.Client();
const { RichEmbed } = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const chalk = require("chalk");
const fs = require("fs");
const { stripIndents } = require("common-tags");
require("moment-duration-format");
const moment = require("moment");
const db = require("quick.db");
const jimp = require("jimp");
const config = require("./ayarlar.json");
const ayarlar = require("./ayarlar.json");
var prefix = ayarlar.prefix;

require("./util/eventLoader")(client);

client.config = require("./ayarlar.json");

client.ayarlar = {
  official_sahip: "727372765782343701",
  sahip: "DİĞER_SAHİP",
  isim: "NeonLight",
  prefix: config.prefix,
  dbltoken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczMDc5MDc5OTI4OTA5MDE3OSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA3NzkyNDQwfQ.bmHfDnXeQkAFh8bWgbzJKNgon381xgGIx_Qt41KaNpg",
  version: "1.0.0",

};

client.setMaxListeners(30);

client.ayar = db;

const botadi = "NeonLight";

client.on("ready", async () => {
  console.log(
    `${chalk.green(client.user.username)}${chalk.red(",")} ${chalk.blue(
      client.guilds.size
    )} ${chalk.yellow("Sunucu'ya")} ${chalk.red("ve")} ${chalk.blue(
      client.users.size.toLocaleString()
    )} ${chalk.yellow("Kullanıcı'ya")} ${chalk.red("hizmet veriyor!")}`
  );
  /*client.user.setActivity(`⛔`, {
    type: "STREAMING",
    url: "https://www.twitch.tv/nl-neonlight",
    time: 31556926
  });*/

});

client.a = {
  sa: `${bot.version}`
};

client.en = require("./en.js");

client.tr = require("./tr.js");

//var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${chalk.yellow(`+`)} ${message}`);
};

const DBL = require("top.gg");
const dbl = new DBL(client.ayarlar.dbltoken, client);

// Optional events
dbl.on("posted", () => {
  console.log("Dbl: Gönderildi");
});

dbl.on("error", e => {
  console.log(`Dbl: Hata ${e}`);
});

///////// önemli

/*client.on("message", async message => {
  if (message.channel.id === "795713181858267156") {
    // komutların gönderilmesini istediğiniz kanal
    if (message.author.id !== "727372765782343701")
      if (message.author.bot)
        // komutları çalıştıracak kişinin idsi
        return;

    const { exec } = require("child_process");

    exec(message.content, (error, data, getter) => {
      if (error) return message.channel.send(`Hata: ${error.message}`);
      if (getter) return message.channel.send(data);
      message.channel.send(data);
    });
  }
});*/

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`kanal_${member.guild.id}`);
  let rol = await db.fetch(`rol_${member.guild.id}`);
  let security = await db.fetch(`koruma_${member.guild.id}`);
  let user = client.users.get(member.id);

  if (security == "kapali") return;
  if (security == "acik") {
    const zaman = new Date().getTime() - user.createdAt.getTime();

    if (zaman < 259200000) {
      client.channels
        .get(kanal)
        .send(
          `${member} isimli kullanıcı yeni hesap şüphesi ile karantinaya alındı!`
        );
      member
        .send("Hesabın yeni açıldığı için seni karantinaya aldım!")
        .catch(() => console.log(`DM Kapalı.`));
      member.addRole(rol);
    }
  }
});

client.on("message", async message => {
  /* var onay = client.emojis.get(client.emojiler.evet);
  var red = client.emojis.get(client.emojiler.hayır);*/
  const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
  if (message.channel.type === "dm") return;

  if (message.author.bot) return;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  let i =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  let prefix;
  if (i) {
    prefix = message.content.match(prefixMention)
      ? message.content.match(prefixMention)[0] + " "
      : i;
  } else {
    prefix = message.content.match(prefixMention)
      ? message.content.match(prefixMention)[0] + " "
      : `${message.guild.commandPrefix}`;
  }

  if (message.author.bot) return;
  if (message.author.id === client.user.id) return;
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.substring(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "rozet-parar") {
    if (message.author.id !== "727372765782343701")
      return message.channek.send(``);
    const i = await db.set(
      `memberBadge6_${user.id}`,
      "https://cdn.discordapp.com/attachments/531535859594297364/533260601162465280/paraR.png"
    );
    return message.channel.send(` Kullanıcıya yıldırım rozeti verilmiştir.`);
  }

  if (command === "rozet-onayla") {
    if (message.author.id !== "727372765782343701")
      return message.channek.send(``);
    const i = await db.set(
      `memberBadge_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845736347435015/401725450470031362.png"
    );
    return message.channel.send(` Kullanıcıya onay rozeti verilmiştir.`);
  }

  if (command === "rozet-konay" || command === "rozet-konayla") {
    if (message.author.id !== "727372765782343701")
      return message.channel.send(``);
    const i = await db.set(
      `memberBadge_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(`Kullanıcıdan onay rozeti alınmıştır.`);
  }

  if (command === "rozet-yetkili" || command === "rozet-ekip") {
    if (message.author.id !== "727372765782343701")
      return message.channel.send(``);
    const i = await db.set(
      `memberBadge2_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845736347435009/401723658491527168.png"
    );
    return message.channel.send(
      `Kullanıcıya başarıyla yetkili rozeti verilmiştir.`
    );
  }

  if (command === "rozet-kyetkili" || command === "rozet-kekip") {
    if (message.author.id !== "727372765782343701")
      return message.channel.send(``);
    const i = await db.set(
      `memberBadge2_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(`Kullanıcıdan ekip rozeti alınmıştır.`);
  }

  if (command === "rozet-destekci" || command === "rozet-destekçi") {
    if (message.author.id !== "727372765782343701")
      return message.channel.send(``);
    const i = await db.set(
      `memberBadge3_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845737006202881/401725034453925889.png"
    );
    return message.channel.send(`Kullanıcıya destekçi rozeti verilmiştir.`);
  }

  if (command === "rozet-kdestekci" || command === "rozet-kdestekçi") {
    if (message.author.id !== "727372765782343701")
      return message.channel.send(``);
    const i = await db.set(
      `memberBadge3_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(`Kullanıcıdan destekçi rozeti alınmıştır.`);
  }

  if (command === "rozet-mod" || command === "rozet-moderator") {
    if (message.author.id !== "727372765782343701")
      return message.channel.send(``);
    const i = await db.set(
      `memberBadge4_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845735647117312/401724520806875139.png"
    );
    return message.channel.send(`Kullanıcıya moderator rozeti verilmiştir.`);
  }

  if (command === "rozet-kmod" || command === "rozet-kmoderator") {
    if (message.author.id !== "727372765782343701")
      return message.channel.send(``);
    const i = await db.set(
      `memberBadge4_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(`Kullanıcıdan moderator rozeti alınmıştır.`);
  }
});

const data = require("quick.db");

client.on("guildMemberAdd", async member => {
  let user = member.user;
  let guild = member.guild;

  const systemTagData = await data.fetch(`yasaklı.tag.${guild.id}`);
  const systemRoleData = await data.fetch(`yasaklı.tag.role.${guild.id}`);
  if (!systemRoleData || !systemTagData) return;

  const systemTag = String(systemTagData);
  const systemRole = guild.roles.get(systemRoleData);

  let userUsername = user.username;
  if (!userUsername.includes(systemTag)) return;
  member.roles.forEach(role => member.roles.remove(role.id));
  await member.roles.add(systemRole.id);
  member.send(
    new Discord.RichEmbed()
      .setTitle("Yasaklı TAG Kullanıyorsun!")
      .setColor("RED")
      .setDescription(`> \`${guild.name}\` *Sunucusu için yasaklı tagdasınız.*`)
      .addField(
        "• Bilgilendirme",
        "**Sunucu içerisindeki yetkililere ulaşarak yasaklı tagdan çıkmanızı sağlayabilirsiniz!"
      )
  );
});

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`ss_${msg.guild.id}`);
  if (db.has(`ss_${msg.guild.id}`) === true) {
    if (db.has(`üyelikk_${msg.author.id}`)) {
      if (msg.content.toLowerCase() === "sa") {
        msg.channel.send(
          `<a:sekilligalp:727045194033266730> Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:sekilligalp:727045194033266730>`
        );
        // db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selam") {
        msg.channel.send(
          `<a:sekilligalp:727045194033266730>Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:sekilligalp:727045194033266730>`
        );
        //   db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "s.a") {
        msg.channel.send(
          `<a:sekilligalp:727045194033266730> Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:sekilligalp:727045194033266730>`
        );
        // db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selamun aleyküm") {
        msg.channel.send(
          `<a:sekilligalp:727045194033266730> Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:sekilligalp:727045194033266730>`
        );
        //   db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selamün aleyküm") {
        msg.channel.send(
          `<a:sekilligalp:727045194033266730> Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:sekilligalp:727045194033266730>`
        );
        //   db.add(`slmal_${msg.author.id}`, 1);
      }
    } else if (msg.content.toLowerCase() === "sa") {
      msg.channel.send(`Aleyküm Selam Hoşgeldin ${msg.author}`);
      //  db.add(`slmal_${msg.author.id}`, 1);
    } else if (msg.content.toLowerCase() === "selam") {
      msg.channel.send(`Aleyküm Selam Hoşgeldin ${msg.author}`);
      // db.add(`slmal_${msg.author.id}`, 1);
    }
  }
});

client.on("message", async msg => {
  const request = require("node-superfetch");
  const db = require("quick.db");

  if (db.has(`lvll_${msg.guild.id}`) === true) {
    let memberChannel = await db.fetch(`sk_${msg.guild.id}`);

    if (msg.channel.type === "dm") return;
    if (msg.author.bot) return;

    if (msg.content.length > 40) {
      db.add(`puancik_${msg.author.id + msg.guild.id}`, 4);
    }
    if (msg.content.length > 35) {
      db.add(`puancik_${msg.author.id + msg.guild.id}`, 4);
    }
    if (msg.content.length > 30) {
      db.add(`puancik_${msg.author.id + msg.guild.id}`, 3);
    }
    if (msg.content.length > 25) {
      db.add(`puancik_${msg.author.id + msg.guild.id}`, 3);
    }
    if (msg.content.length > 20) {
      db.add(`puancik_${msg.author.id + msg.guild.id}`, 2);
    }
    if (msg.content.length > 15) {
      db.add(`puancik_${msg.author.id + msg.guild.id}`, 2);
    }
    if (msg.content.length > 10) {
      db.add(`puancik_${msg.author.id + msg.guild.id}`, 1);
    }
    if (msg.content.length < 5) {
      db.add(`puancik_${msg.author.id + msg.guild.id}`, 1);
    }

    if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > 250) {
      db.add(`seviye_${msg.author.id + msg.guild.id}`, 1);
      if (memberChannel) {
        if (db.has(`üyelikk_${msg.author.id}`)) {
          msg.guild.channels
            .get(memberChannel)
            .send(
              `<a:maviyildiz:780445154422554644> Kral <@${
                msg.author.id
              }>, Seviye atladın ve \`${db.fetch(
                `seviye_${msg.author.id + msg.guild.id}`
              )}\` seviye ulaştın <a:maviyildiz:780445154422554644>`
            );
        } else
          msg.guild.channels
            .get(memberChannel)
            .send(
              `Tebrik ederim <@${
                msg.author.id
              }>! Seviye atladın ve \`${db.fetch(
                `seviye_${msg.author.id + msg.guild.id}`
              )}\` seviyeye ulaştın !`
            );
      } else if (db.has(`üyelikk_${msg.author.id}`)) {
        msg.channel.send(
          `<a:maviyildiz:780445154422554644> Kral <@${
            msg.author.id
          }>, Seviye atladın ve \`${db.fetch(
            `seviye_${msg.author.id + msg.guild.id}`
          )}\` seviyeye ulaştın <a:maviyildiz:780445154422554644>`
        );
      } else
        msg.channel.send(
          `Tebrikler <@${msg.author.id}>! Seviye atladın ve \`${db.fetch(
            `seviye_${msg.author.id + msg.guild.id}`
          )}\` seviyeye ulaştın!`
        );

      db.delete(`puancik_${msg.author.id + msg.guild.id}`);
    }
  } else return;
});

client.on("message", async msg => {
  //const args = msg.content.slice.split(' ');
  const args = msg.content.trim().split(/ +/g);
  const fAK = await db.fetch(`filtreAK_${msg.guild.id}`);
  let mesaj = args.slice(1).join(" ");
  const filtre = await db.fetch(`filtre_${msg.guild.id}`);
  const kufur = [
    "mk",
    "göt",
    "amk",
    "amq",
    "aq",
    "orospu",
    "oruspu",
    "oç",
    "sikerim",
    "yarrak",
    "piç",
    "amq",
    "sik",
    "amcık",
    "çocu",
    "sex",
    "seks",
    "amına",
    "orospu çocuğu",
    "sg",
    "siktir git",
    "piç"
  ];

  const reklam = [
    ".ml",
    "discord.gg",
    "invite",
    "discordapp",
    "discordgg",
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".party",
    ".rf.gd",
    ".az",
    "glitch.me",
    "glitch.com"
  ];

  let kufures = await db.fetch(`kuyarr_${msg.author.id}`);
  let linkes = await db.fetch(`luyarr_${msg.author.id}`);
  let ads = msg.author.id;
  if (fAK == "açık") {
    const fltr = filtre;
    if (fltr.some(word => msg.content.includes(word))) {
      if (!msg.member.hasPermission("BAN_MEMBERS")) {
        msg.delete();

        var k = new Discord.RichEmbed()
          .setColor("#01CFFE")
          .setAuthor("Filtre Sistemi")
          .setDescription(`Bu kelime bu sunucuda yasaklandı!`);
        msg.channel.send(k).then(message => message.delete(5000));

        return;
      }
    }
  }
  if (!msg.guild) return;

  if (msg.author.bot) return;

  if (db.has(`capsE_${msg.guild.id}`) === true) {
    let x = /\w*[A-Z]\w*[A-Z]\w*/g;
    if (msg.content.match(x)) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        let y = await msg.channel.send(
          `Hey <@${msg.author.id}>, Büyük Harfle Mesaj Yazamazsn!`
        );
        y.delete(5000);
        return;
      }
    }
  }

  if (!msg.guild) return;

  if (db.has(`küfürE_${msg.guild.id}`) === true) {
    if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        var k = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("Küfür Engeli!")
          .setDescription(
            `Hey <@${msg.author.id}>, Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir!`
          );
        db.add(`kuyarr_${msg.author.id}`, 1);
        msg.channel.send(k).then(message => message.delete(5000));
      }
    }
  }

  if (db.has(`linkE_${msg.guild.id}`) === true) {
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        var ke = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("Reklam Engeli!")
          .setDescription(
            `Hey <@${msg.author.id}>, Bu sunucuda linkler **${client.user.username}** tarafından engellenmektedir!`
          );

        db.add(`luyarr_${msg.author.id}`, 1);
        msg.channel.send(ke).then(message => message.delete(5000));
      }
    }
  }
});

client.on("messageUpdate", async msg => {
  //const args = msg.content.slice.split(' ');
  const args = msg.content.trim().split(/ +/g);
  const fAK = await db.fetch(`filtreAK_${msg.guild.id}`);
  let mesaj = args.slice(1).join(" ");
  const filtre = await db.fetch(`filtre_${msg.guild.id}`);

  const kufur = [
    "mk",
    "göt",
    "amk",
    "amq",
    "aq",
    "orospu",
    "oruspu",
    "oç",
    "sikerim",
    "yarrak",
    "piç",
    "amq",
    "sik",
    "amcık",
    "çocu",
    "sex",
    "seks",
    "amına",
    "orospu çocuğu",
    "sg",
    "siktir git"
  ];

  const reklam = [
    ".ml",
    "discord.gg",
    "invite",
    "discordapp",
    "discordgg",
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".party",
    ".rf.gd",
    ".az",
    "glitch.me",
    "glitch.com"
  ];

  if (!msg.guild) return;

  if (msg.author.bot) return;

  if (db.has(`capsE_${msg.guild.id}`) === true) {
    let x = /\w*[A-Z]\w*[A-Z]\w*/g;
    if (msg.content.match(x)) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        let y = await msg.reply(
          `Hey <@${msg.author.id}>, Capslock açıkkan mesaj gönderemezsin!`
        );
        y.delete(5000);
        return;
      }
    }

    if (!msg.guild) return;

    if (db.has(`küfürE_${msg.guild.id}`) === true) {
      if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          msg.delete();
          msg.channel
            .send(`<@${msg.author.id}>`)
            .then(message => message.delete(5000));
          var k = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor("Küfür Engeli!")
            .setDescription(
              `Hey <@${msg.author.id}>, Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir!`
            );
          db.add(`kuyarr_${msg.author.id}`, 1);
          msg.channel.send(k).then(message => message.delete(5000));
        }
      }
    }
  }

  if (db.has(`linkE_${msg.guild.id}`) === true) {
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        var ke = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("Reklam Engeli!")
          .setDescription(
            `Hey <@${msg.author.id}>, Bu sunucuda linkler **${client.user.username}** tarafından engellenmektedir!`
          );
        msg.channel.send(ke).then(message => message.delete(5000));
      }
    }
  }
});

client.on("guildMemberAdd", async member => {
  if (db.has(`otoR_${member.guild.id}`) === true) {
    var rol = member.guild.roles.get(db.fetch(`otoR_${member.guild.id}`));
    var rolD = `${
      member.guild.roles.get(db.fetch(`otoR_${member.guild.id}`))
        ? "var"
        : "yok"
    }`;

    var kanalD = `${
      member.guild.channels.get(db.fetch(`otoRK_${member.guild.id}`))
        ? "var"
        : "yok"
    }`;

    if (rolD === "var") {
      member.addRole(rol);

      if (db.has(`otoRK_${member.guild.id}`) === true) {
        if (kanalD === "var") {
          if (db.has(`üyelikk_${member.id}`)) {
            const embed = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setDescription(
                `<a:sekilligalp:727045194033266730> Gold üye katıldı. \`${member.user.tag}\`, Hoşgeldin \`${rol.name}\` Adlı rolün verildi <a:sekilligalp:727045194033266730>`
              );

            member.guild.channels
              .get(db.fetch(`otoRK_${member.guild.id}`))
              .send(embed);
          } else
            member.guild.channels
              .get(db.fetch(`otoRK_${member.guild.id}`))
              .send(
                `**${member.user.tag}** adlı kullanıcıya başarıyla oto rolü \`${rol.name}\` adlı rol verildi.`
              );
        }
      }
    }
  }
});
client.on("message", async message => {
  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.size) {
      const embed = new Discord.RichEmbed()
        .setTitle(`Tebrikler ${message.guild.name}!`)
        .setDescription(
          `Başarıyla \`${db.fetch(
            `sayac_${message.guild.id}`
          )}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`
        )
        .setColor("RANDOM");
      message.channel.send({ embed });
      message.guild.owner.send({ embed });
      db.delete(`sayac_${message.guild.id}`);
    }
  }
});

client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) === false) return;
  if (db.has(`sKanal_${member.guild.id}`) === false) return;

  if (db.has(`üyelikk_${member.id}`)) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")

      .setDescription(
        `<a:sekilligalp:727045194033266730> Gold üye kayboldu. \`${
          member.user.tag
        }\` \`${db.fetch(
          `sayac_${member.guild.id}`
        )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
          member.guild.members.size}\` Kişi Kaldı `
      );

    if (!member.guild.channels.get(channel)) return;

    member.guild.channels.get(channel).send(embed);
  } else
    member.guild.channels
      .get(channel)
      .send(
        `**${member.user.tag}** Sunucudan ayrıldı! \`${db.fetch(
          `sayac_${member.guild.id}`
        )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
          member.guild.members.size}\` üye kaldı!`
      );
});

client.on("guildMemberAdd", async member => {
  if (!member.guild) return;

  let prefix =
    (await db.fetch(`prefix_${member.guild.id}`)) || client.ayarlar.prefix;

  if (db.has(`gc_${member.guild.id}`) === false) return;

  const hgK = await db.fetch(`gc_${member.guild.id}`);
  if (!hgK) return;

  const giris = db.fetch(`girisM_${member.guild.id}`);
  if (!member.guild.channels.get(hgK)) return;
  if (db.has(`üyelikk_${member.id}`)) {
    member.guild.channels.get(hgK).send(
      db.has(`girisM_${member.guild.id}`)
        ? giris
            .replace("{kullanıcı}", `<@${member.user.id}>`)
            .replace("{user}", `<@${member.user.id}>`)
            .replace("{sunucu}", `**${member.guild.name}**`)
            .replace("{kişisayısı}", `**${member.guild.members.size}**`)
        : `<a:sekilligalp:727045194033266730> <@${member.user.id}> Adlı Gold Üye Katıldı!`
    );
  } else
    member.guild.channels.get(hgK).send(
      db.has(`girisM_${member.guild.id}`)
        ? giris
            .replace("{kullanıcı}", `<@${member.user.id}>`)
            .replace("{user}", `<@${member.user.id}>`)
            .replace("{sunucu}", `**${member.guild.name}**`)
            .replace("{kişisayısı}", `**${member.guild.members.size}**`)
        : `<@${member.user.id}> Sunucuya Katıldı! )`
    );
});

client.on("guildMemberRemove", async member => {
  if (!member.guild) return;

  let prefix =
    (await db.fetch(`prefix_${member.guild.id}`)) || client.ayarlar.prefix;

  if (db.has(`gc_${member.guild.id}`) === false) return;

  const hgK = await db.fetch(`gc_${member.guild.id}`);
  if (!hgK) return;

  const cikis = db.fetch(`cikisM_${member.guild.id}`);
  if (!member.guild.channels.get(hgK)) return;
  if (db.has(`üyelikk_${member.id}`)) {
    member.guild.channels.get(hgK).send(
      db.has(`cikisM_${member.guild.id}`)
        ? cikis
            .replace("{kullanıcı}", `**${member.user.username}**`)
            .replace("{user}", `**${member.user.username}**`)
            .replace("{sunucu}", `**${member.guild.name}**`)
            .replace("{kişisayısı}", `**${member.guild.members.size}**`)
        : `<a:sekilligalp:727045194033266730> **${member.user.username}** Adlı Gold Üye Ayrıldı`
    );
  } else
    member.guild.channels.get(hgK).send(
      db.has(`cikisM_${member.guild.id}`)
        ? cikis
            .replace("{kullanıcı}", `**${member.user.username}**`)
            .replace("{user}", `**${member.user.username}**`)
            .replace("{sunucu}", `**${member.guild.name}**`)
            .replace("{kişisayısı}", `**${member.guild.members.size}**`)
        : `**${member.user.username}** Ayrıldı!`
    );
});

client.on("message", async msg => {
  if (!msg.guild) return;

  let prefix =
    (await db.fetch(`prefix_${msg.guild.id}`)) || client.ayarlar.prefix;

  if (!msg.guild.channels.get(db.fetch(`destekK_${msg.guild.id}`))) return;
  var s = "tr";
  var r = "Destek Ekibi";
  var k = "destek-kanalı";
  if (db.has(`dil_${msg.guild.id}`) === true) {
    var s = "en";
    var r = "Support Team";
    var k = "support-channel";
  }
  const dil = s;

  let rol = "";
  let kanal = "";

  if (db.has(`destekK_${msg.guild.id}`) === true) {
    kanal = msg.guild.channels.get(db.fetch(`destekK_${msg.guild.id}`)).name;
  }

  if (db.has(`destekK_${msg.guild.id}`) === false) {
    kanal = k;
  }

  if (db.has(`destekR_${msg.guild.id}`) === true) {
    rol = msg.guild.roles.get(db.fetch(`destekR_${msg.guild.id}`));
  }

  if (db.has(`destekR_${msg.guild.id}`) === false) {
    rol = r;
  }

  const reason = msg.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (msg.channel.name == kanal) {
    if (msg.author.bot) return;
    /*if (!msg.guild.roles.exists("name", rol)) return msg.reply(client[dil].desteksistem.rolyok.replace("{rol}", r)).then(m2 => {
            m2.delete(5000)});*/
    if (
      msg.guild.channels.find(
        c =>
          c.name ===
          `${client[dil].desteksistem.talep}-${msg.author.discriminator}`
      )
    ) {
      msg.author.send(
        client[dil].desteksistem.aciktalepozel
          .replace("{kisi}", msg.author.tag)
          .replace(
            "{kanal}",
            `${msg.guild.channels.get(
              msg.guild.channels.find(
                c =>
                  c.name ===
                  `${client[dil].desteksistem.talep}-${msg.author.discriminator}`
              ).id
            )}`
          )
      );
      msg.guild.channels
        .find(
          c =>
            c.name ===
            `${client[dil].desteksistem.talep}-${msg.author.discriminator}`
        )
        .send(
          client[dil].desteksistem.aciktalep
            .replace("{kisi}", msg.author.tag)
            .replace("{sebep}", msg.content)
        );

      msg.delete();
      return;
    }
    if (
      msg.guild.channels.find(c => c.name === client[dil].desteksistem.kategori)
    ) {
      msg.guild
        .createChannel(
          `${client[dil].desteksistem.talep}-${msg.author.discriminator}`,
          "text"
        )
        .then(c => {
          const category = msg.guild.channels.find(
            c => c.name === client[dil].desteksistem.kategori
          );
          c.setParent(category.id);
          let role = msg.guild.roles.find(r => r.name === rol.name);
          let role2 = msg.guild.roles.find(r => r.name === "@everyone");
          c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
          });
          c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
          });
          c.overwritePermissions(msg.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
          });

          const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor(
              `${client.user.username} | Destek Sistemi`,
              client.user.avatarURL
            )
            .setTitle(`_Merhaba ${msg.author.username}!_`)
            .addField(
              `» Destek Talebi Hakkında Bilgilendirme «`,
              `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}talep-kapat\` yazabilirsiniz`
            )
            .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
            .addField(
              `» Destek Talebini Açan Kullanıcı «`,
              `<@${msg.author.id}>`,
              true
            )
            .setFooter(
              `${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`,
              msg.guild.iconURL
            );
          c.send({ embed: embed });
          c.send(
            `**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`
          );
          msg.delete();
        })
        .catch(console.error);
    }
  }

  if (msg.channel.name == kanal) {
    if (
      !msg.guild.channels.find(
        c => c.name === client[dil].desteksistem.kategori
      )
    ) {
      msg.guild
        .createChannel(client[dil].desteksistem.kategori, "category")
        .then(category => {
          category.setPosition(1);
          let every = msg.guild.roles.find(c => c.name === "@everyone");
          category.overwritePermissions(every, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false,
            READ_MESSAGE_HISTORY: false
          });
          msg.guild
            .createChannel(
              `${client[dil].desteksistem.talep}-${msg.author.discriminator}`,
              "text"
            )
            .then(c => {
              c.setParent(category.id);
              let role = msg.guild.roles.find(c => c.name === rol.name);
              let role2 = msg.guild.roles.find(c => c.name === "@everyone");
              c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
              });
              c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
              });
              c.overwritePermissions(msg.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
              });

              const embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setAuthor(
                  `${client.user.username} | Destek Sistemi`,
                  client.user.avatarURL
                )
                .setTitle(`_Merhaba ${msg.author.username}!_`)
                .addField(
                  `» Destek Talebi Hakkında Bilgilendirme «`,
                  `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}talep-kapat\` yazabilirsiniz`
                )
                .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
                .addField(
                  `» Destek Talebini Açan Kullanıcı «`,
                  `<@${msg.author.id}>`,
                  true
                )
                .setFooter(
                  `${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`,
                  msg.guild.iconURL
                );
              c.send({ embed: embed });
              c.send(
                `**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`
              );
              msg.delete();
            })
            .catch(console.error);
        });
    }
  }
});

client.on("message", async message => {
  if (!message.guild.channels.get(db.fetch(`destekK_${message.guild.id}`)))
    return;

  if (!message.guild) return;

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  var s = "tr";
  var r = "Destek Ekibi";
  if (db.has(`dil_${message.guild.id}`) === true) {
    var s = "en";
    var r = "Support Team";
  }
  const dil = s;

  if (message.content.toLowerCase().startsWith(prefix + `talep-kapat`)) {
    if (!message.channel.name.startsWith(`${client[dil].desteksistem.talep}-`))
      return message.channel.send(
        `Bu komut sadece Destek Talebi kanallarında kullanılabilir.`
      );

    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`Destek Talebi Kapatma İşlemi!`)
      .setDescription(
        `Destek talebini kapatma işlemini onaylamak için, \n10 saniye içinde \`evet\` yazınız.`
      )
      .setFooter(
        `${client.user.username} | Destek Sistemi`,
        client.user.avatarURL
      );
    message.channel.send({ embed }).then(m => {
      message.channel
        .awaitMessages(response => response.content === "evet", {
          max: 1,
          time: 10000,
          errors: ["time"]
        })
        .then(collected => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit("Destek talebi kapatma isteği zaman aşımına uğradı.").then(
            m2 => {
              m2.delete();
            },
            3000
          );
        });
    });
  }
});

client.on("guildMemberAdd", member => {
  var user = member.user;
  var tarih = "";
  if (moment(user.createdAt).format("MM") === "01") {
    var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "02") {
    var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "03") {
    var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "04") {
    var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "05") {
    var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "06") {
    var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "07") {
    var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "08") {
    var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "09") {
    var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "10") {
    var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "11") {
    var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "12") {
    var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }

  var tarih2 = "";
  if (moment(user.joinedAt).format("MM") === "01") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ocak ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "02") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Şubat ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "03") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mart ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "04") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Nisan ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "05") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mayıs ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "06") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Haziran ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "07") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Temmuz ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "08") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ağustos ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "09") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Eylül ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "10") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ekim ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "11") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Kasım ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "12") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Aralık ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }

  //var kanal = member.guild.channels.get(logA[member.guild.id].log);

  if (db.has(`log_${member.guild.id}`) === false) return;

  var kanal = member.guild.channels.get(db.fetch(`log_${member.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Sunucuya Bir Kullanıcı Katıldı!`, member.user.avatarURL)
    .addField("Kullanıcı Tag", member.user.tag, true)
    .addField("ID Numarası", member.user.id, true)
    .addField("Discord Kayıt Tarihi", tarih, true)
    .addField("Sunucuya Katıldığı Tarih", tarih2, true)
    .setThumbnail(member.user.avatarURL);
  kanal.send(embed);
});

client.on("guildMemberRemove", member => {
  var user = member.user;
  var tarih = "";
  if (moment(user.createdAt).format("MM") === "01") {
    var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "02") {
    var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "03") {
    var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "04") {
    var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "05") {
    var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "06") {
    var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "07") {
    var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "08") {
    var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "09") {
    var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "10") {
    var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "11") {
    var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "12") {
    var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }

  var tarih2 = "";
  if (moment(user.joinedAt).format("MM") === "01") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ocak ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "02") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Şubat ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "03") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mart ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "04") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Nisan ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "05") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mayıs ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "06") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Haziran ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "07") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Temmuz ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "08") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ağustos ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "09") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Eylül ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "10") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ekim ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "11") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Kasım ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "12") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Aralık ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }

  //var kanal = member.guild.channels.get(logA[member.guild.id].log);

  if (db.has(`log_${member.guild.id}`) === false) return;

  var kanal = member.guild.channels.get(db.fetch(`log_${member.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Sunucudan Bir Kullanıcı Ayrıldı!`, member.user.avatarURL)
    .addField("Kullanıcı Tag", member.user.tag, true)
    .addField("ID", member.user.id, true)
    .addField("Discord Kayıt Tarihi", tarih, true)
    .addField("Sunucuya Katıldığı Tarih", tarih2, true)
    .setThumbnail(member.user.avatarURL);
  kanal.send(embed);
});

client.on("messageDelete", message => {
  if (message.author.bot) return;

  db.set(`atan_${message.channel.id}`, `${message.author.tag}`);
  db.set(`mesaj_${message.channel.id}`, message.content);

  //if (!logA[message.guild.id]) return;

  var user = message.author;

  //var kanal = message.guild.channels.get(logA[message.guild.id].log);

  if (db.has(`log_${message.guild.id}`) === false) return;

  var kanal = message.guild.channels.get(db.fetch(`log_${message.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Silindi!`, message.author.avatarURL)
    .addField("Kullanıcı Tag", message.author.tag, true)
    .addField("ID", message.author.id, true)
    .addField("Silinen Mesaj", "```" + message.content + "```")
    .setThumbnail(message.author.avatarURL);
  kanal.send(embed);
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;

  // if (!logA[oldMsg.guild.id]) return;

  var user = oldMsg.author;

  //var kanal = oldMsg.guild.channels.get(logA[oldMsg.guild.id].log);

  if (db.has(`log_${oldMsg.guild.id}`) === false) return;

  var kanal = oldMsg.guild.channels.get(db.fetch(`log_${oldMsg.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Düzenlendi!`, oldMsg.author.avatarURL)
    .addField("Kullanıcı Tag", oldMsg.author.tag, true)
    .addField("ID", oldMsg.author.id, true)
    .addField("Eski Mesaj", "```" + oldMsg.content + "```")
    .addField("Yeni Mesaj", "```" + newMsg.content + "```")
    .setThumbnail(oldMsg.author.avatarURL);
  kanal.send(embed);
});

client.on("roleCreate", role => {
  // if (!logA[role.guild.id]) return;

  if (db.has(`log_${role.guild.id}`) === false) return;

  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal.send(embed);
});

client.on("roleDelete", role => {
  // if (!logA[role.guild.id]) return;

  if (db.has(`log_${role.guild.id}`) === false) return;

  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal.send(embed);
});

client.on("roleUpdate", role => {
  // if (!logA[role.guild.id]) return;

  if (db.has(`log_${role.guild.id}`) === false) return;

  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal.send(embed);
});
const sure = 1; //Komut bekleme süresi
const beklememesaji = ``; //Komut bekleme mesajı
const sahipbeklemesi = true; //Sahip bekleme ayarı (false=kapalı, true=açık)
let yazma = new Set();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${chalk.red(files.length)} ${chalk.green("komut yüklenecek...")}`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`${chalk.green("Yüklenen komut:")} ${chalk.blue(props.help.name)}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);

      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//3
client.on("guildMemberAdd", async member => {
  let user = client.users.get(member.id);
  let chan = client.channels.get(db.fetch(`guvenlik3_${member.guild.id}`));
  const Canvas = require("canvas");
  const canvas = Canvas.createCanvas(360, 100);
  const ctx = canvas.getContext("2d");
  let memberChannel = await db.fetch(`guvenlik3_${member.guild.id}`);
  const resim1 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/621045237137276929/621046566106431488/tes3.png"
  );
  const resim2 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/621045237137276929/621046061875724298/tes1.png"
  );
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
  var kontrol;
  if (kurulus > 1296000000) kontrol = resim2;
  if (kurulus < 1296000000) kontrol = resim1;

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/621045237137276929/621045305089064980/arka.png"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol, 0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(avatar, 143, 10, 73, 72);

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "neonlight-güvenlik.png"
  );
  if (db.has(`karalist_${user.id}`)) {
    member.guild.channels
      .get(memberChannel)
      .send("Yasaklı kullanıcı geldi. Lütfen DİKKATLİ olun");
    if (!member.guild.channels.get(memberChannel)) return;
  } else if (db.has(`üyelikk_${user.id}`)) {
    return;
  } else if (!member.guild.channels.get(memberChannel)) return;
  member.guild.channels.get(memberChannel).send(attachment);
});
client.on("guildMemberAdd", async member => {
  let user = client.users.get(member.id);
  let chan = client.channels.get(db.fetch(`guvenlik3_${member.guild.id}`));
  const Canvas = require("canvas");
  const canvas = Canvas.createCanvas(360, 100);
  const ctx = canvas.getContext("2d");
  let memberChannel = await db.fetch(`guvenlik3_${member.guild.id}`);
  const resim1 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/621045237137276929/621046566106431488/tes3.png"
  );
  const resim2 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/621045237137276929/621046061875724298/tes1.png"
  );
  const gold = await Canvas.loadImage(
    "https://www.osmaniyerehberim.com/wp-content/uploads/2018/11/506-gold-uyelik-arkadaslik-sitesi.png"
  );
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
  var kontrol;
  if (kurulus > 1296000000) kontrol = resim2;
  if (kurulus < 1296000000) kontrol = resim1;

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/7Br6Av.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol, 0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(avatar, 143, 10, 73, 72);

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "neonlight-güvenlik.png"
  );
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")

    .setDescription(
      `<a:sekilligalp:727045194033266730>> ${member.user.username} Adlı Gold üye Katıldı. <a:sekilligalp:727045194033266730>`
    );
  if (db.has(`üyelikk_${user.id}`)) {
    if (!member.guild.channels.get(memberChannel)) return;
    member.guild.channels.get(memberChannel).send(attachment);
    member.guild.channels.get(memberChannel).send(embed);
  } else return;
});

client.on("message", async message => {
  var s = "tr";

  if (db.has(`dil_${message.guild.id}`) === true) {
    var s = "en";
  }
  const dil = client[s];

  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`${prefix}afk`)) return;

  if (await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    message
      .reply(`<a:yesil_onay:727045346852601908> ${dil.afk.cikis}`)
      .then(message => message.delete(7000));
  }

  var USER = message.mentions.users.first();
  if (!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);

  if (REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);
    if (db.has(`üyelikk_${USER.id}`)) {
      message.delete();
      const embed = new Discord.RichEmbed()
        .setColor("GOLD")

        .setDescription(
          `<a:maviyildiz:780445154422554644> \`${USER.tag}\` Adlı Gold üyeyi rahatsız edemezsiniz.\nAFK süresi: \`${timeObj.hours}\`** saat** \`${timeObj.minutes}\`** dakika** \`${timeObj.seconds}\` ** saniye**\nSebep:\n\`${REASON}\``
        );

      message.channel.send(embed).then(message => message.delete(7000));
    } else
      message.channel
        .send(
          `\`${USER.tag}\` kullanıcısı AFK\nAFK süresi: \`${timeObj.hours}\`** saat** \`${timeObj.minutes}\`** dakika** \`${timeObj.seconds}\` ** saniye**\nSebep:\n\`${REASON}\` `
        )
        .then(message => message.delete(7000));
  }
});

client.on("message", async msg => {
  const request = require("node-superfetch");
  const db = require("quick.db");
  const ms2 = require("parse-ms");
  let timeout = 600000;
  let dakdest = 1;
  let i = db.fetch(`üyelikk_${msg.author.id}`);
  if (db.has(`üyelikk_${msg.author.id}`) == true) {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
      let time = ms2(timeout - (Date.now() - dakdest));
    } else {
      if (msg.author.bot) return;
      if (msg.content.length > 64) {
        var embed = new Discord.RichEmbed()
          .setAuthor(
            `NeonLight`,
            `${msg.author.avatarURL || msg.author.displayAvatarURL}`
          )
          .setDescription(
            `<a:sekilligalp:727045194033266730> Hizzaya Geçin! Burada Bir Gold Üye Belirdi! <@${msg.author.id}>`
          )
          .setColor("GOLD");
        msg.channel.send(embed).then(message => {
          message.delete(4000);
        });
      }
    }
  } else if (i == undefined) {
  }
  if (!i) return;
});

client.on("roleDelete", async role => {
  const guild = role.guild;
  const entry = await guild
    .fetchAuditLogs({ type: 32 })
    .then(audit => audit.entries.first());
  let yashinukanallimit = await db.fetch(`rlimit31_${guild.id}`);
  let yashinukullanıcılimit = await db.fetch(`rlimitP31_${entry.executor.id}`);
  const log = db.fetch(`korumaLog_${guild.id}`);
  if (yashinukanallimit) {
    if (entry.executor.id !== guild.owner.user.id) {
      await db.add(`rlimitP31_${entry.executor.id}`, 1);

      client.channels
        .get(log)
        .send(
          `\`${role.name}\` adlı rol ${entry.executor} tarafından silindi!`
        );

      if (yashinukullanıcılimit >= yashinukanallimit) {
        try {
          client.channels
            .get(log)
            .send(
              `Sunucundan bir yetkili rol limitine ulaştı ve sunucudan atıldı ! İşte bilgileri => \n\n\`Kullanıcı:\`  ${
                entry.executor
              } | ${
                entry.executor.id
              } \n\`Discord'a ve Sunucuya Katılım Tarihi:\` \n• **Discord:** ${moment(
                entry.executor.createdAt
              ).format("DD/MM/YYYY | HH:mm:ss")} • **Sunucu:** ${moment(
                guild.member(entry.executor).joinedAt
              ).format("DD/MM/YYYY | HH:mm:ss")}`
            );
          guild.kick(entry.executor.id, "Rol Limit");
        } catch (err) {}
        db.delete(`rlimitP31_${entry.executor.id}`);
      }
    }
  }
});

client.on("roleUpdate", async (oldRole, newRole) => {
  let codeming = await db.fetch(`ceyöneticiengel_${oldRole.guild.id}`);
  if (!codeming) return;
  if (oldRole.hasPermission("ADMINISTRATOR")) return;
  if (!oldRole.hasPermission("ADMINISTRATOR"))
    if (newRole.hasPermission("ADMINISTRATOR")) {
      newRole.setPermissions(oldRole.permissions);
    } else {
      return;
    }
});

client.login(ayarlar.token);
