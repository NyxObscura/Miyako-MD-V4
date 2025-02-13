/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { readdirSync, rmSync } from "fs";
let handler = async (m, { conn }) => {
  const dir = "./sessions";
  readdirSync(dir)
    .filter((v) => v != "creds.json")
    .forEach((f) => rmSync(`${dir}/${f}`));
  await m.reply("Berhasil Menghapus File Sessions");
};
handler.help = ["clearsession"];
handler.tags = ["owner"];
handler.command = /^(clear(sesi|session)|csesi)$/i;
handler.mods = true;
export default handler;
