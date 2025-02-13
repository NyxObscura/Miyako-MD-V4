/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import uploadImage from "../lib/uploadImage.js";
import Replicate from "replicate";
const replicate = new Replicate({
  auth: "3a4886dd3230e523600d3b555f651dc82aba3a4e",
});

let handler = async (m, { conn, usedPrefix, text, command }) => {
  conn.animedifvid = conn.animedifvid || {};
  let q = m.quoted ? m.quoted.text : text;
  if (!q)
    return m.reply(
      `Masukan prompt! \n\nContoh : \n${usedPrefix + command} masterpiece, 1girl, solo, best quality, being in a flower garden, eating chocolate, blue hair, golden eyes, cool wind, soft clouds`,
    );
  if (m.sender in conn.animedifvid)
    return m.reply("Mohon bersabar, Permintaan masih di proses...");
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  try {
    conn.animedifvid[m.sender] = true;
    let output = await replicate.run(
      "lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f",
      {
        input: {
          path: "toonyou_beta3.safetensors",
          seed: 255224557,
          steps: 91,
          prompt: text,
          n_prompt:
            "badhandv4, easynegative, ng_deepnegative_v1_75t, verybadimagenegative_v1.3, bad-artist, bad_prompt_version2-neg, teeth",
          motion_module: "mm_sd_v14",
          guidance_scale: 9.22,
        },
      },
    );
    await conn.sendFile(m.chat, output, "", `Prompt : ${text}`, m);
  } catch (e) {
    throw e;
  } finally {
    delete conn.animedifvid[m.sender];
  }
};
handler.help = ["animatediff"];
handler.tags = ["tools"];
handler.command = /^animatediff/i;
handler.limit = true; handler.error = 0
export default handler;
