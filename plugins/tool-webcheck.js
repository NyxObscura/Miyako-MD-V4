/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import { checkWeb } from "../lib/scrape.js";

let handler = async (m, { args, usedPrefix, command }) => {
  if (!args[0]) return m.reply(`Ex: ${usedPrefix + command} nhentai.net`);
  let res = await checkWeb(args);
  m.reply(
    res
      .map((v) => `*• Domain:* ${v.Domain}\n*• Status:* ${v.Status}`)
      .join("\n\n"),
  );
};
handler.help = ["webcheck"];
handler.tags = ["tools"];
handler.command = /^web(check|cek)|(check|cek)web$/i;

export default handler;
