/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let toM = (a) => "@" + a.split("@")[0];
function handler(m, { groupMetadata }) {
  let ps = groupMetadata.participants.map((v) => v.id);
  let a = ps.getRandom();
  let b;
  do b = ps.getRandom();
  while (b === a);
  m.reply(`${toM(a)} ❤️ ${toM(b)}`, null, { mentions: [a, b] });
}
handler.help = ["jadian"];
handler.tags = ["fun"];
handler.command = /^jadian$/i;
handler.group = true;
export default handler;
