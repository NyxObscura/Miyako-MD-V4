/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";
let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) return m.reply(`Usage Example ${usedPrefix + command} emilia`);
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  try {
    let res = await (
      await fetch(global.API("lol", "/api/pixiv", { query: text }, "apikey"))
    ).json();
    let data = res.result.getRandom();
    let caption = `
*Title:* ${data.title}
*Id:* ${data.id}
`.trim();
    await conn.sendFile(m.chat, data.image, "error.jpg", caption.trim(), m);
  } catch (e) {
    m.reply("Tidak Ditemukan");
  }
};
handler.help = ["pixiv"];
handler.tags = ["search"];
handler.command = /^pixiv$/i;
handler.premium = true; handler.error = 0
handler.nsfw = true;
export default handler;
