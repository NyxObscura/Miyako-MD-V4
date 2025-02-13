/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { toAudio } from "../lib/converter.js";

let handler = async (m, { conn, data, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || "";
  if (!/video|audio/.test(mime))
    return m.reply(
      `reply video/voice note you want to convert to audio/mp3 with caption *${usedPrefix + command}*`,
    );
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let media = await q.download?.();
  if (!media) return m.reply("Can't download media");
  let audio = await toAudio(media, "mp4");
  if (!audio.data) return m.reply("Can't convert media to audio");
  await conn.sendFile(m.chat, audio.data, "audio.mp3", "", m, null, {
    mimetype: "audio/mp4",
  });
};
handler.help = ["tomp3"];
handler.tags = ["audio"];
handler.command = /^(to(mp3|a(udio)?))$/i;

export default handler;
