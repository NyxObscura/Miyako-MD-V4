/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import axios from "axios";
import FormData from "form-data";

const handler = async(m, { conn }) => {
  const vocal = {
  key: {
    participant: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast',
    fromMe: false,
    id: 'Halo'
  },
  message: { documentMessage: { title: 'Emilia - Ogiwara', jpegThumbnail: '' } }
}
  const instrumen = {
  key: {
    participant: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast',
    fromMe: false,
    id: 'Halo'
  },
  message: { documentMessage: { title: 'Emilia - Ogiwara', jpegThumbnail: '' } }
}


  const q = m.quoted ? m.quoted : m;
  const mime = q.mtype || "";
  if (!/audio|video/g.test(mime)) {
    return m.reply("Please reply/send a audio/video with the command");
  }
  try {
  const media = await q.download();
  const req = await vocalRemover(media)
  const { vocal_path, instrumental_path } = req.data
  await conn.sendFile(m.chat, vocal_path, 'error.mp3', '', vocal, false, { mimetype: "audio/mpeg"})
  await conn.sendFile(m.chat, instrumental_path, 'error.mp3', '', instrumen, false, { mimetype: "audio/mpeg"})
  } catch (e) {
    m.reply(e.message)
  }
  
}
handler.command = ["vocalremover"]
handler.tags = ["ai", "tools"]
handler.help = ["vocalremover <audio/video>"]
handler.limit = true
export default handler;

const api = axios.create({ baseURL: "https://aivocalremover.com" });

const getKey = async () => {
  const response = await api.get("/");
  return response.data.match(/key:"(\w+)/)[1];
};

const vocalRemover = async (audioBuffer) => {
  const form = new FormData();
  const fileName = Math.random().toString(36) + ".mpeg";
  form.append("fileName", audioBuffer, fileName);

  const [key, fileUpload] = await Promise.all([
    getKey(),
    api
      .post("/api/v2/FileUpload", form, { headers: form.getHeaders() })
      .catch((e) => e.response),
  ]);

  if (fileUpload.status !== 200) throw fileUpload.data || fileUpload.statusText;

  const processFile = await api
    .post(
      "/api/v2/ProcessFile",
      new URLSearchParams({
        file_name: fileUpload.data.file_name,
        action: "watermark_video",
        key,
        web: "web",
      }),
    )
    .catch((e) => e.response);

  return processFile;
};
