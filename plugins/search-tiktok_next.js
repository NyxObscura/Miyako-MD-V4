/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let handler = async (m, { conn }) => {
  conn.ttsearch = conn.ttsearch || {};
  if (!(m.sender in conn.ttsearch)) return;
  let user = global.db.data.users[m.sender];
  let { videos, count } = conn.ttsearch[m.sender];
  let index = count + 1;
  if (index >= videos.length)
    return m.reply(`kamu sudah mencapai batas video ${index}/${videos.length}`);
  clearTimeout(conn.ttsearch[m.sender].timeOut);
  let caption = `
*Duration:* ${videos[index].duration}

${videos[index].title}

> Ketik *next* untuk melanjutkan ke video selanjutnya...
> ${index + 1}/${videos.length} Video Tersisa`;
  conn.sendFile(m.chat, videos[index].play, "tiktoksearch.mp4", caption, m);
  conn.ttsearch[m.sender].count += 1;
  conn.ttsearch[m.sender].timeOut = setTimeout(() => {
    delete conn.ttsearch[m.sender];
  }, 600000);
};
handler.customPrefix = /^(next|lanjut)/i;
handler.command = new RegExp();
handler.limit = true; handler.error = 0
export default handler;
