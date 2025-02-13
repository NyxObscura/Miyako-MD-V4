/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import axios from "axios";
import yt from "../lib/scraper/yt.js";

const handler = async (m, { conn, args, command, usedPrefix }) => {
  conn.youtube = conn.youtube || {};

  if (!args[0])
    return m.reply(
      `Masukan Link Youtube!\n\nContoh :\n${usedPrefix + command} https://youtu.be/Wky7Gz_5CZs`
    );
  if (
    !/https:\/\/www.youtube.com/i.test(args[0]) &&
    !/https:\/\/youtube.com/i.test(args[0]) &&
    !/https:\/\/youtu.be/i.test(args[0])
  )
    return m.reply("Masukkan URL YouTube yang benar");

  const id = m.sender;
  if (id in conn.youtube) return m.reply("Kamu masih mendownload!");

  let ephemeral =
    conn.chats[m.chat]?.metadata?.ephemeralDuration ||
    conn.chats[m.chat]?.ephemeralDuration ||
    false;

  try {
    conn.youtube[id] = true;
    let setting = global.db.data.settings[conn.user.jid];

      let dl = await yt.mp4(args[0])
      let apalah = await ytdl(args[0])
      let title = dl.title || apalah.title
      let { views, thumbnail, duration, description } = dl.metadata
     let fileSizeInBytes = await Buffer.byteLength(dl.media)

   let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

    let text = "*[ Youtube Downloader ]*\n\n";
    text += `╔╾┅━┅━┅━┅━┅━┅━┅━┅⋄\n`
    text += `┇ ❏ \`Title:\` ${title}\n`;
    text += `║ ❏ \`view:\` ${views || 'Null'}\n`;
    text += `┇ ❏ \`Category:\` Video (mp4)\n`;
    if (duration) text += `║ ❏ \`Duration:\` ${duration}\n`;
    text += `┇ ❏ \`File Size:\` ${fileSizeInMegabytes.toFixed(2)} MB\n`;
    text += `╚╾┅━┅━┅━┅━┅━┅━┅━┅⋄`

    const fChat = await conn.adReply(
      m.chat,
      text,
      title || 'none',
      duration || "none",
      thumbnail || apalah.thumbnail,
      args[0],
      m
    );

    const jpegThumbnail = await conn.resize(
      thumbnail || apalah.thumbnail,
      400,
      400
    );

    if (fileSizeInMegabytes > 200) {
      await conn.sendMessage(
        m.chat,
        {
          document: dl.media,
          mimetype: "video/mp4",
          fileName: `${title}.mp4`,
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
          video: dl.media,
          fileName: `${title}.mp4`,
          mimetype: "video/mp4",
          caption: setting.smlcap ? conn.smlcap(title) : title,
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

handler.help = ["ytmp4"];
handler.tags = ["downloader"];
handler.command = /^(yt(mp4|video)?|youtube(mp4|video)?)$/i;
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

async function ytdl(url) {
  try {
    const res = await fetch(
      `https://cdn35.savetube.me/info?url=${encodeURIComponent(url)}`
    );
    const data = (await res.json())?.data ?? null;
    if (!data) return null;
    return {
      title: data.title,
      thumbnail: data.thumbnail,
      duration: data.duration,
      video_formats: data.video_formats,
    };
  } catch {
    return null;
  }
}