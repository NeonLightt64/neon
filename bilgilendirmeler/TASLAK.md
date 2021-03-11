# Taslak

const Discord = require("discord.js");

exports.run = (client, message, params) => {

message.channel.send("Test")
};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: ["taslak"],
permLevel: 0,
kategori:'taslak'
};

exports.help = {
name: "taslak",
description: "Taslak",
usage: "taslak"
};
