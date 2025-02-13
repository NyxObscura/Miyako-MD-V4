/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import uploadFile from "../lib/uploadFile.js";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime)
    return m.reply(`Kirim/Balas Foto Dengan Caption ${usedPrefix + command}`);
  if (!/image\/(jpe?g|png)/.test(mime))
    return m.reply(`*Format ${mime} tidak didukung!*`);
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let img = await q.download();
  let link = await uploadFile(conn, img, "tele");
  let anime = API("xzn", "/api/toanime", { url: link }, "apikey");
  conn.sendFile(m.chat, anime, "anime.png", "Nih Kak", m);
};
handler.help = ["jadianime"];
handler.tags = ["tools"];
handler.command = /^(jadi|to)anime$/i;
handler.limit = true; handler.error = 0
handler.onlyprem = true;
export default handler;
