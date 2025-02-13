/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*  
*/

import fetch from 'node-fetch';
import natural from 'natural';
import yete from '../lib/scraper/yt.js';

async function GeminiImage(image, query) {
  const response = await fetch(`https://ai.xterm.codes/api/img2txt/gemini-image?key=Bell409`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image, query }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Network response was not ok: ${response.statusText}. Response body: ${errorData}`);
  }

  const data = await response.json();
  return data.response;
}

const handler = async (m, { conn, text, isAdmin, isBotAdmin, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `Haii Sensei,miyako disini untuk membantu Sensei😆`,
    );

  function checkText(text) {
    const lowerCaseText = text.toLowerCase();
    if (
      lowerCaseText.includes("cariin") ||
      lowerCaseText.includes("carikan") ||
      lowerCaseText.includes("putarin") ||
      lowerCaseText.includes("putarkan")
    ) {
      return "ok";
    } else {
      return "no";
    }
  }

  if (text.includes("group") && text.includes("tutup")) {
    if (!isBotAdmin)
      return m.reply(
        `Gomenne, miyako harus jadi admin supaya bisa menggunakan perintah ini. 😔`,
      );
    if (!isAdmin)
      return m.reply(
        `Gomenne, cuman admin yang bisa menggunakan perintah ini. 😔`,
      );

    await conn.groupSettingUpdate(m.chat, "announcement");
    m.reply(`haikk,Miyako sudah tutup grup. Semoga lebih teratur ya~ 😉`);
  } else if (text.includes("group") && text.includes("buka")) {
    if (!isBotAdmin)
      return m.reply(
        `Gomenne, miyako harus jadi admin supaya bisa menggunakan perintah ini. 😔`,
      );
    if (!isAdmin)
      return m.reply(
        `Gomenne, cuman admin yang bisa menggunakan perintah ini. 😔`,
      );

    await conn.groupSettingUpdate(m.chat, "not_announcement");
    m.reply(`haikk,Miyako sudah membuka grup. Ayo kita  nimbrung bersama~ 😉`);
  } else if (text.includes("kick") || text.includes("kik")) {
    if (!isBotAdmin)
      return m.reply(
        `Gomenne, Miyako harus jadi admin supaya bisa menggunakan perintah ini. 😔`,
      );
    if (!isAdmin)
      return m.reply(
        `Gomenne, cuman admin yang bisa menggunakan perintah ini. 😔`,
      );

    let users = m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
        ? m.quoted.sender
        : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    await conn.groupParticipantsUpdate(m.chat, [users], "remove");
    m.reply(`Maaf Ya Terpaksa Miyako Kick 😖, Perintah Admin Sih..`);
  } else if (text.includes("hentai")) {
    const getHentaiList = async () => {
      const page = Math.floor(Math.random() * 1153);
      const response = await fetch(`https://sfmcompile.club/page/${page}`);
      const htmlText = await response.text();
      const $ = cheerio.load(htmlText);

      const hasil = [];
      $("#primary > div > div > ul > li > article").each(function (a, b) {
        hasil.push({
          title: $(b).find("header > h2").text(),
          link: $(b).find("header > h2 > a").attr("href"),
          category: $(b)
            .find("header > div.entry-before-title > span > span")
            .text()
            .replace("in ", ""),
          share_count: $(b)
            .find("header > div.entry-after-title > p > span.entry-shares")
            .text(),
          views_count: $(b)
            .find("header > div.entry-after-title > p > span.entry-views")
            .text(),
          type: $(b).find("source").attr("type") || "image/jpeg",
          video_1:
            $(b).find("source").attr("src") ||
            $(b).find("img").attr("data-src"),
          video_2: $(b).find("video > a").attr("href") || "",
        });
      });

      return hasil;
    };
    m.reply(
      `E-ehh?, Sensei Lagi Horny Ya 😖, Mungkin Video Ini Bisa Membantu Sensei 👉👈`,
    );
    let res = await getHentaiList();
    conn.sendMessage(m.sender, { video: { url: res[0].video_1 } });
  } else if (
    text.includes("gambarkan") ||
    text.includes("gambar") ||
    text.includes("gambarin")
  ) {
    m.reply("Baikla Sensei Miyako akan membuat gambarnya ><");
    try {
      let gpt = await (
        await fetch(`https://rest.cifumo.xyz/ai/animagine?prompt=${text}&model=(None)`)
      ).json();
      conn.sendFile(
        m.chat,
        gpt.result.url,
        null,
        "*[ Lia - DIFFUSION ]* " + "\n*• Prompt:* " + text,
      );
    } catch (e) {
      m.reply("maaf kak ga bisa buat gambar yang kakak pinta :((");
    }
  } else if (checkText(text) === "ok") {
    async function findSong(text) {
      const tokenizer = new natural.WordTokenizer();
      const tokens = tokenizer.tokenize(text.toLowerCase());

      const keywords = [
        "putar",
        "putarkan",
        "putarlagu",
        "lagu",
        "cariin",
        "carikan",
        "mainkan",
        "mainkanlagu",
        "play",
        "playmusic",
        "playasong",
      ];
      const songKeywords = tokens.filter((token) => keywords.includes(token));

      if (songKeywords.length === 0) {
        return "Gomenne, lagunya ngga ketemu 😔";
      }

      let songTitle = tokens
        .slice(tokens.indexOf(songKeywords[0]) + 1)
        .join(" ");

      return songTitle;
    }

    const songName = await findSong(text);

    m.reply(
      `cotto matte,Miyako akan mencari lagu yang Sensei mau 😉`,
    );

    let response1 = await yete.search(songName);
    let tracks = response1.data;

    try {
      let dl = await yete.mp3(tracks[0].url);
      conn.sendFile(m.chat, dl.media, 'audio.mp3', '', m, false, { mimetype: "audio/mpeg" });
      m.reply(
        `Ini lagu yang Sensei cari😆 ${dl.title} - ${dl.metadata.channel}`,
      );
    } catch (e) {
      console.error(e);
      let dl1 = await donglod(tracks[0].url);
      conn.sendMessage(
        m.chat,
        { audio: dl1.url, mimetype: "audio/mpeg" },
        { quoted: m },
      );
      m.reply(
        `Ini lagu yang Sensei cari😆 ${dl1.title} - ${dl1.artis}`,
      );
    }
  } else {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (mime && mime.startsWith('image/')) {
      let media = await q.download();
      await m.reply("WAIT SENSEI😆");
      let res = await GeminiImage(media, text);
      conn.reply(m.chat, `${res}`.trim(), m);
    } else {
      try {
        m.reply("WAIT SENSEI😁");
        let res = await fetch(`https://api.botcahx.eu.org/api/search/c-ai?apikey=xenzpedo&char=Miyako&prompt=${text}`);
        let json = await res.json();
        m.reply(json.message);
      } catch (e) {
        console.error(e);
        m.reply("Maaf, terjadi kesalahan saat memproses permintaanmu.");
      }
    }
  }
};

handler.command = ["miyako"];
handler.help = ["miyako"];
handler.tags = ["ai"];
handler.premium = true; 
handler.error = 0;

export default handler;