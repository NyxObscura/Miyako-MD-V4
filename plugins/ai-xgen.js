/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("_masukan promptnya_");
  try {
    await m.reply(wait);
    let api = await fetch(
      `https://api.maelyn.tech/api/animeart?prompt=${text},pussy, breasts,  looking at viewer, navel, anus, blush, nude, solo, on bed, bed sheet, completely nude, curtains, medium breasts, hand on own chest, uncensored, stomach, thighs, sitting, long hair, on back, bare shoulders, bangs&resolution=Portrait&model=(none)&apikey=${APIKeys[APIs['maelyn']]}`,
    );

    let data = await api.json();
    if (!data.status) return m.reply('gambar tidak ada mohon ulangi commandnya')
    let { resolution, guidance_scale, num_inference_steps, seed } = data.result.info;
    let teks = `*[ Porn gen Anime ]*\n\n`;
    teks += `*\`Resolusi:\`* ${resolution}\n`
    teks += `*\`Guidance scale:\`* ${guidance_scale}\n`
    teks += `*\`Steps:\`* ${num_inference_steps}\n`
    teks += `*\`Seed:\`* ${seed}`
    if (m.isGroup) {
      await m.reply('Um nikmati di private :)')

      await conn.sendFile(m.sender, data.result.image.name, "anu.png", teks, m);
    } else {
      await conn.sendFile(m.chat, data.result.image.name, "anu.png", teks, m);
    }
  } catch (e) {
    return e.message;
  }
};
handler.command = ["xgen", "porngen", "txt2porn"];
handler.help = ["xgen <prompt>"];
handler.tags = ["ai"];
handler.premium = true;
handler.error = 0
export default handler;