/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import uploadImage from "../lib/uploadImage.js";
import uploadFile from "../lib/uploadFile.js";
import axios from "axios";

export async function before(m, { conn, isAdmin, isBotAdmin }) {
  let data = db.data.chats[m.chat];
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;

  const { mtype } = m;
  let hapus = m.key.participant;
  let bang = m.key.id;

  if (data.antiNsfw) {
    if (isBotAdmin) {
      if (
        mtype === "imageMessage" ||
        mtype === "videoMessage" ||
        mtype === "stickerMessage"
      ) {
        try {
          const media = await m.download();
          let up;

          if (mtype === "imageMessage" || mtype === "videoMessage") {
            up = await uploadImage(media);
          } else if (mtype === "stickerMessage") {
            up = await uploadFile(media);
          }

          const result = await antiNsfw(up);

          if (result && result.nsfw > 0.03) {
            await conn.sendMessage(
              m.chat,
              {
                text: `❗${result.msg}`,
              },
              {
                quoted: m,
                mentions: [m.sender],
              },
            );

            if (isAdmin) {
              m.reply("you is admin");
            } else {
              await conn.sendMessage(m.chat, {
                delete: {
                  remoteJid: m.chat,
                  fromMe: false,
                  id: bang,
                  participant: hapus,
                },
              });
            }
          } else {
            console.log("media aman");
          }
        } catch (e) {
          console.log("Terjadi error saat memproses media: " + e);
        }
      }
    }
    return;
  }
}

async function antiNsfw(url) {
  try {
    let response = await axios.get(
      "https://api.sightengine.com/1.0/check.json",
      {
        params: {
          url: url,
          models: "nudity-2.1",
          api_user: "1225479245",
          api_secret: "cVWcLGUgysXSXz8anaTZmK4hTh6GoGkj",
        },
      },
    );

    if (response.data.status === "success") {
      const message = `Konten NSFW *( ${response.data.nudity.sexual_activity}% )* terdeteksi oleh sistem, media mengandung NSFW.`;

      return {
        nsfw: response.data.nudity.sexual_activity,
        msg: message,
      };
    } else {
      console.log("API response tidak sukses: " + response.data);
      return e.data; // Nilai default jika respons tidak sukses
    }
  } catch (e) {
    console.log("Terjadi error saat mendeteksi media: " + e);
    return e.data; // Nilai default jika terjadi error
  }
}
