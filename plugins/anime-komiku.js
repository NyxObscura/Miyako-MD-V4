/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { komikuId } from "@xct007/frieren-scraper";
import { anime } from "../lib/anime.js";
import { extractImageThumb } from "@adiwajshing/baileys";
import axios from "axios";
import { toPDF } from "../lib/converter.js";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text)
    return m.reply(
      `Masukan Link Atau Title Komiku\n\nContoh:\n${usedPrefix + command} Oshi No Ko\n${usedPrefix + command} https://komiku.id/manga/oshi-no-ko/`,
    );

  if (/komiku/i.test(text) && /manga/i.test(text)) {
    // Detail manga
   let { title, metadata, image, sinopsis, chapters } = await anime.komiku.detail(text);
   const genre = metadata.genre.map((a) => a).join(", ")
    let caption = `
Title : ${title} (${metadata.judul_indonesia})
Status : ${metadata.status}
Jenis : ${metadata.jenis_komik}
Cerita : ${metadata.konsep_cerita}
Pembaca : ${metadata.umur_pembaca}
Genre : ${genre}

sinopsis : ${sinopsis}
`.trim();
    let rows = chapters.map((item, i) => [
      '',
      `Judul: ${item.title}`,
      `Chapter: ${item.chapter}`,
      usedPrefix + "komiku " + item.url
      ]
    );

    conn.sendImgList(m.chat, image, '', caption, '> Komiku by Bot', 'Klik disini Untuk Memilih chapter', 'List chapter', rows, m);
  } else if (/komiku/i.test(text) && /ch|chapter/i.test(text)) {
    // Detail chapter
    if (global.db.data.settings[conn.user.jid].loading) {
      await m.reply(global.config.loading);
    }
    let { title, judul, tanggal_rilis, images } = await anime.komiku.chapter(text);
    let { data } = await conn.getFile(images.getRandom().url);
    let pdf = await toPDF(images.url)
    let jpegThumbnail = await extractImageThumb(data);

    await conn.sendMessage(
      m.chat,
      {
        document: pdf,
       jpegThumbnail,
        fileName: `${title}.pdf`,
        mimetype: "application/pdf",
      },
      { quoted: m },
    );
  } else {
    let data = await anime.komiku.search(encodeURIComponent(text));
    if (data?.error) return m.reply(`Query ${text} tidak ditemukan!`);

    let rows = data.map((item, i) => [
      '',
      `Judul: ${item.title}`,
      `Total Chapter: ${item.chapter.akhir}`,
      usedPrefix + "komiku " + item.link
      ]
    );

    conn.sendImgList(m.chat, data[0].image, '', 'Komiku search', '> Komiku by Bot', 'Klik disini Untuk Memilih Komik', 'List Komik', rows, m);
  }
};

handler.help = ["komiku"];
handler.tags = ["anime"];
handler.command = /^komiku$/i;
handler.limit = true;
handler.error = 0;

export default handler;

const delay = (time) => new Promise((res) => setTimeout(res, time));