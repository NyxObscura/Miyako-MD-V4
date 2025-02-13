/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, command, args, usedPrefix }) => {
  let type = (args[0] || "").toLowerCase();
  let users = global.db.data.users[m.sender];
  let time = users.lastkerja + 300000;
  let __timers = new Date() - users.lastkerja;
  let _timers = 0 - __timers;
  let timers = clockString(_timers);

  let penumpan = [
    "mas mas",
    "bapak bapak",
    "cewe sma",
    "bocil epep",
    "emak emak",
    "nenek",
    "kakek",
    "teman-teman",
    "pengusaha",
    "pelajar",
  ];
  
  let daganga = [
    "wortel",
    "sawi",
    "selada",
    "tomat",
    "seledri",
    "cabai",
    "daging",
    "ikan",
    "ayam",
    "beras",
    "buah-buahan",
    "kacang",
    "jagung",
  ];
  
  let pasie = [
    "sakit kepala",
    "cedera",
    "luka bakar",
    "patah tulang",
    "flu",
    "demam",
    "batuk",
    "migrain",
    "gigi berlubang",
  ];
  
  let pane = [
    "Wortel",
    "Kubis",
    "Stroberi",
    "Teh",
    "Padi",
    "Jeruk",
    "Pisang",
    "Semangka",
    "Durian",
    "Rambutan",
    "Mangga",
    "Nanas",
    "Apel",
  ];
  
  let bengke = [
    "mobil",
    "motor",
    "becak",
    "bajai",
    "bus",
    "angkot",
    "sepeda",
    "truk",
    "skuter",
    "perahu",
    "helikopter",
  ];
  
  let ruma = [
    "Membangun Rumah",
    "Membangun Gedung",
    "Memperbaiki Rumah",
    "Memperbaiki Gedung",
    "Membangun Fasilitas Umum",
    "Memperbaiki Fasilitas Umum",
    "Membangun Jembatan",
    "Membangun Taman",
    "Membangun Kolam Renang",
    "Membangun Jalan",
  ];

  if (/kerja/i.test(command)) {
    switch (type) {
      case "ojek":
        if (new Date() - users.lastkerja < 300000)
          return m.reply(
            `Kamu sudah bekerja\nSaatnya istirahat selama ${clockString(time - new Date())}`,
          );
        let hasilojek = Math.floor(Math.random() * 150000);
        let penumpang = pickRandom(penumpan);
        m.reply(
          `Kamu Sudah Mengantarkan *${penumpang}* 🚗\nDan mendapatkan uang senilai *Rp ${hasilojek} ${global.rpg.emoticon("money")}*`,
        ).then(() => {
          users.money += hasilojek;
          users.lastkerja = new Date() * 1;
        });
        break;

      case "pedagang":
        if (new Date() - users.lastkerja < 300000)
          return m.reply(
            `Kamu sudah bekerja, saatnya istirahat selama\n🕜 ${clockString(time - new Date())}`,
          );
        let hasildagang = Math.floor(Math.random() * 150000);
        let dagangan = pickRandom(daganga);
        m.reply(
          `Ada pembeli yang membeli *${dagangan}* 🛒\nDan mendapatkan uang senilai *Rp ${hasildagang} ${global.rpg.emoticon("money")}*`,
        ).then(() => {
          users.money += hasildagang;
          users.lastkerja = new Date() * 1;
        });
        break;

      case "dokter":
        if (new Date() - users.lastkerja < 300000)
                    return m.reply(
            `Kamu sudah bekerja, saatnya istirahat selama\n🕜 ${clockString(time - new Date())}`,
          );
        let hasildokter = Math.floor(Math.random() * 150000);
        let pasien = pickRandom(pasie);
        m.reply(
          `Kamu menyembuhkan pasien *${pasien}* 💉\nDan mendapatkan uang senilai *Rp ${hasildokter} ${global.rpg.emoticon("money")}*`,
        ).then(() => {
          users.money += hasildokter;
          users.lastkerja = new Date() * 1;
        });
        break;

      case "petani":
        if (new Date() - users.lastkerja < 300000)
          return m.reply(
            `Kamu sudah bekerja, saatnya istirahat selama\n🕜 ${clockString(time - new Date())}`,
          );
        let hasiltani = Math.floor(Math.random() * 150000);
        let panen = pickRandom(pane);
        m.reply(
          `${panen} Sudah Panen! 🌽 Dan menjualnya 🧺\nDan mendapatkan uang senilai *Rp ${hasiltani} ${global.rpg.emoticon("money")}*`,
        ).then(() => {
          users.money += hasiltani;
          users.lastkerja = new Date() * 1;
        });
        break;

      case "montir":
        if (new Date() - users.lastkerja < 300000)
          return m.reply(
            `Kamu sudah bekerja, saatnya istirahat selama\n🕜 ${clockString(time - new Date())}`,
          );
        let hasilmontir = Math.floor(Math.random() * 150000);
        let bengkel = pickRandom(bengke);
        m.reply(
          `Kamu baru saja mendapatkan pelanggan dan memperbaiki *${bengkel}* 🔧\nDan kamu mendapatkan uang senilai *Rp ${hasilmontir} ${global.rpg.emoticon("money")}*`,
        ).then(() => {
          users.money += hasilmontir;
          users.lastkerja = new Date() * 1;
        });
        break;

      case "kuli":
        if (new Date() - users.lastkerja < 300000)
          return m.reply(
            `Kamu sudah bekerja, saatnya istirahat selama\n🕜 ${clockString(time - new Date())}`,
          );
        let hasilkuli = Math.floor(Math.random() * 150000);
        let rumah = pickRandom(ruma);
        m.reply(
          `Kamu baru saja selesai ${rumah} 🔨\nDan mendapatkan uang senilai *Rp ${hasilkuli} ${global.rpg.emoticon("money")}*`,
        ).then(() => {
          users.money += hasilkuli;
          users.lastkerja = new Date() * 1;
        });
        break;

      case "pengacara":
        if (new Date() - users.lastkerja < 300000)
          return m.reply(
            `Kamu sudah bekerja, saatnya istirahat selama\n🕜 ${clockString(time - new Date())}`,
          );
        let hasilpengacara = Math.floor(Math.random() * 200000);
        m.reply(
          `Kamu berhasil memenangkan kasus di pengadilan! ⚖️\nDan mendapatkan uang senilai *Rp ${hasilpengacara} ${global.rpg.emoticon("money")}*`,
        ).then(() => {
          users.money += hasilpengacara;
          users.lastkerja = new Date() * 1;
        });
        break;

      case "seniman":
        if (new Date() - users.lastkerja < 300000)
          return m.reply(
            `Kamu sudah bekerja, saatnya istirahat selama\n🕜 ${clockString(time - new Date())}`,
          );
        let hasilseniman = Math.floor(Math.random() * 100000);
        m.reply(
          `Karya seni kamu terjual dengan baik! 🎨\nDan mendapatkan uang senilai *Rp ${hasilseniman} ${global.rpg.emoticon("money")}*`,
        ).then(() => {
          users.money += hasilseniman;
          users.lastkerja = new Date() * 1;
        });
        break;

      case "programmer":
        if (new Date() - users.lastkerja < 300000)
          return m.reply(
            `Kamu sudah bekerja, saatnya istirahat selama\n🕜 ${clockString(time - new Date())}`,
          );
        let hasilprogrammer = Math.floor(Math.random() * 250000);
               m.reply(
          `Kamu berhasil menyelesaikan proyek pemrograman! 💻\nDan mendapatkan uang senilai *Rp ${hasilprogrammer} ${global.rpg.emoticon("money")}*`,
        ).then(() => {
          users.money += hasilprogrammer;
          users.lastkerja = new Date() * 1;
        });
        break;

      case "chef":
        if (new Date() - users.lastkerja < 300000)
          return m.reply(
            `Kamu sudah bekerja, saatnya istirahat selama\n🕜 ${clockString(time - new Date())}`,
          );
        let hasilchef = Math.floor(Math.random() * 120000);
        m.reply(
          `Kamu berhasil memasak hidangan lezat dan menjualnya! 🍽️\nDan mendapatkan uang senilai *Rp ${hasilchef} ${global.rpg.emoticon("money")}*`,
        ).then(() => {
          users.money += hasilchef;
          users.lastkerja = new Date() * 1;
        });
        break;

      case "peternak":
        if (new Date() - users.lastkerja < 300000)
          return m.reply(
            `Kamu sudah bekerja, saatnya istirahat selama\n🕜 ${clockString(time - new Date())}`,
          );
        let hasilpeternak = Math.floor(Math.random() * 180000);
        m.reply(
          `Kamu berhasil menjual hasil ternak! 🐄\nDan mendapatkan uang senilai *Rp ${hasilpeternak} ${global.rpg.emoticon("money")}*`,
        ).then(() => {
          users.money += hasilpeternak;
          users.lastkerja = new Date() * 1;
        });
        break;

      case "tukang":
        if (new Date() - users.lastkerja < 300000)
          return m.reply(
            `Kamu sudah bekerja, saatnya istirahat selama\n🕜 ${clockString(time - new Date())}`,
          );
        let hasiltukang = Math.floor(Math.random() * 130000);
        m.reply(
          `Kamu berhasil menyelesaikan pekerjaan sebagai tukang! 🔨\nDan mendapatkan uang senilai *Rp ${hasiltukang} ${global.rpg.emoticon("money")}*`,
        ).then(() => {
          users.money += hasiltukang;
          users.lastkerja = new Date() * 1;
        });
        break;

      case "pemandu wisata":
        if (new Date() - users.lastkerja < 300000)
          return m.reply(
            `Kamu sudah bekerja, saatnya istirahat selama\n🕜 ${clockString(time - new Date())}`,
          );
        let hasilpemandu = Math.floor(Math.random() * 160000);
        m.reply(
          `Kamu berhasil memandu wisatawan dan mendapatkan tips! 🗺️\nDan mendapatkan uang senilai *Rp ${hasilpemandu} ${global.rpg.emoticon("money")}*`,
        ).then(() => {
          users.money += hasilpemandu;
          users.lastkerja = new Date() * 1;
        });
        break;

      default:
        return m.reply(
          `_*Pilih Pekerjaan Yang Kamu Inginkan*_\n\n_• Kuli_ \n_• Montir_ \n_• Petani_ \n_• Dokter_ \n_• Pedagang_ \n_• Ojek_ \n_• Pengacara_ \n_• Seniman_ \n_• Programmer_ \n_• Chef_ \n_• Peternak_ \n_• Tukang_ \n_• Pemandu Wisata_ \n\nContoh Penggunaan :\n${usedPrefix}kerja Kuli`,
        );
    }
  }
};

handler.help = ["kerja"];
handler.tags = ["rpg"];
handler.command = /^kerja$/i;

handler.register = true;
handler.group = true;
handler.rpg = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}