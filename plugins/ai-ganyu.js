/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply("mau nanya apa sama ganyu??");
  await m.reply(wait);
  const ganyu = await fetch(
    `https://api.maher-zubair.tech/ai/characterai?q=${text}`,
  );
  const ress = await ganyu.json();
  conn.reply(m.chat, ress.result.replies[0].text, m, {
    contextInfo: {
      mentionedJid: [],
      groupMentions: [],
      externalAdReply: {
        title: ress.result.src_char.participant.name,
        body: "",
        thumbnailUrl:
          "https://characterai.io/i/200/static/avatars/" +
          ress.result.src_char.avatar_file_name,
        sourceUrl: "",
        mediaType: 1,
        renderLargerThumbnail: false,
      },
    },
  });
};
handler.command = ["ganyu"];
handler.help = ["ganyu <query>"];
handler.tags = ["ai"];
handler.limit = true; handler.error = 0
export default handler;
