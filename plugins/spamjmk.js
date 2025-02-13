/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("Nomernya?");
  
  const target = text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
  if (!/^\d+$/.test(text)) return m.reply("Nomor tidak valid!");

  const jomok = path.resolve("./media"); // Sesuaikan path dengan lokasi folder
  console.log("Resolving path to media:", jomok); // Debugging path
  if (!fs.existsSync(jomok)) {
    return m.reply("Directory sticker tidak ditemukan!");
  }

  const files = fs.readdirSync(jomok).filter((file) => file.endsWith(".webp"));
  if (files.length === 0) {
    return m.reply("Format tidak didukung atau directory kosong!");
  }

  m.reply(`Mengirim ${files.length} stiker ke ${text}. Mohon tunggu...`);

  for (const file of files) {
    const filePath = path.join(jomok, file);
    try {
      await conn.sendMessage(target, { sticker: { url: filePath } }, { quoted: m });
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (err) {
      console.error(`Gagal mengirim stiker ${file}:`, err);
      m.reply(`Gagal mengirim stiker ${file}`);
    }
  }

  m.reply(`Semua stiker telah dikirim ke ${text}!`);
};

handler.command = /^(spam)$/i;
handler.owner = true;
handler.limit = true;

export default handler;