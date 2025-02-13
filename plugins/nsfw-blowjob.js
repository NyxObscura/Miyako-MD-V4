/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import fetch from "node-fetch";

let handler = async (m, { conn, command }) => {
  let url = await fetch("https://api.maher-zubair.tech/nsfw/blowjob");
  let js = await url.json();
  let img = js.url;
  //conn.sendFile(m.chat, img, null, 'blowjob', m)
  await conn.sendImgButton(
    m.chat,
    img,
    "",
    "Dosa tanggung sendiri",
    global.db.data.bots.info.wm || wm,
    ["next", ".blowjob"],
    m,
  );
};
handler.command = /^(bj|blowjob)$/i;
handler.tags = ["nswf","premium"];
handler.help = ["blowjob"];
handler.limit = true; handler.error = 0
handler.nsfw = true;
export default handler;
