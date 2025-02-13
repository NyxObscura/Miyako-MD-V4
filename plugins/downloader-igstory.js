/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { instagramStory } from "@bochilteam/scraper";

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0])
    return m.reply(
      `Masukan Username Instagram!\n\nContoh :\n${usedPrefix + command} animeroles`,
    );
  conn.igstory = conn.igstory ? conn.igstory : {};
  let text = args[0].startsWith("https://instagram.com/stories")
    ? args[0].replace("https://", "").split("/")[2]
    : args[0];
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  if (text.split("").length < 3 && !isNaN(text) && m.sender in conn.igstory) {
    let room = conn.igstory[m.sender];
    await clearTimeout(room.waktu);
    if (text > room.result.length) return m.reply("Invalid Number");
    room.chat = await conn.sendFile(
      m.chat,
      room.result[text - 1].url,
      "",
      "Ini dia Kak",
      m,
    );
    room.waktu = setTimeout(() => {
      conn.reply(m.chat, "_Waktu Memilih Habis_", room.chat);
      delete conn.igstory[m.sender];
    }, 600000);
  } else {
    let { results } = await instagramStory(text);
    if (results.length > 1) {
      conn.igstory[m.sender] = {
        chat: await conn.sendFile(
          m.chat,
          results[0].url,
          "",
          `_Silahkan Ketik *${usedPrefix + command} <number>* Untuk Mendownload Sisa Foto Atau Video._ \n_Terdapat *${results.length} Hasil*_\n\n_Contoh :_\n${usedPrefix + command} 2`,
          m,
        ),
        result: results,
        waktu: setTimeout(() => {
          conn.reply(
            m.chat,
            "_Waktu Memilih Habis_",
            conn.igstory[m.sender].chat,
          );
          delete conn.igstory[m.sender];
        }, 600000),
      };
    } else conn.sendFile(m.chat, results[0].url, "", "Ini Dia Kak", m);
  }
};
handler.help = ["igstory"];
handler.tags = ["downloader"];
handler.command = /^(igstory|instagramstory)$/i;
handler.limit = true; handler.error = 0
export default handler;
