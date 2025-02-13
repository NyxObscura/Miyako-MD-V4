/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { processing } from "../lib/scrape.js";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("Fotonya Mana? Reply gambar atau upload");
  if (!/image\/(jpe?g|png)/.test(mime))
    return m.reply(`Tipe ${mime} tidak didukung!`);
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let img = await q.download();
  let image = await processing(img, "enhance");
  await conn.sendFile(m.chat, image, "", "", m);
};
handler.help = ["unblur", "remini"];
handler.tags = ["tools"];
handler.command = /^(remini|unblur)$/i;
handler.limit = true; handler.error = 0
export default handler;
