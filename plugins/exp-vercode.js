/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { createHash } from "crypto";

let handler = async function (m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender];
  if (!user.email)
    return m.reply(`Email mu belum terdaftar di database mohon di isi terlebih dahulu\n\n*Example:* ${usedPrefix}regmail email@emailmu.com`);
  if (user.registered === true)
    return m.reply(`Kamu sudah terdaftar di database ${set.bot} apakah kamu ingin keluar/unreg?\n\n*CARA UNREGISTER:*\n${usedPrefix}unreg 83x9jhsokxxxx`);
  if (!text)
    return m.reply(`Masukkan Parameter Dengan benar!\n*Example:* ${usedPrefix + command} <code yg telah di kirimkan melalui *gmail*>`);
  let verificationCode = parseInt(text.trim());
  if (user.code !== verificationCode)
    return m.reply("Kode verifikasi kamu *❌ SALAH* kak!");
  let email = user.email;
  let sn = createHash("md5").update(m.sender).digest("hex");
  let age = getRandomInt(18, 30);
  user.sn = sn;
  user.name = m.name;
  user.age = age;
  user.registered = true;
  global.db.data.users[m.sender] = user;
  let msg = `*S U C C E SS\n\n• *Status:* Registered [ √ ]\n• *Name:* ${user.name}\n• *Email:* ${email}\n• *Serial Number:*\n( ${sn} )`;
  conn.sendMessage(
    m.chat,
    {
      text: msg,
      contextInfo: {
        externalAdReply: {
          title: wm,
          thumbnailUrl: hwaifu.getRandom(),
          sourceUrl: "",
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m },
  );
};

handler.help = ["vercode"];
handler.tags = ["main"];
handler.command = /^vercode$/i;

export default handler;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
