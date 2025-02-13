/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `Masukan URL!\n\nContoh:\n${usedPrefix + command} https://sck.io/p/jiv-dwZX`,
    );
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let res = await axios.get(
    API("lol", "/api/snackvideo", { url: text }, "apikey"),
  );
  await conn.sendFile(
    m.chat,
    res.data.result.url,
    null,
    res.data.result.caption ? res.data.result.caption : "",
    m,
  );
};
handler.help = ["snackvideo"];
handler.tags = ["downloader"];
handler.command = /^(snackvid(io|eo)?)$/i;
handler.limit = true; handler.error = 0
export default handler;
