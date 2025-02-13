/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";
let handler = async (m, { conn }) => {
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let res = await (
    await fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json")
  ).json();
  let data = res.Infogempa.gempa;
  let teks = `乂 *Info Gempa*
  
❃ *Waktu:* ${data.DateTime}
❃ *Coordinates:* ${data.Coordinates}
❃ *Magnitude:* ${data.Magnitude}
❃ *Kedalaman:* ${data.Kedalaman}
❃ *Wilayah:* ${data.Wilayah}
❃ *Potensi:* ${data.Potensi}
`.trim();
  await conn.sendFile(
    m.chat,
    "https://data.bmkg.go.id/DataMKG/TEWS/" + data.Shakemap,
    "map.jpg",
    teks.trim(),
    m,
  );
};
handler.help = ["infogempa"];
handler.tags = ["internet"];
handler.command = /^(infogempa)$/i;
handler.limit = true; handler.error = 0
export default handler;
