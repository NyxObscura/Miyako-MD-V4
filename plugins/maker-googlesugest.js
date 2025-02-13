/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let handler = async (m, { conn, args, usedPrefix, command }) => {
  let teks = args.join(" ").split("|");
  if (!teks[0] || !teks[1] || !teks[2])
    return m.reply(`Masukan Text Nya!\n\nContoh\n${usedPrefix + command} Teks 1|Teks 2|Teks 3`);
  let res = API(
    "lol",
    "/api/gsuggest",
    { text1: teks[0], text2: teks[1], text3: teks[2] },
    "apikey",
  );
  conn.sendFile(m.chat, res, "error.jpg", "Ini Dia Kak", m, false);
};
handler.help = ["googlesugest"];
handler.tags = ["maker"];
handler.command = /^(googlesugest)$/i;
handler.limit = true; handler.error = 0
export default handler;
