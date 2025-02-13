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
      `Masukan Format Dengan Benar!\n\nExample\n${usedPrefix + command} Saya Gaming`,
    );
  let res = API("lol", "/api/ephoto1/fpslogo", { text: text }, "apikey");
  conn.sendFile(m.chat, res, "logogaming2.jpg", `Sudah Jadi`, m, false);
};
handler.help = ["logogaming2"];
handler.tags = ["nulis"];
handler.command = /^(logogaming2)$/i;
handler.premium = true; handler.error = 0
export default handler;
