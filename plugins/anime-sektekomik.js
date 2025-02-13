/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { detail, search, latest, chapter } from "../lib/sektekomik.js";
import { toPDF } from "../lib/converter.js";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(
      "Command salah\n*Contoh:*\n> _.sektekomik solo leveling_\n> _.sektekomik https://sektekomik.xyz/manga/solo-leveling-special_",
    );
  }

  try {
    if (/manga/i.test(text) && /ch/i.test(text)) {
      let anu = await chapter(text);
      await m.reply(wait);
      let { title, images } = anu.result;
      let pdf = await toPDF(images);
      await conn.sendFile(
        m.chat,
        pdf,
        title,
        "Download Pdf di atas ini untuk membaca komik",
      );
      // Penanganan untuk perintah yang mengandung "ch"
      // Contoh: Menampilkan daftar chapter atau mencari chapter tertentu
    } else if (/manga/i.test(text)) {
      let req = await detail(text);
      if (!req) {
        return m.reply("Komik tidak ditemukan.");
      }
      await m.reply(wait);
      let { title, rating, description, type, status, chapter } = req.result;
      let cap = `*[ Sekte Komik ]*\n`;
      cap += `*Title:* ${title}\n`;
      cap += `*Rating:* ${rating}\n`;
      cap += `*Type:* ${type}\n`;
      cap += `*Status:* ${status}\n`;
      cap += `> *Deskripsi:* ${description}`;

      const chapters = chapter.map((chapter, index) => [
        "",
        `Title: ${chapter.title}`,
        "Link: " + chapter.url,
        usedPrefix + command + ` ${chapter.url}`,
      ]);

      await conn.sendList(
        m.chat,
        "Sekte Komik",
        cap,
        wm,
        "Klik here",
        "List Chapter",
        chapters,
      );
    } else if (/latest/i.test(text)) {
      let screp = await latest();
      await m.reply(wait);
      let { result } = screp;
      const lates = result.map((v, index) => [
        v.title,
        "Tipe: " + v.type,
        "View: " + v.views,
        usedPrefix + command + ` ${v.link}`,
      ]);
      await conn.sendList(
        m.chat,
        "Sekte Komik Latest",
        "",
        wm,
        "Tekan di sini",
        "List latest",
        lates,
      );
    } else {
      let cari = await search(text);
      let { result } = cari;
      await m.reply(wait);
      let list = result.map((v, index) => [
        v.title,
        "Tipe: " + v.type,
        "View: " + v.views,
        usedPrefix + command + ` ${v.mangaUrl}`,
      ]);
      await conn.sendList(
        m.chat,
        "",
        "Silahkan pilih komik yang tersedia di bawah ini",
        wm,
        "klik disini untuk memilih",
        "List Komik",
        list,
      );
    }
  } catch (error) {
    console.error(error);
    m.reply(
      "Terjadi kesalahan saat memproses permintaan Anda.\n> " + error.message,
    );
  }
};

handler.command = ["sektekomik"];
handler.help = ["sektekomik (query/link)"];
handler.tags = ["anime"];
handler.limit = true; handler.error = 0
export default handler;
