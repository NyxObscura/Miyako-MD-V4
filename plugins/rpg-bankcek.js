/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fs from "fs";
let handler = async (m, { conn }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender;
  if (!(who in global.db.data.users))
    return m.reply(`User ${who} not in database`);
  let user = global.db.data.users[who];
  let isMods = global.config.owner
    .filter(([number, _, isDeveloper]) => number && isDeveloper)
    .map(([number]) => number)
    .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
    .includes(who);
  let isOwner =
    m.fromMe ||
    isMods ||
    [
      conn.decodeJid(global.conn.user.id),
      ...global.config.owner
        .filter(([number, _, isDeveloper]) => number && !isDeveloper)
        .map(([number]) => number),
    ]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(who);
  let isPrems = isOwner || new Date() - user.premiumTime < 0;
  let caption = `
▧「 *BANK CEK* 」
│ 👤 Name: ${user.registered ? user.name : conn.getName(m.sender)}
│ ${global.rpg.emoticon("atm")} Atm: ${user.atm > 0 ? "Level " + user.atm : "✖️"}
│ ${global.rpg.emoticon("bank")} Bank: ${user.bank} / ${user.fullatm}
│ ${global.rpg.emoticon("money")} Money: ${user.money}
│ ${global.rpg.emoticon("chip")} Chip: ${user.chip}
│ 🤖 Robo: ${user.robo > 0 ? "Level " + user.robo : "✖️"}
│ 🌟 Status: ${isMods ? "Developer" : isOwner ? "Owner" : isPrems ? "Premium User" : user.level > 999 ? "Elite User" : "Free User"}
│ 📑 Registered: ${user.registered ? "Yes" : "No"}
└────···
`.trim();
  conn.adReply(
    m.chat,
    caption,
    "B A N K  U M U M",
    "",
    flaImg.getRandom() + "BANK UMUM",
    global.config.website,
    m,
  );
};
handler.help = ["bank"];
handler.tags = ["rpg"];
handler.command = /^bank$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;

export default handler;

const flaImg = [
  "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=",
  "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=",
  "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=",
  "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=",
  "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=",
];
