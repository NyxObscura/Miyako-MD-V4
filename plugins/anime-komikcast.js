/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { anime } from "../lib/anime.js";
import { extractImageThumb } from "@adiwajshing/baileys";
import axios from "axios";
import { toPDF } from "../lib/converter.js";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text)
    return m.reply(
      `Masukan Link Atau Title Komiku\n\nContoh :\n${usedPrefix + command} Oshi No Ko\n${usedPrefix + command} https://komiku.id/manga/oshi-no-ko/`,
    );
  if (/komikcast/i.test(text) && /chapter/i.test(text)) {
    global.db.data.settings[conn.user.jid].loading
      ? await m.reply(global.config.loading)
      : false;
    let result = await anime.komikcast.chapter(text);
    let { title, images } = result;

    // Mengambil thumbnail dari gambar pertama
    let jpegThumbnail = await extractImageThumb(images[0]);
    
    // Mengubah buffer gambar menjadi PDF
    let imagepdf = await toPDF(images);

    await conn.sendMessage(
      m.chat,
      {
        document: imagepdf,
        jpegThumbnail,
        fileName: title + ".pdf",
        mimetype: "application/pdf",
      },
      { quoted: m },
    );
  } else if (/komikcast/i.test(text) && /komik/i.test(text)) {
    let resdetail = await anime.komikcast.detail(text);
    let {
      title,
      type,
      status,
      total_chapter,
      lastUpdated,
      image,
      synopsis,
      chapters,
      author,
      released,
      alternativeTitle,
    } = resdetail;
    let caption = `
Title : ${title} (${alternativeTitle})
Author: ${author}
Status : ${status}
Jenis : ${type}
Total Chapter : ${total_chapter}
Terakhir Update : ${lastUpdated}

Description : ${synopsis}
`.trim();
    let rows = [];
    for (let i = 0; i < chapters.length; i++) {
      let results = {
        header: "",
        title: chapters[i].number,
        description: chapters[i].timeAgo,
        id: usedPrefix + "komikcast " + chapters[i].url,
      };
      rows.push(results);
    }
    let buttonMsg = {
      title: "Click Here",
      sections: [
        {
          title: "Komikcast",
          highlight_label: "Popular",
          rows: rows,
        },
      ],
    };
    let buttons = [
      {
        name: "single_select",
        buttonParamsJson: JSON.stringify(buttonMsg),
      },
    ];
    conn.sendButtonImg(
      m.chat,
      image,
      "",
      caption,
      global.config.watermark,
      buttons,
      m,
    );
  } else {
    let data = await anime.komikcast.search(text);
    if (!data.length) return m.reply(`Query ${text} error tidak ditemukan coba lagi nanti`);
    let rows = [];
    for (let i = 0; i < data.length; i++) {
      let results = {
        header: "",
        title: data[i].title,
        description: `Type: ${data[i].type}\nChapter: ${data[i].chapter}`,
        id: usedPrefix + "komikcast " + data[i].link,
      };
      rows.push(results);
    }
    let buttonMsg = {
      title: "Click Here",
      sections: [
        {
          title: "Komikcast",
          highlight_label: "Popular",
          rows: rows,
        },
      ],
    };
    let buttons = [
      {
        name: "single_select",
        buttonParamsJson: JSON.stringify(buttonMsg),
      },
    ];
    conn.sendButton(
      m.chat,
      "",
      "Silahkan pilih komik dibawah",
      global.config.watermark,
      buttons,
      m,
    );
  }
};
handler.help = ["komikcast"];
handler.tags = ["anime"];
handler.command = /^komikcast$/i;
handler.limit = true; handler.error = 0
export default handler;

const delay = (time) => new Promise((res) => setTimeout(res, time));