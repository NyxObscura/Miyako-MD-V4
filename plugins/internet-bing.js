/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";
let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text)
    return m.reply(
      `Masukan prompt! \n\nContoh: \n${usedPrefix + command} kamu siapa?`,
    );
  let { data } = await axios.get(
    API(
      "https://itzpire.site",
      "/ai/bing-ai",
      { model: "Precise", q: text },
      false,
    ),
  );
  m.reply(data.result, false, false, { smlcap: false });
};
handler.help = ["bing-ai"];
handler.tags = ["internet"];
handler.command = /^(bing-ai|bing)$/i;
handler.limit = true; handler.error = 0
export default handler;
