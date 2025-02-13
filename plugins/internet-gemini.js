/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import axios from "axios";
import uploadImage from "../lib/uploadImage.js";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text)
    return m.reply(
      `Masukan hal yang ingin ditanyakan \n\nContoh : \n${usedPrefix + command} Apakah hari ini cerah`,
    );
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (mime) {
    global.db.data.settings[conn.user.jid].loading
      ? await m.reply(global.config.loading)
      : false;
    let img = await q.download();
    let link = await uploadImage(img);
    let { data } = await axios.get(
      API(
        "https://itzpire.site",
        "/ai/bard-ai",
        { q: text, url: link.files[0].url },
        false,
      ),
    );
    m.reply(data.result, false, false, { smlcap: false });
  } else {
    let { data } = await axios.get(
      API("https://itzpire.site", "/ai/bard-ai", { q: text }, false),
    );
    m.reply(data.result, false, false, { smlcap: false });
  }
};
handler.help = ["gemini", "bard"];
handler.tags = ["internet"];
handler.command = /^(gemini|bard)$/i;
handler.limit = true; handler.error = 0
handler.onlyprem = true;
export default handler;
