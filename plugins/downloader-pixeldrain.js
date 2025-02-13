/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import pixel from "../lib/pixeldrain.js"
import axios from "axios"

const handler = async (m, { conn, text }) => 
{
  if(!text) return m.reply("masukan link nya")
  let ephemeral =
    conn.chats[m.chat]?.metadata?.ephemeralDuration ||
    conn.chats[m.chat]?.ephemeralDuration ||
    false;
  const { name, mime_type, size, link } = await pixel(text)
  await m.reply(`Sedang Mendownload *[ ${name} ]* mohon tunggu sebentar`)
  const fileSizeInBytes = await getFileSize(link);
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    if (fileSizeInMegabytes > 100) {
      // Ambil dan resize thumbnail dari REST API
      

      await conn.sendMessage(
        m.chat,
        {
          document: { url: link },
          mimetype: mime_type,
          fileName: name,
          pageCount: 2024,
          fileLength: fileSizeInBytes,
        },
        { quoted: m }
      );
    } else {
      await conn.sendMessage(
        m.chat,
        {
          video: { url: link },
          fileName: name,
          mimetype: mime_type,
          caption: name,
        },
        { quoted: m, ephemeralExpiration: ephemeral }
      );
    }
}
handler.help = ["pixeldrain"]
handler.tags = ["downloader"]
handler.command = ["pixeldrain"]
handler.limit = true
handler.onlyprem = true
handler.error = 0
export default handler


async function getFileSize(url) {
  try {
    const res = await axios.head(url);
    return parseInt(res.headers["content-length"], 10);
  } catch (err) {
    return 0;
  }
}