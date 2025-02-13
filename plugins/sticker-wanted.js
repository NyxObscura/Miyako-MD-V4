/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import uploadImage from "../lib/uploadImage.js";
import { sticker } from "../lib/sticker.js";
import { webp2png } from "../lib/webp2mp4.js";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!/image\/(jpe?g|png|webp)/.test(mime))
    return m.reply(`Gambar Yang Anda Masukan Tidak Didukung`);
  
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  
  let img = await q.download();
  let meme;

  // Jika mimetype adalah webp, konversi ke png dan langsung gunakan ke API
  if (/image\/webp/.test(mime)) {
    img = await webp2png(img);
    meme = global.API(
      "lol",
      "/api/creator1/wanted",
      { img: img },
      "apikey",
    );
  } else {
    let anu = await uploadImage(img);
    meme = global.API(
      "lol",
      "/api/creator1/wanted",
      { img: anu },
      "apikey",
    );
  }

  let stiker = await sticker(
    false,
    meme,
    global.config.stickpack,
    global.config.stickauth,
  );
  conn.sendFile(m.chat, stiker, "", "", m);
};

handler.help = ["wanted"];
handler.tags = ["sticker"];
handler.command = /^(wanted)$/i;
handler.limit = true; handler.error = 0

export default handler;