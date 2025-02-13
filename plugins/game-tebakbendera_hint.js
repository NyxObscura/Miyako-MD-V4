/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn }) => {
  conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {};
  let id = m.chat;
  if (!(id in conn.tebakbendera)) return;
  let json = conn.tebakbendera[id][1];
  m.reply(
    "Clue : " +
      "```" +
      json.name.replace(/[AIUEOaiueo]/gi, "_") +
      "```" +
      "\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_",
  );
};
handler.command = /^(teben)$/i;
handler.limit = true; handler.error = 0
export default handler;
