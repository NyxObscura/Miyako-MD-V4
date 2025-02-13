/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.listAfk = conn.listAfk || {};
  let user = global.db.data.users[m.sender];
  user.afk = +new Date();
  user.afkReason = text;
  const username = m.name || m.pushName;
  const id = m.sender || m.key.remoteJid;

  conn.listAfk[m.chat] = conn.listAfk[m.chat]
    ? conn.listAfk[m.chat].some((user) => user.id === id)
      ? conn.listAfk[m.chat]
      : [
          ...conn.listAfk[m.chat],
          {
            username,
            id,
          },
        ]
    : [
        {
          username,
          id,
        },
      ];

  let caption = `${user.registered ? user.name : conn.getName(m.sender)} (@${m.sender.replace(/@.+/, "")}) Sekarang lagi AFK

Dengan alasan ➠ *${text ? "" + text : "Tanpa Alasan"}*`;

  m.reply(caption);
};

handler.help = ["afk [alasan]"];
handler.tags = ["main"];
handler.group = true;
handler.command = /^afk$/i;

export default handler;