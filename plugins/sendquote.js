/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
async function handler(m) {
  if (!m.quoted) return m.reply("reply pesan!");
  let q = await m.getQuotedObj();
  if (!q.quoted) return m.reply("pesan yang anda reply tidak mengandung reply!");
  await q.quoted.copyNForward(m.chat, true);
}
handler.command = /^q$/i;

export default handler;
