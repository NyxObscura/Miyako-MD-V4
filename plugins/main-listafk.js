/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.listAfk = conn.listAfk || {};
  try {
    const caption = `*LIST AFK for Chat:* ${await conn.getName(m.chat)}\n\n${(conn.listAfk[m.chat] || []).map((v, i) => `*${i + 1}.*  - *Name:* ${v.username}\n     - *ID:* @${v.id.split("@")[0]}\n     - *Time:* ${formatDateDetails(global.db.data.users[v.id].afk)}\n     - *Reason:* ${global.db.data.users[v.id].afkReason}`).join("\n\n") || "No users in the list."}`;

    await conn.reply(m.chat, caption, null, {
      contextInfo: {
        mentionedJid: (conn.listAfk[m.chat] || []).map((v) => v.id),
        externalAdReply: {
          title: "AFK List",
          thumbnail: await (
            await conn.getFile(
              "https://cdn-icons-png.flaticon.com/128/6012/6012311.png",
            )
          ).data,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};
handler.help = ["listafk"];
handler.tags = ["main"];
handler.group = true;
handler.command = /^(listafk)$/i;

export default handler;

function formatDateDetails(date) {
  const options = {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("id-ID", options).format(date);
}
