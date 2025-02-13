/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

export async function before(m) {
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  if (!m.isGroup && m.isBaileys) return;
  if (chat.isBanned || chat.mute || user.banned) return;
  if (typeof chat.store[m.text] !== "undefined") {
    let { media, caption } = chat.store[m.text];
    if (media) {
      await conn.sendFile(m.chat, media, false, caption, m);
    } else {
      await m.reply(caption);
    }
  }
  return !0;
}
