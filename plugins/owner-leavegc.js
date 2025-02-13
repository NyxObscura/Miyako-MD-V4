/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, args, command, text }) => {
  let group = text ? text : m.chat;
  await conn.reply(group, "Byee Bot akan pergi , , ! (≧ω≦)ゞ", null);
  await conn.groupLeave(group);
  m.reply("S u k s e s");
};
handler.help = ["leavegc"];
handler.tags = ["owner"];
handler.command = /^(out|leavegc)$/i;
handler.owner = true;
export default handler;
