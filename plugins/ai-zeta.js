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
  if (!text) return m.reply("mau ngomong apa sama zeta");
  let { key } = await m.reply(wait);
  let { answer, result } = await VestiaZeta(text);
  if (result == "false") return m.reply("error om");
  await conn.editMessage(m.chat, key, answer, m);
};
handler.command = ["zeta"];
handler.help = ["zeta (answer)"];
handler.tags = ["ai"];
handler.limit = true; handler.error = 0
export default handler;

async function VestiaZeta(message) {
  try {
    if (!message)
      return { status: false, message: "undefined reading message" };
    return await new Promise((resolve, reject) => {
      axios
        .post("https://backend.aichattings.com/api/v2/chatgpt/talk", {
          msg: message,
          model: "gpt3",
          locale: "ai-characters",
          role_id: 150,
          ep_user_id: 25565,
        })
        .then(async (res) => {
          const data = res.data;
          if (!data) return reject("failed getting response from zeta!");
          resolve({
            status: true,
            answer: data,
          });
        })
        .catch(reject);
    });
  } catch (e) {
    return { status: false, message: e };
  }
}
