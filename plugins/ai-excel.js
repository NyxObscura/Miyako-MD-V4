/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";

const handler = async (m, { conn, text }) => {
  if (!text)
    return m.reply(
      "*masukan promptnya*\n*contoh*: .excel penjumlahan g1 sampai g5",
    );

  try {
    await m.reply(wait);
    let api = await fetch(
      `https://anabot.my.id/api/ai/excelAi?prompt=${text}&apikey=ReiiNt`,
    );
    let data = await api.json();
    let res = data.result;
    await m.reply(res);
  } catch (e) {
    return e.message;
  }
};
handler.command = ["rumusexcel", "excel"];
handler.help = ["rumusexcel <prompt>"];
handler.tags = ["ai", "tools"];
handler.limit = true; handler.error = 0
export default handler;
