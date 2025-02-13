/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, text }) => {
  let tag = `@${m.sender.replace(/@.+/, "")}`;
  let mentionedJid = [m.sender];
  conn.reply(m.chat, tag, m, {
    contextInfo: {
      mentionedJid,
    },
  });
};
handler.help = ["tagme"];
handler.tags = ["group"];
handler.command = /^tagme$/i;

handler.group = false;

export default handler;
