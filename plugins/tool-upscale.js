/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import axios from "axios";
import uploadImage from "../lib/uploadImage.js";
import upscale from "../lib/scraper/upscale.js";

let handler = async (m, { conn, usedPrefix, command, args }) => {
  const defaultScale = 2;
  const defaultEnhance = false;

  const validScales = [2, 4, 6, 8, 16];
  const scale = args[0] && !args[0].startsWith("--") ? parseInt(args[0]) : defaultScale;
  if (!validScales.includes(scale)) {
    return m.reply(`Nilai untuk scale harus salah satu dari: ${validScales.join(", ")}.`);
  }

  const isAnime = args.includes("--anime");
  const enhance = isAnime ? true : (args[1] && args[1] === 'true' ? true : defaultEnhance);

  let q = m.quoted ? m.quoted : m;
  let mime =
    (q.msg || q).mimetype ||
    q.mediaType ||
    (q.header && q.header.imageMessage && q.header.imageMessage.mimetype) ||
    "";

  if (!mime) {
    return m.reply(
      `Fotonya mana? Kirim foto dengan caption ${usedPrefix + command} [scale] [--anime].`
    );
  }

  if (!/image\/(jpe?g|png)/.test(mime)) {
    return m.reply(`Tipe ${mime} tidak didukung!`);
  }

  global.db.data.settings[conn.user.jid].loading ?
    await m.reply(global.config.loading) :
    false;

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

  let response;
  try {
    response = await upscale(img, scale, enhance);
  } catch (error) {
    return m.reply(`Gagal melakukan upscale: ${error.message}`);
  }

  if (!response || !response.status) {
    return m.reply("Gagal melakukan upscale.");
  }

  const effectType = isAnime ? "ANIME HD" : "HD";
  conn.sendFile(
    m.chat,
    response.image,
    "upscaled.jpg",
    `🌟 *Effect*: ${effectType}\n📩 *Request by*: @${m.sender.split("@")[0]}\n✨ *Source*: Takde\n🔍 *Skala*: ${scale}\n📏 *Skala available*: ${validScales.join(", ")}`,
    m
  );
};

handler.help = ["upscale"];
handler.tags = ["tools"];
handler.command = /^(upscale|hd(r)?)$/i;
handler.limit = true;
handler.error = 0;

export default handler;