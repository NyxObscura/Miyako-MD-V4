/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*  
*/

import { Sticker } from 'wa-sticker-formatter'
import fetch from 'node-fetch'
import FormData from 'form-data'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [atas, bawah] = text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Balas gambar dengan perintah\n\n${usedPrefix + command} <${atas ? atas : 'teks atas'}>|<${bawah ? bawah : 'teks bawah'}>`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`
    
    m.reply('WAIT SENSEI')
    
    let img = await q.download()
    
    let form = new FormData()
    form.append('file', img, 'image.png')

    let response = await fetch('https://itzpire.com/tools/upload', {
        method: 'POST',
        body: form,
        headers: {
            'accept': '*/*'
        }
    })

    if (!response.ok) throw 'Gagal mengunggah gambar!'
    let json = await response.json()
    
    if (json.status !== 'success') throw 'Upload gagal!'
    
    let url = json.fileInfo.url
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : ' ')}/${encodeURIComponent(bawah ? bawah : ' ')}.png?background=${url}`
    
    let stiker = await createSticker(meme, false, '', '')
    
    await conn.sendFile(m.chat, stiker, '', '', m, '')
}

handler.help = ['smeme <text>|<text>']
handler.tags = ['sticker']
handler.command = /^(smeme)$/i
handler.limit = true
export default handler

// Fungsi untuk membuat stiker
async function createSticker(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: 'full',
        pack: "",
		author: "miyako pack",
        quality: quality || 100 // Kualitas stiker
    }
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}