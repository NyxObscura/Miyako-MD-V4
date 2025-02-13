/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let limit = 5;
import moment from "moment-timezone";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let who = m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.quoted
      ? m.quoted.sender
      : text
        ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
        : m.sender;

  let chat = global.db.data.chats[m.chat];
  chat.member[who] = chat.member[who] || {};
  chat.member[who].warn = chat.member[who].warn || 0;

  let user = chat.member[who];

  let d = new Date(new Date() + 3600000);
  let date = d.toLocaleDateString("id", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let caption = `
Hai, ${ucapan()}
${
  user.warn == 0
    ? `
${who == m.sender ? "Kamu" : "Dia"} tidak memiliki warn`
    : `
${who == m.sender ? "Kamu" : "Dia"} memiliki ${user.warn} \n\n_Note : Jika warn telah mencapai 5 maka kamu akan dikick_`
}
`.trim();
  conn.adReply(
    m.chat,
    caption,
    "W A R N I N G",
    date,
    "https://pomf2.lain.la/f/xnf9kiak.jpg",
    "",
    m,
  );
};
handler.help = ["cekwarn"];
handler.tags = ["group"];
handler.command = /^(cekwarn)$/i;
handler.group = true;
export default handler;

function ucapan() {
  const time = moment.tz("Asia/Jakarta").format("HH");
  let res = "Selamat dinihari 🌆";
  if (time >= 4) {
    res = "Selamat pagi 🌄";
  }
  if (time > 10) {
    res = "Selamat siang ☀️";
  }
  if (time >= 15) {
    res = "Selamat sore 🌇";
  }
  if (time >= 18) {
    res = "Selamat malam 🌙";
  }
  return res;
}
