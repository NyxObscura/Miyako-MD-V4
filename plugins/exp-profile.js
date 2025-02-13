/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import PhoneNumber from "awesome-phonenumber";
import fs from "fs";
import moment from "moment-timezone";
const handler = async (m, { conn }) => {
  const d = new Date(new Date() + 3600000);
  const locale = "id";
  const weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
    Math.floor(d / 84600000) % 5
  ];
  const week = d.toLocaleDateString(locale, {
    weekday: "long",
  });
  const date = d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const wibh = moment.tz("Asia/Jakarta").format("HH");
  const wibm = moment.tz("Asia/Jakarta").format("mm");
  const wibs = moment.tz("Asia/Jakarta").format("ss");
  const wktuwib = `${wibh} H ${wibm} M ${wibs} S`;

  const who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender;
  const user = global.db.data.users[who];
  const isMods = [
    conn.decodeJid(global.conn.user.id),
    ...global.config.owner
      .filter(([number, _, isDeveloper]) => number && isDeveloper)
      .map(([number]) => number),
  ]
    .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
    .includes(who);
  const isOwner =
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
  const isPrems = isOwner || new Date() - user.premiumTime < 0;

  if (typeof user == "undefined")
    return m.reply("Pengguna tidak ada didalam data base");
  const pp = await conn
    .profilePictureUrl(who, "image")
    .catch((_) => fs.readFileSync("./src/avatar_contact.png"));
  const bio = await conn.fetchStatus(who).catch((_) => "Tidak Ada Bio");
  const {
    role,
    premium,
    money,
    level,
    limit,
    exp,
    lastclaim,
    registered,
    regTime,
    age,
  } = user;

  const name = user.registered ? user.name : conn.getName(who);
  const datePacaran = await dateTime(user.pacaranTime);
  const caption = `
– User Info

┌ • Username : ${name}
│ • Umur : ${user.registered ? age : ""}
│ • Status : ${isMods ? "Developer" : isOwner ? "Owner" : isPrems ? "Premium User" : user.level > 999 ? "Elite User" : "Free User"}
│ • Bio : ${bio.status ? bio.status : bio}
│ • Hubungan : ${user.pacar != "" ? `Berpacaran dengan @${user.pacar.split("@")[0]} sejak ${datePacaran}` : "Tidak ada"}
└ • Link : https://wa.me/${who.split`@`[0]}

– RPG Info

┌ • Level : ${user.level}
│ • Exp : ${user.exp}
│ • Money : ${user.money}
└ • Bank : ${user.bank}

🌟 Premium : ${isPrems ? "✅" : "❌"}
📑 Registered : ${user.registered ? "✅ ( " + (await dateTime(regTime)) + " )" : "❌"}
`.trim();

  await conn.sendFile(m.chat, pp, "profile.jpeg", caption, m, false, {
    contextInfo: { mentionedJid: [who, user.pacar] },
  });
};
handler.help = ["profile"];
handler.tags = ["xp"];
handler.command = /^(profile|profil)$/i;
export default handler;

function dateTime(timestamp) {
  const dateReg = new Date(timestamp);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateReg.toLocaleDateString("id-ID", options);
  return formattedDate;
}

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  const ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10;
  const mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12;
  const d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30;
  const h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
  const m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [
    "┊ ",
    ye,
    " *Years 🗓️*\n",
    "┊ ",
    mo,
    " *Month 🌙*\n",
    "┊ ",
    d,
    " *Days ☀️*\n",
    "┊ ",
    h,
    " *Hours 🕐*\n",
    "┊ ",
    m,
    " *Minute ⏰*\n",
    "┊ ",
    s,
    " *Second ⏱️*",
  ]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}
