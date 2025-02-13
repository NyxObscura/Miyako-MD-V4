/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

let handler = async (m, { conn }) => {
    conn.game = conn.game ? conn.game : {}
    let id = 'tebakba-' + m.chat
    if (!(id in conn.game)) throw false
    
    let json = conn.game[id][1]
    
    // Petunjuk berupa jawaban yang huruf vokalnya diganti dengan '_'
    m.reply('Petunjuk: ' + '```' + json.answer.replace(/[AIUEOaiueo]/ig, '_') + '```' + '\n\n_*Jangan balas chat ini, tapi balas soal utama!*_')
}
handler.command = /^teba$/i
handler.limit = true

export default handler
