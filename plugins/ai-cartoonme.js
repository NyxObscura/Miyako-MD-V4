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
  const mime = q.mtype || "";
  if (!/image/g.test(mime)) {
    return m.reply(
      `Reply or send image with caption *${usedPrefix + command}*`,
    );
  }
  const style = args[0] || "pass anything to see styles"; // default style
  const [gender = "male", skin = "default"] = args[1] ? args[1].split("|") : [];
  await m.reply("Wait...");
  const media = await q.download();
  const url = await catbox(media);
  const body = JSON.stringify({
    type: "url",
    init_image: url,
    style,
  });
  const headers = {
    accept: "application/json",
    Authorization: "Rk-7803d4309b6ef899ed3e41ff94c7040d",
    "Content-Type": "application/json",
  };
  const response = await fetch("https://api.itsrose.rest/image/cartoonMe", {
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

handler.command = ["cartoonme"];
handler.help = ["cartoonme <reply> <style>"];
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
