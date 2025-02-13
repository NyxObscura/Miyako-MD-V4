/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

const handler = async (m, { conn, text }) => {
  if (!text && !m.quoted) return m.reply("Masukan teks atau reply media dengan teks");

  const chid = db.data.bots.link.chid;
  let messageOptions = {};
  if (!chid) return m.reply('set dulu di .seturl chid idchmu');

  if (m.quoted && m.quoted.mimetype) {
    let mime = m.quoted.mimetype;

    if (/image/.test(mime)) {
      messageOptions = {
        image: await m.quoted.download(),
        caption: text || m.quoted.text || ""
      };
    } else if (/video/.test(mime)) {
      messageOptions = {
        video: await m.quoted.download(),
        caption: text || m.quoted.text || "",
        mimetype: mime
      };
    } else if (/audio/.test(mime)) {
      messageOptions = {
        audio: await m.quoted.download(),
        mimetype: "audio/mp4",
        fileName: `bintang.mp3`,
        ptt: true,
        contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: db.data.bots.link.chid,
            serverMessageId: null,
            newsletterName: 'MIYAKO-TSUKIYUKI',
          },
          externalAdReply: {
            title: 'Xenz',
            body: text,
            thumbnailUrl: 'https://files.catbox.moe/zla56p.jpg', // Ganti dengan URL thumbnail statis
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        }
      };
    } else if (/sticker/.test(mime)) {
      messageOptions = {
        sticker: await m.quoted.download()
      };
    }
  } else {
    messageOptions = { text: text };
  }

  await conn.sendMessage(chid, messageOptions);

  m.reply("Pesan berhasil dikirim");
};

handler.command = handler.help = ['upch'];
handler.tags = ['owner'];
handler.owner = true;
export default handler;