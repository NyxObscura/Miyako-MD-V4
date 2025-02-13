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

  const style = args[0] || "cowboy"; // default style is cowboy, usage: avatarme <style>
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
    return m.reply(`Failed to download image: ${error.message}`);
  }

  const url = await Uploader(img);

  const body = JSON.stringify({
    init_image: url,
    style,
    skin,
    gender,
  });

  const headers = {
    accept: "application/json",
    Authorization: APIKeys[APIs["rose"]],
    "Content-Type": "application/json",
  };

  const response = await fetch("https://api.itsrose.rest/image/avatarMe", {
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

handler.command = ["avatarme"];
handler.help = ["avatarme <reply>"];
handler.tags = ["ai"];
handler.limit = true; handler.error = 0
export default handler;
