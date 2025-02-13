/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import axios from "axios";
import cheerio from "cheerio";

const handler = async (m, { conn, text }) => {
  try {
    await m.reply(wait || 'Tunggu sebentar');
    const result = await list();
    const { thumbnail, title, id } = result[0];
    const dl = await download(id);
    const { url, version, size } = dl;
    const cap = `*[ Minecraft Downloader ]*
> *Title:* ${title}
> *Version:* ${version}
> *Size:* ${size}

_File sedang dikirim mohon tunggu_`;
    
    await conn.sendFile(m.chat, thumbnail, 'anu.jpg', cap, m);
    await conn.sendFile(m.chat, url, id, `Ini dia kak Minecraft versi ${version} nya`, m);
  } catch(e) {
    console.log(e);
  }
};

handler.command = ["mcdl"];
handler.help = ["mcdl (Get Minecraft latest)"];
handler.tags = ["downloader"];
handler.limit = true;
handler.onlyprem = true 
export default handler;

async function list(page = 1) {
  try {
    let { data } = await axios(`https://mcpedl.org/downloading/page/${page}`);
    let $ = cheerio.load(data);

    let result = [];
    $("article.tease.tease-post > section.entry-header-category").each(function() {
      let $$ = $(this);
      let obj = {};
      obj.thumbnail = $$.find("a.post-thumbnail > picture > img").attr("data-src");
      obj.title = $$.find("h2.entry-title").text().trim();
      obj.id = $$.find("h2.entry-title > a").attr("href").split("/").at(-2);
      result.push(obj);
    });

    return result;
  } catch(err) {
    if (err?.response?.status == 404) return {
      error: true,
      message: "Page Not Found"
    };
    throw err;
  }
}

async function download(id) {
  try {
    let { data } = await axios(`https://mcpedl.org/${id}`);
    let $ = cheerio.load(data);

    let __dl = (await axios("https://mcpedl.org/dw_file.php?id=" + $("#download-link > table > tbody > tr > td > a").attr("href").split("/").at(-1))).data;
    let _dl = cheerio.load(__dl);
    let dl = _dl("a").attr("href");

    let result = {};
    result.url = dl;
    result.version = $($("#download-link > table > tbody > tr > td")[0]).text();
    result.size = $($(".entry-footer > .entry-footer-wrapper > .entry-footer-column > .entry-footer-content > span").get(-1)).text();

    return result;
  } catch(err) {
    if (err?.response?.status == 404) return {
      error: true,
      message: "Page Not Found"
    };
    throw err;
  }
}