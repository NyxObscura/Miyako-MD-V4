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
  if (new Date() * 1 - setting.premiumCD > 600000) {
    let user = global.db.data.users;
    let data = Object.keys(global.db.data.users).filter(
      (v) =>
        user[v].premiumTime > 0 && new Date() * 1 - user[v].premiumTime > 0,
    );
    for (let number of data) {
      this.reply(
        number,
        `Halo ${global.db.data.users[number].registered ? global.db.data.users[number].name : this.getName(number)} \nWaktu premium kamu sudah habis, jika ingin perpanjang silahkan chat nomor owner dibawah ya!`,
        null,
      ).then(() => {
        this.sendContact(number, global.config.owner, m).then(() => {
          global.db.data.users[number].premiumTime = 0;
          global.db.data.users[number].premium = false;
        });
      });
    }
    setting.premiumCD = new Date() * 1;
  }
  return !0;
}
