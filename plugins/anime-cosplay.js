/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { pinterest } from "../lib/scrape.js";

let handler = async (m, { conn, command, usedPrefix, text }) => {
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let image = await pinterest("cosplaystyle anime");
  conn.sendFile(
    m.chat,
    "https://external-content.duckduckgo.com/iu/?u=" + image,
    false,
    "Ini Dia Kak",
    m,
  );
};
handler.help = ["cosplay"];
handler.tags = ["anime"];
handler.command = /^(cosplay)$/i;

export default handler;
