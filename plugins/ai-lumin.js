/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";

const handler = async (m, { conn, text }) => {
  if (!text)
    return m.reply("masukan promptnya\n*Contoh:* .lumine siapa dirimu");
  try {
    let { key } = await conn.sendMessage(m.chat, { text: wait }, { quoted: m });
    let ai = await lumin(
      text,
      m.pushName,
      "kamu adalah emilia character anime dari re:zero, kamu jago dalam segala bidang termasuk coding, kamu berbicara layaknya manusia tanpa kata kata formal, dan kamu juga di buat oleh cifumo, kamu bersifat lemah lembut kepada owner mu dan bersikap dingin kepada orang lain, gunakan bahasa jepang seperti wibu",
      true,
    );
    await conn.editMessage(m.chat, key, ai, m);
  } catch (e) {
    m.reply("error om coba lagi nanti yah");
  }
};

handler.help = ["lumin <text>"];
handler.tags = ["ai"];
handler.command = /^(lumi(ne|n))$/i;
handler.limit = true; handler.error = 0
export default handler;

async function lumin(q, username = null, logic = null, webSearchMode = false) {
  try {
    const payload = { content: q };
    if (username !== null) payload.user = username;
    if (logic !== null) payload.prompt = logic;
    payload.webSearchMode = webSearchMode;

    const response = await axios.post(
      "https://lumin-ai.xyz",
      payload,
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
