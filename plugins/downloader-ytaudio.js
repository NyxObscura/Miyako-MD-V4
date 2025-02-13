/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fs from "fs";
import axios from "axios";
import yt from "../lib/scraper/yt.js"
//import { toAudio } from "../lib/converter.js";

let handler = async (m, { conn, args, command, usedPrefix }) => {
  conn.youtube = conn.youtube || {};
  if (!args[0])
    return m.reply(
      `Masukan Link Youtube!\n\nContoh :\n${usedPrefix + command} https://youtu.be/Wky7Gz_5CZs`
    );
  let id = m.sender;

  const getRandom = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`;

  let ephemeral =
    conn.chats[m.chat]?.metadata?.ephemeralDuration ||
    conn.chats[m.chat]?.ephemeralDuration ||
    false;
  if (id in conn.youtube) return m.reply("Kamu Masih Mendownload!");

  try {
    conn.youtube[id] = true;

    // Pertama coba dengan YTDL
    let dl = await yt.mp3(args[0]);

    //const mp3 = await toAudio(audioBuffer, "mp4");
    const title = dl.title || "N/A";
    const thumbnailUrl = dl.metadata.thumbnail
    const duration = dl.metadata.duration || "";
    const view = dl.metadata.views || "N/A";
    const desk = dl.metadata.description || "N/A";

    // Hitung ukuran file dalam MB
    const fileSizeInBytes = await Buffer.byteLength(dl.media)
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

    let text = "*[ Youtube Downloader ]*\n\n";
    text += `╔╾┅━┅━┅━┅━┅━┅━┅━┅⋄\n`
    text += `┇ ❏ \`Title:\` ${title || title2}\n`;
    text += `║ ❏ \`view:\` ${view || 'Tidak Terdeteksi'}\n`;
    text += `┇ ❏ \`Category:\` Audio (mp3)\n`;
    if (duration) text += `║ ❏ \`Duration:\` ${duration}\n`;
    text += `┇ ❏ \`File Size:\` ${fileSizeInMegabytes.toFixed(2)} MB\n`;
    text += `╚╾┅━┅━┅━┅━┅━┅━┅━┅⋄`

    const fChat = await conn.adReply(
      m.chat,
      text,
      title,
      duration ? `Duration: ${duration || ""}\nSource: ${dl.author || ""}` : "",
      thumbnailUrl,
      args[0],
      m
    );

    if (fileSizeInMegabytes > 60) {
      // Ambil dan resize thumbnail dari REST API
      const jpegThumbnail = await conn.resize(thumbnailUrl, 400, 400);

      // Jika file lebih dari 60MB, kirim sebagai dokumen
      await conn.sendMessage(
        m.chat,
        {
          document: dl.media,
          mimetype: "audio/mpeg",
          fileName: `${title}.mp3`,
          pageCount: 2024,
          jpegThumbnail,
          fileLength: fileSizeInBytes,
        },
        { quoted: fChat }
      );
    } else {
      await conn.sendMessage(
        m.chat,
        {
          audio: dl.media,
          fileName: `${title}.mp3`,
          mimetype: "audio/mpeg",
        },
        { quoted: fChat, ephemeralExpiration: ephemeral }
      );
    }
  } catch (e) {
    throw e;
  } finally {
    delete conn.youtube[id];
  }
};

handler.help = ["ytmp3"];
handler.tags = ["downloader"];
handler.command = /^y((outube|tb)audio|(outube|tb?)mp3|utubaudio|taudio|ta)$/i;
handler.limit = true;
handler.onlyprem = true
handler.error = 0;
export default handler;

async function getFileSize(url) {
  try {
    const res = await axios.head(url);
    return parseInt(res.headers["content-length"], 10);
  } catch (err) {
    return 0;
  }
}

async function toBuffer(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer", // Pastikan respons diterima sebagai buffer
    });
    const buffer = Buffer.from(response.data, "binary");
    return buffer;
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw error;
  }
}