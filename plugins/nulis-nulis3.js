/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) return m.reply(`Example ${usedPrefix}nulis3 Teks Yang Ingin Kamu Tulis`);
  let kertas = API("lol", "/api/nulis", { text: text }, "apikey");
  await conn.sendFile(
    m.chat,
    kertas,
    "error.jpg",
    "Lain Kali Nulis Sendiri...",
    m,
  );
};
handler.help = ["nulis3"];
handler.tags = ["nulis"];
handler.command = /^nulis3$/i;
export default handler;
