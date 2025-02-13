/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  let cheat = {
    1: "money",
    2: "limit",
    3: "level",
    4: "limit",
    5: "exp",
    7: "aqua",
    8: "trash",
    9: "wood",
    10: "rock",
    11: "string",
    12: "iron",
    13: "diamond",
    14: "emerald",
    15: "gold",
    16: "coal",
    17: "common",
    18: "uncommon",
    19: "mythic",
    20: "legendary",
    21: "foodpet",
  };

  let user = global.db.data.users[m.sender];
  let MaxCheat = 999999999;

  // Menentukan pengguna yang di-reply atau di-tag
  let target = m.mentionedJid[0] || m.sender;

  let input = args[0]; // Ganti dengan input yang diinginkan
  let count = args[1]; // Ganti dengan jumlah count yang diinginkan

  if (!cheat.hasOwnProperty(input)) {
    const availableCheats = Object.entries(cheat)
      .map(([num, c]) => `${num}. ${c}`)
      .join("\n");
    await m.reply(
      `Tersedia: list cheat dengan nomor\n${availableCheats}\n\nContoh format: command nomor jumlah`,
    );
  } else {
    if (!isNaN(count)) {
      count = parseInt(count);
      if (count) {
        global.db.data.users[target][cheat[input]] += count;
      } else {
        global.db.data.users[target][cheat[input]] = MaxCheat;
      }

      let cheatResults = global.db.data.users[target][cheat[input]];
      await conn.reply(
        target,
        `Cheat "${cheat[input]}" telah dieksekusi.\n\nJumlah cheat saat ini:\n${cheatResults}`,
        m,
      );
    } else {
      await conn.reply(
        target,
        "Format jumlah tidak valid.\n\nContoh format: command nomor jumlah",
        m,
      );
    }
  }

  if (count && input > MaxCheat) {
    await conn.reply(target, "Lebih", m);
  }
};

handler.help = ["ngechit"].map((v) => v + " *hehe..*");
handler.tags = ["owner", "rpg"];
handler.command = /^(ngech(ea|i)t|c(((he(ater|t)|iter)|(hea|i)t)|hit))$/i;
handler.private = false;
handler.owner = true;

export default handler;
