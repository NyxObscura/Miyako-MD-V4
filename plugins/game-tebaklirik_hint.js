/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn }) => {
  conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {};
  let id = m.chat;
  if (!(id in conn.tebaklirik)) return;
  let json = conn.tebaklirik[id][1];
  m.reply(
    "Clue : " +
      "```" +
      json.jawaban.replace(/[AIUEOaiueo]/gi, "_") +
      "```" +
      "\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_",
  );
};
handler.command = /^(terik)$/i;
handler.limit = true; handler.error = 0
export default handler;
