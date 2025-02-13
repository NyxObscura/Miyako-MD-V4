/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { googleImage } from '@bochilteam/scraper'
var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} Blue Archive`
    const res = await googleImage(text)
    let image = res.getRandom()
    let link = image
    conn.sendFile(m.chat, link, 'google.jpg', `乂 *G O O G L E*\n*Result:* ${usedPrefix + command} ${text}
*Source:* Google
`,m)
}
handler.help = ['gimage']
handler.tags = ['internet']
handler.command = /^(gimage|image)$/i
handler.limit = true
handler.premium = true;
export default handler