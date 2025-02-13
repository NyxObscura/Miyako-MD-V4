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

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let plugin = Object.keys(plugins);
  let plugin1 = plugin.map((v) => v.replace(".js", ""));

  if (!text)
    return m.reply(`Masukan Nama Plugins!\n\nContoh:\n${usedPrefix + command} info`);
  if (!plugin1.includes(text)) {
    let buttons = plugin1.map((v) => [
      "",
      v,
      "",
      `${usedPrefix + command} ${v}`,
    ]);
    return m.reply(`*🗃️ NOT FOUND!*\n==================================\n\n${plugin1.map((v) => " " + v).join`\n`}`)
  }

  let o;
  try {
    o = await exec("cat plugins/" + text + ".js");
  } catch (e) {
    o = e;
  } finally {
    let { stdout, stderr } = o;
    if (stdout.trim())
      conn.sendMessage(m.chat, { text: stdout }, { quoted: m });
    if (stderr.trim())
      conn.sendMessage(m.sender, { text: stderr }, { quoted: m });
  }
};
handler.help = ["getplugin"];
handler.tags = ["owner"];
handler.command = /^(getplugin|gp)$/i;
handler.mods = true;
export default handler;
