/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";

let handler = async (m, { conn, text }) => {
  conn.sendMessage(m.chat, {
    react: {
      text: "🎟",
      key: m.key,
    },
  });
  try {
    let api = `https://api.itsrose.rest/sovits/tts/get_models`;
    let { data } = await axios.get(api, {
      headers: {
        accept: "application/json",
        Authorization: APIKeys[APIs["rose"]],
      },
    });

    if (!data.status) {
      m.reply(data.message);
      return;
    }

    let result = data.result;

    // Iterate through the result and format the response
    let response = result.map((model) => [
      "",
      "Name: " + model.name,
      "Language: " + model.language,
      ".svc set model_id " + model.model_id,
    ]);

    await conn.sendList(
      m.chat,
      "",
      "Pilihlah Model_id Di bawah ini",
      wm,
      "Klik disini",
      "List model",
      response,
      m,
    );
  } catch (e) {
    console.log(e);
    m.reply("Error!");
  }
};

handler.help = ["sovitsget"];
handler.tags = ["ai"];
handler.command = /^((sovits|svc)get)$/i;

export default handler;
