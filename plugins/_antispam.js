/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

export async function before(m, { isOwner, isPrems }) {
  let user = global.db.data.users[m.sender];
  let chat = global.db.data.chats[m.chat];

  if (
    !m.text.startsWith("=>") &&
    !m.text.startsWith(">") &&
    !m.text.startsWith(".") &&
    !m.text.startsWith("#") &&
    !m.text.startsWith("!") &&
    !m.text.startsWith("/") &&
    !m.text.startsWith("/")
  )
    return;
  if (chat.isBanned || chat.mute || user.banned) return;

  // Skip spam checks if the user is the owner
  if (!isOwner && isPrems) {
    this.spam = this.spam ? this.spam : {};
    if (m.sender in this.spam) {
      this.spam[m.sender].count++;
      if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam >= 2) {
        if (this.spam[m.sender].count >= 2) {
          user.banned = true;
          m.reply(
            "_*乂 Spam Command Terdeteksi!*_\n\n_Silahkan Tunggu 1 Menit Untuk Menggunakan Command Kembali_",
          );
          var detik = 60000 * 1;
          var now = new Date() * 1;
          if (now < user.bannedTime) user.bannedTime += detik;
          else user.bannedTime = now + detik;
        }
        this.spam[m.sender].count = 0;
        this.spam[m.sender].lastspam = m.messageTimestamp.toNumber();
      }
    } else {
      this.spam[m.sender] = {
        jid: m.sender,
        count: 0,
        lastspam: 0,
      };
    }
  }
  return !0;
}