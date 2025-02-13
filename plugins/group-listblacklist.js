/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import moment from "moment";
let handler = async (m, { conn }) => {
  let chat = global.db.data.chats[m.chat];
  let listUser = Object.entries(chat.member).filter((v) => v[1].blacklist);
  if (listUser.length == 0)
    return m.reply("Tidak ada user yang masuk Blacklist!");
  let caption = "";
  let member = [];
  for (let v of listUser) {
    let time = await dateTime(v[1].blacklistTime);
    caption += `@${v[0].split("@")[0]} \nMasuk blacklist pada *${time}* \n\n`;
    member.push(v[0]);
  }
  let footer = "*List user yang di Blacklist!*\n\n";
  await m.reply(footer + caption.trim(), false, {
    contextInfo: { mentionedJid: member },
  });
};
handler.help = ["listblacklist"];
handler.tags = ["group"];
handler.command = /^(listblacklist)$/i;
handler.group = true;
export default handler;

function dateTime(timestamp) {
  const dateReg = new Date(timestamp);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateReg.toLocaleDateString("id-ID", options);
  return formattedDate;
}
