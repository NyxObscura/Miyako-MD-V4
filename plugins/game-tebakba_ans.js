/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import similarity from 'similarity'
const threshold = 0.72

let handler = m => m

handler.before = async function (m, { conn }) {
    if (/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
    let id = 'tebakba-' + m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/^\w+/.test(m.quoted.text)) return !0

    this.game = this.game ? this.game : {}
    if (!(id in this.game)) return !1 // Tidak memberikan balasan jika soal telah berakhir
    
    if (m.quoted.id == this.game[id][0].id) {
        let gameData = this.game[id]
        let json = JSON.parse(JSON.stringify(gameData[1]))
        
        // Deteksi jika pemain menyerah
        let isSurrender = /^((me)?nyerah|surr?ender|suren)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(gameData[3])
            delete this.game[id]
            return conn.reply(m.chat, `*Sayang sekali sensei, Kamu menyerah 🏳️*\n\n🙈 Jawabannya adalah: *${json.answer}*`, m)
        }

        // Cek apakah jawaban benar
        if (m.text.toLowerCase() === json.answer.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += gameData[2] // Tambah XP jika benar
            clearTimeout(gameData[3])
            delete this.game[id]
            conn.reply(m.chat, `*Jawaban Benar!*\n+${gameData[2]} XP\n\n*_Selamat ya! Sensei_ 😆*`, m)
        } 
        // Cek apakah jawaban mendekati benar berdasarkan similarity
        else if (similarity(m.text.toLowerCase(), json.answer.toLowerCase().trim()) >= threshold) {
            m.reply(`*Dikit lagi sensei 😆*\n\n*Kamu Pasti bisa!!*`)
        } 
        // Jika jawaban salah
        else {
          if (m.text.toLowerCase() === '.teba') return !1
            m.reply(`*Jawaban salah Sensei!*\n\n😉 *Silahkan Coba lagi!*`)
        }
    }
    return !0
}

export default handler