/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import axios from "axios";
import cheerio from 'cheerio'
import yt from '../lib/scraper/yt.js'
/*import { instagram } from "../lib/instagram.js";
import { youtubedl, youtubedlv2 } from "@bochilteam/scraper";*/

export async function before(m, { isPrems }) {
  let user = global.db.data.users[m.sender];
  let chat = global.db.data.chats[m.chat];
  const setting = global.db.data.settings[this.user.jid];

  if (!m.text && m.fromMe) return;
  if (
    m.text.startsWith("=>") ||
    m.text.startsWith(">") ||
    m.text.startsWith(".") ||
    m.text.startsWith("#") ||
    m.text.startsWith("!") ||
    m.text.startsWith("/") ||
    m.text.startsWith("/")
  )
    return;
  if (chat.mute || chat.isBanned || user.banned) return;

  let text = m.text.replace(/\n+/g, " ");
  if ((chat.autodownload || user.autodownload) && text.match(regex)) {
    this.autodownload = this.autodownload || {};
    let link = text.match(regex)[0];

    if (
      /^http(s)?:\/\/(www|v(t|m)).tiktok.com\/[-a-zA-Z0-9@:%._+~#=]/i.test(link)
    ) {
      if (!(m.sender in this.autodownload)) {
        try {
          this.autodownload[m.sender] = true;

          if (setting.composing)
            await this.sendPresenceUpdate("composing", m.chat).catch(() => {});

          if (setting.autoread)
            await this.readMessages([m.key]).catch(() => {});

          let { data } = await tiktok(link);
          if (data.images) {
            await this.sendMessage(m.chat, { image: { url: data.images[0]}, caption: link}, { quoted: m });
          } else {
            await this.sendMessage(m.chat, { video: { url: 'https://tikwm.com/' + data.hdplay }, caption: link }, { quoted: m });
          }
        } catch (e) {
          return !0;
        } finally {
          delete this.autodownload[m.sender];
        }
      }
    }

    if (
      /^http(s)?:\/\/(www)?.instagram.com\/(p|reel|v)\/[-a-zA-Z0-9@:%._+~#=]/i.test(
        link,
      )
    ) {
      if (!(m.sender in this.autodownload)) {
        try {
          this.autodownload[m.sender] = true;

          if (setting.composing)
            await this.sendPresenceUpdate("composing", m.chat).catch(() => {});

          if (setting.autoread)
            await this.readMessages([m.key]).catch(() => {});


          let response = await fetch(
            `https://skizo.tech/api/ig?apikey=cifumo&url=${link}`,
          );
          let result = await response.json();

          if (Array.isArray(result) && result.length > 1) {
            for (let i = 0; i < result.length; i++) {
              await conn.sendFile(
                m.chat,
                result[i].url,
                "",
                `File ${i + 1} dari ${result.length}`,
                m,
              );
            }
          } else {
            conn.sendFile(m.chat, result[0].url, "", link, m);
          }
        } catch {
          return !0;
        } finally {
          delete this.autodownload[m.sender];
        }
      }
    }

    if (
      /^http(s)?:\/\/youtube.com\/shorts\/[-a-zA-Z0-9@:%._+~#=]/i.test(link) ||
      /^http(s)?:\/\/youtu.be\/[-a-zA-Z0-9@:%._+~#=]/i.test(link)
    ) {
      if (!(m.sender in this.autodownload)) {
        try {
          this.autodownload[m.sender] = true;

          if (setting.composing)
            await this.sendPresenceUpdate("composing", m.chat).catch(() => {});

          if (setting.autoread)
            await this.readMessages([m.key]).catch(() => {});
          let anu = new yt.default

          let apa = await anu.mp4(link)
          let sound = await anu.mp3(link)
          let vid = await this.sendFile(
            m.chat,
            apa.media,
            false,
            link,
            m,
          );
          await this.sendFile(
            m.chat,
            apa.sound.media,
            false,
            link,
            vid,
          );
        } catch {
          return !0;
        } finally {
          delete this.autodownload[m.sender];
        }
      }
    }
  }
  return !0;
}

async function postToTikWM(endpoint, data) {
  const url = `https://tikwm.com/api/${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'Referer': 'https://tikwm.com/'
    },
    body: new URLSearchParams(data).toString()
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Function untuk download video TikTok
async function tiktok(url) {
  const data = {
    url: url,
    count: 12,
    cursor: 0,
    web: 1,
    hd: 1
  };

  try {
    const result = await postToTikWM('', data);
    console.log('Download Result:', result);
    return result;
  } catch (error) {
    console.error('Error in download:', error);
  }
}

const regex =
  /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
const delay = (time) => new Promise((res) => setTimeout(res, time));

// Function umum untuk POST request ke TikWM API