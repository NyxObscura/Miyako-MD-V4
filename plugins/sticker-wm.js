/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { addExif } from "../lib/sticker.js";

let handler = async (m, { conn, text }) => {
  if (!m.quoted) return m.reply("Quoted the sticker!");
  let stiker = false;
  try {
    let [packname, ...author] = text.split("|");
    author = (author || []).join("|");
    let mime = m.quoted.mimetype || "";
    if (!/webp/.test(mime)) throw "Reply sticker!";
    let img = await m.quoted.download();
    if (!img) return m.reply("Reply a sticker!");
    stiker = await addExif(img, packname || "", author || "");
  } catch (e) {
    console.error(e);
    if (Buffer.isBuffer(e)) stiker = e;
  } finally {
    if (stiker)
      conn.sendFile(m.chat, stiker, "wm.webp", "", m, false, {
        asSticker: true,
      });
    else throw "Conversion failed";
  }
};
handler.help = ["wm"];
handler.tags = ["sticker"];
handler.command = /^wm$/i;
handler.premium = true; handler.error = 0

export default handler;
