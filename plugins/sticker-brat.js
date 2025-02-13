/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*  
*/

import { sticker } from '../lib/sticker.js'

global.stickpack = ""
global.stickauth = "MIYAKO PACK"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Contoh penggunaan: ${usedPrefix + command} hai kamu`
    
    try {
        let stiker = await sticker(null, `https://ochinpo-helper.hf.space/brat?text=${text}`, global.stickpack, global.stickauth)
        conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    } catch (error) {
        if (error.message.includes('Request path contains unescaped characters')) {
            conn.reply(m.chat, 'Fitur ini tidak mendukung emoji!', m)
        } else {
            throw error
        }
    }
}

handler.help = ['brat']
handler.tags = ['image']
handler.command = /^(brat)$/i
export default handler