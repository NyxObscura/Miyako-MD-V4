/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fs from "fs";
const items = {
  buy: {
    limit: {
      exp: 10000,
    },
    exp: {
      money: 1000,
    },
    chip: {
      money: 1000000,
    },
    potion: {
      money: 1250,
    },
    trash: {
      money: 40,
    },
    wood: {
      money: 700,
    },
    rock: {
      money: 850,
    },
    string: {
      money: 400,
    },
    iron: {
      money: 3000,
    },
    diamond: {
      money: 500000,
    },
    emerald: {
      money: 100000,
    },
    gold: {
      money: 100000,
    },
    common: {
      money: 2000,
    },
    uncommon: {
      money: 20000,
    },
    mythic: {
      money: 75000,
    },
    legendary: {
      money: 200000,
    },
    petfood: {
      money: 3500,
    },
    pet: {
      money: 120000,
    },
    anggur: {
      money: 2000,
    },
    apel: {
      money: 2000,
    },
    jeruk: {
      money: 2000,
    },
    mangga: {
      money: 2000,
    },
    pisang: {
      money: 2000,
    },
    bibitanggur: {
      money: 2000,
    },
    bibitapel: {
      money: 2000,
    },
    bibitjeruk: {
      money: 2000,
    },
    bibitmangga: {
      money: 2000,
    },
    bibitpisang: {
      money: 2000,
    },
    umpan: {
      money: 5000,
    },
  },
  sell: {
    limit: {
      exp: 1000,
    },
    exp: {
      money: 2,
    },
    chip: {
      money: 1000000,
    },
    potion: {
      money: 625,
    },
    trash: {
      money: 20,
    },
    wood: {
      money: 350,
    },
    rock: {
      money: 425,
    },
    string: {
      money: 200,
    },
    iron: {
      money: 1500,
    },
    diamond: {
      money: 250000,
    },
    emerald: {
      money: 50000,
    },
    gold: {
      money: 50000,
    },
    common: {
      money: 1000,
    },
    uncommon: {
      money: 10000,
    },
    mythic: {
      money: 37500,
    },
    legendary: {
      money: 100000,
    },
    petfood: {
      money: 1750,
    },
    pet: {
      money: 60000,
    },
    anggur: {
      money: 1000,
    },
    apel: {
      money: 1000,
    },
    jeruk: {
      money: 1000,
    },
    mangga: {
      money: 1000,
    },
    pisang: {
      money: 1000,
    },
    bibitanggur: {
      money: 1000,
    },
    bibitapel: {
      money: 1000,
    },
    bibitjeruk: {
      money: 1000,
    },
    bibitmangga: {
      money: 1000,
    },
    bibitpisang: {
      money: 1000,
    },
    umpan: {
      money: 2500,
    },
  },
};

let handler = async (m, { conn, command, usedPrefix, args }) => {
  let item = (args[0] || "").toLowerCase();
  let user = global.db.data.users[m.sender];
  let { stock } = global.db.data.bots;
  let listItems = Object.fromEntries(
    Object.entries(items[command]).filter(([v]) => v),
  );
  let header =
    command == "buy"
      ? "*––––––『 𝙱𝚄𝚈𝙸𝙽𝙶 』––––––*\n\n"
      : "*––––––『 𝚂𝙴𝙻𝙻𝙸𝙽𝙶 』––––––*\n\n";
  let footer = `

–––––––––––––––––––––––––
💁🏻‍♂ ᴛɪᴩ :
➠ ᴛᴏ ʙᴜʏ ɪᴛᴇᴍs:
${usedPrefix + command} [item] [quantity]
▧ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix + command} potion 10`;
  let caption = Object.keys(listItems)
    .map((v) => {
      let paymentMethod = Object.keys(listItems[v]).find((v) => v);
      let harga =
        listItems[v][paymentMethod] -
        listItems[v][paymentMethod] * (user.dog / 100);
      let price = harga.toString().split(".")[0];
      return `
${global.rpg.emoticon(v)} ${capitalize(v)} ${
        !/exp|limit/i.test(v) ? `\n• Stock : ${stock[v]}` : ""
      }
• Price : ${price} ${capitalize(paymentMethod)}
`.trim();
    })
    .join("\n\n");
  let total =
    Math.floor(
      isNumber(args[1])
        ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER)
        : 1,
    ) * 1;
  let diskon =
    user.dog != 0
      ? `_Kamu mendapakan diskon harga ,${user.dog}% karna mempunyai pet dog_\n\n`
      : "";
  if (!listItems[item])
    return conn.adReply(
      m.chat,
      header + diskon + caption + footer,
      "S H O P",
      "",
      flaImg.getRandom() + "SHOP",
      global.config.website,
      m,
    );
  if (command.toLowerCase() == "buy") {
    let paymentMethod = Object.keys(listItems[item]).find((v) => v in user);
    let harga =
      listItems[item][paymentMethod] -
      listItems[item][paymentMethod] * (user.dog / 100);
    let price = harga.toString().split(".")[0];
    if (user[paymentMethod] < price * total)
      return m.reply(
        `Kamu membutuhkan *${price * total - user[paymentMethod]}* ${capitalize(paymentMethod)} ${global.rpg.emoticon(paymentMethod)} Lagi, Untuk Membeli *${total}* ${capitalize(item)} ${global.rpg.emoticon(item)}. Kamu hanya memiliki *${user[paymentMethod]}* ${capitalize(paymentMethod)} ${global.rpg.emoticon(paymentMethod)}.`,
      );
    if (!/exp|limit/i.test(item) && stock[item] === 0)
      return m.reply("Mohon maaf barang ini telah habis!");
    if (!/exp|limit/i.test(item) && stock[item] < total)
      return m.reply(
        `Mohon Maaf, Stock ${capitalize(item)} ${global.rpg.emoticon(item)} saat ini hanya ${stock[item]}`,
      );
    user[paymentMethod] -= price * total;
    user[item] += total;
    stock[item] -= total;
    return conn.reply(
      m.chat,
      `Sukses Membeli *${total} ${capitalize(item)} ${global.rpg.emoticon(item)}*, Seharga *${price * total} ${capitalize(paymentMethod)} ${global.rpg.emoticon(paymentMethod)}*`,
      m,
    );
  } else {
    let paymentMethod = Object.keys(listItems[item]).find((v) => v in user);
    let harga =
      listItems[item][paymentMethod] -
      listItems[item][paymentMethod] * (user.dog / 100);
    let price = harga.toString().split(".")[0];
    if (user[item] < total)
      return m.reply(
        `You don't have enough *${capitalize(item)} ${global.rpg.emoticon(item)}* to sell, you only have ${user[item]} items`,
      );
    user[paymentMethod] += price * total;
    user[item] -= total;
    stock[item] += total;
    return conn.reply(
      m.chat,
      `Sukses Menjual *${total} ${capitalize(item)} ${global.rpg.emoticon(item)}*, Seharga *${price * total} ${capitalize(paymentMethod)} ${global.rpg.emoticon(paymentMethod)}*`,
      m,
    );
  }
};
handler.help = ["buy", "sell"];
handler.tags = ["rpg"];
handler.command = /^(buy|sell)$/i;
handler.register = true;
handler.group = true;
export default handler;

function isNumber(number) {
  if (!number) return number;
  number = parseInt(number);
  return typeof number == "number" && !isNaN(number);
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substr(1);
}

const flaImg = [
  "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=",
  "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=",
  "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=",
  "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=",
  "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=",
];
