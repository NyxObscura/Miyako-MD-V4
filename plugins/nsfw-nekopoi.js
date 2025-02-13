/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import axios from "axios";
import { anime } from '../lib/anime.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return m.reply(
      `Masukan Link Atau Title Nekopoi\n\nContoh :\n${usedPrefix + command} Loli \n${usedPrefix + command} https://nekopoi.care/`,
    );
  }

  if (/nekopoi.care/i.test(text)) {
    let resdetail = await anime.nekopoi.detail(text)
    let { title, type, info, img, genre, producers, duration, size, stream, download } = resdetail;

    let downloadLinks = download.map((dl) => {
      let links = dl.links.map((link) => `\`${link.name}:\` ${link.link}`).join('\n');
      return `\`Type:\` ${dl.type}\n\`Title:\` ${dl.title}\n${links}`;
    }).join('\n\n');

    let caption = `
\`Title:\` ${title || 'Tidak ada'}
\`Info:\` ${info || 'Tidak ada'}
\`Genre:\` ${genre || 'Tidak ada'}
\`Producers:\` ${producers || 'Tidak ada'}
\`Duration:\` ${duration || 'Tidak ada'}
\`Size:\` ${size || 'Tidak ada'}
\`Stream:\` ${stream || 'Tidak ada'}
- *Note:* Ketik 1 jika mau mendownload videonya

\`Download Links:\`\n${downloadLinks || 'Tidak ada'}
`.trim();

    /*await conn.sendImgButton(m.chat, img, "", caption, wm,[["download video", `.doods ${stream}`]], m);*/
    await conn.sendAliasMessage(m.chat, {
      text: caption,
      contextInfo: {
        forwardingScore: 9999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: global.db.data.bots.link.chid,
          serverMessageId: null,
          newsletterName: `⌜ ${global.db.data.bots.info.wm || global.wm} ⌟ © ${global.db.data.bots.info.ownername || global.info.namaowner}`,
        },
        externalAdReply: {
          showAdAttribution: false,
          mediaType: 1,
          title: '[ Nekopoi Downloader ]',
          body: 'Dosa di tanggung semua user',
          thumbnailUrl: img,
          renderLargerThumbnail: true,
          mediaUrl: '',
          sourceUrl: 'https://github.com/cifumoo',
        },
      },
    }, [{
      alias: 1,
      response: `.doods ${stream}`
              }], m)
  } else {
    let request;
    if (text.toLowerCase() === 'latest') {
      request = await anime.nekopoi.latest()
    } else {
      request = await anime.nekopoi.search(text);
    }

    let data = request;
    if (data?.error) return m.reply(`Query ${text} tidak ditemukan!`);

    let rows = [];
    for (let i = 0; i < data.length; i++) {
      let results = {
        alias: `${i + 1}`,
        response: usedPrefix + "nekopoi " + data[i].link,
      };
      rows.push(results);
    }

    let description = rows.map((row) => `${row.alias}. ${data[row.alias - 1].title}\n> Link: ${data[row.alias - 1].link}`).join('\n\n');

    conn.sendAliasMessage(m.chat, {
      text: `Silahkan pilih Hentai di bawah ini:\n\n${description}`,
      contextInfo: {
        forwardingScore: 9999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: global.db.data.bots.link.chid,
          serverMessageId: null,
          newsletterName: `⌜ ${global.db.data.bots.info.wm || global.wm} ⌟ © ${global.db.data.bots.info.ownername || global.info.namaowner}`,
        },
        externalAdReply: {
          showAdAttribution: false,
          mediaType: 1,
          title: '[ Nekopoi Downloader ]',
          body: 'Dosa di tanggung semua user',
          thumbnailUrl: 'https://files.catbox.moe/hl7ao3.jpg',
          renderLargerThumbnail: true,
          mediaUrl: '',
          sourceUrl: 'https://github.com/cifumoo',
        },
      },
    }, rows, m);
  }
};

handler.help = ["nekopoi"];
handler.tags = ["anime", "nsfw", "premium"];
handler.command = /^nekopoi$/i;
handler.limit = true;
handler.error = 0
handler.nsfw = true;

export default handler;

const delay = (time) => new Promise((res) => setTimeout(res, time));