/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { sticker } from "../lib/sticker.js";

let handler = async (m, { conn, command, usedPrefix, text }) => {
  if (!text)
    return m.reply(
      `Masukan Text!\n\nContoh :\n${usedPrefix + command} Saya Pki`,
    );
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text;
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let res = global.API("lol", "/api/attp", { text: teks }, "apikey");
  let stiker = await sticker(
    false,
    res,
    global.config.stickpack,
    global.config.stickauth,
  );
  conn.sendFile(m.chat, stiker, false, false, m);
};
handler.help = ["attp"];
handler.tags = ["sticker"];
handler.command = /^(attp)$/i;
handler.limit = true; handler.error = 0
export default handler;
