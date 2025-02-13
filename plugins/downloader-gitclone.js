/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `Masukan url github \n\nContoh : \n${usedPrefix + command} https://github.com/DavidModzz/BaileysWaBot`,
    );
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let [usr, rep] = text.split`/`;
  let url = `https://api.github.com/repos/${encodeURIComponent(usr)}/${encodeURIComponent(rep)}/zipball`;
  let name = `${encodeURIComponent(rep)}.zip`;
  await conn.sendFile(m.chat, url, name, null, m);
};
handler.help = ["gitclone"];
handler.tags = ["downloader"];
handler.command = /gitclone/i;
handler.limit = true; handler.error = 0
export default handler;
