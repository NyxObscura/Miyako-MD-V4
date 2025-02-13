/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { spotifydl, searching } from "../lib/spotifydl.js";
import fetch from "node-fetch";
import canvafy from "canvafy";

async function handler(m, { conn, usedPrefix, command, text }) {
  try {
    if (!text) {
      return m.reply(
        `Masukkan Query atau Link\n\nContoh :\n${usedPrefix + command} Stereo love`
      );
    }

    if (/open.spotify.com/i.test(text)) {
      const res = await spotifydl(text);

      if (!res || !res.download) {
        throw new Error("Tidak dapat memproses tautan Spotify tersebut.");
      }

      const captionvid = `∘ Title: ${res.title}\n∘ Artist: ${res.artist}\n∘ Duration: ${res.durasi}`;
      
      const p = await new canvafy.Spotify()
        .setTitle(res.title || "Unknown Title")
        .setAuthor("Spotify Downloader")
        .setTimestamp(40, 100)
        .setOverlayOpacity(0.8)
        .setBorder("#fff", 0.8)
        .setImage(res.image || "https://via.placeholder.com/150")
        .setBlur(3)
        .build();

      await conn.sendFile(m.chat, p, "spotify-image.jpg", captionvid, m);
      await conn.sendFile(
        m.chat,
        res.download,
        `${res.title || "audio"}.mp3`,
        "",
        m,
        false,
        { mimetype: "audio/mpeg" }
      );
    } else {
      const hasil = await searching(text);

      if (!hasil || !hasil.data || !hasil.data.length) {
        return m.reply("Tidak ditemukan hasil pencarian untuk query tersebut.");
      }

      const body = hasil.data
        .map((v, i) => {
          return `_*${i + 1}. ${v.title}*_\n❃ Popularity : ${v.popularity}\n❃ Link : ${v.url}`;
        })
        .join("\n\n");

      const head = `silahkan reply chat untuk mendownload*_\n\n`;

      const aliases = hasil.data.map((v, i) => ({
        alias: `${i + 1}`,
        response: `${usedPrefix + command} ${v.url}`,
      }));

      await conn.sendAliasMessage(
        m.chat,
        { text: `[ Spotify downloader ]\n\n${head}${body}` },
        aliases,
        m
      );
    }
  } catch (error) {
    console.error(error);

    if (global.db && global.db.data && global.db.data.users[m.sender]) {
      global.db.data.users[m.sender].limit += 1;
    }

    conn.reply(
      m.chat,
      `Terjadi kesalahan. Silakan coba lagi nanti. \nError:\n ${error.message || error}`,
      m
    );
  }
}

handler.help = ["spotify"].map((v) => v + " <query>");
handler.tags = ["sound"];
handler.command = /^spotify$/i;

handler.onlyprem = true;
handler.limit = true;
handler.error = 0;

export default handler;