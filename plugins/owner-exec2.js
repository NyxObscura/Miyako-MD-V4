/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import cp, { exec as _exec } from "child_process";
import { promisify } from "util";
let exec = promisify(_exec).bind(cp);
let handler = async (m, { conn, isOwner, command, text }) => {
  if (global.conn.user.jid != conn.user.jid) return;
  let o;
  try {
    o = await exec(command.trimStart() + " " + text.trimEnd());
  } catch (e) {
    o = e;
  } finally {
    let { stdout, stderr } = o;
    if (stdout.trim())
      conn.sendMessage(m.chat, { text: stdout }, { quoted: m });
    if (stderr.trim())
      conn.sendMessage(m.chat, { text: stderr }, { quoted: m });
  }
};
handler.help = ["$"];
handler.tags = ["owner"];
handler.customPrefix = /^[$] /;
handler.command = new RegExp();
handler.mods = true;
export default handler;
