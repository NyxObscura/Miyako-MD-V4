/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import fetch from "node-fetch";
import uploadFile from "../lib/uploadFile.js";

const handler = async (m, { text, conn }) => {
  try {
    if (!text && !m.quoted) {
      return m.reply(
        "Gunakan perintah ini dengan teks atau merespon gambar. Contoh: *.gemini Hello*",
      );
    }

    if (
      text &&
      m.quoted &&
      (m.quoted.mimetype === "image/jpeg" || m.quoted.mimetype === "image/png" || m.quoted.mimetype === "video/mp4" || m.quoted.mimetype === "application/pdf" || m.quoted.mimetype === "audio/mpeg")
    ) {
      const buffer = await m.quoted.download();
      const url = await uploadFile(buffer);
      const response = await fetch(
        "https://rest.cifumo.biz.id/api/ai/gemini-image",
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
      await conn.reply(m.chat, data.content, null, { quoted: m });
    } else if (text) {
      const askUrl = `https://rest.cifumo.biz.id/api/ai/gemini-chat?ask=${encodeURIComponent(text)}`;
      const response = await fetch(askUrl);
      const data = await response.json();
      await conn.reply(m.chat, data.data, null, { quoted: m });
    }
  } catch (e) {
    m.reply(e.message);
  }
};

handler.command = ["gemini"];
handler.help = ["gemini <teks/img>"];
handler.tags = ["ai"];
handler.limit = true; handler.error = 0
handler.onlyprem = true;
export default handler;
