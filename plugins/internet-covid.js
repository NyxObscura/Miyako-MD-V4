/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `Masukan Nama Negara!\n\nContoh :\n${usedPrefix + command} indonesia`,
    );
  let res = await fetch(
    API("https://covid19.mathdro.id", "/api/countries/" + text),
  );
  if (!res.ok) throw await res.text();
  let json = await res.json();
  if (!json.confirmed) return m.reply("Negara?");
  if (json.confirmed)
    m.reply(
      `
🌏Negara : ${text}
✅Terkonfirmasi : ${json.confirmed.value}
📉Sembuh : ${json.recovered.value}
☠️Meninggal : ${json.deaths.value}
💌Update Info : ${json.lastUpdate}
`.trim(),
    );
  else throw json;
};
handler.help = ["covid"];
handler.tags = ["internet"];
handler.limit = true; handler.error = 0
handler.command = /^(corona|covid|covid19)$/i;
export default handler;
