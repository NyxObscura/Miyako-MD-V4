/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn }) => {
  let res = await conn.groupRevokeInvite(m.chat);
  conn.reply(
    m.sender,
    "https://chat.whatsapp.com/" + (await conn.groupInviteCode(m.chat)),
    m,
  );
};
handler.help = ["revoke"];
handler.tags = ["group"];
handler.command = /^re(voke|new)(invite|link)?$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
