/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";
let handler = async (m, { conn }) => {
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let data = await (
    await fetch(
      "https://raw.githubusercontent.com/KazukoGans/database/main/anime/ppcouple.json",
    )
  ).json();
  let cita = data[Math.floor(Math.random() * data.length)];

  let cowi = await (await fetch(cita.cowo)).buffer();
  await conn.sendFile(m.chat, cowi, "", "♂️", m);
  let ciwi = await (await fetch(cita.cewe)).buffer();
  await conn.sendFile(m.chat, ciwi, "", "♀️", m);
};
handler.help = ["ppcouple"];
handler.tags = ["internet"];
handler.command = /^(pp(cp|couple))$/i;
handler.limit = true; handler.error = 0

export default handler;
