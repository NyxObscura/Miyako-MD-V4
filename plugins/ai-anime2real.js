/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";
import axios from "axios";
import url from "../lib/uploadImage.js"


const handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime =
    (q.msg || q).mimetype ||
    q.mediaType ||
    (q.header && q.header.imageMessage && q.header.imageMessage.mimetype) ||
    "";

  if (!mime) {
    return m.reply(
      `Fotonya Mana? \nKirim Foto Dengan Caption ${usedPrefix + command}`,
    );
  }

  if (!/image\/(jpe?g|png)/.test(mime)) {
    return m.reply(`Tipe ${mime} tidak didukung!`);
  }
  await m.reply("Processing, can take a while...")
  let img;
  try {
    if (q.header && q.header.imageMessage) {
      img = await conn.downloadM(q.header.imageMessage, "image");
    } else {
      img = await q.download();
    }
  } catch (error) {
    return m.reply(`Gagal mendownload gambar: ${error.message}`);
  }
  const imageurl = await url(img)
  const jadi = await filters(imageurl, "anime2real");
  await conn.sendFile(m.chat, jadi.url, '', '', m)
};

handler.command = ["anime2real"];
handler.help = ["anime2real <model>"];
handler.tags = ["tools"];
handler.limit = true;
handler.error = 0;

export default handler;


async function filters(imageurl, model) {
  let tryng = 0;

  // Membuat request filters
  let ai = await fetch(`https://ai.xterm.codes/api/img2img/filters?action=${model}&url=${imageurl}&key=vynz772627`)
    .then(response => response.json());

  if (!ai.status) return ai;

  console.log(ai);

  while (tryng < 50) { // Maksimal 50 kali
    tryng += 1; // Menambahkan nilai tryng

    // Pengecekan status request
    let s = await fetch(`https://ai.xterm.codes/api/img2img/filters/batchProgress?id=${ai.id}`)
      .then(response => response.json());

    switch (s.status) {
      case 1:
        //m.reply('Starting...');
        console.log("Starting...");
        break;
      case 2:
        //m.reply('Processing...');
        console.log("Processing...");
        break;
      case 3:
        //m.reply('Success: ' + JSON.stringify(s));
        console.log("Completed");
        return s; // Mengembalikan nilai s
      case 4:
       // m.reply('Error: ' + s.status);
        console.log("Maaf terjadi kesalahan. Coba gunakan gambar lain!");
        return null; // Menghentikan proses karena terjadi kesalahan
      default:
        console.log("Status tidak dikenal: " + s.status);
        break;
    }

    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay 1 detik sebelum mengecek lagi
  }

  console.log("Proses pengecekan status melebihi batas maksimal.");
  return null; // Menghentikan proses setelah mencoba 50 kali
}