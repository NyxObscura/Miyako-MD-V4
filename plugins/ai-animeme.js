/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import Uploader from "../lib/uploadImage.js";
import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

const handler = async (m, { conn, usedPrefix, command, args }) => {
  const q = m.quoted ? m.quoted : m;
  const mime =
    (q.msg || q).mimetype ||
    q.mediaType ||
    (q.header && q.header.imageMessage && q.header.imageMessage.mimetype) ||
    "";

  if (!/image\/(jpe?g|png)/.test(mime)) {
    return m.reply(
      `Reply or send an image with caption *${usedPrefix + command}*`,
    );
  }

  const style = args[0] || "pass anything to see styles"; // default style
  const [gender = "male", skin = "default"] = args[1] ? args[1].split("|") : [];

  await m.reply("Wait...");

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

  const url = await catbox(img);

  const body = JSON.stringify({
    type: "url",
    init_image: url,
    style,
  });

  const headers = {
    accept: "application/json",
    Authorization: APIKeys[APIs["rose"]],
    "Content-Type": "application/json",
  };

  const response = await fetch("https://api.itsrose.rest/image/animeMe", {
    method: "POST",
    headers,
    body,
  });

  const data = await response.json();
  const { status, message, result, styles } = data;

  if (!status) {
    if (styles && Array.isArray(styles)) {
      let extra_msg =
        "Available styles:\n\n" +
        styles.map((style, index) => `${index + 1}. ${style}`).join("\n");
      m.reply(extra_msg);
    } else {
      m.reply(message);
    }
    return;
  }

  await conn.sendMessage(
    m.chat,
    { image: { url: result.images[0] } },
    { quoted: m },
  );
};

handler.command = ["animeme"];
handler.help = ["animeme <reply> <style>"];
handler.tags = ["ai"];
handler.limit = true; handler.error = 0
export default handler;

async function catbox(content) {
  const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
  const blob = new Blob([content.toArrayBuffer()], { type: mime });
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
