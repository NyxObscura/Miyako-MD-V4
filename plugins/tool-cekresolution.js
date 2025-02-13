/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import jimp from "jimp";
import uploadImage from "../lib/uploadImage.js";
import uploadFile from "../lib/uploadFile.js";

let handler = async (m, { conn, usedPrefixb }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("where the media?");
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;

  let media = await q.download();
  let isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
  let link = await uploadFile(conn, media, "tele");

  let source = await jimp.read(await link);
  let height = await source.getHeight();
  let width = await source.getWidth();

  m.reply(`_*RESOLUTION :*_ ${width} x ${height}

> ᴡɪᴅᴛʜ : ${width}
> ʜᴇɪɢʜᴛ : ${height}

> ʟɪɴᴋ : ${link}`);
};
handler.help = ["cekresolution"];
handler.tags = ["tools"];
handler.command = /^(cekreso(lution)?)$/i;

export default handler;
