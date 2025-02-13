/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `Masukan Format Dengan Benar!\n\nExample\n${usedPrefix + command} Joker`,
    );
  let res = API("lol", "/api/textprome/jokerlogo", { text: text }, "apikey");
  conn.sendFile(m.chat, res, "joker.jpg", "Sudah Jadi", m, false);
};
handler.help = ["logojoker"];
handler.tags = ["nulis"];
handler.command = /^(logojoker)$/i;

handler.limit = true; handler.error = 0

export default handler;
