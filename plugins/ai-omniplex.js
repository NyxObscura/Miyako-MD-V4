/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import axios from 'axios';

const handler = async (m, { conn, text }) => {
  const name = global.db.data.users[m.sender].name || m.pushName;
  if (!text)
    return m.reply("*`Hai " + name + "!! Apa yang bisa saya bantu?`*");

  const date = new Date();
  let run = true;

  await conn.sendMessage(m.chat, {
    react: {
      key: m.key,
      text: "⏳",
    },
  });

  setTimeout(async () => {
    if (!run) return;
    await conn.sendMessage(m.chat, {
      react: {
        key: m.key,
        text: "❌",
      },
    });
    return await m.reply(
      "*Terlalu lama untuk mencari jawaban, silahkan coba lagi*"
    );
  }, 30 * 1000);

  const prompt = `
    Kamu adalah Emilia, sebuah asisten virtual yang bertugas untuk membantu untuk menyelesaikan permasalahan yang diberikan, sekarang 
    detik ${date.getSeconds()}, menit ${date.getMinutes()}, jam ${date.getHours()}, tanggal ${date.getDate()}, hari ke ${date.getDay()}, bulan ke ${date.getMonth()}, dan tahun ${date.getFullYear()}.
    Kamu akan menjawab dalam bahasa indonesia, dan juga kamu dapat menggunakan * untuk teks bold, _ untuk text italic, dan \` untuk teks code, gunakan [nama websitenya] untuk website. Contohnya : *PERHATIAN!* Saya adalah _Emi_ Dan saya bisa membantu untuk menyelesaikan \`permasalahan anda\`
  `;

  try {
    const response = await axios.get(`https://rest.cifumo.biz.id/api/ai/omniplex?ask=${text}&prompt=${prompt}`);

    run = false;

    await conn.sendMessage(m.chat, {
      react: {
        key: m.key,
        text: "✅",
      },
    });

    if (response.data.mode === "chat") {
      await m.reply(response.data.data.data);
    } else {
      if (
        response.data.data.search?.images?.value?.length ||
        response.data.data.search?.videos?.value?.length
      ) {
        const type = Object.keys(response.data.data.search).includes("videos")
          ? "videos"
          : Object.keys(response.data.data.search).includes("images")
          ? "images"
          : "web";

        const media =
          type === "images"
            ? response.data.data.search.images.value[
                Math.floor(Math.random() * response.data.data.search.images.value.length)
              ]
            : response.data.data.search.videos.value[
                Math.floor(Math.random() * response.data.data.search.videos.value.length)
              ];

        await conn.sendMessage(m.chat, {
          text: response.data.data.data,
          contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
              thumbnailUrl: media.thumbnailUrl || "",
              title: "Question : " + m.text,
              body: "Omniplex AI",
              renderLargerThumbnail: true,
              mediaType: 1,
              sourceUrl:
                type === "images" || type === "videos"
                  ? media.hostPageUrl
                  : response.data.data.search.webPages.value[0].url,
            },
          },
        }, { quoted: m });
      } else {
        await m.reply(response.data.data.data);
      }
    }

  } catch (error) {
    run = false;
    await conn.sendMessage(m.chat, {
      react: {
        key: m.key,
        text: "❌",
      },
    });
    await m.reply("*`Terjadi Error :`*\n\n_" + error.toString().trim() + "_");
  }
};
handler.command = ['omniplex', 'omni']
handler.help = ['omniplex <query>']
handler.tags = ['ai']
handler.limit = true
export default handler;