/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { youtube } from "@xct007/frieren-scraper";

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
  if (!text) return m.reply(`Masukan query! \n\nContoh: \n${usedPrefix + command} mantra hujan`);
  if (/https/i.test(text)) return m.reply('Contoh mantra hujan')

  let results = await youtube.search(text);
  if (results.length === 0) return m.reply('Tidak ada hasil yang ditemukan');

  let caption = `
 *––––––『 Y T - S E A R C H 』––––––*

`;
  for (let i = 0; i < results.length; i++) {
    let { title, uploaded, duration, views, url, thumbnail } = results[i];
    caption += `
🎧 *Title:* ${title}
📤 *Published:* ${uploaded}
⏰ *Duration:* ${duration}
👁️ *Views:* ${views}

🔗 *Url:* ${url}

*[ Usage ]*
> *Reply ${i + 1} untuk mendapatkan audio*
  
  *––––––『 Y T - S E A R C H 』––––––*

`;
  }
  caption += `
> *\`Note:\`* Reply pesan bot dan ketik angka sesuai dengan pilihan
`.trim();

  let buttons = [];
  for (let i = 0; i < results.length; i++) {
    buttons.push({
      alias: `${i + 1}`,
      response: `.ytmp3 ${results[i].url}`
    });
  }

  conn.sendAliasMessage(m.chat, { image: { url: results[0].thumbnail }, caption: caption }, buttons, m)
};

handler.help = ["yts"];
handler.tags = ["sound"];
handler.command = /^yts$/i;
handler.limit = false;
handler.error = 0
export default handler;