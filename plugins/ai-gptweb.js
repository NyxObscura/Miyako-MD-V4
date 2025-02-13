/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example:* ${usedPrefix + command} halo`;
  m.reply(wait);
  try {
    let gpt = await (
      await fetch(`https://itzpire.com/ai/gpt-web?q=${text}`)
    ).json();
    m.reply("*[ GPT - WEB ]* " + "\n" + gpt.result);
  } catch (e) {
    m.reply("`*Gpt Not Responded*`");
  }
};
handler.help = ["gptweb"].map((a) => a + " *[question]*");
handler.tags = ["ai"];
handler.command = ["gptweb"];
export default handler;
