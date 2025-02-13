/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import axios from "axios";

const handler = async (m, { conn, text }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("No media found");
  if (!text) return m.reply('Masukkan modelnya\nContoh: Jokowi');
  await m.reply('Tunggu beberapa menit..');

  let media = await q.download();
    let api = await cover(text, media);
    await conn.sendFile(m.chat, api, 'anu.mp3', '', m, false, { mimetype: "audio/mpeg" })
};

handler.command = ["voicecovers", "vcs"];
handler.help = ["voicecovers", "vcs"];
handler.tags = ["ai"];
handler.limit = true;
handler.error = 0
export default handler;

async function cover(model, audioData) {
  try {
    const response = await axios.post(
      `https://ai.xterm.codes/api/audioProcessing/voice-covers?model=${model}&key=vynz772627`,
      audioData,
      {
        headers: {
          'Content-Type': 'application/octet-stream'
        },
        responseType: 'stream' // Stream mode
      }
    );

    return new Promise((resolve, reject) => {
      let result = '';
      response.data.on('data', chunk => {
        result += chunk.toString();
      });

      response.data.on('end', () => {
        try {
          const parsedData = JSON.parse(result);
          if (parsedData.status === 'success') {
            resolve(parsedData.result);
          } else {
            reject(new Error(parsedData.message || 'Failed to process the audio'));
          }
        } catch (err) {
          reject(new Error('Failed to parse response data'));
        }
      });

      response.data.on('error', (err) => {
        reject(err);
      });
    });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }
}