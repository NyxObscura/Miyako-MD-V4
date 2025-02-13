/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let who = text.replace(/\D/g, "") + "@s.whatsapp.net";
  if (!who) return m.reply(`Format: ${usedPrefix + command} <nomor>`);
  let index = db.data.bots.owner.findIndex(([number]) => number === who.split("@")[0]);
  if (index === -1) return m.reply(`[ ! ] Nomor ${who.split("@")[0]} bukan owner.`);
  db.data.bots.owner.splice(index, 1);
  await conn.reply(m.chat, `Sukses menghapus @${who.split("@")[0]} dari daftar owner.`, m, { mentions: [who] });
};

handler.help = ["deleteowner"];
handler.tags = ["owner"];
handler.command = /^(delowner|delown|deleteowner|deleteown)$/i;

handler.owner = true;

export default handler;