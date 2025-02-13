/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import axios from "axios";
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `Masukan Nama Character!\n\nContoh :\n${usedPrefix + command} Hu Tao`,
    );
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let { data } = await axios.get(
    API(
      "https://genshin-db-api.vercel.app",
      "/api/v5/characters",
      { query: text },
      false,
    ),
  );
  let txt = `
❃ *Name:* ${data.name}
❃ *Title:* ${data.title}

❃ *Desc:* _${data.description}_

❃ *Element:* ${data.elementText}
❃ *Weapon Type:* ${data.weaponText}
❃ *Substat:* ${data.substatText}
❃ *Gender:* ${data.gender}
❃ *Affiliation:* ${data.affiliation}
❃ *Birthday:* ${data.birthday}
❃ *Constellation:* ${data.constellation}

❃ *CV:*
_• English ~ ${data.cv.english}_
_• Chinese ~ ${data.cv.chinese}_
_• Japanese ~ ${data.cv.japanese}_
_• Korean ~ ${data.cv.korean}_
`.trim();
  conn.sendFile(m.chat, data.images.cover1, null, txt, m);
};
handler.help = ["charagenshin"];
handler.tags = ["genshin"];
handler.command = /^(chara(gi|genshin)|genshin(chara|character))$/i;
handler.limit = true; handler.error = 0
export default handler;
