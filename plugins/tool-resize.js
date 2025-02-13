/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

// MADE BY KORONEOFC (JANGAN DIHAPUS !!!)

import jimp from "jimp";
import uploadImage from "../lib/uploadImage.js";
import uploadFile from "../lib/uploadFile.js";

let handler = async (m, { conn, usedPrefix, args }) => {
  let towidth = args[0];
  let toheight = args[1];
  if (!towidth) return m.reply("size width?");
  if (!toheight) return m.reply("size height?");

  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("where the media?");
  let isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
  if (!isMedia) return m.reply(`Mime ${mime} tidak didukung`);
  global.db.data.settings[conn.user.jid].loading ?
    await m.reply(global.config.loading) :
    false;
  let media = await q.download();
  let link = await uploadFile(media);

  let source = await jimp.read(await link);
  let size = {
    before: {
      height: await source.getHeight(),
      width: await source.getWidth(),
    },
    after: {
      height: toheight,
      width: towidth,
    },
  };
  let compres = await conn.resize(link, towidth - 0, toheight - 0);
  let linkcompres = await uploadFile(compres, );

  await conn.sendFile(
    m.chat,
    compres,
    null,
    `*––––––『 COMPRESS RESIZE 』––––––*

*• BEFORE*
> ᴡɪᴅᴛʜ : ${size.before.width}
> ʜᴇɪɢʜᴛ : ${size.before.height}

*• AFTER*
> ᴡɪᴅᴛʜ : ${size.after.width}
> ʜᴇɪɢʜᴛ : ${size.after.height}

*• LINK*
> ᴏʀɪɢɪɴᴀʟ : ${link}
> ᴄᴏᴍᴘʀᴇss : ${linkcompres}`,
    m,
  );
};
handler.help = ["resize"];
handler.tags = ["tools"];
handler.command = /^(resize)$/i;

export default handler;