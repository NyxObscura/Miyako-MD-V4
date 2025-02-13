/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*
 * @Author: Cifumo
 * @Web: https://rest.cifumo.biz.id
 */

import { toDataURL } from "qrcode";

let handler = async (m, { conn, text }) => {
  let qr = m.quoted && !text ? m.quoted.text : text ? text : false;
  if (!qr) return m.reply("Kirim Atau Reply Text!");
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  await conn.sendFile(
    m.chat,
    await toDataURL(qr.slice(0, 2048), { scale: 8 }),
    "qrcode.png",
    "¯\\_(ツ)_/¯",
    m,
  );
};
handler.help = ["qrcode"];
handler.tags = ["tools"];
handler.command = /^qr(code)?$/i;

export default handler;
