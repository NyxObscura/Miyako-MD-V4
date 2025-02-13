/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let text;
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else m.reply("Input Teks");
  await m.reply(wait);

  try {
    let data = await textToImage(text);
    if (data) {
      await conn.sendFile(
        m.chat,
        data.result_url,
        "",
        `Image for ${text}`,
        m,
        false,
        {
          mentions: [m.sender],
        },
      );
    }
  } catch (e) {
    await m.reply(eror);
  }
};
handler.help = ["photoleap"];
handler.tags = ["ai"];
handler.command = /^(photoleap)$/i;
handler.register = true;
handler.limit = true; handler.error = 0
export default handler;

/* New Line */
async function textToImage(text) {
  try {
    const { data } = await axios.get(
      "https://tti.photoleapapp.com/api/v1/generate?prompt=" + text,
    );
    return data;
  } catch (err) {
    return null;
  }
}
