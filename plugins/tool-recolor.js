/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";
import uploadImage from "../lib/uploadImage.js";

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime)
    return m.reply(
      `Fotonya Mana? \nKirim Foto Dengan Caption ${usedPrefix + command}`,
    );
  if (!/image\/(jpe?g|png)/.test(mime))
    return m.reply(`Tipe ${mime} tidak didukung!`);

  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;

  let img = await q.download();
  let link = await uploadImage(img);

  let response;
  try {
    response = await axios.get(
      `https://lovita.io/image/recolor?url=${encodeURIComponent(link)}&json=true`,
      {
        headers: {
          accept: "application/json",
          Authorization: "Rk-7803d4309b6ef899ed3e41ff94c7040d",
        },
      },
    );
  } catch (error) {
    return m.reply(`Gagal melakukan recolor: ${error.message}`);
  }

  if (!response.data.status) {
    return m.reply("Gagal melakukan recolor.");
  }

  let base64Image = response.data.result.base64Image;
  let buffer = Buffer.from(base64Image, "base64");
  conn.sendFile(m.chat, buffer, "recolored.jpg", "Ini Dia Kak", m);
};

handler.help = ["recolor"];
handler.tags = ["tools"];
handler.command = /^(recolor)$/i;
handler.limit = true; handler.error = 0

export default handler;
