/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";
import uploadImage from "../lib/uploadImage.js";

const handler = async (m, { conn, text }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || "";

  if (!mime.startsWith("image/")) {
    m.reply("Reply to an image with a caption .deepfake ⧼style⧽");
  }
  conn.sendMessage(m.chat, {
    react: {
      text: "💤",
      key: m.key,
    },
  });
  const media = await q.download();
  const imageUrl = await uploadImage(media);
  const styleId = `${text}`;

  const apiData = {
    init_image: imageUrl,
    style: styleId,
  };

  const apikey = APIKeys[APIs["rose"]]; // Ganti dengan API key Anda

  const { data } = await axios.post(
    "https://api.itsrose.rest/deep_fake/video",
    apiData,
    {
      headers: {
        Authorization: apikey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    },
  );

  if (data.status && data.result.video.length > 0) {
    const videoUrl = data.result.video;
    const metadata = data.result.metadata;

    conn.sendFile(m.chat, videoUrl, "deepfake.mp4", "Here", m);
  } else {
    m.reply("Failed to generate Deep Fake video.");
  }
};

handler.help = ["deepfake"];
handler.tags = ["ai", "premium"];
handler.command = /^(deepfake)$/i;
handler.premium = true; handler.error = 0

export default handler;