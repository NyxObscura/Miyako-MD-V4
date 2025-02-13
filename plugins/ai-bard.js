/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";
import uploadimage from "../lib/uploadImage.js";

const handler = async (m, { text, conn }) => {
  try {
    if (!text && !m.quoted) {
      return m.reply(
        "Gunakan perintah ini dengan teks atau merespon gambar. Contoh: *.bard Hello*",
      );
    }

    if (
      m.quoted &&
      (m.quoted.mimetype === "image/jpeg" || m.quoted.mimetype === "image/png")
    ) {
      const buffer = await m.quoted.download();
      const url = await uploadimage(buffer);
      const response = await fetch(
        "https://rest.cifumo.biz.id/api/ai/bard-image",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ask: text,
            image: url,
          }),
        },
      );
      const data = await response.json();
      await conn.reply(m.chat, data.content, m);
    } else if (text || m.quoted.text) {
      const query = text || m.quoted.text;
      const askUrl = `https://rest.cifumo.biz.id/api/ai/bard-chat?ask=${encodeURIComponent(query)}`;
      const response = await fetch(askUrl);
      const data = await response.json();
      await conn.reply(m.chat, data.content, m);
    }
  } catch (e) {
    m.reply(e.message);
  }
};

handler.command = ["bard"];
handler.help = ["bard <teks/img>"];
handler.tags = ["ai"];
handler.limit = true; handler.error = 0
handler.onlyprem = true;
export default handler;
