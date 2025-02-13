/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { cerpen } from "../lib/scrape.js";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `Masukan Category Cerpen!\n\nContoh:\n${usedPrefix + command} Horor Hantu`,
    );
  let res = await cerpen(text);
  let cap = `
*Title:* ${res.title}
*Author:* ${res.author}
*Kategori:* ${res.kategori}
*Rilis:* ${res.lolos}

*Cerita:* ${res.cerita}
`.trim();
  m.reply(cap);
};
handler.help = ["cerpen"];
handler.tags = ["internet"];
handler.command = /^(cerpen)$/i;
handler.limit = true; handler.error = 0
export default handler;
