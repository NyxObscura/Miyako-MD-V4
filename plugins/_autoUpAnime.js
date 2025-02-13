/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import axios from "axios";
import cheerio from "cheerio";
import schedule from "node-schedule";

const handler = (m) => m;
let animeUpdate = null;

handler.before = async function (m, { conn }) {
  let chats = global.db.data.chats[m.chat];
  let db = global.db.data.bots;

  // Periksa apakah animeUpdate diaktifkan untuk chat ini
  if (chats.animeUpdate) {
    if (animeUpdate !== null) {
      animeUpdate.cancel();
    }

    animeUpdate = schedule.scheduleJob("* * * * *", async function () {
      // Mengambil request setiap menit
      try {
        const response = await axios.get("https://otakudesu.cloud");
        const $ = cheerio.load(response.data);
        let info = [];

        $("div.venz li").each(function (i, value) {
          let judul = $(value).find("h2.jdlflm").text().trim();
          let thumb = $(value).find("div.thumbz img").attr("src");
          let episode = $(value).find("div.epz").text().trim();
          let hari = $(value).find("div.epztipe").text().trim();
          let tanggal = $(value).find("div.newnime").text().trim();
          let link = $(value).find("div.thumb a").attr("href");
          info.push({
            judul: judul,
            thumb: thumb,
            episode: episode,
            hari: hari,
            update: `Tanggal rilis: ${tanggal}\nRating: tidak tersedia (situs ini tidak menyediakan info rating)\nLink: ${link}`,
          });
        });

        const lastUpdate = chats.animeUpdateList || [];
        const newInfo = info.filter(
          (item) =>
            !lastUpdate.some(
              (oldItem) =>
                oldItem.judul === item.judul &&
                oldItem.episode === item.episode,
            ),
        );

        if (newInfo.length > 0) {
          for (const anime of newInfo) {
            await conn.sendFile(
              m.chat,
              anime.thumb,
              "",
              `*ANIME UPDATE*\n\nJudul : ${anime.judul}\nEpisode : ${anime.episode}\nHari : ${anime.hari}\n${anime.update}`,
              null,
            );
            await conn.delay(1000); // Penundaan 1 detik
          }
          chats.animeUpdateList = info;
        }
      } catch (error) {
        m.reply(error.message);
        console.error("Error fetching anime updates:", error.message);
      }
    });
  }
  return;
};

export default handler;
