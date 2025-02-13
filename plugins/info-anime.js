/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*  
*/

import fetch from "node-fetch";
import * as cheerio from "cheerio";

let lastUpdates = [];

let Fruatre = async (m, { conn }) => {
  const url = "https://greatfon.io/v/otaku_anime_indonesia";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();

    const $ = cheerio.load(html);

    const results = [];
    $(".card").each((index, element) => {
      const imageUrl = $(element).find("figure img").attr("src");
      const caption = $(element).find(".card-body p").text().trim();
      if (imageUrl && caption) {
        results.push({ imageUrl, caption });
      }
    });

    const limitedResults = results.slice(0, 15);
    const newUpdates = limitedResults.filter(
      (item) =>
        !lastUpdates.some(
          (update) =>
            update.imageUrl === item.imageUrl && update.caption === item.caption
        )
    );

    if (newUpdates.length === 0) {
      return m.reply("Tidak ada update anime terbaru.");
    }

    for (let { imageUrl, caption } of newUpdates) {
      await conn.sendFile(m.chat, imageUrl, "anime.jpg", caption, m);
    }

    lastUpdates = [...lastUpdates, ...newUpdates];
    if (lastUpdates.length > 50) {
      lastUpdates = lastUpdates.slice(-50);
    }
  } catch (error) {
    console.error(error);
    m.reply("Terjadi kesalahan saat mengambil data anime.");
  }
};

Fruatre.help = ["animenews"];
Fruatre.tags = ["anime"];
Fruatre.command = /^animeupdate|nime$/i;
handler.limit = true
handler.onlyprem = true

export default Fruatre;