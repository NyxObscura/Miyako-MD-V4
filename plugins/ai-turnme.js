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

  let [style, prompt, skin, strength] = args.join(" ").split(" | ");
  if (!style) style = "anime"; // default style is anime
  if (!prompt) prompt = ""; // default prompt is empty
  if (!skin) skin = "default"; // default skin is default
  if (!strength) strength = 0.6; // default strength is 0.6

  await m.reply(global.config.wait); // Ensure `wait` is defined in your global configuration

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
    init_image: url,
    style,
    skin,
    image_num: 1,
    prompt,
    strength,
  });

  const headers = {
    accept: "application/json",
    Authorization: global.rose,
    "Content-Type": "application/json",
  };

  const response = await fetch("https://api.itsrose.rest/image/turnMe", {
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

  const tek = `------------ *[ TurnMe ]* ------------
- *Id:* ${result.correlation_id || "gada"}
- *GeneratingTime:* ${Math.round(result.execute_time)} second
- *prompt:* ${result.metadata.prompt || ""}
- *style:* ${result.metadata.style}
- *skin:* ${result.metadata.skin}
- *width:* ${result.metadata.width}
- *height:* ${result.metadata.height}
${global.config.wm}
`;

  await conn.sendFile(m.chat, result.images[0], "anu.jpg", tek, m);
};

handler.command = ["turnme"];
handler.help = ["turnme <reply> [style] | [prompt] [skin] [strength]"];
handler.tags = ["ai", "premium"];
handler.premium = true; handler.error = 0

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
