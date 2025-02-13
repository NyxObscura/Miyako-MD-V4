/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import axios from 'axios';
const handler = async (m, { conn, args }) => {
  const text = args.join(' ');
  if (!text) {
    return conn.sendMessage(m.chat, { text: `Masukkan prompt!\n*Contoh:* .txt2anime A anime girl with yellow hair & green eyes wearing a black hoodie, smiling on camera with closed eyes.` }, { quoted: m });
  }
  conn.sendMessage(m.chat, { text: 'WAIT SENSEI' }, { quoted: m });
  async function sdxlAnime(prompt) {
    try {
      return await new Promise(async (resolve, reject) => {
        if (!prompt) return reject("Failed to read undefined prompt!");

        axios.post("https://aiimagegenerator.io/api/model/predict-peach", {
          prompt,
          key: "Soft-Anime",
          width: 512,
          height: 768,
          quantity: 1,
          size: "512x768"
        }).then(res => {
          const data = res.data;
          if (data.code !== 0) return reject(data.message);
          if (data.data.safetyState === "Soraa") return reject("NSFW image detected. Please try another prompt.");
          if (!data.data?.url) return reject("Failed to generate the image!");
          

          return resolve({
            status: true,
            image: data.data.url
          });
        }).catch(reject);
      });
    } catch (e) {
      return {
        status: false,
        message: e
      };
    }
  }

  try {
    const res = await sdxlAnime(text);
    const { image } = res;
    await conn.sendMessage(m.chat, {
      image: { url: image },
      caption: `> Prompt: ${text}`
    }, { quoted: m });
  } catch (error) {
    conn.sendMessage(m.chat, { text: `⚠️ Error: ${error.message || 'Something went wrong while generating the image.'}` }, { quoted: m });
  }
};
handler.help = ['txt2anime'];
handler.tags = ['ai'];
handler.command = /^txt2anime$/i;

export default handler;