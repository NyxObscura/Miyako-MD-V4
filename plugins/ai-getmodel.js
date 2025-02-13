/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";
import { generateWAMessageFromContent } from "@adiwajshing/baileys";

let handler = async (m, { conn, text }) => {
  if (!text)
    return conn.sendButton2(
      m.chat,
      "",
      "*example*: .getmodel frieren/jisoo",
      wm,
      [
        ["frieren?", "getmodel frieren"],
        ["jisoo", "getmodel jisoo"],
      ],
      m,
    );
  if (!(text === "jisoo" || text === "frieren"))
    return m.reply(`server ${text} not found.`);

  conn.sendMessage(m.chat, {
    react: {
      text: "🎟",
      key: m.key,
    },
  });
  try {
    let api = `https://api.itsrose.rest/image/diffusion/get_all_models?server_name=${text}`;
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

    let caption = [
      {
        title: "Model txt2img",
        highlight_label: "popular",
        rows: result.models.map((model) => ({
          header: "Ai Txt2img",
          title: "Model",
          description: `detail Model: ${model}`,
          id: ".txt2img set model_id " + model,
        })),
      },
      {
        title: "Model img2img",
        highlight_label: "popular",
        rows: result.models.map((model) => ({
          header: "Ai img2img",
          title: "Model",
          description: `detail Model: ${model}`,
          id: ".img2img set model_id " + model,
        })),
      },
      {
        title: "Lora Model txt2img",
        highlight_label: "Popular",
        rows: result.lora_models.map((model) => ({
          header: "Ai Txt2img",
          title: "Lora Model",
          description: `detail Model: ${model}`,
          id: ".txt2img set model_id " + model,
        })),
      },
      {
        title: "Lora Mode img2imgl",
        highlight_label: "Popular",
        rows: result.lora_models.map((model) => ({
          header: "Ai img2img",
          title: "Lora Model",
          description: `detail Model: ${model}`,
          id: ".img2img set model_id " + model,
        })),
      },
      {
        title: "List Server",
        highlight_label: "Popular",
        rows: [
          {
            header: "txt2img",
            title: "Jisoo",
            description: `Untuk mengubah server ke Jisoo`,
            id: ".txt2img set server_name jisoo",
          },
          {
            header: "txt2img",
            title: "frieren",
            description: `Untuk Mengubah server ke frieren`,
            id: ".txt2img set server_name frieren",
          },
          {
            header: "img2img",
            title: "Jisoo",
            description: `Untuk mengubah server ke Jisoo`,
            id: ".img2img set server_name jisoo",
          },
          {
            header: "img2img",
            title: "frieren",
            description: `Untuk Mengubah server ke frieren`,
            id: ".img2img set server_name frieren",
          },
        ],
      },
    ];

    let msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2,
            },
            interactiveMessage: {
              body: {
                text: `Silahkan pilih di bawah ini`,
              },
              footer: {
                text: global.db.data.bots.info.wm,
              },
              header: {
                title: "Get All models",
                subtitle: "",
                hasMediaAttachment: false,
              },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({
                      title: "List Model",
                      sections: caption,
                    }),
                  },
                ],
              },
            },
          },
        },
      },
      { quoted: m },
      {},
    );
    await conn.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id,
    });
  } catch (e) {
    console.log(e);
    m.reply("Error!");
  }
};

handler.help = ["getmodel ⧼jisoo/frieren⧽"];
handler.tags = ["ai"];
handler.command = /^(getmodel)$/i;

export default handler;
