/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { jadwalsholat } from "@bochilteam/scraper";
let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) return m.reply(`Use example ${usedPrefix}${command} Bogor`);
  const res = await jadwalsholat(text);
  m.reply(
    `
Jadwal Sholat *${text}*

${Object.entries(res.today)
  .map(([name, data]) => `*Sholat ${name}:* ${data}`)
  .join("\n")
  .trim()}
`.trim(),
  );
};
handler.help = ["salat"];
handler.tags = ["quran"];
handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i;

export default handler;
