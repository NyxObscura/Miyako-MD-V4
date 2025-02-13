/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import pindl from '../lib/pindl.js';

const handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply(
      "Silakan masukkan URL Pinterest.\n\n*Contoh:* https://id.pinterest.com/×××××"
    );
  }
  if (!/pin/i.test(text)) {
    return m.reply("URL tidak valid. Harap masukkan URL Pinterest yang benar.");
  }

  try {
    await m.reply(wait);
    const api = await pindl(text);

    if (!api) {
      return m.reply("Gagal mendapatkan data. Pastikan URL benar atau coba lagi nanti.");
    }

    const { 
      title, 
      thumb, 
      upload, 
      source, 
      author, 
      keyword, 
      download 
    } = api;

    const mediaType = download.includes(".mp4") ? "video" : "image";
    const infoTambahan = `
🎨 *Pinterest Downloader*

📌 *Judul:* ${title || "Tidak diketahui"}
📅 *Diunggah pada:* ${upload || "Tidak tersedia"}
✏️ *Pembuat:* ${author.name || "Tidak diketahui"} (${author.username || "Tidak tersedia"})
🔗 *URL Profil:* ${author.url || "Tidak tersedia"}
🔍 *Kata Kunci:* ${keyword.length ? keyword.join(", ") : "Tidak tersedia"}
🌐 *Sumber:* ${source || "Tidak tersedia"}
📥 *URL Download:* ${download || "Tidak tersedia"}`.trim();

    await conn.sendMessage(
      m.chat,
      {
        [mediaType]: { url: download },
        caption: infoTambahan,
        thumbnail: mediaType === "video" ? { url: thumb } : undefined,
      },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    m.reply(
      `Terjadi kesalahan saat memproses permintaan Anda.\n\n*Error:* ${error.message}`
    );
  }
};

handler.command = ["pindl"];
handler.help = ["pindl <url>"];
handler.tags = ["downloader"];
handler.limit = true;

export default handler;