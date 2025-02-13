/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

const handler = async (m, { conn, isGroup }) => {
  const groupId = m.chat;

  for (const userId in global.db.data.users) {
    const userChats = global.db.data.users[userId]?.chats || {};
    if (userChats[groupId]?.chatTotal) delete userChats[groupId].chatTotal;
    if (userChats[groupId]?.chat) delete userChats[groupId].chat;
  }

  // Menghapus properti member dari grup ini saja
  if (global.db.data.chats[groupId]?.member) {
    delete global.db.data.chats[groupId].member;
  }

  await conn.reply(m.chat, "Berhasil menghapus totalchat di grup ini", m);
};

handler.help = ["cleartotalchat", "ctchat"];
handler.tags = ["owner"];
handler.command = ["cleartotalchat", "ctchat"];
handler.group = true;
handler.admin = true;

export default handler;
