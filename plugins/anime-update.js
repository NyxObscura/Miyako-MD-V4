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

let animeUpdate = null;

const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (text === "on") {
    if (animeUpdate !== null) {
      animeUpdate.cancel();
    }
    animeUpdate = schedule.scheduleJob("0 * * * *", async function () {
      const ngen = await axios.get("https://otakudesu.cam");
      const $ = cheerio.load(ngen.data);
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
          update:
            `Tanggal rilis: ${tanggal}\n` +
            "Rating: tidak tersedia (situs ini tidak menyediakan info rating)\n" +
            `Link: ${link}`,
        });
      });
      conn.sendFile(
        m.chat,
        info[0].thumb,
        "",
        `*ANIME UPDATE*\n\nJudul : ${info[0].judul}\nEpisode : ${info[0].episode}\nHari : ${info[0].hari}\n${info[0].update}`,
        m,
      );
    });
    conn.reply(m.chat, "Anime update sudah diaktifkan", m);
    global.db.data.chats[m.chat].animeupdate = true;
  } else if (text === "off") {
    if (animeUpdate !== null) {
      animeUpdate.cancel();
      animeUpdate = null;
    }
    conn.reply(m.chat, "Anime update sudah dimatikan", m);
    global.db.data.chats[m.chat].animeupdate = false;
  } else {
    conn.reply(
      m.chat,
      "Pilihan tidak valid. Harap masukkan 'on' atau 'off'",
      m,
    );
  }
};

handler.help = ["animeupdate on/off"];
handler.tags = ["anime"];
handler.command = /^(animeupdate)$/i;

export default handler;
