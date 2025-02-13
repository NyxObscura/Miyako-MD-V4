/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*import axios from "axios";
import schedule from "node-schedule";

const handler = (m) => m;
let komikUpdate = null;

handler.before = async function (m, { conn }) {
  let chats = global.db.data.chats[m.chat];

  if (chats.komikUpdate) {
    if (komikUpdate !== null) {
      komikUpdate.cancel();
    }

    komikUpdate = schedule.scheduleJob("* * * * *", async function () {
      // Mengambil request setiap menit
      try {
        const response = await axios.get("https://api.apigratis.site/comic/latest?page=1");
        const data = response.data.result.results;

        const comics = data.map(comic => ({
          link: comic.latest_chapter_url,
          image: comic.cover,
          title: comic.title,
          latestChapter: comic.latest_chapter
        }));

        const lastUpdate = chats.komikUpdateList || [];
        const newComics = comics.filter(
          (comic) =>
            !lastUpdate.some(
              (oldComic) =>
                oldComic.link === comic.link &&
                oldComic.latestChapter === comic.latestChapter,
            ),
        );

        if (newComics.length > 0) {
          for (const comic of newComics) {
            await conn.sendFile(
              m.chat,
              comic.image,
              "",
              `*KOMIK UPDATE*\n\nJudul: ${comic.title}\nLink: ${comic.link}\nChapter Terbaru: ${comic.latestChapter}`,
              null,
            );
            await conn.delay(1000); // Penundaan 1 detik
          }
          chats.komikUpdateList = comics;
        }
      } catch (error) {
        conn.reply(
          global.info.nomorown + "@s.whatsapp.net",
          "Error fetching comic updates: " + error,
        );
        console.error("Error fetching comic updates:", error.message);
      }
    });
  }
  return;
};

export default handler;*/