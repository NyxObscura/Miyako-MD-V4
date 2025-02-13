/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { spawn } from "child_process";
let handler = async (m, { conn, isROwner, text }) => {
  if (!process.send) return m.reply("Dont: node main.js\nDo: node index.js");
  if (global.conn.user.jid == conn.user.jid) {
    await m.reply("```R E S T A R T . . .```");
    process.send("reset");
  } else throw "_eeeeeiiittsssss..._";
};

handler.help = ["restart"];
handler.tags = ["owner"];
handler.command = /^(res(tart)?)$/i;
handler.mods = true;
export default handler;
