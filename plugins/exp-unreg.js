/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { createHash } from "crypto";
let handler = async function (m, { args, usedPrefix, command }) {
  if (!args[0])
    return m.reply(
      `📮Serial Number kosong, Silahkan Cek Serial Number Di\n${usedPrefix}ceksn`,
    );
  let user = global.db.data.users[m.sender];
  let sn = createHash("md5").update(m.sender).digest("hex");
  if (args[0] !== sn)
    return m.reply(
      `🚫 Serial Number salah!, Silahkan Cek Serial Number Di\n${usedPrefix}ceksn`,
    );
  m.reply("📛 Kamu Berhasil keluar dari database").then(() => {
    user.registered = false;
    user.unreg = true;
  });
};
handler.help = ["unreg"];
handler.tags = ["xp"];
handler.command = /^unreg(ister)?$/i;
handler.register = true;

export default handler;
