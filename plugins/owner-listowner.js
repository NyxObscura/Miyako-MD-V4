/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn }) => {
  let owners = db.data.bots.owner.map(([number, name]) => `@${number} (${name})`).join("\n");
  if (!owners) return m.reply("[ ! ] Tidak ada owner yang terdaftar.");
  await conn.reply(m.chat, `Daftar Owner:\n${owners}`, m, { mentions: db.data.bots.owner.map(([number]) => number + "@s.whatsapp.net") });
};

handler.help = ["listowner"];
handler.tags = ["owner"];
handler.command = /^(listowner|listown)$/i;
handler.owner = true;

export default handler;