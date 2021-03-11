const Discord = require("discord.js");

String.prototype.replaceAll = function(find, replace) {
  var str = this;
  return str.replace(
    new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"),
    replace
  );
};

exports.run = async (client, msg, args) => {
  if (!args[0])
    return msg.channel.send("Kuş diline çevirmek istediğin kelimeyi yaz.");
  if (args.slice(0).join(" ").length <= 5)
    return msg.channel.send("En az bir 5 harf kullanmalısın.");

  let ehehe = args.slice(0).join(" ");
  let replaced = ehehe
    .replaceAll("a", "aga")
    .replaceAll("e", "ege")
    .replaceAll("ı", "igi")
    .replaceAll("i", "igi")
    .replaceAll("u", "ugu")
    .replaceAll("ü", "ugu")
    .replaceAll("o", "ogo")
    .replaceAll("ö", "ogo");
  return msg.channel.send(replaced);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kuş-dili-çevirici"],
  permLevel: 0,
  kategori: "eğlence"
};

exports.help = {
  name: "kuş-dili",
  description: "Yazdığınız mesajı kuş diline çeviri"
};
