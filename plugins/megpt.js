/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";
import cheerio from "cheerio";

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply("Mau nanya apa, om?");

  try {
    let aiResponse = await ai(text);
    if (aiResponse) {
      await m.reply(aiResponse);
    } else {
      await m.reply("Maaf, tidak ada jawaban yang ditemukan.");
    }
  } catch (error) {
    await m.reply("Terjadi kesalahan. Coba lagi nanti.");
    console.error("Error:", error);
  }
};

handler.command = ["megpt"];
export default handler;

async function ai(query) {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://letmegpt.com/search?q=${encodedQuery}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    return $("#gptans").text();
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return null;
  }
}
