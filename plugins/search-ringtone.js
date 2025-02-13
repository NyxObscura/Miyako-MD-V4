/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { RingTone } from "../lib/scrape.js";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text)
    return m.reply(
      `Masukan query! \n\nContoh : \n${usedPrefix + command} old telephone`,
    );
  conn.ringtone = conn.ringtone ? conn.ringtone : {};
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  if (text.split("").length < 3 && !isNaN(text) && m.sender in conn.ringtone) {
    let { result } = conn.ringtone[m.sender];
    await conn.sendFile(
      m.chat,
      result[text - 1].audio,
      false,
      false,
      m,
      false,
      { mimetype: "audio/mpeg" },
    );
  } else {
    let ringtone = await RingTone(text);
    if (ringtone.length === 0) return m.reply(`${text} Tidak ditemukan!`);
    let header = `_Ketik *${usedPrefix + command} 1* Untuk Mendengarkan Ringtone_ \n\n`;
    let caption = ringtone
      .map((v, i) => {
        return `
*${i + 1}.* ${v.title}
•  ${v.source}
`.trim();
      })
      .join("\n\n");
    conn.ringtone[m.sender] = {
      result: ringtone,
      timeout: setTimeout(() => {
        delete conn.ringtone[m.sender];
      }, 3600000),
    };
    await m.reply(header + caption);
  }
};

handler.help = ["ringtone"];
handler.tags = ["search"];
handler.command = /^(ringtone)$/i;

export default handler;
