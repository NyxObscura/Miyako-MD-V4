/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

const handler = async (m, { conn }) => {
  try {
    let img;

    if (
      m.quoted &&
      m.quoted.mimetype &&
      m.quoted.mimetype.startsWith("video/")
    ) {
      img = await m.quoted.download();
    } else if (m.mimetype && m.mimetype.startsWith("video/")) {
      img = await m.download();
    } else {
      m.reply("Reply atau kirim video yang mau diupload");
    }

    const upload = await buffer(img);
    await m.reply(upload);
  } catch (error) {
    await m.reply("Terjadi kesalahan: " + error.message);
  }
};
handler.tags = ["tools"];
handler.help = ["upvidey (reply video)"];
handler.command = ["upvidey"];
export default handler;

async function buffer(imgBuffer) {
  const { ext, mime } = await fileTypeFromBuffer(imgBuffer);
  let form = new FormData();
  const blob = new Blob([imgBuffer], { type: mime });
  form.append("file", blob, "tmp." + ext);

  let res = await fetch("https://videy.co/api/upload", {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error("Gagal mengupload video");
  }

  let vid = await res.json();
  if (!vid || !vid.id) throw new Error("Error dalam mendapatkan ID video");

  return "https://cdn.videy.co/" + vid.id + ".mp4";
}
