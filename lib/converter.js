import { promises } from "fs";
import { join } from "path";
import { spawn } from "child_process";
import PDFDocument from "pdfkit";
import axios from "axios";

function ffmpeg(buffer, args = [], ext = "", ext2 = "") {
  return new Promise(async (resolve, reject) => {
    try {
      let tmp = join(
        global.__dirname(import.meta.url),
        "../tmp",
        +new Date() + "." + ext,
      );
      let out = tmp + "." + ext2;
      await promises.writeFile(tmp, buffer);
      spawn("ffmpeg", ["-y", "-i", tmp, ...args, out])
        .on("error", reject)
        .on("close", async (code) => {
          try {
            await promises.unlink(tmp);
            if (code !== 0) return reject(code);
            resolve({
              data: await promises.readFile(out),
              filename: out,
              delete() {
                return promises.unlink(out);
              },
            });
          } catch (e) {
            reject(e);
          }
        });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension
 * @returns {Promise<{data: Buffer, filename: String, delete: Function}>}
 */
function toPTT(buffer, ext) {
  return ffmpeg(
    buffer,
    ["-vn", "-c:a", "libopus", "-b:a", "128k", "-vbr", "on"],
    ext,
    "ogg",
  );
}

/**
 * Convert Audio to Playable WhatsApp PTT
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension
 * @returns {Promise<{data: Buffer, filename: String, delete: Function}>}
 */
function toAudio(buffer, ext) {
  return ffmpeg(
    buffer,
    [
      "-vn",
      "-c:a",
      "libopus",
      "-b:a",
      "128k",
      "-vbr",
      "on",
      "-compression_level",
      "10",
    ],
    ext,
    "opus",
  );
}

/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension
 * @returns {Promise<{data: Buffer, filename: String, delete: Function}>}
 */
function toVideo(buffer, ext) {
  return ffmpeg(
    buffer,
    [
      "-c:v",
      "libx264",
      "-c:a",
      "aac",
      "-ab",
      "128k",
      "-ar",
      "44100",
      "-crf",
      "32",
      "-preset",
      "slow",
    ],
    ext,
    "mp4",
  );
}

function toPDF(images, opt = {}) {
  return new Promise(async (resolve, reject) => {
    if (!Array.isArray(images)) images = [images];
    let buffs = [],
      doc = new PDFDocument({
        margin: 0,
        size: "A4",
      });
    for (let x = 0; x < images.length; x++) {
      if (/.webp|.gif/.test(images[x])) continue;
      let data = (
        await axios.get(encodeURIComponent(images[x]), {
          responseType: "arraybuffer",
          ...opt,
        })
      ).data;
      doc.image(data, 0, 0, {
        fit: [595.28, 841.89],
        align: "center",
        valign: "center",
      });
      if (images.length != x + 1) doc.addPage();
    }
    doc.on("data", (chunk) => buffs.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(buffs)));
    doc.on("error", (err) => reject(err));
    doc.end();
  });
}

export { toPDF, toAudio, toPTT, toVideo, ffmpeg };
