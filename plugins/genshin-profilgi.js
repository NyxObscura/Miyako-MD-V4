/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";
import Jimp from "jimp";
import { ssweb } from "../lib/scrape.js";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `Masukan uid genshin! \n\nContoh : \n${usedPrefix + command} 828342426`,
    );
  if (isNaN(text)) return m.reply("Hanya berupa angka!");
  try {
    global.db.data.settings[conn.user.jid].loading
      ? await m.reply(global.config.loading)
      : false;
    let src = await (
      await fetch(`https://enka.network/api/uid/${text}/`)
    ).json();
    let teks = `
❃ Nickname : ${src.playerInfo.nickname}
❃ Signature : ${src.playerInfo.signature ? src.playerInfo.signature : "Tidak Ada Signature"}
❃ Adventure Level : ${src.playerInfo.level}

❃ World Level : ${src.playerInfo.worldLevel ? src.playerInfo.worldLevel : "0"}
❃ Archievment : ${src.playerInfo.finishAchievementNum}
❃ Abyss : Floor ${src.playerInfo.towerFloorIndex ? src.playerInfo.towerFloorIndex : "0"} Chamber ${src.playerInfo.towerLevelIndex ? src.playerInfo.towerLevelIndex : "0"}

❃ Open In Enkanetwork : https://enka.network/u/${text}
`.trim();
    let screenshot = await ssweb(`https://enka.network/u/${text}`, "dekstop");
    let { filename } = await conn.getFile(screenshot, true);
    let image = await Jimp.read(filename);
    let crop = await image.crop(15, 300, 990, 410).getBufferAsync("image/png");
    await conn.sendFile(m.chat, crop, "profilgenshin.jpg", teks, m);
  } catch (e) {
    return m.reply("Failed :(");
  }
};
handler.help = ["profilgi"];
handler.tags = ["genshin"];
handler.command = /^profilgenshin|profilgi|profilegi|profilgi$/i;
handler.limit = true; handler.error = 0
export default handler;
