/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { usedPrefix, text }) => {
  let id = m.chat;
  if (id in global.db.data.bots.absen) {
    return m.reply(`_*Masih ada absen di chat ini!*_\n\n*${usedPrefix}hapusabsen* - untuk menghapus absen`);
  }
  global.db.data.bots.absen[id] = [
    m.reply(
      `Berhasil memulai absen!\n\n*${usedPrefix}absen* - untuk absen\n*${usedPrefix}cekabsen* - untuk mengecek absen\n*${usedPrefix}hapusabsen* - untuk menghapus data absen`,
    ),
    [],
    text,
  ];
};
handler.help = ["mulaiabsen"];
handler.tags = ["group"];
handler.command = /^(start|mulai)absen$/i;
handler.group = true;
handler.admin = true;
export default handler;
