/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import Anthropic from "@anthropic-ai/sdk";
import upload from "../lib/uploadImage.js";

const anthropic = new Anthropic({
  apiKey:
    "", // isi apikey claude
});

const handler = async (m) => {
  if (!m.quoted && !m.text) {
    m.reply(
      "Mohon reply pesan dengan gambar atau ketik teks untuk menghasilkan pesan.",
    );
    return;
  }

  let msg = "";

  try {
    if (m.quoted && m.quoted.mimetype.includes("image")) {
      const mediaData = await m.quoted.download();
      const up = await upload(mediaData); // Unduh gambar langsung ke buffer
      const base64Data = Buffer.from(up, "binary").toString("base64"); // Konversi buffer ke base64
      msg = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 4000,
        temperature: 1,
        system: "gunakan hanya bahasa Indonesia",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: m.text || "", // Tambahkan teks jika ada
              },
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: m.quoted.mimetype, // Gunakan mimetype dari pesan yang direply
                  data: base64Data,
                },
              },
            ],
          },
        ],
      });
    } else {
      msg = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 4000,
        temperature: 1,
        system: "gunakan hanya bahasa Indonesia",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: m.text || "", // Tambahkan teks jika ada
              },
            ],
          },
        ],
      });
    }

    m.reply(msg.content[0].text);
  } catch (error) {
    console.error(error);
    m.reply(error.message);
  }
};

handler.command = ["claude"];
handler.help = ["claude <teks/replyImage>"];
handler.tags = ["ai", "premium"];
handler.onlyprem = true;
handler.limit = true; handler.error = 0
export default handler;
