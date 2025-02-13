/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import { Doodstream } from '../lib/scraper/doods.js'

const handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('Masukan link nya\nContoh: .doods https://dood.pm/e/6pg1gc8wqc7h')
  await m.reply(wait)
  let { title, duration, size, uploadDate, directLink, error }= await Doodstream(args[0])
  if (error) {
    m.reply(error)
    return
  }
  
  let tek = `*[ DoodsStream Downloader ]*\n\n`
  tek += `*\`Title:\`* ${title}\n`
  tek += `*\`Size:\`* ${size}\n`
  tek += `*\`Duration:\`* ${duration}\n`
  tek += `*\`Uploaded:\`* ${uploadDate}`
  await conn.sendFile(m.chat, directLink, 'error.mp4', tek, m)
}
handler.command = ['doods', 'doodstream']
handler.help = ['doodstream']
handler.tags = ['downloader', 'premium']
handler.premium = true
export default handler