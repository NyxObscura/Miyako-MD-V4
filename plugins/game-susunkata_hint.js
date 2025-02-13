/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn }) => {
  conn.susunkata = conn.susunkata ? conn.susunkata : {};
  let id = m.chat;
  if (!(id in conn.susunkata)) return;
  let json = conn.susunkata[id][1];
  let ans = json.jawaban.trim();
  let clue = ans.replace(/[AIUEOaiueo]/g, "_");
  conn.reply(
    m.chat,
    "```" + clue + "```\n\n_*Balas Soalnya, Bukan Pesan Ini*_",
    conn.susunkata[id][0],
  );
};
handler.command = /^suska$/i;
handler.limit = true; handler.error = 0
handler.susunkata = true;
handler.onlyprem = true;
export default handler;
