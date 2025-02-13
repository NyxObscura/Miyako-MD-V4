/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, text }) => {
  let mention = m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.quoted
      ? m.quoted.sender
      : text
        ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
        : false;
  if (!mention) return m.reply(`Tag Orangnya`);
  if (!(mention in global.db.data.users))
    return m.reply("User tidak terdaftar dalam DATABASE!!");
  let user = global.db.data.users[mention];
  if (!user.banned) return m.reply("User tidak Terbanned!!");
  user.banned = false;
  user.bannedTime > 0 ? (user.bannedTime = 0) : 0;
  await m.reply(`Berhasil Unbanned @${mention.split("@")[0]}`, false, {
    mentions: [mention],
  });
  conn.reply(mention, "Kamu telah di Unbanned!!", null);
};
handler.help = ["unban"];
handler.tags = ["owner"];
handler.command = /^unban(user)?$/i;
handler.owner = true;
export default handler;
