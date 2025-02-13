/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { latinToAksara } from "@bochilteam/scraper";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(`Ubah Latin ke Aksara Jawa\n\nContoh :\n*${usedPrefix + command} halo rek*`);
  try {
    let anu = await latinToAksara(`${text}`);
    m.reply(`*Hasil :*\n${anu}`);
  } catch (e) {
    console.log(e);
    m.reply(`Terjadi kesalahan, coba lagi nanti.`);
  }
};

handler.help = ["toaksara"];
handler.tags = ["tools"];
handler.command = /^((latin)?toaksara)$/i;

export default handler;
