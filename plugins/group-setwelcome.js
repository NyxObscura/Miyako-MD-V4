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
    global.db.data.chats[m.chat].sWelcome = text;
    m.reply(
      "Welcome berhasil diatur\n@user (Mention)\n@subject (Judul Grup)\n@desc (Deskripsi Grup)",
    );
  } else
    return m.reply(`Teksnya mana?\n\ncontoh:\n${usedPrefix + command} hai, @user!\nSelamat datang di grup @subject\n\n@desc`);
};
handler.help = ["setwelcome"];
handler.tags = ["group"];
handler.command = /^(setwelcome|setw)$/i;
handler.group = true;
handler.admin = true;

export default handler;
