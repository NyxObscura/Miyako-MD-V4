/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import cheerio from "cheerio";
import axios from "axios";

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply(`Masukan Link Facebook!`);

  const result = await facebook(args[0]);
  const apacoba = `
*_⊱ ─── { Facebook Download } ─── ⊰_*
*\`VIDEO TITLE:\`* ${result.title || ""}
*\`QUALITY:\`* ${result.video[0].quality}
*\`DURATION:\`* ${result.duration}
*_⊱ ────── {♬} ────── ⊰_*`;

  await conn.sendFile(m.chat, result.video[0].url, "fb.mp4", apacoba, m);
};

handler.help = ["facebook <url>"];
handler.tags = ["downloader"];
handler.command = /^((facebook|fb)(downloder|dl)?)$/i;
handler.limit = true
handler.onlyprem = true

export default handler;

function facebook(url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!url.match(/facebook/gi))
        return reject("Invalid URL, Enter A Valid Facebook Video URL");

      const a = await axios
        .get("https://fdownloader.net/id", {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
          },
        })
        .then((v) => v.data);

      const EX = /k_exp ?= ?"(\d+)"/i;
      const TO = /k_token ?= ?"([a-f0-9]+)"/i;
      const ex = a.match(EX)?.[1];
      const to = a.match(TO)?.[1];

      if (!ex || !to) return reject("Error Extracting Exp And Token");

      const b = await axios
        .post(
          "https://v3.fdownloader.net/api/ajaxSearch?lang=id",
          new URLSearchParams({
            k_exp: ex,
            k_token: to,
            q: url,
            lang: "id",
            web: "fdownloader.net",
            v: "v2",
            w: "",
          }),
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
              origin: "https://fdownloader.net",
            },
          }
        )
        .then((v) => v.data);

      if (b.status !== "ok") return reject("Failed Doing Ajax Search");

      const _ = cheerio.load(b.data);
      const $ = cheerio.load(_(".detail").html());
      const d = {
        title: $(".thumbnail > .content > .clearfix > h3").text().trim(),
        duration: $(".thumbnail > .content > .clearfix > p").text().trim(),
        thumbnail: $(".thumbnail > .image-fb > img").attr("src") || "",
        media: $("#popup_play > .popup-body > .popup-content > #vid").attr("src") || "",
        video: $("#fbdownloader")
          .find(".tab__content")
          .eq(0)
          .find("tr")
          .map((i, el) => {
            const d = {
              quality: $(el).find(".video-quality").text().trim(),
              url: $(el).find("a").attr("href") || $(el).find("button").attr("data-videourl") || el,
            };
            if (d.url === "#note_convert") return;
            return d;
          })
          .get(),
        music: $("#fbdownloader").find("#audioUrl").attr("value") || "",
      };
      resolve(d);
    } catch (e) {
      reject(e);
    }
  });
}