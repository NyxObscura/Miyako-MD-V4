/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

export async function all(m) {
  const setting = global.db.data.settings[this.user.jid];
  if (setting.autoRestock) {
    if (new Date() * 1 - setting.autoRestockCD > 86400000) {
      let data = Object.entries(global.db.data.bots.stock);
      for (let v of data) {
        if (v[1] == 0) {
          global.db.data.bots.stock[v[0]] += 100000;
        }
      }
      setting.autoRestockCD = new Date() * 1;
    }
  }
  return !0;
}
