/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import speed from "performance-now";
import fs from "fs";
import axios from 'axios'
import fetch from "node-fetch";
import moment from "moment-timezone";

let handler = (m) => m;
handler.all = async function (m) {
  let name = await conn.getName(m.sender);
  let pp =
    "https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg";
  try {
    pp = await this.profilePictureUrl(m.sender, "image");
  } catch (e) {
  } finally {
    global.doc = pickRandom([
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/msword",
      "application/pdf",
    ]);

    global.menu = global.db.data.bots.menuthumb;
    global.infoo = global.db.data.bots.info;
    global.linkk = global.db.data.bots.link;
    global.thumbb = global.db.data.bots.thumbb;

    // Module
    global.fetch = (await import("node-fetch")).default;
    global.urlToBuffer = await toBuffer
async function toBuffer(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    return Buffer.from(response.data, "binary");
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw error;
  }
}

    //global.bochil = await import("@bochilteam/scraper");

    let timestamp = speed();
    let latensi = speed() - timestamp;
    let ms = await latensi.toFixed(4);
    const _uptime = process.uptime() * 1000;

    // ucapan ini mah
    global.ucapan = ucapan();

    // pesan sementara
    global.ephemeral = "86400"; // 86400 = 24jam, kalo ingin di hilangkan ganti '86400' jadi 'null' atau ''

    // externalAdReply atau text with thumbnail. gatau bahasa Inggris? coba translate!
    global.adCh = {
      contextInfo: {
        forwardingScore: 9999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: global.db.data.bots.link.chid,
          serverMessageId: null,
          newsletterName: `📡ping : ${ms}  ||  ⌜ ${global.infoo.wm} ⌟ © ${infoo.ownername || global.info.namaowner}`,
        },
     
      },
  }
    global.adReply = {
      contextInfo: {
        forwardingScore: 9999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: global.db.data.bots.link.chid,
          serverMessageId: null,
          newsletterName: `📡ping : ${ms}  ||  ⌜ ${global.infoo.wm} ⌟ © ${infoo.ownername || global.info.namaowner}`,
        },
        externalAdReply: {
          title: ucapan(),
          body: infoo.wm || wm,
          thumbnailUrl: "https://telegra.ph/file/8f4b696f7ba1c64b0ce2b.jpg",
          sourceUrl: global.db.data.bots.link.ig,
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      },
    };
    global.floc = {
           "key" : {
                  "participant" : '0@s.whatsapp.net',
                  "remoteJid": "status@broadcast",
		    "fromMe": false,
		    "id": "Halo",
                               },
              "message": {
                           "documentMessage":{
                           "title": 'Miyako - Tsukiyuki', 
                           "jpegThumbnail": ''
                                 }
                               }
                             }
    global.fkontak = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: `status@broadcast` } : {}),
      },
      message: {
        contactMessage: {
          displayName: m.pushName,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm},;;;\nFN:${wm},\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`,
          jpegThumbnail: fs.readFileSync("./media/thumbnail.jpg"),
          thumbnail: fs.readFileSync("./media/thumbnail.jpg"),
          sendEphemeral: true,
        },
      },
    };
  }
};

export default handler;

function ucapan() {
  const time = moment.tz("Asia/Jakarta").format("HH");
  let res = "Selamat malam 🌙";
  if (time >= 4) {
    res = "Selamat pagi 🌄";
  }
  if (time > 10) {
    res = "Selamat siang ☀️";
  }
  if (time >= 15) {
    res = "Selamat sore 🌅";
  }
  if (time >= 18) {
    res = "Selamat malam 🌙";
  }
  return res;
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}