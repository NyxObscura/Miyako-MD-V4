/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/


import axios from 'axios';
import uploadImage from "../lib/uploadFile.js";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("Fotonya Mana?");
  if (!/image\/(jpe?g|png)/.test(mime))
    return m.reply(`Tipe ${mime} tidak didukung!`);
  let ephemeral =
    conn.chats[m.chat]?.metadata?.ephemeralDuration ||
    conn.chats[m.chat]?.ephemeralDuration ||
    false;
  
  let img = await q.download();
  let files = await uploadImage(img);
  let removebg = await axios.get(`https://widipe.com/removebg?url=${files}`)
  
 
      try {
        let out = removebg.data.result.urls
        await conn.sendMessage(
          m.chat,
          {
            image: { url: out },
            fileName: "removebg.png",
            mimetype: "image/png",
            caption: "*DONE (≧ω≦)ゞ*",
          },
          { quoted: m, ephemeralExpiration: ephemeral },
        );
      } catch (e) {
        console.error(e);
        m.reply('Terjadi kesalahan saat menghapus latar belakang.');
      }
};
handler.help = ["removebg", "changebg"];
handler.tags = ["tools", "premium"];
handler.command = /^(removebg|changebg)$/i;
handler.premium = true; handler.error = 0
export default handler;