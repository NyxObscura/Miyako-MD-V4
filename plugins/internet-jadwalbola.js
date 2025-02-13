/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";
let handler = async (m, { command, usedPrefix }) => {
  let f = await fetch(
    API("https://api.lolhuman.xyz", "/api/jadwalbola", null, "apikey"),
  );
  let xx = await f.json();
  let teks = xx.result
    .map((v) => {
      return `  
_*${v.match}*_
🏆Event: ${v.event}
⏲️Waktu: _${v.time}_
📺Channel Tv: ${v.tv}
      `.trim();
    })
    .filter((v) => v)
    .join("\n\n");
  await m.reply(teks);
};
handler.help = ["jadwalbola"];
handler.tags = ["internet"];
handler.command = /^jadwalbola$/i;
export default handler;
