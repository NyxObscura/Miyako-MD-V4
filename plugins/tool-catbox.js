/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
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
    if (response) {
      const pesan = `*Pesan Anda berhasil terkirim! 🚀*\n\n*URL:* ${response}`;
      await m.reply(pesan);
    } else {
      await m.reply("Pesan Anda gagal terkirim. 🙁");
    }
  } catch (error) {
    console.error(error);
    await m.reply("Terjadi kesalahan dalam pemrosesan permintaan Anda. 🙁");
  }
};
handler.help = ["catbox"];
handler.tags = ["tools"];
handler.command = /^(catbox)$/i;
export default handler;

async function catbox(content) {
  const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
  const blob = new Blob([content.toArrayBuffer()], {
    type: mime,
  });
  const formData = new FormData();
  const randomBytes = crypto.randomBytes(5).toString("hex");
  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", blob, randomBytes + "." + ext);

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
