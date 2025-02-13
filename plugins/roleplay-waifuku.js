/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import canvafy from 'canvafy'
import { googleImage } from '@bochilteam/scraper'

let jarspy = async(m, { args, conn, text }) => {
  // Ambil data user dari global.db.data.users
  let user = global.db.data.users[m.sender]

  // Jika user belum memiliki waifu, tambahkan waifu default jika tidak ada
  if (!user.waifu) {
    user.waifu = '-'
  }

  // Jika user belum memiliki kepercayaan waifu, set nilai default 0
  if (!user.kepercayaanwaifu) {
    user.kepercayaanwaifu = 0
  }

  // Dapatkan hasil pencarian gambar waifu
  const res = await googleImage(`${user.waifu} anime icons`)
  const ress = res.getRandom()
    
  // Jika user tidak memiliki waifu
  if (user.waifu === '-') {
    throw 'Kamu belum mempunyai waifu! Ketik */lamarwaifu* untuk melamar waifu'
  }
  
  // Jika kepercayaan waifu kurang dari 10, waifu putus
  if (user.kepercayaanwaifu < 10) {
    m.reply('Kamu diputusin oleh waifumu karena kepercayaan waifumu berada dibawah 10%! Lamarlah waifu lain lagi.')
    user.waifu = '-'
    user.kepercayaanwaifu = 0
    return
  }

  // Ambil profil pengguna
  const pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg')

  // Buat gambar dengan canvafy
  const p = await new canvafy.Ship()
    .setAvatars(pp, ress)
    .setBackground("image", "https://telegra.ph/file/ce030c54e6f6a7568a5f2.jpg")
    .setBorder("#f0f0f0")
    .setCustomNumber(user.kepercayaanwaifu)
    .setOverlayOpacity(0.5)
    .build();

  // Capitalize nama waifu
  let waifu = `${user.waifu}`
  let kapital = capitalizeFirstLetter(waifu)

  // Caption untuk waifu info
  let caption = `*WAIFU INFO*
💃🏻 Nama Waifu: ${kapital}
💘 Kepercayaan Waifu: ${user.kepercayaanwaifu}% / 100%

⋄ ${user.name} dan ${kapital} adalah sepasang kekasih dengan kehidupan yang sangat bahagia. ${user.name} adalah orang yang sangat beruntung karena mempunyai waifu seperti ${kapital}. Semoga mereka selalu hidup bahagia

Dengan melakukan kencan, kamu dapat menambah kepercayaannya setiap 1%
`.trim()

  // Kirim gambar dan caption
  conn.sendFile(m.chat, p, 'waifu.jpg', caption, m)
}

jarspy.help = ['waifuku']
jarspy.tags = ['roleplay']
jarspy.command = /^(waifuku)$/i

export default jarspy

function capitalizeFirstLetter(str) {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  return words.join(" ");
}