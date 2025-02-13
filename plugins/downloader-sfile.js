/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import {
  sfile
} from "../lib/scraper/sfile.js"

const handler = async (m, { conn, args }) => {
  if(!args[0]) return m.reply("mana link sfile nya")
  let dl = await sfile.download(args[0])
  let tek = `*[ Downloader Sfile ]*
  
  *Filename:* ${dl.data.filename}
  *Size:* ${dl.data.filesize}
  *Mimetype:* ${dl.data.mimetype}
  `
  let anu = await m.reply(tek)
  await conn.sendMessage(
        m.chat,
        {
          document: dl.data.result.buffer,
          mimetype: dl.data.mimetype,
          fileName: dl.data.result.filename,
          pageCount: 2024,
        },
        { quoted: anu }
      );
}
handler.command = handler.help = ['sfile']
handler.tags = ['downloader']
handler.onlyprem
handler.limit = true
export default handler