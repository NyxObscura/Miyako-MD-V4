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
  if (!text) return m.reply("masukkan promptnya!");
  
  // Cek apakah ada flag --vn
  let isVoiceNote = text.endsWith('--vn');
  if (isVoiceNote) {
    text = text.replace('--vn', '').trim(); // Menghapus --vn dari prompt
  }

  try {
    let res = await sendChatMessage(text, 'GPT-4o');
    
    if (isVoiceNote && res.audio) {
      await conn.sendFile(m.chat, res.audio, '', '', m, true);
    } else {
      m.reply(res.message);
    }
    
  } catch {
    m.reply("error njir");
  }
};

handler.command = ["gpt4o"];
handler.tags = ["ai"];
handler.help = ["gpt4o"];
handler.owner = false;
export default handler;

// web ai dibuat oleh yanz Dev
// Saluran pembuat web yanz gpt: https://whatsapp.com/channel/0029Vai7FxK5Ui2TkgHi1P0I 
// --------------------
   // list model: 
// GPT-4o,  
// Gemini 1.5 Pro, 
// llama-3.1-sonar-large-128k-online, 
// llama-3.1-sonar-small-128k-online, 
// llama-3.1-sonar-large-128k-chat, 
// llama-3.1-sonar-small-128k-chat, 
// Morphic GPT-4, 
// llama-3.1-8b-instruct, 
// llama-3.1-70b-instruct
// dll kalo mau liat model 
// ke yanz gpt aja
async function sendChatMessage(message, model) {
    try {
        const response = await axios.post('https://yanzgpt.my.id/chat', {
            query: message, 
            model: model
        });

        return response.data;
    } catch (error) {
        // Menangani error jika terjadi
        console.error('Error posting message:', error);
        throw error;
    }
}