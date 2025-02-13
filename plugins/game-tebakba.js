/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import fs from 'fs'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.game = conn.game ? conn.game : {}
    let id = 'tebakba-' + m.chat
    if (id in conn.game) return conn.reply(m.chat, 'Masih ada soal yang belum terjawab di chat ini', conn.game[id][0])
    
    // Ambil soal acak dari JSON tebak student
    let src = JSON.parse(fs.readFileSync('./json/tebakstudent.json', 'utf-8'))
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
${json.question}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}teba untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.game[id] = [
        await conn.sendMessage(m.chat, { text: caption }, { quoted: m }),
        json, poin,
        setTimeout(() => {
            if (conn.game[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.answer}*`, conn.game[id][0])
            delete conn.game[id]
        }, timeout)
    ]
}
handler.help = ['tebakstudent']
handler.tags = ['game']
handler.command = /^tebakba|tebakmurid|tebakstudent$/i
handler.game = true

export default handler
