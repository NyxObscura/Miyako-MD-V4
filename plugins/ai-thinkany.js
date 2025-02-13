/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";
import { thinkany } from "../lib/thinkany.js";

const handler = async (m, { text, conn }) => {
  if (!text) return m.reply("mau nanya apa");
  try {
    const { key } = conn.sendMessage(m.chat, { text: wait }, { quoted: m });
    const ai = await thinkany(text);
    await conn.editMessage(m.chat, key, ai, m);
  } catch (e) {
    m.reply(e.message);
  }
};
handler.command = ["thinkany"];
handler.tags = ["ai"];
handler.help = ["thinkany"];
export default handler;
