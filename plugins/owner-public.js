/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, command }) => {
  let isPublic = command === "public";
  let self = global.opts["self"];

  if (self === !isPublic)
    return m.reply(
      `Berhasil ${!isPublic ? "Self" : "Public"}`,
    );

  global.opts["self"] = !isPublic;

  m.reply(`Berhasil ${!isPublic ? "Self" : "Public"}`);
};

handler.help = ["self", "public"];
handler.tags = ["owner"];

handler.owner = true;

handler.command = /^(self|public)/i;

export default handler;
