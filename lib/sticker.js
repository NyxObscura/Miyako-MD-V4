import * as crypto from "crypto";
import { ffmpeg } from "./converter.js";
import webp from "node-webpmux";
import { Sticker } from "wa-sticker-formatter";

async function sticker(img, url, packName, authorName) {
  let stickerMetadata = {
    type: "full",
    pack: packName,
    author: authorName,
  };
  return new Sticker(img ? img : url, stickerMetadata).toBuffer();
}

async function addExif(
  webpSticker,
  packname,
  author,
  categories = [""],
  extra = {},
) {
  const img = new webp.Image();
  const stickerPackId = crypto.randomBytes(32).toString("hex");
  const json = {
    "sticker-pack-id": stickerPackId,
    "sticker-pack-name": packname,
    "sticker-pack-publisher": author,
    emojis: categories,
    ...extra,
  };
  let exifAttr = Buffer.from([
    0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
    0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
  ]);
  let jsonBuffer = Buffer.from(JSON.stringify(json), "utf8");
  let exif = Buffer.concat([exifAttr, jsonBuffer]);
  exif.writeUIntLE(jsonBuffer.length, 14, 4);
  await img.load(webpSticker);
  img.exif = exif;
  return await img.save(null);
}

const support = {
  ffmpeg: true,
  ffprobe: true,
  ffmpegWebp: true,
  convert: true,
  magick: false,
  gm: false,
  find: false,
};

export { sticker, addExif, support };
