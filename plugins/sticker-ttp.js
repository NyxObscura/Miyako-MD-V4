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
  text = m.quoted && !text ? m.quoted.text : text;
  if (!text)
    return m.reply(
      `Masukan Text! \n\nContoh : \n${usedPrefix + command} Elaina Waifu Saya`,
    );
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let image = global.API("lol", "/api/ttp", { text: text }, "apikey");
  let stiker = await sticker(
    image,
    false,
    global.config.stickpack,
    global.config.stickauth,
  );
  conn.sendFile(m.chat, stiker, "", "", m);
};
handler.help = ["ttp"];
handler.tags = ["sticker"];
handler.command = /^(ttp)$/i;
handler.limit = true; handler.error = 0
export default handler;
