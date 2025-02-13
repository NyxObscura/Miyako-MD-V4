/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!m.quoted) return m.reply(`Balas stiker dengan perintah *${usedPrefix + command}*`);
  if (!m.quoted.fileSha256) throw "SHA256 Hash Missing";
  if (!text)
    return m.reply(`Penggunaan:\n${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} tes`);
  let sticker = global.db.data.users[m.sender].sticker;
  let hash = m.quoted.fileSha256.toString("base64");
  if (sticker[hash] && sticker[hash].locked)
    return m.reply("Kamu tidak memiliki izin untuk mengubah perintah stiker ini");
  sticker[hash] = {
    text,
    mentionedJid: m.mentionedJid,
    creator: m.sender,
    at: +new Date(),
    locked: false,
  };
  m.reply(`Berhasil!`);
};
handler.help = ["setcmd"];
handler.tags = ["database", "premium"];
handler.command = /^setcmd$/i;
handler.premium = true; handler.error = 0
export default handler;
