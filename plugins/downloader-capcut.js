/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";
import cheerio from "cheerio"

const handler = async (m, { conn, text }) => {
  if (!text)
    m.reply("Masukkan link nya\n*contoh:* .capcut https://www.capcut.com/t/Zs8MPAKjG/");
  await m.reply(wait);

  if (/capcut.com/i.test(text)) {
    const response = await cc(text);

    const { title, url } = response;
    let capt = `*[ Capcut Downloader]*\n\n`;
    capt += `*Title:* ${title}\n`;
    //capt += `*View:* ${size}\n`;
    await conn.sendFile(m.chat, url, "anu.mp4", capt, m);
  } else {
    m.reply("Masukkan link yang benar dong om");
  }
};

handler.help = ["capcut"];
handler.tags = ["downloader"];
handler.command = ["capcut"];
handler.limit = true; handler.error = 0
export default handler;


async function cc(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const videoLink = $('div.container-so1uVw.pc-player video.player-o3g3Ag').attr('src');
      const title = $('div.template-title-wrapper h1').text()
      
        if (videoLink) {
            return {
            url: videoLink,
            title: title,
}
        } else {
            throw new Error('Video link not found');
        }
    } catch (error) {
        console.error(`Error scraping the Capcut link: ${error.message}`);
        return error
    }
}