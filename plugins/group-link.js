/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { areJidsSameUser } from "@adiwajshing/baileys";
let handler = async (m, { conn, args }) => {
  let group = m.chat;
  if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) group = args[0];
  if (!/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(group))
    return m.reply("Hanya bisa dibuka di grup");
  let groupMetadata = await conn.groupMetadata(group);
  if (!groupMetadata) return m.reply("groupMetadata is undefined :\\");
  if (!("participants" in groupMetadata))
    throw "participants is not defined :(";
  let me = groupMetadata.participants.find((user) =>
    areJidsSameUser(user.id, conn.user.id),
  );
  if (!me) return m.reply("Aku tidak ada di grup itu :(");
  if (!me.admin) return m.reply("Aku bukan admin T_T");
  m.reply("https://chat.whatsapp.com/" + (await conn.groupInviteCode(group)));
};
handler.help = ["linkgroup"];
handler.tags = ["group"];
handler.command = /^link(gro?up|gc)?$/i;

export default handler;
