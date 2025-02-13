/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*  
*/

import { promises as fs } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fetch from 'node-fetch'
const { generateWAMessageFromContent, proto } = (await import('@adiwajshing/baileys')).default

let handler = async (m, { conn, usedPrefix: _p }) => {

  let Styles = (text, style = 1) => {
    var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
    var yStr = Object.freeze({
      1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
    });
    var replacer = [];
    xStr.map((v, i) => replacer.push({
      original: v,
      convert: yStr[style].split('')[i]
    }));
    var str = text.toLowerCase().split('');
    var output = [];
    str.map(v => {
      const find = replacer.find(x => x.original == v);
      find ? output.push(find.convert) : output.push(v);
    });
    return output.join('');
  };

  let tags = {};
  const defaultMenu = {
    before: `╭──❖  *PREMIUM MENU*  ❖──\n│\n`,
    header: '├ %category\n│',
    body: '├ %cmd ',
    footer: '\n│\n╰──❖ MIYAKO-MD ❖──',
    after: ``,
  };

  try {
    let name = m.pushName || conn.getName(m.sender);
    let d = new Date(new Date + 3600000);
    let locale = 'id';
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    });
    let time = d.toLocaleTimeString(locale, { timeZone: 'Asia/Kolkata' });
    time = time.replace(/[.]/g, ':');

    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        enabled: !plugin.disabled,
      };
    });

    help = help.filter(plugin => plugin.tags.includes('premium'));

    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag;

    conn.menu = conn.menu ? conn.menu : {};
    let before = conn.menu.before || defaultMenu.before;
    let header = conn.menu.header || defaultMenu.header;
    let body = conn.menu.body || defaultMenu.body;
    let footer = conn.menu.footer || defaultMenu.footer;
    let after = conn.menu.after || defaultMenu.after;
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag].toUpperCase()) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, help).trim();
            }).join('\n');
          }),
          footer
        ].join('\n');
      }),
      after
    ].join('\n');

    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : '';
    await conn.sendMessage(m.chat, {
      video: { url: 'https://files.catbox.moe/yhzg1p.mp4' },
      mimetype: 'video/mp4',
      caption: Styles(text),
      gifPlayback: true,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          forwardingScore: 0,
          title: 'MENU PREMIUM',
          thumbnailUrl: 'https://files.catbox.moe/cvu2c2.jpg', // Thumbnail tetap sama
          sourceUrl: 'https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i/2023',
          mediaType: 1,
          renderLargerThumbnail: true,
          mentionedJid: [m.sender]
        }
      }
    }, { quoted: m });
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu AI sedang error', m);
    throw e;
  }
};

handler.command = /^(premiummenu|menupremium|premmenu|premenu)$/i;
handler.daftar = false;

export default handler;