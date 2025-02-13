/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) m.reply(`*• Example:* ${usedPrefix + command} cat`);
  m.reply(wait);
  try {
    let gpt = await (
      await fetch(`https://itzpire.site/ai/render3d?prompt=${text}`)
    ).json();
    conn.sendFile(
      m.chat,
      gpt.result,
      null,
      "*[ RENDER - 3D ]* " + "\n*• Prompt:* " + text,
    );
  } catch (e) {
    m.reply("`*Command Not Responded*`");
  }
};
handler.help = ["render3d"];
handler.tags = ["ai"];
handler.command = ["render3d"];
export default handler;
