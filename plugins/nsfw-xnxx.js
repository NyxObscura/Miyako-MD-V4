/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { xnxx } from "../lib/scrape.js";
import fs from "fs";
let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text)
    return m.reply(
      `Masukan query! \n\nContoh: \n${usedPrefix + command} Korean`,
    );
  conn.xnxx = conn.xnxx || {};
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;

  if (text.toString().split("").length > 2 && !isNumber(text)) {
    let chat = conn.xnxx[m.sender];
    let { result } = await xnxx.search(text);
    let caption = result
      .map((v, i) => {
        return `*${i + 1}.* *${v.title}* \n*Info:* ${v.info}`;
      })
      .join("\n\n");
    let footer = `> Silahkan gunakan command *${usedPrefix + command} <number>* untuk langsung mendownload video \n\n`;
    await conn.adReply(
      m.chat,
      footer + caption,
      result[0].title,
      "Xnxx Search",
      "https://pomf2.lain.la/f/y3kbdk8f.jpg",
      "",
      m,
    );
    if (m.sender in conn.xnxx) {
      clearTimeout(chat.timeOut);
    }
    conn.xnxx[m.sender] = {
      result: result,
      timeOut: setTimeout(() => {
        delete conn.xnxx[m.sender];
      }, 600000),
    };
  } else {
    let chat = conn.xnxx[m.sender];
    clearTimeout(chat.timeOut);
    let { result } = await xnxx.detail(chat.result[text - 1].link);
    let { filename } = await conn.getFile(result.files.low, true);
    await conn.sendMessage(
      m.chat,
      {
        document: fs.readFileSync(filename),
        fileName: result.title + ".mp4",
        mimetype: "video/mp4",
      },
      { quoted: m },
    );
    chat.timeOut = setTimeout(() => {
      delete conn.xnxx[m.sender];
    }, 600000);
  }
};
handler.help = ["xnxx"];
handler.tags = ["nsfw","premium"];
handler.command = /^(xnxx)$/i;
handler.premium = true; handler.error = 0
handler.nsfw = true;
handler.age = 18;
export default handler;

const isNumber = (x) => typeof x === "number" && !isNaN(x);
