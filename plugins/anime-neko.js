/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";
let handler = async (m, { conn }) => {
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let ne = await (
    await fetch(
      "https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt",
    )
  ).text();
  let nek = ne.split("\n");
  let neko = pickRandom(nek);
  conn.sendFile(m.chat, neko, false, "Nih Neko nya 🐾💗", m, false);
};
handler.help = ["neko"];
handler.tags = ["anime"];
handler.command = /^(neko)$/i;
handler.limit = true; handler.error = 0
export default handler;
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
