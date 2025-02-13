/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

export async function all(m) {
  let setting = global.db.data.settings[this.user.jid];
  if (new Date() * 1 - setting.expiredCD > 600000) {
    let data = Object.entries(global.db.data.chats).filter(
      (v) => v[1].expired > 0 && new Date() * 1 - v[1].expired > 0,
    );
    for (let v of data) {
      try {
        let groupMetadata = await conn.groupMetadata(v[0]);
        this.reply(
          v[0],
          `Waktunya Untuk Meninggalkan Group\nJangan lupa sewa lagi ya!`,
          null,
        ).then(() => {
          this.sendContact(v[0], global.config.owner, null).then(() => {
            this.groupLeave(v[0]);
            global.db.data.chats[v[0]].expired = 0;
          });
        });
      } catch (e) {
        global.db.data.chats[v[0]].expired = 0;
      }
    }
    setting.expiredCD = new Date() * 1;
  }
  return !0;
};