/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

const handler = async (m, { conn }) => {
  if (conn.panelSet?.step) {
    return m.reply('Masih ada proses yang belum selesai. Harap selesaikan terlebih dahulu.');
  }

  // Jika panelSet sudah ada, tawarkan opsi untuk mengedit
  if (global.db.data.bots.panelSet) {
    m.reply(`Panel sudah ada dengan detail berikut:
- Domain: ${global.db.data.bots.panelSet.domain}
- PLTA: ${global.db.data.bots.panelSet.plta}
- PLTC: ${global.db.data.bots.panelSet.pltc}

Ingin mengedit informasi panel? Pilih bagian yang ingin diedit:
1. Domain
2. PLTA
3. PLTC
4. Baru (untuk membuat panel baru)`);

    conn.panelSet = { step: 'selectEdit' };
  } else {
    conn.panelSet = { step: 'requestDomainPanel' };
    m.reply('Masukan domain panel tanpa https://\n> contoh: cifumo.xyz\n\nSilakan masukkan domain panel:');
  }
};

handler.before = async (m, { conn }) => {
  if (!conn.panelSet) return;
  const task = conn.panelSet;

  if (task.step === 'selectEdit') {
    const choice = m.text.trim();
    if (choice === '1') {
      task.step = 'requestPLTC';
      m.reply(`Silakan masukkan domain panel baru (saat ini: ${global.db.data.bots.panelSet.domain.replace('https://', '')}):`);
    } else if (choice === '2') {
      task.step = 'requestPLTC';
      m.reply(`Silakan masukkan PLTA baru (saat ini: ${global.db.data.bots.panelSet.plta}):`);
    } else if (choice === '3') {
      task.step = 'requestPLTC';
      m.reply(`Silakan masukkan PLTC baru (saat ini: ${global.db.data.bots.panelSet.pltc}):`);
    } else if (choice === '4') {
      task.step = 'requestDomainPanel';
      m.reply('Masukan domain panel tanpa https://\n> contoh: cifumo.xyz\n\nSilakan masukkan domain panel:');
    } else {
      m.reply('Pilihan tidak dikenali. Ketik angka 1 untuk Domain, 2 untuk PLTA, 3 untuk PLTC, atau 4 untuk membuat panel baru.');
    }
    return;
  }

  if (task.step === 'requestDomainPanel') {
    const domainInput = m.text.trim();
    task.domain = `https://${domainInput}`; // Menambahkan https://
    task.step = 'requestPLTA';
    m.reply(`Cara mendapatkan PLTA:
- Kunjungi: ${task.domain}/admin/api
- Buat dan setting menjadi Read & Write

Masukkan PLTA (saat ini: ${global.db.data.bots.panelSet?.plta || 'belum ada'}):`);
  } else if (task.step === 'requestPLTA') {
    task.plta = m.text.trim();
    task.step = 'requestPLTC';
    m.reply(`Cara mendapatkan PLTC:
- Kunjungi: ${task.domain}/account/api
- Buat nama lalu generate token

Masukkan PLTC (saat ini: ${global.db.data.bots.panelSet?.pltc || 'belum ada'}):`);
  } else if (task.step === 'requestPLTC') {
    task.pltc = m.text.trim();

    // Simpan atau perbarui panelSet
    global.db.data.bots.panelSet = {
      domain: task.domain,
      plta: task.plta,
      pltc: task.pltc,
    };

    m.reply(`Panel telah disimpan atau diperbarui secara global:
- Domain Panel: ${task.domain}
- PLTA: ${task.plta}
- PLTC: ${task.pltc}`);

    delete conn.panelSet;
  }
};

handler.command = ['panelset'];
handler.help = ['panelset (untuk set atau edit info panel)'];
handler.tags = ['panel'];
handler.owner = true;
handler.error = 0;

export default handler;