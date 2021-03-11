const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
exports.run = async (client, message, args) => {
  this.games = new Set();
  if (this.games.has(message.channel.id))
    await message.reply("Kanal başına sadece bir oyun gelebilir.");
  const islem = Math.floor(Math.random() * (100 - 1)) + 1;
  const fixedlisonuç = islem;
  let choice;
  let haklar = 10;
  // await message.react('👌')
  this.games.add(message.channel.id);
  await message.channel.send(
    new Discord.RichEmbed()
      .setColor("#0000c8")
      .setDescription(
        `${message.author}, Aklımda tuttuğum sayıyı tahmin et sayı 1-100 arasında ${haklar} Deneme Hakkın Var.`
      )
  );
  let uwu = false;
  while (!uwu && haklar !== 0) {
    const response = await message.channel.awaitMessages(
      neblm => neblm.author.id === message.author.id,
      { max: 1, time: 15000 }
    );
    if (!response.first()) {
      this.games.delete(message.channel.id);
      message.channel.send(
        new Discord.RichEmbed()
          .setDesription(`${message.author}, Maalesef Zaman doldu!`)
          .setColor("#dc143c")
      );
      message.channel.send(
        new Discord.RichEmbed()

          .setDescription(
            `${message.author},Kaybettin aklımda tuttuğum sayı \`${fixedlisonuç}\``
          )
          .setColor("#dc143c")
      );
    }
    const choice = response.first().content;
    if (isNaN(choice)) {
      continue;
    }
    if (choice !== fixedlisonuç) {
      haklar -= 1;
      if (fixedlisonuç > choice) {
        await message.channel.send(
          new Discord.RichEmbed()
            .setDescription(
              `🔺 Aklımda Tuttuğum Sayı Daha Büyük \`${haklar}\` Deneme Hakkın Var.`
            )
            .setColor("#00008b")
        );
        continue;
      }
      if (fixedlisonuç < choice) {
        await message.channel.send(
          new Discord.RichEmbed()
            .setDescription(
              `${message.author}, 🔻 Aklımda Tuttuğum Sayı Daha Küçük \`${haklar}\` Deneme Hakkın Var.`
            )
            .setColor("#00008b")
        );
        continue;
      }
    }
    if (choice == fixedlisonuç) {
      uwu = true;
    }
  }
  if (haklar == 0) {
    this.games.delete(message.channel.id);
    await message.channel.send(
      `${message.author}, :shrug: Kaybettin! Aklımda Tuttuğum Sayı: \`${fixedlisonuç}\` :shrug:`
    );
  }
  if (uwu) {
    this.games.delete(message.channel.id);
    await message.channel.send(
      `${message.author}, :tada: Aklımda Tuttuğum Sayıyı Bildin Sayı: \`${fixedlisonuç}\` :tada:`
    );
    try {
    } catch (e) {
      this.games.delete(message.channel.id);
      message.channel.send("Bir hata oluştu");
    }
  } else {
    this.games.delete(message.channel.id);
    return console.log("Bir hata oluştu");
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sayıtahmini", "sayıtahmin", "sayı-tahmini"],
  permLevel: 0,
  kategori: "eğlence"
};
exports.help = {
  name: "sayı-tahmin",
  description: "Botun aklında tuttuğu sayıyı bilmeye çalışırsınız.",
  usage: "sayı-tahmin"
};
