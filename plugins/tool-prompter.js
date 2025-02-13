/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*
 * @Author: Cifumo
 * @Web: https://rest.cifumo.biz.id
 */

import axios from "axios";
import uploadImage from "../lib/uploadImage.js";

let handler = async (m, { conn, usedPrefix, command }) => {
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

  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;

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

  let link;
  try {
    link = await uploadImage(img);
  } catch (error) {
    return m.reply(`Gagal mengupload gambar: ${error.message}`);
  }

  let response;
  try {
    response = await axios.get(
      `https://api.itsrose.rest/image/stable/prompter?url=${encodeURIComponent(link)}`,
      {
        headers: {
          accept: "application/json",
          Authorization: APIKeys[APIs['rose']],
        },
      },
    );
  } catch (error) {
    return m.reply(`Gagal mendapatkan prompt: ${error.message}`);
  }

  let result = response.data;
  if (!result.status || !result.result || !result.result.prompt) {
    return m.reply("Gagal mendapatkan prompt.");
  }

  await m.reply(result.result.prompt, false, false, { smlmap: false });
};

handler.command = ["prompt"];
handler.tags = ["ai", "tools"];
handler.help = ["prompt"];
handler.limit = true; handler.error = 0

export default handler;