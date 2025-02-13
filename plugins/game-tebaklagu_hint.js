/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn }) => {
  conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {};
  let id = m.chat;
  if (!(id in conn.tebaklagu)) return;
  let json = conn.tebaklagu[id][1];
  m.reply(
    "Clue : " +
      "```" +
      json.judul.replace(/[AIUEOaiueo]/gi, "_") +
      "```" +
      "\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_",
  );
};
handler.command = /^hlagu$/i;
handler.limit = true; handler.error = 0
export default handler;
