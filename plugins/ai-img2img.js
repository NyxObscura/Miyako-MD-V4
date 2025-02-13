/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";
import fetch from "node-fetch";
import uploadImage from "../lib/uploadImage.js";

const payloads = {
  server_name: "frieren",
  prompt: "",
  negative_prompt:
    "nsfw, bad anatomy, lowres, extra hands, extra legs, extra finger",
  init_image: "",
  strength: 1,
  width: 512,
  height: 512,
  steps: 25,
  model_id: "dreamshaper",
  sampler: "UniPC",
  cfg: 7.5,
  seed: "",
  enhance_prompt: "yes",
  image_num: 1,
  safety_checker: "no",
  safety_checker_type: "blur",
  lora_model: "more_details",
  lora_strength: 1,
  embeddings_model: "",
  webhook: null,
};

const handler = async (m, { text, command, isOwner, args, usedPrefix }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || "";

  if (args[0] === "set") {
    if (args.length % 2 !== 1) {
      return m.reply("Invalid arguments.");
    }

    for (let i = 1; i < args.length; i += 2) {
      const key = args[i];
      const value = args[i + 1];
      if (key && value) {
        payloads[key] = value;
        m.reply(`🌸 *${key}* has been set to *${value}*.`);
      }
    }
    return;
  }

  if (args[0] === "showall") {
    let payloadInfo = "*Payloads*:";
    for (const [key, value] of Object.entries(payloads)) {
      payloadInfo += `\n${key}: ${value}`;
    }
    return m.reply(payloadInfo);
  }

  if (!mime.startsWith("image/")) {
    m.reply("Reply to an image with a caption .img2img ⧼prompt⧽");
  }

  const media = await q.download();
  const imageUrl = await uploadImage(media);

  const updatedPayloads = { ...payloads, prompt: text, init_image: imageUrl };

  let { key } = await conn.sendMessage(
    m.chat,
    { text: "_Preparing Stable diffusion..._" },
    { quoted: m },
  );

  const { data } = await axios
    .request({
      baseURL: "https://api.itsrose.rest",
      url: "/image/diffusion/img2img",
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: APIKeys[APIs["rose"]],
        "Content-Type": "application/json",
      },
      data: updatedPayloads,
    })
    .catch((e) => e?.response);

  const { status, message, result } = data;

  if (!status) {
    return m.reply(message);
  }

  const { metadata, images, generation_time } = result;
  const {
    model_id,
    scheduler,
    W,
    H,
    guidance_scale,
    steps,
    seed,
    clip_skip,
    lora,
    negative_prompt,
  } = metadata;

  const medata = `*Generating Time*: ${generation_time.toFixed()} second
*prompt*: ${text}
*model_id*: ${model_id}
*lora*: ${lora}
*negative_prompt*: ${negative_prompt}
*scheduler*: ${scheduler}
*W*: ${W}
*H*: ${H}
*guidance_scale*: ${guidance_scale}
*steps*: ${steps}
*seed*: ${seed}
*clip_skip*: ${clip_skip}`;

  await conn.sendMessage(m.chat, {
    text: medata,
    edit: key,
  });

  await conn.sendFile(
    m.chat,
    images[0],
    "ini.jpg",
    "Prompt: " + "```" + text + "```",
    m,
  );
};

handler.command = handler.help = ["img2img"];
handler.tags = ["ai"];
handler.premium = true; handler.error = 0

export default handler;
