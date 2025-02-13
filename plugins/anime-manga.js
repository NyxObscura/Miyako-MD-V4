/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { manga } from "../lib/scrape.js";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `Masukan Nama Manga! \n\nContoh : \n${usedPrefix + command} Majo No Tabitabi`,
    );
  let data = await manga(text);
  let caption = `
Title : ${data.title}

Synopsis : ${data.synopsis}

${data.info
  .filter((v) => v.type != "Genres")
  .map((v) => {
    return `${v.type} : ${v.result}`.trim();
  })
  .join("\n")}

Related : 
${data.related
  .map((v) => {
    return `• ${v.name} ( ${v.type.replace(":", "")} )`.trim();
  })
  .join("\n")}
`.trim();
  conn.sendFile(m.chat, data.image, false, caption, m);
};
handler.help = ["mangainfo"];
handler.tags = ["anime"];
handler.command = /^(manga(info)?)$/i;
handler.limit = true; handler.error = 0
export default handler;
