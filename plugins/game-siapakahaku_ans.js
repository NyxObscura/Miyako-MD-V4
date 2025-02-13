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
    !/Ketik.*(who|hint)|ᴋᴇᴛɪᴋ.*(ᴡʜᴏ|ʜɪɴᴛ)/i.test(m.quoted.text) ||
    /.*(who|hint)|.*(ᴡʜᴏ|ʜɪɴᴛ)/i.test(m.text)
  )
    return !0;
  this.siapakahaku = this.siapakahaku ? this.siapakahaku : {};
  if (!(id in this.siapakahaku)) return m.reply("Soal itu telah berakhir");
  if (m.quoted.id == this.siapakahaku[id][0].id) {
    let json = JSON.parse(JSON.stringify(this.siapakahaku[id][1]));
    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += this.siapakahaku[id][2];
      m.reply(`*Benar!*\n+${this.siapakahaku[id][2]} XP`);
      clearTimeout(this.siapakahaku[id][4]);
      delete this.siapakahaku[id];
    } else if (
      similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >=
      threshold
    ) {
      m.reply(`*Dikit Lagi!*`);
    } else if (--this.siapakahaku[id][3] == 0) {
      clearTimeout(this.siapakahaku[id][4]);
      delete this.siapakahaku[id];
      conn.reply(m.chat, `*Kesempatan habis!*\nJawaban: *${json.jawaban}*`, m);
    } else
      m.reply(
        `*Jawaban Salah!*\nMasih ada ${this.siapakahaku[id][3]} kesempatan`,
      );
  }
  return !0;
}
export const exp = 0;
