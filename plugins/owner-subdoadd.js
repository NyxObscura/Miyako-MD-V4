/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

const handler = async (m, { conn }) => {
  // Jika user sudah dalam proses, minta untuk menyelesaikan dulu
  if (conn.subdoAdd?.[m.sender]?.step) {
    return m.reply('Masih ada proses yang belum selesai. Harap selesaikan terlebih dahulu.');
  }

  // Inisialisasi array global subdo jika belum ada
  if (!global.db.data.bots.subdo) {
    global.db.data.bots.subdo = [];
  }

  // Inisialisasi subdoAdd untuk user ini berdasarkan m.sender
  conn.subdoAdd = {
    ...conn.subdoAdd,
    [m.sender]: { step: 'requestZone' }
  };

  m.reply('Masukkan Zone ID Cloudflare:\n> contoh: 023e69eba26846bc350a2b96f439669a\n\nSilakan masukkan Zone ID:');
};

handler.before = async (m, { conn }) => {
  // Jika tidak ada proses subdoAdd untuk user ini, return
  if (!conn.subdoAdd?.[m.sender]) return;
  const task = conn.subdoAdd[m.sender];

  if (task.step === 'requestZone') {
    const zoneInput = m.text.trim();
    task.zone = zoneInput;
    task.step = 'requestApiToken';
    m.reply(`Masukkan API Token untuk Zone ID ${task.zone}:`);
  } else if (task.step === 'requestApiToken') {
    task.apitoken = m.text.trim();
    task.step = 'requestTld';
    m.reply('Masukkan TLD (Top Level Domain), contoh: cifumo.biz.id');
  } else if (task.step === 'requestTld') {
    task.tld = m.text.trim();

    // Tambahkan subdomain baru ke array global subdo
    global.db.data.bots.subdo.push({
      user: m.sender,  // Menyimpan siapa yang menambahkan
      zone: task.zone,
      apitoken: task.apitoken,
      tld: task.tld,
    });

    m.reply(`Subdomain baru telah ditambahkan oleh ${m.sender}:
- Zone ID: ${task.zone}
- API Token: ${task.apitoken}
- TLD: ${task.tld}`);

    // Reset proses subdoAdd untuk user ini
    delete conn.subdoAdd[m.sender];
  }
};

handler.command = ['subdoadd'];
handler.help = ['subdoadd (untuk menambah subdomain baru)'];
handler.tags = ['subdomain'];
handler.owner = true;
handler.error = 0;

export default handler;