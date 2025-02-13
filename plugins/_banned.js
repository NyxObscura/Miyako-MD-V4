/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

export async function before(m) {
  let user = global.db.data.users[m.sender];
  let chat = global.db.data.chats[m.chat];
  if ((user.banned || chat.isBannedTime) != 0) {
    if (
      new Date() - user.bannedTime > 0 &&
      user.bannedTime != 17 &&
      user.banned
    ) {
      user.banned = false;
      user.bannedTime = 0;
    } else if (
      new Date() - chat.isBannedTime > 0 &&
      chat.isBannedTime != 17 &&
      chat.isBanned
    ) {
      chat.isBanned = false;
      chat.isBannedTime = 0;
    }
  }
  return !0;
}
