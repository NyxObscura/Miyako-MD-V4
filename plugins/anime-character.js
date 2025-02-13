/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { character } from "../lib/scrape.js";
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `Masukan Nama Character! \n\nContoh : \n${usedPrefix + command} Elaina`,
    );

  let { name, image, detail, voice_actor, animeography, mangaography } =
    await character(text);
  let caption = `
Name : ${name}

${detail.replace(">", "").trim()}

Anime :
${animeography
  .map((v) => {
    return `• ${v.name} ( ${v.status} )`;
  })
  .join("\n")}

Manga :
${mangaography
  .map((v) => {
    return `• ${v.name} ( ${v.status} )`;
  })
  .join("\n")}

Voice Actor : 
${voice_actor
  .map((v) => {
    return `• ${v.name} ( ${v.origin} )`;
  })
  .join("\n")}
`.trim();

  await conn.sendFile(m.chat, image, false, caption, m);
};
handler.help = ["character"];
handler.tags = ["anime"];
handler.command = /^(chara(cter)?)$/i;

handler.limit = true; handler.error = 0

export default handler;
