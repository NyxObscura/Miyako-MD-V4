/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import similarity from "similarity";
const threshold = 0.72;
export async function before(m) {
  let id = m.chat;
  if (
    !m.quoted ||
    !m.quoted.fromMe ||
    !m.quoted.isBaileys ||
    !m.text ||
    !/Ketik.*hkan|ᴋᴇᴛɪᴋ.*ʜᴋᴀɴ/i.test(m.quoted.text) ||
    /.*hkan|.*ʜᴋᴀɴ/i.test(m.text)
  )
    return !0;
  this.tebaktebakan = this.tebaktebakan ? this.tebaktebakan : {};
  if (!(id in this.tebaktebakan)) return m.reply("Soal itu telah berakhir");
  if (m.quoted.id == this.tebaktebakan[id][0].id) {
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);
    if (isSurrender) {
      clearTimeout(this.tebaktebakan[id][4]);
      delete this.tebaktebakan[id];
      return m.reply("*Yah Menyerah :( !*");
    }
    let json = JSON.parse(JSON.stringify(this.tebaktebakan[id][1]));
    // m.reply(JSON.stringify(json, null, '\t'))
    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += this.tebaktebakan[id][2];
      m.reply(`*Benar!*\n+${this.tebaktebakan[id][2]} XP`);
      clearTimeout(this.tebaktebakan[id][4]);
      delete this.tebaktebakan[id];
    } else if (
      similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >=
      threshold
    ) {
      m.reply(`*Dikit Lagi!*`);
    } else if (--this.tebaktebakan[id][3] == 0) {
      clearTimeout(this.tebaktebakan[id][4]);
      delete this.tebaktebakan[id];
      conn.reply(m.chat, `*Kesempatan habis!*\nJawaban: *${json.jawaban}*`, m);
    } else
      m.reply(
        `*Jawaban Salah!*\nMasih ada ${this.tebaktebakan[id][3]} kesempatan`,
      );
  }
  return !0;
}
export const exp = 0;
