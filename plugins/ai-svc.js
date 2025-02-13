/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import FormData from "form-data";
import fs from "fs";
import axios from "axios";

let handler = async (m, { conn }) => {
  try {
    let audioBuffer;
    let modelId;

    // Cek jika pesan yang dikutip tersedia dan berupa audio
    if (m.quoted) {
      const quotedMessage = await m.quoted.download();
      audioBuffer = quotedMessage;
    } else {
      return conn.reply(
        m.chat,
        "Mohon sertakan audio yang ingin Anda unggah.",
        m,
      );
    }

    // Mengambil ID model dari argumen
    if (!m.args[0]) {
      return conn.reply(
        m.chat,
        "Silakan masukkan ID model yang ingin Anda gunakan.",
        m,
      );
    }
    modelId = m.args[0];

    // Persiapan form data
    const formData = new FormData();
    formData.append("audio", audioBuffer, {
      contentType: "audio/mpeg",
      filename: "audio.mp3",
    });
    formData.append("model_id", modelId);

    // Kirim permintaan ke REST API
    const uploadResponse = await axios.post(
      "https://api.itsrose.rest/sovits/vc/inference",
      formData,
      {
        headers: {
          accept: "application/json",
          Authorization:
            "NSRZYcI5E4DAOElbasbth5jUTGWydWRDsCIMe4DQBEy1d6dkHAyzx89FTfb0kpEO",
          "Content-Type": "multipart/form-data",
          ...formData.getHeaders(),
        },
      },
    );

    // Tampilkan respons dari REST API
    m.reply(uploadResponse.data);
  } catch (e) {
    console.log(e);
    m.reply(e);
  }
};

handler.help = ["svc <model_id>"];
handler.tags = ["audio"];
handler.command = /^(svc)$/i;

export default handler;
