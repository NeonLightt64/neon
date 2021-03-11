const { ShardingManager } = require("discord.js");
const ayarlar = require("./ayarlar.json");

const manager = new ShardingManager("./index.js", {
  totalShards: 1,
  token: ayarlar.token
});

manager.spawn();

manager.on("shardCreate", shard =>
  console.log(`Shard ${shard.id} başlatıldı.`)
);
