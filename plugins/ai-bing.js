/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";
import upload from "../lib/uploadImage.js";

const handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("Need text.");
  }

  let initImage = null;
  const quotedMessage = m.quoted ? m.quoted : m;
  const mimeType = quotedMessage.mtype || "";

  if (/webp|image|video|webm/g.test(mimeType)) {
    const media = await quotedMessage.download();
    const buffer = Buffer.isBuffer(media) ? media : Buffer.from(media, "utf-8");
    initImage = await upload(buffer).catch(() => null);
  }

  try {
    const response = await axios.post(
      "https://api.itsrose.rest/chatGPT/bing_chat",
      {
        prompt: text,
        init_image: initImage,
        time_zone: "Asia/Jakarta",
        tone: "Balanced",
        strip_markdown: false,
      },
      {
        headers: {
          Authorization: APIKeys[APIs["rose"]],
          "Content-Type": "application/json",
        },
      },
    );

    const { status, message, result } = response.data;

    if (!status) {
      return update(message);
    }

    const {
      sources,
      message: { content },
      invocation,
    } = result;

    await m.reply(content);

    if (invocation?.type === "image") {
      try {
        for (const url of invocation.images) {
          await conn.sendMessage(
            m.chat,
            {
              image: {
                url,
              },
            },
            { quoted: m },
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
handler.help = ["bing <prompt>"];
handler.command = ["bing"];
handler.tags = ["ai"];
handler.limit = true; handler.error = 0
export default handler;
