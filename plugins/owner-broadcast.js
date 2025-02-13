/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || q.mediaType || "";

  if (!mime && !text) {
    return conn.reply(
      m.chat,
      `Contoh: balas/kirim gambar dengan keterangan *${usedPrefix + command}*`,
      m,
    );
  }

  let image = "";
  if (mime) {
    image = await catbox(await q.download());
  }

  let chats = Object.keys(await conn.chats);

  conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m);

  for (let id of chats) {
    await sleep(2000);
    if (image) {
      //conn.sendFile(id, image, '', text.trim(), fkontak);
      conn.sendFile(
        id,
        image,
        "danz.mp4",
        `*B r o a d c a s t  m e d i a*\n- ${text.trim()}\n by ${global.db.data.bots.info.wm}`,
        null,
        true,
        {
          contextInfo: {
            externalAdReply: {
              title: "B r o a d c a s t",
              body: text.trim(),
              thumbnailUrl: "https://telegra.ph/file/893733b26e1db71cb361c.png",
              sourceUrl: "",
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
            },
          },
        },
      );
    } else {
      conn.sendMessage(id, { text: text.trim() }, { quoted: null });
    }
  }

  conn.reply(m.chat, "Broadcast selesai", m);
};

handler.help = ["broadcast"].map((v) => v + " <teks>");
handler.tags = ["owner"];
handler.command = /^(broadcast|bc)$/i;
handler.owner = true;

export default handler;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function catbox(content) {
  const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
  const blob = new Blob([content.toArrayBuffer()], {
    type: mime,
  });
  const formData = new FormData();
  const randomBytes = crypto.randomBytes(5).toString("hex");
  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", blob, randomBytes + "." + ext);

  const response = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: formData,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36",
    },
  });

  return await response.text();
}
