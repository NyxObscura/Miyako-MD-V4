/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fs from "fs";
import moment from "moment";

let listultah = {};

const handler = async (
  m,
  { usedPrefix, conn, command, text, groupMetadata },
) => {
  let who = groupMetadata.id;
  let note = listultah[who] || [];

  if (/ultah(ku)?/i.test(command)) {
    let [name, date] = text.split(":");
    if (!name || !date) {
      conn.reply(
        m.chat,
        `Format input salah. Masukkan data dengan format: Nama: TANGGAL LAHIR (DD/MM/YYYY) \n\nContoh: \n${usedPrefix + command} ${conn.getName(m.sender)}:01/12/2000`,
        m,
      );
      return;
    }

    let number = m.sender.split("@")[0];
    let birthday = moment(date.trim(), "DD/MM/YYYY");
    let now = moment();
    let nextBirthday = moment(birthday).year(now.year()); // Ambil ulang tahun pada tahun ini
    if (nextBirthday.isBefore(now) || nextBirthday.isSame(now, "day")) {
      nextBirthday.add(1, "year");
    }
    let age = now.diff(birthday, "years");
    let daysLeft = nextBirthday.diff(now, "days");

    let data = `${name.trim()}:${birthday.format("DD/MM/YYYY").trim()}:${number}`;

    // Periksa apakah data yang sama sudah ada
    if (
      note.find((n) => n.split(":")[0].toLowerCase() === name.toLowerCase())
    ) {
      conn.reply(m.chat, "Data sudah ada dalam list.", m);
      return;
    }

    note.push(data);
    listultah[who] = note;
    fs.writeFileSync("listultah.json", JSON.stringify(listultah, null, 2));

    conn.reply(m.chat, `Catatan berhasil ditambahkan, @${number}!`, m);
  } else if (/hapusultah/i.test(command)) {
    if (!text) {
      conn.reply(
        m.chat,
        "Silakan masukkan nomor catatan yang ingin dihapus.",
        m,
      );
      return;
    }
    let index = parseInt(text) - 1;
    if (index < 0 || index >= note.length) {
      conn.reply(m.chat, "Nomor catatan tidak valid.", m);
      return;
    }
    note.splice(index, 1);
    listultah[who] = note;
    fs.writeFileSync("listultah.json", JSON.stringify(listultah, null, 2));
    conn.reply(m.chat, "Catatan berhasil dihapus!", m);
  } else if (/listultah/i.test(command)) {
    if (note.length === 0) {
      conn.reply(
        m.chat,
        "Belum ada catatan. Gunakan perintah *ultahku* untuk menambahkan.",
        m,
      );
      return;
    }
    let message = "*List Ulang Tahun ✨💫*:\n";
    for (let i = 0; i < note.length; i++) {
      let [name, date, number] = note[i].split(":");
      if (!name || !date || !number) continue;
      let birthday = moment(date.trim(), "DD/MM/YYYY");
      let now = moment();
      let nextBirthday = moment(birthday).year(now.year()); // Ambil ulang tahun pada tahun ini
      if (nextBirthday.isBefore(now) || nextBirthday.isSame(now, "day")) {
        nextBirthday.add(1, "year");
      }
      let age = now.diff(birthday, "years");
      let daysLeft = nextBirthday.diff(now, "days");

      // Tampilkan hasil dengan perhitungan mundur ke ulang tahun selanjutnya
      message += `${i + 1}. ${name.trim()} : ${date.trim()} (@${number.trim()}) | ${age} tahun | ${daysLeft} hari lagi\n`;
    }
    conn.reply(m.chat, message, m);
  }
};

handler.help = ["ultahku", "hapusultah", "listultah"];
handler.tags = ["tools"];
handler.command = /^(ultah(ku)?|hapusultah|listultah)$/i;
handler.group = true;
export default handler;
