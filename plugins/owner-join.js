/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i;

let handler = async (m, { conn, text, isOwner }) => {
  let [_, code, expired] = text.match(linkRegex) || [];
  if (!code) return m.reply("Link invalid");
  let res = await conn.groupAcceptInvite(code);
  expired = Math.floor(
    Math.min(
      9999,
      Math.max(1, isOwner ? (isNumber(expired) ? parseInt(expired) : 0) : 3),
    ),
  );
  await m.reply(
    `Berhasil join grup ${res}${expired ? ` selama ${expired} hari` : ""}`)
    await conn.reply(res, `Terikamasih sudah Menyewa  ${global.wm}, Aku akan disini selama ${expired} hari`)
  
  let chats = global.db.data.chats[res];
  if (!chats) chats = global.db.data.chats[res] = {};
  var jumlahHari = expired * 1000 * 60 * 60 * 24;
  var now = new Date() * 1;
  if (now < chats.expired) chats.expired += jumlahHari;
  else chats.expired = now + jumlahHari;
};
handler.help = ["join"];
handler.tags = ["owner"];
handler.command = /^join$/i;
handler.owner = true;

export default handler;

const isNumber = (x) => ((x = parseInt(x)), typeof x === "number" && !isNaN(x));