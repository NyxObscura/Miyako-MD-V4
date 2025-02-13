/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import axios from 'axios'

const handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply(`masukan teksnya\n\n> *contoh:* .${command} presiden Indonesia siapa?\n> *contoh:* .${command} buatin gambar emilia re zero (untuk membuat gambar)`)

  let { message, image } = await generete(text)
  if (image) {
    conn.sendFile(m.chat, Buffer.from(image, 'base64'), 'error.jpg', message, m)
  } else {
    m.reply(message)
  }
}
handler.command = ['yanzgpt', 'ygpt']
handler.help = ['yanzgpt <query>']
handler.tags = ['ai']
handler.limit = true
handler.onlyprem = true
export default handler;







/*`[ Scraper AI Yanz-GPT ]`*/

const model = [
    "yanzgpt-revolution-25b-v3.0", // Default
    "yanzgpt-legacy-72b-v3.0" // Pro
];
async function generete(query, model) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(model)
      const response = await axios("https://yanzgpt.my.id/chat", {
        data: {
          query: query,
          model: model
        },
        headers: {
          "authorization": "Bearer yzgpt-sc4tlKsMRdNMecNy",
          "Content-Type": "application/json"
        },
        method: "POST"
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};