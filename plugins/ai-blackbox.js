/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { Blackbox } from "../lib/blackbox.js";

const handler = async (m, { conn, text }) => {
  try {
    if (!text && !m.quoted) {
      return m.reply(
        "Gunakan perintah ini dengan teks atau merespon gambar. Contoh: *.blackbox Hello*",
      );
    }
    const blackbox = new Blackbox();

    if (
      text &&
      m.quoted &&
      (m.quoted.mimetype === "image/jpeg" || m.quoted.mimetype === "image/png")
    ) {
      const buffer = await m.quoted.download();
      const response = await blackbox.image(buffer, text);
      await m.reply(response);
    } else if (text) {
      const response = await blackbox.combinedResponse(
        text,
        `Kamu adalah Emilia AI bukan AI lain dan ownermu adalah Dexzz. Kamu berbicara dengan ${m.pushName}.`,
      );
      await m.reply(response);
    }
  } catch (e) {
    m.reply(e.message);
  }
};

handler.help = ["blackbox", "blx"];
handler.tags = ["ai"];
handler.command = ["blackbox", "blx"];
handler.limit = true; handler.error = 0
export default handler;
