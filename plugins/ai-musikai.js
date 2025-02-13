/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = db.data.users[m.sender];
  let roseSet = db.musikai || {};
  if (!text) return m.reply('masukan teksnya\n> *Contoh:* .musikai miyako the best bot, sad song')
  switch (command) {
    case "musikai":
      if (!text)
        return m.reply(
          "*• Contoh :* .musikai I love ITSROSE API, perpanjang langgananmu sekarang!",
        );
      m.reply("Mohon tunggu sebentar...");

      try {
        const { data } = await axios.post(
          "https://internal-api.lovita.io/suno/simple",
          {
            prompt: text,
            instrumental: false
          },
          {
            headers: {
              accept: "application/json",
              Authorization: 'Ahhh---crot-didalem',
              "Content-Type": "application/json",
            },
          },
        );

        const { result } = data;

        let interval = setInterval(async () => {
          try {
            const response = await axios.get(
              `https://internal-api.lovita.io/suno/fetch?ids=${result[0].id}`,
              {
                headers: {
                  Authorization: 'Ahhh---crot-didalem',
                },
              },
            );
            const json = response.data;
            if (json.message === "succsess") {
              clearInterval(interval);
              if (json.result) {
                const audio = json.result[0].output.audio;
                const foto = json.result[0].output.image_thumb;
                const title = json.result[0].meta.title;
                const tags = json.result[0].meta.tags;
                const lirik = json.result[0].meta.lyric;
                let hasil = `•Title : ${title}\n•Tags : ${tags}\n• Lirik : ${lirik}`;
                await conn.sendFile(m.chat, foto, "", hasil, m);
                await conn.sendMessage(
                  m.chat,
                  { audio: { url: audio }, mimetype: "audio/mpeg" },
                  { quoted: m },
                );
              } else {
                m.reply("Maaf, hasil tidak ditemukan.");
              }
            }
          } catch (error) {
            console.error(error);
            m.reply(`> ${error}`);
          }
        }, 60000); // Setiap 1 menit
      } catch (error) {
        console.error(error);
        m.reply(`> ${error}`);
      }
      break;
  }
};

handler.command = ["musikai"];
handler.help = ["musikai"];
handler.tags = ["ai"];
handler.premium = true; handler.error = 0

export default handler;
