/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";

const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text)
    return m.reply(`mau nyari apa??\n*contoh* : ${usedPrefix + command} Minecraft`);

  if (/html/i.test(text)) {
    let { data } = await axios.get(
      `https://api.neoxr.eu/api/an1-get?url=${text}`,
    );
    if (!data.status) return "Error om";
    let {
      name,
      requirement,
      version,
      size,
      description,
      rating,
      published,
      installed,
      url,
    } = data.data;
    let caption = `*[ Downloader An1 ]*

*Name* : ${name}
*Versi* : ${version}
*Size* : ${size}
*Rating* : ${rating}
*Published* : ${published}
*Sudah Di install* : ${installed}
*Description* : ${description}

Download disini jika Apk tak kunjung muncul :)
url: ${url}

> Tunggu Beberapa Saat File akan di download
`;
    await conn.sendThumb(
      m.chat,
      caption,
      "https://files.catbox.moe/epu529.png",
      m,
    );
    await conn.sendFile(m.chat, url, name, "Download selesai", m);
  } else {
    let { data } = await axios.get(`https://api.neoxr.eu/api/an1?q=${text}`);
    let result = data.data.map((v, i) => {
      return [
        v.name,
        v.developer,
        v.rating,
        `${usedPrefix + command} ` + v.url,
      ];
    });
    await conn.sendList(
      m.chat,
      "",
      "Android1 Downloader",
      wm || global.db.data.bots.info.wm,
      "click Here",
      "List Apk",
      result,
      m,
    );
  }
};
handler.command = ["an1", "android1", "androit1"];
handler.help = ["android1"];
handler.tags = ["downloader", "internet", "tools"];
handler.limit = true; handler.error = 0
handler.register = true;
export default handler;
