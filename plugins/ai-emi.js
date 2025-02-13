/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import Emi from "../lib/Emi.js"; // Sesuaikan dengan jalur file yang sesuai

const handler = async (m, { conn, text }) => {
  // Buat instance Emi
  if (!text) return m.reply("Masukan prompt nya");
  try {
    await m.reply(wait);
    const emi = new Emi();

    let result = await emi.fetchData(text);

    // Ubah hasil menjadi buffer
    let buffer = Buffer.from(result, "base64");

    // Kirim buffer sebagai foto
    await conn.sendFile(m.chat, buffer, "anu.jpg", "Ini dia kak", m);
  } catch (e) {
    m.reply("error om coba lagi nanti/ hubungi owner");
  }
};

handler.command = ["emi"];
handler.help = ["emi <prompt>"];
handler.tags = ["ai"];
handler.limit = true; handler.error = 0
export default handler;
