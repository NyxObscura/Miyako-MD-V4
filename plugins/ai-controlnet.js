/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";
import uploadImage from "../lib/uploadImage.js";

const handler = async (m, { conn, text }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || "";

  if (!mime.startsWith("image/")) {
    m.reply("Reply to an image with a caption, *Example*: .controlnet without clothes");
  }

  conn.sendMessage(m.chat, {
    react: {
      text: "💤",
      key: m.key,
    },
  });
  const media = await q.download();
  const imageUrl = await uploadImage(media);

  const apiData = {
    server_name: "jisoo",
    prompt: text || "himalaya in japan",
    width: 512,
    height: 512,
    steps: 25,
    model_id: "dreamshaper",
    sampler: "Euler",
    init_image: imageUrl,
    control_image: "",
    mask_image: "",
    controlnet_model: "tile",
    controlnet_type: "tile",
    controlnet_conditioning_scale: 1,
    guess_mode: "no",
    auto_hint: "no",
    safety_checker: "no",
    safety_checker_type: "blur",
    cfg: 7.5,
    seed: "string",
    enhance_prompt: "no",
    image_num: 1,
    lora_model: "",
    lora_strength: 1,
    negative_prompt: "ugly, disfigured, low quality, blurry, nsfw",
    webhook: "",
  };

  const { data } = await axios.post(
    "https://api.itsrose.rest/image/diffusion/controlNet",
    apiData,
    {
      headers: {
        accept: "application/json",
        Authorization: APIKeys[APIs["rose"]],
        "Content-Type": "application/json",
      },
    },
  );

  if (data.status && data.result.images.length > 0) {
    const imageUrl = data.result.images[0];
    const metadata = data.result.metadata;

    const responseCaption = `ControlNet Image Generation
Prompt: ${metadata.prompt}
Model: ${metadata.model_id}
ControlNet Model: ${metadata.controlnet_model}
ControlNet Type: ${metadata.controlnet_type}
Negative Prompt: ${metadata.negative_prompt}
Steps: ${metadata.steps}
Width: ${metadata.W}
Height: ${metadata.H}`;

    conn.sendFile(m.chat, imageUrl, "controlnet.jpg", responseCaption, m);
  } else {
    m.reply("Failed to generate ControlNet image.");
  }
};

handler.help = ["controlnet"];
handler.tags = ["ai"];
handler.command = /^(controlnet)$/i;

export default handler;
