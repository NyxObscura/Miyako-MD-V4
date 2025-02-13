/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { download } from '../lib/tiktok.js';

let handler = async (m, { conn, text, args, command, usedPrefix }) => {
  let input = `[!] *Wrong Input* ❌\n\nEx: ${usedPrefix + command} https://vt.tiktok.com/ZSFSqcuXb/`;

  if (!text) return m.reply(input);

  if (!(text.includes("http://") || text.includes("https://")))
    return m.reply(`URL invalid, please input a valid URL. Try with adding http:// or https:// 🚫`);

  if (!text.includes("tiktok.com")) return m.reply(`Invalid TikTok URL. ❌`);

  try {
    const req = await download(text);
    const {
      type,
      region,
      title,
      author,
      music_info,
      play,
      play_count,
      digg_count,
      comment_count,
      share_count,
      download_count,
      create_time,
      music,
      images,
      size
    } = req.data;
    const { unique_id, nickname, avatar } = author;
    const { title: musicTitle, author: musicAuthor, play: musicPlay } = music_info;

    let tek = `*[ TikTok Downloader ]*\n\n`;
    tek += `> *\`Info\`*\n`;
    tek += `- \`Description:\` ${title}\n`;
    tek += `- \`Region:\` ${region}\n`;
    tek += `- \`Play Count:\` ${play_count} ▶️\n`;
    tek += `- \`Likes:\` ${digg_count} ❤️\n`;
    tek += `- \`Comments:\` ${comment_count} 💬\n`;
    tek += `- \`Shares:\` ${share_count} 🔄\n`;
    tek += `- \`Download Count:\` ${download_count} ⬇️\n`;
    tek += `- \`Create Time:\` ${new Date(create_time * 1000).toLocaleString()}\n\n`;
    tek += `> *\`Author Info\`*\n`;
    tek += `- \`Nickname:\` ${nickname}\n`;
    tek += `- \`ID:\` ${unique_id}\n`;
    tek += `- \`Avatar:\` ${avatar}\n\n`;
    tek += `> *\`Music Info\`*\n`;
    tek += `- \`Music Title:\` ${musicTitle}\n`;
    tek += `- \`Music Author:\` ${musicAuthor}\n`;

    if (images && images.length > 0) {
      // Handle TikTok Slide (Images)
      await m.reply("Detected TikTok Slide URL 📸\nPhotos will be sent to private chat.");
      await m.reply(tek);

      let cap = `乂 *TIKTOK SLIDE*\n\n`;
      let no = 1;
      for (let img of images) {
        await conn.sendFile(m.sender, img, "", `${cap}*[${no++}]*`, null);
        await conn.delay(2000);
      }
      await conn.sendFile(m.chat, 'https://tikwm.com' + music, "music.mp3", "", m, false, {
        mimetype: "audio/mpeg",
      });
    } else {
      await conn.sendFile(m.chat, 'https://tikwm.com' + play, "video.mp4", tek, m);
      await conn.sendFile(m.chat, 'https://tikwm.com' + music, "music.mp3", "", m, false, {
        mimetype: "audio/mpeg",
      });
    }
  } catch (e) {
    throw e.message;
  }
};

handler.help = ["tiktok <url>"];
handler.tags = ["downloader"];
handler.command = /^(t(ik)?t(ok)?|t(ik)?t(ok)?dl)$/i;

handler.register = false;
handler.onlyprem = true
handler.limit = true;
handler.error = 0;

export default handler;