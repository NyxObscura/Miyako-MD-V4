/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let handler = async (m, { conn, text, usedPrefix, command }) => {
  let [teks1, teks2] = text.split("|");
  if (!teks1 || !teks2)
    return m.reply(
      `Masukan Format Dengan Benar!\n\nExample\n${usedPrefix + command} Tiktok|Make`,
    );
  let res = API(
    "lol",
    "/api/photooxy2/tiktok",
    { text1: teks1, text2: teks2 },
    "apikey",
  );
  conn.sendFile(m.chat, res, "error.jpg", "Ini Dia Kak", m, false);
};
handler.help = ["logotiktok"];
handler.tags = ["nulis"];
handler.command = /^(logotiktok)$/i;

handler.limit = true; handler.error = 0

export default handler;
