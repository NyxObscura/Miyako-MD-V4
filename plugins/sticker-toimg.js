/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { webp2png } from '../lib/../lib/webp2mp4.js'

let handler = async (m, { conn, usedPrefix, command }) => {
  let notStickerMessage = `Reply sticker with command *${usedPrefix + command}*`;
  let q = m.quoted ? m.quoted : m;
  let mime = q.mediaType || "";
  if (!/sticker|stickerMessage/.test(mime))
    return m.reply("Its not a sticker!");
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let media = await q.download();
  let convert = await webp2png(media)
  conn.sendMessage(
    m.chat,
    {
      image: { url: convert },
      fileName: "toimg.jpg",
      mimetype: "image/jpeg",
      caption: "",
    },
    { quoted: m },
  );
};
handler.help = ["toimg"];
handler.tags = ["sticker"];
handler.command = /^to(image|img)$/i;
handler.limit = true; handler.error = 0
export default handler;
