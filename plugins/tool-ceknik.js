/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import cp from "child_process";
import { nikParse } from "../lib/ceknik.cjs";

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Mana niknya?');
  if (isNaN(text)) return m.reply('Gunakan angka untuk NIK!');

  try {
    // Assuming stdout is a JSON string
    const result = await nikParse(text);


    let tek = `*[ Check Nik ]*\n\n`;
    tek += `> *\`Status\`:* ${result.status}\n`;
    tek += `> *\`Pesan\`:* ${result.pesan}\n`;
    tek += `> *\`Nik\`:* ${result.data.nik}\n`;
    tek += `> *\`Kelamin\`:* ${result.data.kelamin}\n`;
    tek += `> *\`Lahir\`:* ${result.data.lahir}\n`;
    tek += `> *\`Provinsi\`:* ${result.data.provinsi}\n`;
    tek += `> *\`Kotakab\`:* ${result.data.kotakab}\n`;
    tek += `> *\`Kecamatan\`:* ${result.data.kecamatan}\n`;
    tek += `> *\`Uniqcode\`:* ${result.data.uniqcode}\n`;
    tek += `> *\`Kodepos\`:* ${result.data.tambahan.kodepos}\n`;
    tek += `> *\`Pasaran\`:* ${result.data.tambahan.pasaran}\n`;
    tek += `> *\`Usia\`:* ${result.data.tambahan.usia}\n`;
    tek += `> *\`Ultah\`:* ${result.data.tambahan.ultah}\n`;
    tek += `> *\`Zodiak\`:* ${result.data.tambahan.zodiak}`;

    await conn.sendMessage(m.chat, { text: tek }, { quoted: m });
  } catch (error) {
    console.error(`Execution failed: ${error.message}`);
    await m.reply(error.message);
  }
};

handler.command = ['ceknik'];
handler.help = ['ceknik <nik>'];
handler.tags = ['tools'];
handler.limit = true; handler.error = 0

export default handler;