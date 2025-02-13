/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { args }) => {
  let id = args[0] ? args[0] : m.chat;
  let chat = global.db.data.chats[m.chat];
  if (args[0]) {
    chat.isBannedTime > 0 ? (chat.isBannedTime = 0) : "";
    chat.isBanned = false;
    m.reply("Berhasil!");
  } else {
    chat.isBannedTime > 0 ? (chat.isBannedTime = 0) : "";
    chat.isBanned = false;
    m.reply("Berhasil!");
  }
};
handler.help = ["unbanchat"];
handler.tags = ["owner"];
handler.command = /^(unbanchat|ubnc)$/i;
handler.owner = true;
export default handler;
