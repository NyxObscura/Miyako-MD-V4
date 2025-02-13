/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn }) => {
  conn.caklontong = conn.caklontong ? conn.caklontong : {};
  let id = m.chat;
  if (!(id in conn.caklontong)) throw false;
  let json = conn.caklontong[id][1];
  let ans = json.jawaban;
  let clue = ans.replace(/[AIUEO]/gi, "_");
  m.reply(
    "```" + clue + "```" + "\n\n*Jangan Balas Chat Ini Tapi Balas Soalnya*",
  );
};
handler.command = /^calo$/i;
handler.limit = true; handler.error = 0
export default handler;
