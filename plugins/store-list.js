/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let handler = async (m, { conn, usedPrefix, command }) => {
  let store = global.db.data.chats[m.chat].store;
  let list = Object.values(store);

  if (list.length == 0) return m.reply("Belum ada list di grup ini");

  const aliases = list.map((item, index) => ({
    alias: `${index + 1}`,
    response: `${usedPrefix}${item.command || ""}`,
  }));

  let messageText = "Berikut adalah daftar command yang tersedia di grup ini:\n\n";
  messageText += list
    .map((item, index) => `*${index + 1}.* ${item.command || "Unknown"} - ${item.description || "Deskripsi tidak tersedia"}`)
    .join("\n");

  await conn.sendAliasMessage(
    m.chat,
    { text: messageText },
    aliases,
    m
  );
};

handler.help = ["list"];
handler.tags = ["store"];
handler.command = /^(list(store)?)$/i;
handler.group = true;

export default handler;