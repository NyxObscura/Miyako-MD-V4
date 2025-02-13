/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let who = m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.quoted
      ? m.quoted.sender
      : args[0]
        ? args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
        : false;
  if (!who)
    return m.reply(
      `Tag User Atau Masukan Nomornya\n\nContoh :\n${usedPrefix + command} @${m.sender.split("@")[0]} 4`,
      false,
      { mentions: [m.sender] },
    );
  let user = global.db.data.users[who];
  if (args[1]) {
    if (isNaN(args[1])) return m.reply("Hanya Angka!");
    let jumlahHari = 86400000 * args[1];
    let now = new Date() * 1;
    if (now < user.bannedTime) user.bannedTime += jumlahHari;
    else user.bannedTime = now + jumlahHari;
    user.banned = true;
    m.reply(
      `Sukses Membanned @${who.split("@")[0]} Selama ${args[1]} Hari`,
      false,
      { mentions: [who] },
    );
    m.reply(`Kamu Telah Dibanned Owner Selama ${args[1]} Hari`, who);
  } else {
    user.bannedTime = 17;
    user.banned = true;
    m.reply(`Sukses Membanned @${who.split("@")[0]}`, false, {
      mentions: [who],
    });
    m.reply(`Kamu Telah Dibanned Owner`, who);
  }
};
handler.help = ["banned"];
handler.tags = ["owner"];
handler.command = /^(ban(user)?|banned(user)?)$/i;
handler.owner = true;
export default handler;
