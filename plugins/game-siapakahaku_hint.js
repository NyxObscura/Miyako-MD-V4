/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn }) => {
  conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {};
  let id = m.chat;
  if (!(id in conn.siapakahaku)) return;
  let json = conn.siapakahaku[id][1];
  let ans = json.jawaban;
  let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz]/gi, "_");
  m.reply(
    "Clue : " +
      "```" +
      clue +
      "```" +
      "\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_",
  );
};
handler.command = /^(who)$/i;
handler.limit = true; handler.error = 0
export default handler;
