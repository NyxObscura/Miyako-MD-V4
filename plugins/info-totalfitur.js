/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fs from "fs";

let handler = async (m, { conn }) => {
  let featureCounts = {};

  Object.values(global.plugins).forEach((plugin) => {
    if (plugin.help && plugin.tags) {
      plugin.tags.forEach((tag) => {
        if (!featureCounts[tag]) {
          featureCounts[tag] = 0;
        }
        featureCounts[tag]++;
      });
    }
  });

  let message = "Jumlah Fitur Berdasarkan Kategori:\n";
  for (const [tag, count] of Object.entries(featureCounts)) {
    message += `- ${tag}: ${count} fitur\n`;
  }

  const thumbnailUrl = 'https://files.catbox.moe/u874oc.jpg';

  conn.adReply(
    m.chat,
    message,
    "T O T A L - F I T U R",
    thumbnailUrl,
    null,
    m,
  );
};

handler.help = ["totalfitur"];
handler.tags = ["info"];
handler.command = ["totalfitur"];

export default handler;