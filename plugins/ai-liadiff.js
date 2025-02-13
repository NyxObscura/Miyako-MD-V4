/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*• Example:* ${usedPrefix + command} cat`);
  m.reply(wait);
  try {
    let gpt = await (
      await fetch(`https://itzpire.site/ai/emi?prompt=${text}`)
    ).json();
    conn.sendFile(
      m.chat,
      gpt.result,
      null,
      "*[ Lia - DIFFUSION ]* " + "\n*• Prompt:* " + text,
    );
  } catch (e) {
    m.reply("`*Command Not Responded*`");
  }
};
handler.help = ["liadiff"];
handler.tags = ["ai"];
handler.command = ["liadiff"];
handler.limit = true; handler.error = 0
handler.onlyprem = true;
export default handler;
