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

const handler = async (
  m,
  { conn, usedPrefix, command, args, APIKeys, APIs },
) => {
  const q = m.quoted ? m.quoted : m;
  const mime = q.mtype || "";
  if (!/image/g.test(mime)) {
    return m.reply(
      `Reply or send image with caption *${usedPrefix + command}*`,
    );
  }
  const prompt = args[0] || "124"; // default style is cowboy, usage: avatarme <style>

  await m.reply(wait);
  const media = await q.download();
  // const buffer = Buffer.isBuffer(media) ? media : Buffer.from(media, "utf-8");
  const url = await catbox(media);
  const body = JSON.stringify({
    exapand_ratio: prompt,
    init_image: url,
  });
  const headers = {
    accept: "application/json",
    Authorization: "Bearer " + APIKeys[APIs["rose"]],
    "Content-Type": "application/json",
  };
  const response = await fetch("https://api.itsrose.rest/image/outpainting", {
    method: "POST",
    headers,
    body,
  });
  const data = await response.json();
  const { status, message, result } = data;

  if (!status) {
    m.reply(message);
  }
  let buffer = await Buffer.from(result.images[0], "base64");
  await conn.sendFile(m.chat, buffer, "anu.jpg", "*[ outpainting ]*", m);
};

handler.command = ["outpainting"];
handler.help = ["outpainting <reply>"];
handler.tags = ["ai"];
handler.limit = true; handler.error = 0
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
