/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (
  m,
  { conn, text, isROwner, isOwner, isAdmin, usedPrefix, command },
) => {
  if (text) {
    global.db.data.chats[m.chat].sBye = text;
    m.reply("Bye Berhasil Diatur...\n@user [mention]");
  } else m.reply(`Teksnya Mana..\nContoh:\nSelamat Tinggal Beban @user`);
};
handler.help = ["setbye"];
handler.tags = ["group"];
handler.command = /^(setbye)$/i;
handler.group = true;
handler.admin = true;

export default handler;
