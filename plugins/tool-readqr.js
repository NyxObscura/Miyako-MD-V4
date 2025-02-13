/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import uploadFile from "../lib/uploadFile.js";

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("Fotonya Mana? Reply gambarnya aja");
  if (!/image\/(jpe?g|png)/.test(mime))
    return m.reply(`Tipe ${mime} tidak didukung!`);
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let { key } = await m.reply("...");
  let img = await q.download?.();
  let url = await uploadFile(conn, img, "tele");
  let res = await global.fetch(
    API("lol", "/api/read-qr", { img: url }, "apikey"),
  );
  let json = await res.json();
  await conn.sendMessage(m.chat, { text: json.result, edit: key });
};
handler.help = ["readqr"];
handler.tags = ["tools"];
handler.command = /^(readqr)$/i;
handler.limit = true; handler.error = 0
export default handler;
