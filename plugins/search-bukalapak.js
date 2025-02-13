/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { BukaLapak } from "../lib/scrape.js";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text)
    return m.reply(
      `Masukan nama barang yang ingin dicari \n\nContoh : \n${usedPrefix + command} Case handphone poco x3 pro`,
    );
  conn.bukalapak = conn.bukalapak ? conn.bukalapak : {};
  let setting = global.db.data.settings[conn.user.jid];
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  if (text.split("").length < 3 && !isNaN(text) && m.sender in conn.bukalapak) {
    let { result } = conn.bukalapak[m.sender];
    let data = result[text - 1];
    let caption = `
Title : ${data.title}
Harga : ${data.harga}
Rating : ${data.rating}
Terjual : ${data.terjual}

Store Info : 
• Lokasi : ${data.store.lokasi}
• Nama : ${data.store.nama}
• Link : ${data.store.link}

Link : ${data.link}
`.trim();
    await conn.sendMessage(
      m.chat,
      {
        image: { url: data.image },
        fileName: "bukalapak.jpg",
        mimetype: "image/jpeg",
        caption: setting.smlcap ? conn.smlcap(caption) : caption,
      },
      { quoted: m },
    );
  } else {
    let data = await BukaLapak(text);
    let header = `> Ketik *${usedPrefix + command} 1* Untuk Melihat Detail Barang \n\n`;
    let caption = data
      .map((v, i) => {
        return `
*${i + 1}.* *${v.title.trim()}*
• Rating : ${v.rating}
• Terjual : ${v.terjual}
`.trim();
      })
      .join("\n\n");
    conn.bukalapak[m.sender] = {
      result: data,
      timeout: setTimeout(() => {
        delete conn.bukalapak[m.sender];
      }, 3600000),
    };
    await m.reply(header + caption);
  }
};
handler.help = ["bukalapak"];
handler.tags = ["search"];
handler.command = /^(bukalapak)$/i;

export default handler;
