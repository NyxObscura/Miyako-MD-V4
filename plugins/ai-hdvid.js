/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import path from "path";
import { promises as fs } from "fs";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let handler = async (m, { conn, text, usedPrefix, args, command }) => {
  conn.hdvid = conn.hdvid ? conn.hdvid : {};
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";

  if (!mime)
    m.reply(`Send/Reply videos with the caption *${usedPrefix}${command}*`);
  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

  let tinggi = q.height;
  let lebar = q.width;

  let additionalFFmpegOptions;
  if (text == "2") {
    additionalFFmpegOptions = [
      "-c:v",
      "libx264",
      "-crf",
      args[2] || "10",
      "-b:v",
      args[1] || "8M",
      "-s",
      `${lebar * 2}x${tinggi * 2}`,
      "-x264opts",
      "keyint=30:min-keyint=30",
    ];
  } else if (text == "3") {
    additionalFFmpegOptions = [
      "-c:v",
      "libx264",
      "-crf",
      args[2] || "5",
      "-b:v",
      args[1] || "8M",
      "-s",
      `${lebar * 3}x${tinggi * 3}`,
      "-x264opts",
      "keyint=30:min-keyint=30",
    ];
  } else {
    return m.reply("list level:\n\n[1]. 2 (medium)\n[2]. 3 (HD)")
  }

  const videoBuffer = await q.download();
  const additionalArgs = [...additionalFFmpegOptions, "-q:v", "60"];
  const buff = await videoConvert(videoBuffer, additionalArgs);
  await conn.sendFile(m.chat, buff, "", "", m);
};

handler.help = ["hdvideo *<video>*"];
handler.tags = ["premium", "ai"];
handler.command = /^(hdvideo|hdvideos|hdvid)$/i;
handler.premium = true; handler.error = 0

export default handler;

async function videoConvert(buffer, input = []) {
  return new Promise(async (resolve, reject) => {
    try {
      const tmp = path.join(__dirname, "../tmp", `${+new Date()}.mp4`);
      await fs.writeFile(tmp, buffer);
      const out = tmp.replace(".mp4", "_converted.mp4");
      const args = ["-y", "-i", tmp, ...input, out];

      spawn("ffmpeg", args)
        .on("error", reject)
        .on("close", async (code) => {
          try {
            await fs.unlink(tmp);
            if (code !== 0) return reject(code);
            const outputVideoBuffer = await fs.readFile(out);
            await fs.unlink(out);
            resolve(outputVideoBuffer);
          } catch (e) {
            reject(e);
          }
        });
    } catch (e) {
      reject(e);
    }
  });
}
