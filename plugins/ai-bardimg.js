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

const handler = async (m, { conn, text }) => {
  if (!m.quoted) throw "reply gambarnya";
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || "";

    if (!mime) throw "Fotonya Mana? Reply gambar yg gk ada button aja";
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Tipe ${mime} tidak didukung!`;

    m.reply(wait);

    let img = await q.download();
    let url = await uploadImage(img);

    const response = await axios.post(
      "https://bard.rizzy.eu.org/backend/conversation/image",
      {
        ask: text || "What is in this image?",
        image: url,
      },
    );

    const result = response.data;

    if (result && result.content) {
      conn.reply(m.chat, result.content, m);
    } else {
      conn.reply(m.chat, "No valid response received.", m);
    }
  } catch (error) {
    conn.reply(m.chat, "Error: " + error.message, m);
  }
};

handler.command = handler.help = ["bardimage", "bardimg"];
handler.tags = ["ai"];
handler.onlyprem = true;
handler.limit = true; handler.error = 0

export default handler;
