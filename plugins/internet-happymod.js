/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { happymod } from "../lib/scrape.js";
let handler = async (m, { text, command, usedPrefix }) => {
  if (!text)
    return m.reply(`Masukan Query!\n\nContoh:\n${usedPrefix + command} minecraft`);
  let result = await happymod(text);
  let teks = result
    .map((v, i) => {
      return `
*${i + 1}.* ${v.name}
❃ Link: ${v.link}
`.trim();
    })
    .filter((v) => v)
    .join("\n\n\n");
  await m.reply(teks);
};
handler.help = ["happymod"];
handler.tags = ["internet"];
handler.command = /^happymod$/i;
export default handler;
