/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fs from "fs";

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} index.js`;
  if (!text) return m.reply(input);
  let who;
  try {
    if (m.isGroup)
      who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  } catch (err) {
    if (m.isGroup) who = args[0] + "@s.whatsapp.net";
  }
  if (!who) return m.reply(`tag/nomor nya banh`);
  if (!args[1]) return m.reply(`nama filenya apa?`);

  const isValid = await conn.onWhatsApp(text + "@s.whatsapp.net");
  if (isValid.length == 0) {
    return m.reply("Number not in whatsapp!");
  }
  var user_bot = await fs.readFileSync(`./plugins/${args[1]}` + ".js");
  conn.sendMessage(who, {
    document: user_bot,
    caption: "Ni bang",
    mimetype: "document/application",
    fileName: `${args[1]}.js`,
  });
  m.reply("success sending file to " + who);
};
handler.help = ["sendplug"];
handler.tags = ["owner"];
handler.command = /^(sendplug)$/i;
handler.rowner = true;

export default handler;
