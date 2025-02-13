/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";
import imagine from '../lib/scraper/animagine.js'

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("_masukan promptnya_");
  try {
    await m.reply(wait);
    /*let api = await fetch(
      `https://api.maelyn.tech/api/animeart?prompt=${text}&resolution=Portrait&model=(none)&apikey=${APIKeys[APIs['maelyn']]}`,
    );*/
    let gen = await imagine(text, model)
    
    let { resolution, guidance_scale, num_inference_steps, seed } = gen.metadata;
    let teks = `*[ Animagine ]*\n\n`;
    teks += `*\`Resolusi:\`* ${resolution}\n`
    teks += `*\`Guidance scale:\`* ${guidance_scale}\n`
    teks += `*\`Steps:\`* ${num_inference_steps}\n`
    teks += `*\`Seed:\`* ${seed}`
    await conn.sendFile(m.chat, gen.url, "anu.png", teks, m);
  } catch (e) {
    return e.message;
  }
};
handler.command = ["imagine"];
handler.help = ["imagine <prompt>"];
handler.tags = ["ai"];
handler.premium = true; handler.error = 0
export default handler;
