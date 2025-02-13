/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
const {
  default: { Image },
} = await import("node-webpmux");

let handler = async (m, { conn, text }) => {
  if (!m.quoted) return m.reply("Reply a sticker!");
  let stiker = false;
  try {
    let [packname, ...author] = text.split("|");
    author = (author || []).join("|");
    let mime = m.quoted.mimetype || "";
    if (!/webp/.test(mime)) return m.reply("Reply sticker!");
    let img = await m.quoted.download();
    if (!img) return m.reply("Reply a sticker!");
    stiker = await addExif(img, packname || "", author || "");
  } catch (e) {
    console.error(e);
    if (Buffer.isBuffer(e)) stiker = e;
  } finally {
    if (stiker) conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m });
    else throw "Conversion failed";
  }
};
handler.tags = ["sticker"];
handler.help = ["anticolong <reply sticker>"];
handler.command = /^(anticolong|smeta)$/i;
handler.premium = true; handler.error = 0

export default handler;

async function addExif(
  buffer,
  packname,
  author,
  categories = [""],
  extra = {},
) {
  const img = new Image();
  const json = {
    "sticker-pack-id": "parel-kntll",
    "sticker-pack-name": packname,
    "sticker-pack-publisher": author,
    emojis: categories,
    "is-avatar-sticker": 1,
    ...extra,
  };
  let exifAttr = Buffer.from([
    0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
    0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
  ]);
  let jsonBuffer = Buffer.from(JSON.stringify(json), "utf8");
  let exif = Buffer.concat([exifAttr, jsonBuffer]);
  exif.writeUIntLE(jsonBuffer.length, 14, 4);
  await img.load(buffer);
  img.exif = exif;
  return await img.save(null);
}
