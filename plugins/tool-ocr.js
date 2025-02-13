/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { ocrSpace } from "ocr-space-api-wrapper";
let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("Fotonya Mana? Reply gambar atau upload");
  if (!/image\/(jpe?g|png)/.test(mime))
    return m.reply(`Tipe ${mime} tidak didukung!`);
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let image = await q.download();
  let download = await conn.getFile(image, true);
  let ocr = await ocrSpace(download.filename);
  await conn.sendMessage(
    m.chat,
    { text: ocr.ParsedResults[0].ParsedText.trim() },
    { quoted: m },
  );
};
handler.help = ["ocr"];
handler.tags = ["tools"];
handler.command = /^(ocr)$/i;
handler.limit = true; handler.error = 0
export default handler;
