/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { googleImage, pinterest } from "@bochilteam/scraper";
import moment from "moment-timezone";
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Use example ${usedPrefix}${command} Sagiri`;
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  const res = await (await googleImage("rule34 " + text)).getRandom();
  await conn.sendFile(
    m.chat,
    res,
    "rule34.jpg",
    ` \`\`\`➩ Random Nsfw Rule34 ${text ? text.capitalize() : false}\`\`\` `,
    m,
  );
};
handler.help = ["rule34"];
handler.tags = ["nsfw","premium"];
handler.command = ["rule34"];
handler.premium = true; handler.error = 0
handler.nsfw = true;
handler.age = 18;
export default handler;
