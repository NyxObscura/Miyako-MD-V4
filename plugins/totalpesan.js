/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

let handler = async (m, { conn, command, groupMetadata }) => {
  let chat = db.data.chats[m.chat];
  if (!Object.keys(chat.messages || {}).length) chat.messages[m.sender] = 0;
  if (/reset/.test(command)) {
    delete chat.messages;
    delete chat.startMessage;
    await m.reply("Berhasil mereset!");
    return true;
  }

  let total = 0,
    msg = {},
    startDate = new Date(chat.startMessage),
    date = `${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString()}`;

  for (const id in chat.messages) {
    if (isNaN(chat.messages[id])) continue;
    if (chat.messages[id] < 1) continue;
    total += chat.messages[id];
    msg[id] = chat.messages[id];
  }

  let sorted = Object.entries(chat.messages).sort((a, b) => b[1] - a[1]);
  let pesan = sorted
    .map(
      (v, index) =>
        `${index + 1}. ${v[0].replace(/(\d+)@.+/, "@$1")}: ${v[1]} pesan`,
    )
    .join("\n");
  await m.reply(
    `Group: ${groupMetadata.subject}:\nTotal Messages: ${total}\n\n${pesan}`.trim(),
    null,
    {
      mentions: conn.parseMention(pesan),
    },
  );
};
handler.help = ["totalpesan", "resettotalpesan"];
handler.tags = ["group"];
handler.command = /^(totalpesan3)$/i;
handler.group = true;
export default handler;
