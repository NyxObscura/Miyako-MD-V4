/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let handler = async (m, { usedPrefix }) => {
  let id = m.chat;
  if (!(id in global.db.data.bots.absen))
    return m.reply(`_*Tidak ada absen berlangsung digrup ini!*_\n\n*${usedPrefix}mulaiabsen* - untuk memulai absen`);
  delete global.db.data.bots.absen[id];
  m.reply(`Done!`);
};
handler.help = ["hapusabsen"];
handler.tags = ["group"];
handler.command = /^(delete|hapus)absen$/i;
handler.group = true;
handler.admin = true;
export default handler;
