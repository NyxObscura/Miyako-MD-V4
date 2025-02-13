/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `Masukan Judul Video!\n\nContoh : \n${usedPrefix + command} Hu Tao Amv`,
    );
  conn.ttsearch = conn.ttsearch || {};
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let { videos } = await ttSearch(text);
  conn.ttsearch[m.sender] = {
    videos: videos,
    count: 0,
    timeOut: setTimeout(() => {
      delete conn.ttsearch[m.sender];
    }, 600000),
  };
  let caption = `
*Duration:* ${videos[0].duration}

${videos[0].title}

> Ketik *next* untuk melanjutkan ke video selanjutnya...
> 1/${videos.length} Video Tersisa`;
  await conn.sendFile(m.chat, videos[0].play, "tiktoksearch.mp4", caption, m);
};
handler.help = ["tiktok-search"];
handler.tags = ["search"];
handler.command = /^(tiktoksearch|tiktok-search|ttsearch)$/i;
handler.onlyprem = true;
handler.limit = true; handler.error = 0
export default handler;

async function ttSearch(query) {
  return new Promise(async (resolve, reject) => {
    axios("https://tikwm.com/api/feed/search", {
      data: {
        keywords: query,
        count: 30,
      },
      method: "POST",
    }).then((res) => {
      resolve(res.data.data);
    });
  });
}
