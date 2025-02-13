/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { primbon } from "../lib/primbon.js";
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  let response = args.join(" ").split("-");
  if (!(response[0] || response[1] || response[2]))
    return m.reply(
      `Masukan Tanggal Pernikahan Dengan Benar!\n\nContoh:\n${usedPrefix + command} 12-12-2000`,
    );
  let res = await primbon.tanggalnikah(response[0], response[1], response[2]);
  if (!res.status) throw res.message;
  let cap = `
*Tanggal:* ${res.message.tanggal}
*Karakteristik:* ${res.message.karakteristik}
`.trim();
  m.reply(cap);
};
handler.help = ["pernikahan"];
handler.tags = ["primbon"];
handler.command = /^pernikahan/i;
handler.limit = true; handler.error = 0
export default handler;
