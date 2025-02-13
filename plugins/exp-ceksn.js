/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { createHash } from 'crypto'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix }) {
    let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 12)
    let caption = `🗃️ *SN :* \n${sn}`
    m.reply(caption, false, false, { smlcap: true, except: [sn] })
}

handler.help = ['ceksn']
handler.tags = ['xp']
handler.command = /^(ceksn|sn|serialnumber)$/i
handler.register = true
export default handler