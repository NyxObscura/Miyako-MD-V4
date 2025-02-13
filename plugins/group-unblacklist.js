/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let who = m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.quoted
      ? m.quoted.sender
      : text
        ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
        : false;
  if (!who)
    return m.reply(
      `Reply atau tag orangnya! \n\nContoh : \n${usedPrefix + command} @${m.sender.split("@")[0]}`,
      false,
      { mentions: [who] },
    );

  let chat = global.db.data.chats[m.chat];
  chat.member[who] = chat.member[who] || {};
  chat.member[who].blacklist = chat.member[who].blacklist || false;
  chat.member[who].blacklistTime = chat.member[who].blacklistTime || 0;

  let user = chat.member[who];
  if (!user.blacklist) return m.reply("User tersebut tidak di Blacklist!");

  user.blacklist = false;
  user.blacklistTime = 0;
  m.reply(
    `Sukses mengeluarkan @${who.split("@")[0]} dari daftar Blacklist! Sekarang dia sudah dapat menggunakan bot di group ini!`,
    false,
    { mentions: [who] },
  );
};
handler.help = ["unblacklist"];
handler.tags = ["group"];
handler.command = /^(unblacklist(user)?)$/i;
handler.group = true;
handler.admin = true;
export default handler;
