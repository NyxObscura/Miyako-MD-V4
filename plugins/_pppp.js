/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import fs from "fs";
import fetch from "node-fetch";

let spamCount = {};
let bannedUsers = {};

let handler = async (m, { conn, usedPrefix: _p }) => {
  let sender = m.sender;

  if (bannedUsers[sender] && Date.now() < bannedUsers[sender]) {
    conn.reply(m.chat, "Sorry, kamu masih di-ban selama 5 menit! 😡", m);
    return;
  }

  if (m.text.toLowerCase() === "p") {
    spamCount[sender] = (spamCount[sender] || 0) + 1;

    if (spamCount[sender] > 5) {
      global.db.data.users[sender].banned = true;
      conn.reply(m.chat, "Kamu kena ban karna spam", m);
      spamCount[sender] = 0;
      return;
    }
  }

  // Sisanya adalah kode asli kamu
  if (
    sender === global.info.nomorown + "@s.whatsapp.net" &&
    m.text.toLowerCase() === "p"
  ) {
    let info = `konniciwa sensei`;
    conn.reply(m.chat, info, m, {
      contextInfo: {
        externalAdReply: {
          title: "Miyako",
          body: "2024©",
          thumbnailUrl: `https://pomf2.lain.la/f/rhhgjjo2.jpg`,
        },
      },
    });
  } else if (
    sender === "6281297662535" + "@s.whatsapp.net" &&
    m.text.toLowerCase() === "p"
  ) {
    let info = `helo my creator`;
    conn.reply(m.chat, info, m, {
      contextInfo: {
        externalAdReply: {
          title: "Miyako",
          body: "2024©",
          thumbnail: fs.readFileSync("./thumbnail.jpg"),
        },
      },
    });
  } else {
    let info = `Apasih *ppp* terus ga sopan tau 😡`;
    conn.reply(m.chat, info, m, {
      contextInfo: {
        externalAdReply: {
          title: "Hitamkan",
          body: "2024©",
          thumbnailUrl: `https://telegra.ph/file/1b53e3a436e21477abfb9.png`,
        },
      },
    });
  }
};

handler.customPrefix = /^(P|p|Pp|pp|PP|ppp|PPP)$/i;
handler.command = new RegExp();

export default handler;
