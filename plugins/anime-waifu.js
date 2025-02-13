/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";
let handler = async (m, { conn, usedPrefix }) => {
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let res = await fetch("https://api.waifu.pics/sfw/waifu");
  if (!res.ok) throw await res.text();
  let json = await res.json();
  conn.sendFile(m.chat, json.url, "waifu.jpeg", "Waifunya Kak...", m, false);
};
handler.help = ["waifu"];
handler.tags = ["anime"];
handler.command = /^(waifu)$/i;
handler.limit = true; handler.error = 0
export default handler;
