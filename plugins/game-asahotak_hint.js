/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn }) => {
  conn.asahotak = conn.asahotak ? conn.asahotak : {};
  let id = m.chat;
  if (!(id in conn.asahotak)) throw false;
  let json = conn.asahotak[id][1];
  m.reply(
    "Clue : " +
      "```" +
      json.jawaban.replace(/[AIUEOaiueo]/gi, "_") +
      "```" +
      "\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_",
  );
};
handler.command = /^hotak$/i;
handler.limit = true; handler.error = 0
export default handler;
