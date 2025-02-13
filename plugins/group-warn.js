/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let war = 3;
let handler = async (
  m,
  { conn, text, args, groupMetadata, usedPrefix, command },
) => {
  /*const time = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}*/
  let who;
  if (m.isGroup)
    who = m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
        ? m.quoted.sender
        : false;
  else who = m.chat;
  if (!who)
    return m.reply(`✳️ Memberi label atau menyebut seseorang\n\n📌 Contoh : ${usedPrefix + command} @user`);
  if (!(who in global.db.data.users))
    return m.reply(`✳️ Pengguna hilang dari database saya`);
  let name = conn.getName(m.sender);
  let warn = global.db.data.users[who].warning;
  if (warn < war) {
    global.db.data.users[who].warning += 1;
    m.reply(
      `
⚠️ *Pengguna yang Diperingatkan* ⚠️

▢ *Admin:* ${name}
▢ *Pengguna:* @${who.split`@`[0]}
▢ *Memperingatkan:* ${warn + 1}/${war}
▢ *Alasan:* ${text}`,
      null,
      { mentions: [who] },
    );
    m.reply(
      `
⚠️ *PERINGATAN* ⚠️
Anda menerima peringatan dari admin

▢ *Memperingatkan:* ${warn + 1}/${war} 
Jika Anda menerima *${war}* Peringatan bahwa Anda akan dihapus secara otomatis dari grup`,
      who,
    );
  } else if (warn == war) {
    global.db.data.users[who].warning = 0;
    m.reply(`⛔ Pengguna melebihi peringatan *${war}* karena itu akan dihapus`);

    await conn.groupParticipantsUpdate(m.chat, [who], "remove");
    m.reply(
      `♻️ Anda tersingkir dari grup *${groupMetadata.subject}* karena Anda telah diperingatkan *${war}* kali`,
      who,
    );
  }
};
handler.help = ["warn @user"];
handler.tags = ["group"];
handler.command = ["warn"];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
