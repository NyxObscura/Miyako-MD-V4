/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { resep } from "../lib/scrape.js";
let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text)
    return conn.reply(
      m.chat,
      `Masukan Format Dengan Benar\n\nContoh: \n${usedPrefix + command} Ayam Geprek\n${usedPrefix + command} https://resepkoki.id/resep/resep-sambal-ijo/`,
    );
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  if (/https:\/\/resepkoki.id\/resep/i.test(text)) {
    let res = await resep.detail(text);
    let cap = `
▧ *Judul:* ${res.data.judul}
▧ *Waktu Masak:* ${res.data.waktu_masak}
▧ *Hasil:* ${res.data.hasil}
▧ *Tingkat Kesulitan:* ${res.data.tingkat_kesulitan}

▧ *Bahan:* 
${res.data.bahan}

▧ *Langkah Langkah:*
${res.data.langkah_langkah}
`.trim();
    await conn.sendFile(
      m.chat,
      res.data.thumb,
      res.data.judul + ".jpeg",
      cap,
      m,
      false,
    );
  } else {
    let res = await resep.search(text);
    let cap = res.data
      .map((v) => {
        return `
❏ *Judul:* ${v.judul}
▧ *Link:* ${v.link}
`.trim();
      })
      .join("\n\n");
    await conn.reply(m.chat, cap, m);
  }
};
handler.help = ["cariresep"];
handler.tags = ["search"];
handler.command = /^(cariresep|resep)$/i;
handler.limit = true; handler.error = 0
export default handler;
