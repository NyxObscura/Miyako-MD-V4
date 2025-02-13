/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { spesifikasi } from "../lib/scrape.js";

let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text)
    return m.reply(
      `Masukan nama handphone! \n\nContoh : \n${usedPrefix + command} Poco x3 pro`,
    );
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let name = await spesifikasi.search(text);
  let setting = global.db.data.settings[conn.user.jid];
  let { image, unggulan, fitur } = await spesifikasi.detail(name[0].link);
  let caption = `
*乂 ${name[0].title} ( ${name[0].harga} )*

_*FITUR UNGGULAN*_
${unggulan
  .map((v) => {
    return `• ${v}`;
  })
  .join("\n")}

_*SPESIFIKASI LENGKAP*_
${fitur
  .map((v) => {
    return `• *${v.name}* : ${v.fitur}`;
  })
  .join("\n")}
`.trim();
  conn.sendMessage(
    m.chat,
    {
      image: { url: image },
      fileName: text + ".jpg",
      mimetype: "image/jpeg",
      caption: setting.smlcap ? conn.smlcap(caption) : caption,
    },
    { quoted: m },
  );
};
handler.help = ["spesifikasi"];
handler.tags = ["internet"];
handler.command = /^spesifikasi$/i;

export default handler;
