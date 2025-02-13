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
  let res = await (
    await fetch(
      "https://raw.githubusercontent.com/tegarpryd/merlynkurnia/d367f3f359df10c09f35d4b3cb9ec384eafb1b47/fun/darkjoke.json",
    )
  ).json();
  let img = res.getRandom();
  await conn.sendFile(m.chat, img.image, null, null, m, null);
};
handler.help = ["darkjoke"];
handler.tags = ["internet"];
handler.command = /^(darkjoke|darkjokes)$/i;
handler.limit = true; handler.error = 0
export default handler;
