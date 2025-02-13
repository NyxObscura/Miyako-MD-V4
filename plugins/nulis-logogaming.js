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
      `Masukan Format Dengan Benar!\n\nExample\n${usedPrefix + command} Ruok`,
    );
  let res = API("lol", "/api/ephoto1/logogaming", { text: text }, "apikey");
  conn.sendFile(m.chat, res, "gaming.jpg", "Ini Dia Kak", m);
};
handler.help = ["logogaming"];
handler.tags = ["nulis"];
handler.command = /^(logogaming)$/i;
handler.premium = true; handler.error = 0
export default handler;
