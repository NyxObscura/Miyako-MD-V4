/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn }) => {
  conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {};
  let id = m.chat;
  if (!(id in conn.tebakgambar)) throw false;
  let json = conn.tebakgambar[id][1];
  m.reply(
    "Clue : " +
      "```" +
      json.jawaban.replace(/[AIUEOaiueo]/gi, "_") +
      "```" +
      "\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_",
  );
};
handler.command = /^hgamb$/i;
handler.limit = true; handler.error = 0
export default handler;
