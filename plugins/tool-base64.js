/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let handler = async (m, { command, text }) => {
  let txt = m.quoted
    ? m.quoted.text
      ? m.quoted.text
      : text
        ? text
        : m.text
    : m.text;
  m.reply(Buffer.from(txt, "utf-8").toString("base64"));
};
handler.help = ["base64"];
handler.tags = ["tools"];
handler.command = /^base64$/i;

export default handler;
