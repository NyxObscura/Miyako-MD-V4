/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (m.isGroup) {
    switch (text) {
      case "off":
      case "mute":
        if (chat.mute) return m.reply("_Bot Sudah Offline_");
        chat.mute = true;
        conn.reply(m.chat, "S u k s e s", m);
        break;
      case "on":
      case "unmute":
        if (!chat.mute) return m.reply("_Bot Sudah Online_");
        chat.mute = false;
        conn.reply(m.chat, "S u k s e s", m);
        break;
      default: {
        m.reply(
          `Format Salah!\n\nContoh:\n${usedPrefix + command} on\n${usedPrefix + command} off`,
        );
      }
    }
  }
};
handler.help = ["botmode"];
handler.tags = ["group"];
handler.command = /^(bot(mode)?)$/i;
handler.group = true;
handler.admin = true;
export default handler;
