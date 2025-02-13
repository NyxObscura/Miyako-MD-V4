/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { NHentai } from "@shineiichijo/nhentai-ts";
import { extractImageThumb } from "@adiwajshing/baileys";
import { toPDF } from "../lib/converter.js";
const nhentai = new NHentai();

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text)
    return m.reply(`Masukkan query!\n\nContoh:\n${usedPrefix + command} asuna`);
    
  conn.nhentai_search = conn.nhentai_search || {};
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  
  try {
    if (text.toString().split("").length >= 2 && !isNumber(text)) {
      let Hentai = conn.nhentai_search[m.sender];
      let { data } = await nhentai.search(text);

      // Menggunakan sendAliasMessage alih-alih sendList
      let caption = `> Silakan gunakan command *${usedPrefix + command} <nomor>* untuk langsung mendownload PDF\n\n`;
      let buttons = data.map((v, i) => ({
        alias: i + 1,
        response: `.nhentais ${i + 1}`
      }));

      await conn.sendAliasMessage(
        m.chat,
        { text: caption },
        buttons,
        m,
      );

      if (m.sender in conn.nhentai_search) {
        clearTimeout(Hentai.timeOut);
      }
      
      conn.nhentai_search[m.sender] = {
        data: data,
        timeOut: setTimeout(() => {
          delete conn.nhentai_search[m.sender];
        }, 600000),
      };
      
    } else {
      if (!(m.sender in conn.nhentai_search)) {
        return m.reply(`Masukkan query!\n\nContoh:\n${usedPrefix + command} asuna`);
      }

      let Hentai = conn.nhentai_search[m.sender];
      if (text > Hentai.data.length) return m.reply("Permintaan tidak valid");
      
      clearTimeout(Hentai.timeOut);
      let result = await nhentai.getDoujin(Hentai.data[text - 1].id);
      let { data } = await conn.getFile(result.images.pages[0]);
      let jpegThumbnail = await extractImageThumb(data);
      let imagepdf = await toPDF(result.images.pages);

      await conn.sendMessage(
        m.chat,
        {
          document: imagepdf,
          jpegThumbnail,
          fileName: result.title + ".pdf",
          mimetype: "application/pdf",
        },
        { quoted: m },
      );
      
      Hentai.timeOut = setTimeout(() => {
        delete conn.nhentai_search[m.sender];
      }, 600000);
    }
  } catch (e) {
    return m.reply(global.config.errorMsg);
  }
};

handler.help = ["nhentais"];
handler.tags = ["nsfw", "premium"];
handler.command = /^(nhentai(s|search))$/i;
handler.premium = true; 
handler.error = 0;
handler.nsfw = true;
handler.age = 18;

const isNumber = (x) => typeof x === "number" && !isNaN(x);

export default handler;