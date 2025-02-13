/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";
import schedule from "node-schedule";

const handler = (m) => m;
let gempaUpdate = null;

handler.before = async function (m, { conn }) {
  if (gempaUpdate !== null) {
    gempaUpdate.cancel();
  }

  gempaUpdate = schedule.scheduleJob("* * * * *", async function () {
    try {
      const res = await fetch(
        "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json",
      );
      const json = await res.json();
      const data = json.Infogempa.gempa;

      const teks = `乂 *Info Gempa*
  
❃ *Waktu:* ${data.DateTime}
❃ *Coordinates:* ${data.Coordinates}
❃ *Magnitude:* ${data.Magnitude}
❃ *Kedalaman:* ${data.Kedalaman}
❃ *Wilayah:* ${data.Wilayah}
❃ *Potensi:* ${data.Potensi}
`.trim();

      const lastUpdate = global.db.data.chats[m.chat].gempaUpdateList || [];
      const newUpdate = !lastUpdate.some(
        (oldData) => oldData.DateTime === data.DateTime,
      );

      if (newUpdate) {
        await conn.sendFile(
          m.chat,
          "https://data.bmkg.go.id/DataMKG/TEWS/" + data.Shakemap,
          "map.jpg",
          teks.trim(),
          null,
        );
        global.db.data.chats[m.chat].gempaUpdateList = [data];
      }
    } catch (error) {
      conn.reply(
        global.info.nomorown + "@s.whatsapp.net",
        "Error fetching earthquake data: " + error,
      );
      console.error("Error fetching earthquake data:", error.message);
    }
  });

  return;
};

export default handler;