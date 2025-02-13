/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, command }) => {
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let url = API("lol", "/api/random/husbu", null, "apikey");
  conn.sendFile(m.chat, url, "husbu.jpeg", "Ini Dia Kak", m, false);
};
handler.command = /^(husbu)$/i;
handler.tags = ["anime"];
handler.help = ["husbu"];
handler.premium = false;
handler.limit = true; handler.error = 0

export default handler;
