/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

let handler = async (m, { args, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || "";
    if (!mime) return m.reply("No media found");
    let media = await q.download();
    await m.reply(wait);

    const response = await catbox(media);

    const pesan = await fetch(`https://aemt.me/whatmusic?url=${response}`);
    let ress = await pesan.json();

    await m.reply(ress.result);
    await sleep(1000); // Menambah jeda 1 detik antara setiap pesan
  } catch (error) {
    console.error(error);
    await m.reply("Terjadi kesalahan dalam pemrosesan permintaan Anda. 🙁");
  }
};

handler.help = ["catbox"];
handler.tags = ["tools"];
handler.command = /^(what|whatmusic|whatlagu)$/i;
export default handler;

async function catbox(content) {
  const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
  const blob = new Blob([content.toArrayBuffer()], { type: mime });
  const formData = new FormData();
  const randomBytes = crypto.randomBytes(5).toString("hex");
  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", blob, `${randomBytes}.${ext}`);

  const response = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: formData,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36",
    },
  });

  return await response.text();
}

// Fungsi tambahan untuk menambahkan jeda
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
