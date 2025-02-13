/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";

const handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, "Masukkan teksnya, om", m);
  try {
    await m.reply(wait);
    const response = await fetch(
      `http://15.235.142.199/api/ai/voiceAnime?text=${encodeURIComponent(text)}&apikey=ReiiNt`,
    );
    const data = await response.buffer();
    await conn.sendFile(m.chat, data, "tes.mp3", "", m, true);
  } catch (e) {
    return e.message;
  }
};

handler.command = ["waifuvn"];
handler.help = ["waifuvn <teks>"];
handler.tags = ["anime", "ai"];
handler.limit = true; handler.error = 0
export default handler;
