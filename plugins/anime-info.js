/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { anime } from "../lib/scrape.js";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `Masukan Nama Anime! \n\nContoh : \n${usedPrefix + command} Majo No Tabitabi`,
    );
  let data = await anime(text);
  let caption = `
Title : ${data.title}

Synopsis : ${data.synopsis}

${data.info
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

Trailer :
${data.trailer}
`.trim();
  conn.sendFile(m.chat, data.image, false, caption, m);
};
handler.help = ["animeinfo"];
handler.tags = ["anime"];
handler.command = /^(anime(info)?)$/i;
handler.limit = true; handler.error = 0
export default handler;
