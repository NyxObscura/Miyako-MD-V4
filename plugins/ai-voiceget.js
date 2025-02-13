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
    let api = "https://api.itsrose.rest/sovits/vc/get_models";
    let headers = {
      accept: "application/json",
      Authorization: APIKeys[APIs["rose"]],
    };
    let { data } = await axios.get(api, { headers });

    if (!data.status) {
      m.reply(data.message);
      return;
    }

    let result = data.result;
    let response = `*- name:*\n${result.map((model) => `◦ ${model.name} (ID: ${model.model_id})\n  - Languages: ${model.languages.join(", ")}`).join("\n===========================================\n")}`;

    m.reply(response);
  } catch (e) {
    console.log(e);
    m.reply("Error!\n" + e.message);
  }
};

handler.help = ["voicemodel"];
handler.tags = ["ai"];
handler.command = /^(voicemodel)$/i;

export default handler;
