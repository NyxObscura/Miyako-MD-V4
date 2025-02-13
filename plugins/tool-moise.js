/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import Uploader from "../lib/uploadFile.js";
import { toAudio } from "../lib/converter.js";
import fetch from "node-fetch";
import axios from "axios";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

const handler = async (m, { conn, text }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = q.mtype || "";
  if (!/audio|video/g.test(mime)) {
    return m.reply("Please reply/send a audio/video with the command");
  }
  const media = await q.download();
  let audio = await toAudio(media, "mp4");
  const buffer = Buffer.isBuffer(audio.data)
    ? audio.data
    : Buffer.from(audio.data, "utf-8");
  const url = await Uploader(buffer);
  m.reply("Processing, can take a while...");
  const body = {
    init_url: url,
    options: {
      stems: 2,
      ai_level: 0,
      rigidity: 2,
      accuracy: 4,
      deep: 0,
    },
  };

  const { data } = await axios.post(
    "https://api.itsrose.life/audio/moise",
    body,
    {
      headers: {
        accept: "*/*",
        Authorization: global.itsrose,
        "Content-Type": "application/json",
      },
    },
  );
  const { status, message, result } = data;
  if (!status) {
    return m.reply(message);
  }
  const { id } = result;

  async function pullStatus() {
    return axios
      .get(`https://api.itsrose.life/audio/moise/fetch_query?id=${id}`, {
        headers: {
          accept: "application/json",
          Authorization: global.itsrose,
        },
      })
      .then((res) => res.data);
  }

  // TODO: find better way to do this
  let statusData;
  do {
    statusData = await pullStatus();
    await new Promise((resolve) => setTimeout(resolve, 15 * 1000));
  } while (statusData?.result.status !== "done");

  const { audios } = statusData.result;

  for (const key in audios) {
    await conn.sendMessage(
      m.chat,
      {
        audio: {
          url: audios[key],
        },
        mimetype: "audio/mp4",
      },
      { quoted: m },
    );
  }
};
handler.command = ["moise"];
handler.help = ["moise <reply audio>"];
handler.tags = ["tools"];
handler.limit = true; handler.error = 0
export default handler;

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
