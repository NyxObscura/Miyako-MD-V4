/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { simi } from "../lib/scrape.js";
let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("Mau ngomong apa kak sama simi?");
  try {
    let teks = await simi(text, "id");
    m.reply(teks, false, false, { smlcap: false });
  } catch (e) {
    return m.reply("Maaf kak aku ga paham hehehe...");
  }
};
handler.help = ["simi"];
handler.tags = ["fun"];
handler.command = /^(simi)$/i;
handler.onlyprem = true;
handler.limit = true; handler.error = 0
export default handler;
