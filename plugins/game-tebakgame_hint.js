/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn }) => {
  conn.tebakgame = conn.tebakgame ? conn.tebakgame : {};
  let id = m.chat;
  if (!(id in conn.tebakgame)) return;
  let json = conn.tebakgame[id][1];
  m.reply(
    "Clue : " +
      "```" +
      json.jawaban.replace(/[AIUEOaiueo]/gi, "_") +
      "```" +
      "\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_",
  );
};
handler.command = /^(hgame)$/i;
handler.limit = true; handler.error = 0
export default handler;
