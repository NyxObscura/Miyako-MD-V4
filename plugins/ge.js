/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { geminiChat } from "../lib/gemini.js";

const handler = async (m, { conn, text }) => {
  if (!text)
    return m.reply("Masukan commandnya\n> *contoh:* .gemini Halo atau .gemini Del untuk menghapus session");

  try {
    if (/del/i.test(text)) {
      delete global.db.data.users[m.sender].gemini;
      m.reply("Berhasil menghapus sesi");
    } else {
      const anu = await conn.sendMessage(m.chat, { text: wait }, { quoted: m });
      const chat = await geminiChat(text, m);
      await conn.editMessage(m.chat, anu.key, chat, m);
    }
  } catch (e) {
    m.reply(e.message);
  }
};

handler.command = ["ge"];
export default handler;
