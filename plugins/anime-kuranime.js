/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { search, detail, download, getVideo } from "../lib/scraper/kuramanime.js";
import axios from "axios";
import fs from "fs";

let handler = async (m, { conn, usedPrefix, command, text, isPrems }) => {
  if (!text) {
    return m.reply(
      `Masukan Query Atau Link!\n\nContoh :\n${usedPrefix + command} Re:zero\n${usedPrefix + command} https://kuramalink.me/anime/3099/rezero-kara-hajimeru-isekai-seikatsu-3rd-season/episode/1`
    );
  }

  // Regex untuk isAnime
  let isAnime = /^https?:\/\/kuramanime\.red\/anime\/\d+\/[\w-]+\/?$/i.test(text);

  // Regex untuk isEpisode
  let isEpisode = /^https?:\/\/kuramalink\.me\/anime\/\d+\/[\w-]+\/episode\/\d+\/?$/i.test(text);

  // Regex untuk isKDrive
  let isKDrive = /^https?:\/\/kuramadrive\.com\/kdrive\/[\w-]+$/i.test(text);

  if (isEpisode) {
    await handleEpisode(m, conn, text);
    console.log('ini episode');
  } else if (isAnime) {
    await handleDetail(m, conn, text, usedPrefix);
    console.log('ini detail');
  } else if (isKDrive) {
    await handleDownload(m, conn, text);
    console.log('ini download');
  } else {
    await handleSearch(m, conn, text, usedPrefix);
  }
};

async function handleEpisode(m, conn, url) {
  global.db.data.settings[conn.user.jid].loading ? await m.reply(global.config.loading) : false;
  
  let result = await download(url);
let downloadLinks = result
  .filter(item => /kDrive/i.test(item.linkText)) // Filter hanya kDrive
  .map(item => ({
    type: item.quality,
    link: item.link,
    source: 'kDrive'
  }));

if (downloadLinks.length > 0) {
  let rows = downloadLinks.map(dl => [
    ``,
    `Download Resolusi ${dl.type}`,
    "",
    `.kuranime ${dl.link}`
  ]);

  conn.sendList(
    m.chat, 
    '', 
    'Pilih Resolusi di bawah ini', 
    wm, 
    'Pilih disini', 
    'list', 
    rows, 
    m
  );
} else {
    m.reply("Tidak ada link download yang tersedia.");
  }
}

async function handleDetail(m, conn, url, usedPrefix) {
  global.db.data.settings[conn.user.jid].loading ? await m.reply(global.config.loading) : false;

  let result = await detail(url);
  let teks = `
*\`Title :\`* ${result.title}
*\`Score :\`* ${result.score}
*\`Batas Usia :\`* ${result.rating}
*\`Type :\`* ${result.type}
*\`Adaptasi :\`* ${result.adaptation}
*\`Season :\`* ${result.season}
*\`Credit :\`* ${result.credit}
*\`Status :\`* ${result.status}
*\`Total Eps :\`* ${result.episodes}
*\`Durasi :\`* ${result.duration}
*\`Tanggal Rilis :\`* ${result.aired}
*\`Studio :\`* ${result.studio}
*\`Genre :\`* ${result.genres.join(', ')}
*\`Tema :\`* ${result.themes.join(', ')}

> *Synopsis :* ${result.synopsis}
`.trim();

  let rows = result.episodeList.map(ep => ({
    title: `Episode ${ep.split('/')[7]}`,
    description: "",
    id: `${usedPrefix}kuranime ${ep}`,
  }));

  let buttonMsg = {
    title: result.title,
    sections: [{ title: "Episode List", rows }],
  };

  let buttons = [{ name: "single_select", buttonParamsJson: JSON.stringify(buttonMsg) }];
  conn.sendButtonImg(m.chat, result.imageUrl, "", teks, global.config.watermark, buttons, m);
}

async function handleDownload(m, conn, url) {
  global.db.data.settings[conn.user.jid].loading ? await m.reply(global.config.loading) : false;
  
  let result = await getVideo(url);
  let buffer = await urlToBuffer(result.data.url);
  let title = result.data.url.split('/')[5].split('?')[0];
  let fileSizeInBytes = Buffer.byteLength(buffer);
  let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

  if (fileSizeInMegabytes > 200) {
    await conn.sendMessage(m.chat, {
      document: buffer,
      mimetype: "video/mp4",
      fileName: `${title}.mp4`,
      fileLength: fileSizeInBytes,
    }, { quoted: m });
  } else {
    await conn.sendMessage(m.chat, {
      video: buffer,
      fileName: `${title}.mp4`,
      mimetype: "video/mp4",
      caption: title,
    }, { quoted: m });
  }
}

async function handleSearch(m, conn, query, usedPrefix) {
  global.db.data.settings[conn.user.jid].loading ? await m.reply(global.config.loading) : false;

  let result = await search(query);
  if (result.length > 0) {
    let rows = result.map(item => ({
      title: item.title,
      description: `Type: ${item.type}`,
      id: `${usedPrefix}kuranime ${item.detailUrl}`,
    }));

    let buttonMsg = {
      title: "Anime Search Results",
      sections: [{ title: "Search Results", rows }],
    };

    let buttons = [{ name: "single_select", buttonParamsJson: JSON.stringify(buttonMsg) }];
    conn.sendButtonImg(m.chat, result[0].imageUrl, "", "Silahkan pilih anime dari hasil pencarian di bawah", global.config.watermark, buttons, m);
  } else {
    m.reply("Anime tidak ditemukan.");
  }
}

async function originalUrl(url) {
  return (await axios(url)).request.res.responseUrl;
}

const delay = (time) => new Promise((res) => setTimeout(res, time));

handler.help = ["kuranime"];
handler.tags = ["anime"];
handler.command = /^(kuranime|kuramanime)$/i;
handler.limit = true;

export default handler;