/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from 'node-fetch'

let handler = async function (m, { conn, text, usedPrefix, command }) {
  try {
    if (!text) throw `Mau Cari Anime Apa?\n\nContoh: ${usedPrefix + command} Yarinaoshi`
    
    await m.reply(global.wait)
    
    // Fetch data from the new API
    let res = await fetch(`https://api.agatz.xyz/api/otakudesu?message=${text}`)
    let json = await res.json()
    
    // Check if the API response is successful and contains data
    if (json.status !== 200 || !json.data || json.data.search_results.length === 0) {
      throw 'Gagal mendapatkan data anime atau Anime tidak ditemukan'
    }

    let animeList = json.data.search_results

    // Prepare the message to send
    let resultText = `*Hasil Pencarian Anime:*\n\n`
    animeList.forEach((anime, index) => {
      let genres = anime.genre_list.map(genre => `[${genre.genre_title}](${genre.genre_link})`).join(', ')
      resultText += `
${index + 1}. *Judul:* ${anime.title}
   *Status:* ${anime.status}
   *Skor:* ${anime.score}
   *Genre:* ${genres}
   *Link Streaming:* ${anime.link}
   *Thumbnail:* ${anime.thumb}
   *Link lebih lanjut:* [Klik di sini](${anime.link})
`
    })

    // Send the result to the user as a message
    await conn.sendMessage(m.chat, { text: resultText }, { quoted: m })

  } catch (e) {
    console.log(e)
    throw 'Judul Tidak Ditemukan'
  }
}

handler.help = ['otakudesu']
handler.tags = ['anime']
handler.command = /^otakudesu$/i

handler.limit = true

export default handler