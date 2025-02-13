/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fs from "fs";

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `Masukan logs \n\nContoh : \n${usedPrefix + command} downloader-ig.js|Memperbaiki error`,
    );
  let logs = global.db.data.bots.logs;
  logs.history = logs.history ? logs.history : [];
  let [fitur, update] = text.split("|");
  if (!fitur) return m.reply("Masukan nama file yang di update");
  if (!update) return m.reply("Masukan updatean nya");
  let d = new Date();
  let date = d.toLocaleDateString("id", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  logs.history.push({
    fitur: fitur,
    update: update,
    date: date,
  });
  await m.reply("Berhasil!");
  let header = "_*Logs Update Terbaru Bot*_ \n\n";
  let caption = logs.history
    .reverse()
    .map((v, i) => {
      return `
_*${i + 1}. Date ${v.date}*_
_Name : ${v.fitur}_
_Description : ${v.update}_

_Update Fitur *${v.fitur}*_
`.trim();
    })
    .join("\n\n");
  await conn.adReply(
    "1203632982369543523@newsletter",
    header + caption,
    "Logs Update Terbaru Dari Bot",
    "Setiap Ada Update Pasti Dimasukan Kesini, Jadi Pantau Terus Ya",
    fs.readFileSync("./media/thumbnail.jpg"),
    global.config.website,
    m,
  );
};
handler.help = ["addlogs"];
handler.tags = ["owner"];
handler.command = /^(addlog(s)?)$/i;
handler.limit = true; handler.error = 0
export default handler;
