/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 

import { character } from '../lib/scrape.js';

const handler = async (m, { conn, text }) => {

  // Meminta input nama waifu
  if (!text) return conn.reply(m.chat, '⚠️ Masukkan nama waifu yang ingin dicari! 📝\nContoh: ketik *wsc Rem* untuk mencari waifu Rem.', m);

  // Cek apakah pengguna sudah memiliki waifu
  if (global.db.data.users[m.sender].waifusimulasi?.waifu) return m.reply('😏 Kamu sudah punya waifu loh! Nggak boleh gonta-ganti waifu! ❤️');

  // Jika waifusimulasi belum ada, buat struktur default
  if (!global.db.data.users[m.sender].waifusimulasi) {
    global.db.data.users[m.sender].waifusimulasi = {
      waifu: null,
      relationshipStart: null,
      loveLevel: 0,
      exp: 0,
      expNeeded: 100,
      money: global.db.data.users[m.sender].bank || 10000, // Default ke 10000 jika bank belum ada
      house: null,
      children: 0
    };
  }

  // Gunakan fungsi scrape untuk mengambil data waifu
  const waifu = await character(text);

  // Jika waifu tidak ditemukan
  if (!waifu || !waifu.image) return conn.reply(m.chat, '🙅‍♂️ Waifu tidak ditemukan!\nCoba lagi dengan nama yang benar ya! 😊', m);

  // Update data waifusimulasi dengan waifu yang ditemukan
  global.db.data.users[m.sender].waifusimulasi.waifu = waifu.name;
  global.db.data.users[m.sender].waifusimulasi.relationshipStart = new Date();
  global.db.data.users[m.sender].waifusimulasi.loveLevel = 1;
  global.db.data.users[m.sender].waifusimulasi.exp = 0;
  global.db.data.users[m.sender].waifusimulasi.expNeeded = 100;

  // Mengirim pesan konfirmasi dengan gambar waifu
  const message = `
🎉 *Selamat! Waifu berhasil ditemukan!* 🎉
💖 Nama Waifu: *${waifu.name}* 💖
💑 Hubungan kalian dimulai hari ini! Mulai jalin kisah cinta dengan *${waifu.name}* dan tingkatkan level cinta kalian! 💕

📅 Hubungan dimulai: *${new Date().toLocaleDateString()}*
🔮 Level Cinta: *1*
🎮 EXP: *0/100*
🏠 Rumah: Belum ada 🏡
👶 Anak: *0*

💰 Uang: *${global.db.data.users[m.sender].waifusimulasi.money}* 💸
Mulai petualangan cintamu sekarang! 😍`;

  // Mengirim gambar waifu bersama pesan
  conn.sendFile(m.chat, waifu.image, '', message, m);
};

handler.command = ['wsc', 'waifusimulatotcari', 'waifusimulatorsearch'];

export default handler;
//comming soon