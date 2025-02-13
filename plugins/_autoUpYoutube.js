/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";
import schedule from "node-schedule";

const handler = (m) => m;
let youtubeUpdateJobs = [];

handler.before = async function (m, { conn }) {
  let chats = global.db.data.chats[m.chat];
  let db = global.db.data.bots;

  const channelUrls = [
    "https://youtube.com/@anioneid"
  ];

  if (chats.youtubeUpdate) {
    // Batalkan semua jadwal yang ada sebelumnya
    youtubeUpdateJobs.forEach((job) => job.cancel());
    youtubeUpdateJobs = [];

    // Buat jadwal untuk setiap kanal
    channelUrls.forEach((channelUrl) => {
      const job = schedule.scheduleJob("* * * * *", async function () {
        try {
          const res = await fetch(
            `https://youtube-notifer.vercel.app/api/updates?channelUrl=${encodeURIComponent(channelUrl)}`
          );
          const json = await res.json();

          const { link_yt, id_yt, data_last, status } = json;

          const teks = `*[ _YouTube Update_ ]*

*\`Title:\`* ${data_last.title}
*\`link:\`* ${data_last.link}
*pubDate:* ${data_last.pubDate}
`.trim();

          const lastUpdateList = chats.youtubeUpdateList || {};
          const lastUpdate = lastUpdateList[channelUrl] || [];
          const newUpdate = !lastUpdate.some(
            (oldData) => oldData.title === data_last.title
          );

          if (newUpdate) {
            await conn.sendFile(
              m.chat,
              data_last.thumbnail,
              "thumbnail.jpg",
              teks.trim(),
              null
            );

            // Simpan pembaruan untuk setiap kanal
            lastUpdateList[channelUrl] = [data_last];
            chats.youtubeUpdateList = lastUpdateList;
          }
        } catch (error) {
          conn.reply(
            global.info.nomorown + "@s.whatsapp.net",
            `Error fetching YouTube data for ${channelUrl}: ` + error
          );
          console.error(`Error fetching YouTube data for ${channelUrl}:`, error.message);
        }
      });

      youtubeUpdateJobs.push(job);
    });
  }
  return;
};

export default handler;