/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";

const handler = async (m, { conn, text }) => {
  if (!text) {
    m.reply("Mohon masukkan prompt untuk menghasilkan gambar.");
    return;
  }

  m.reply(global.wait);

  try {
    const req = await fetch(
      `https://itzpire.site/ai/pixelart?prompt=${encodeURIComponent(text)}&prompt_negative=(worst%20quality,%20low%20quality:1.3),%20extra%20hands,%20extra%20limbs,%20bad%20anatomy`,
    );
    const data = await req.json(); // Mengambil data dari respons

    await conn.sendFile(
      m.chat,
      data.result,
      "pixelart.jpg",
      `*Hasil dari:* ${text}`,
    );
  } catch (err) {
    console.error(err);
    global.db.data.users[m.sender].limit += 1;
    m.reply("Error tidak diketahui. Limit dikembalikan.");
  }
};

handler.command = ["pixelart"];
handler.help = ["pixelart <prompt>"];
handler.tags = ["ai", "premium"];
handler.onlyprem = true;
handler.limit = true; handler.error = 0
export default handler;
