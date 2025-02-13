/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";

const handler = async (m, { text, conn }) => {
  if (!text) return m.reply("mau nanyain apa?");
  await m.reply("_you ai Thinking_");
  const you = await fetch(`https://api.maher-zubair.tech/ai/youai?q=${text}`);
  const youu = await you.json();
  if (youu.status === 400) return m.reply("error");
  await conn.footerTxt(m.chat, "You-Ai", youu.result, m);
};

handler.command = ["youai", "you", "aiyou"];
handler.help = ["youai <query>"];
handler.tags = ["ai"];
handler.limit = true; handler.error = 0
export default handler;
