/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
const playButtonThresholds = {
  silver: 100000,
  gold: 1000000,
  diamond: 10000000,
};

const videoCategories = [
  "🎮 Gaming",
  "🎵 Musik",
  "📚 Edukasi",
  "📹 Vlog",
  "🔧 Lainnya",
];

const upgradeItems = {
  kamera: {
    harga: 10000,
    subsBoost: 1.2,
    viewersBoost: 1.1,
  },
  mikrofon: {
    harga: 25000,
    subsBoost: 1.3,
    viewersBoost: 1.2,
  },
  lighting: {
    harga: 50000,
    subsBoost: 1.4,
    viewersBoost: 1.3,
  },
  // Tambahkan item upgrade lainnya sesuai kebutuhan
};

const handler = async (m, { conn, text, args }) => {
  if (!args[0])
    return m.reply(
      `*[ 🎥 Youtuber In Bot ]*\n\n` +
        `*Selamat datang di game youtuber! Di sini kalian bisa menjadi youtuber dengan command berikut:*\n\n` +
        `*.youtuber akun* (Untuk melihat akun youtuber mu)\n` +
        `*.youtuber create* (Untuk membuat akun youtube mu)\n` +
        `*.youtuber streaming* (Untuk memulai meng-upload video)\n` +
        `*.youtuber upgrade* (Untuk meng-upgrade alat youtube mu)\n` +
        `*.youtuber lihat* (Untuk melihat video mu)\n` +
        `*.youtuber convert* (Untuk merubah mata uang yt menjadi money)\n\n` +
        `*[ ℹ️ Note ]*\n` +
        `Game ini masih tahap pengembangan. Jika ada error harap di maklumi.`,
    );
  const command = args[0];
  const sender = m.sender;

  // Inisialisasi data pengguna jika belum ada
  if (!global.db.data.users[sender]) {
    global.db.data.users[sender] = {
      youtube: null,
    };
  }

  const youtubeData = global.db.data.users[sender].youtube;

  if (command === "akun") {
    if (youtubeData) {
      let upgradeList = "Upgrade yang dimiliki:\n";
      if (youtubeData.upgrades) {
        for (const item in youtubeData.upgrades) {
          if (youtubeData.upgrades[item]) {
            upgradeList += `*${item}*\n`;
          }
        }
      } else {
        upgradeList += "Belum ada\n";
      }
      m.reply(
        `*Akun YouTube Anda:* ${youtubeData.channelName}\n` +
          `👥 Subs: ${youtubeData.subs}\n` +
          `👁️ Penonton: ${youtubeData.viewers}\n` +
          `🎬 Video: ${youtubeData.videos.length}\n` +
          `💰 Uang YouTube: ${youtubeData.ytMoney} YTCoin\n` +
          `💵 Uang Bot: $${youtubeData.money}\n` +
          `🏆 Penghargaan: ${youtubeData.awards.join(", ") || "Belum ada"}\n` +
          `${upgradeList}`,
      );
    } else {
      m.reply(
        "Anda belum memiliki akun YouTube. Gunakan perintah *create <nama_channel>* untuk membuatnya.",
      );
    }
  } else if (command === "create") {
    if (youtubeData) {
      m.reply("Anda sudah memiliki akun YouTube.");
      return;
    }

    const channelName = args.slice(1).join(" ");

    if (!channelName) {
      m.reply(
        "Masukkan nama channel setelah perintah *create*. Contoh: *create Channel Saya*",
      );
      return;
    }

    global.db.data.users[sender].youtube = {
      channelName,
      subs: 0,
      viewers: 0,
      videos: [],
      awards: [],
      money: 0,
      ytMoney: 0,
      lastStreaming: 0,
      upgrades: {},
      isStreaming: false, // Inisialisasi isStreaming
    };
    m.reply(`Akun YouTube Anda berhasil dibuat dengan nama: ${channelName}`);
  } else if (command === "streaming") {
    if (!youtubeData) {
      m.reply("Anda belum memiliki akun YouTube.");
      return;
    }

    // Cek apakah sedang streaming
    if (youtubeData.isStreaming) {
      m.reply("Anda sedang streaming. Tunggu hingga selesai.");
      return;
    }

    // Cek cooldown
    const lastStreamingTime = youtubeData.lastStreaming || 0;
    const currentTime = Date.now();
    const cooldown = 3 * 60 * 1000; // 3 menit dalam milidetik

    if (currentTime - lastStreamingTime < cooldown) {
      const remainingTimeMs = cooldown - (currentTime - lastStreamingTime);
      const remainingMinutes = Math.floor(remainingTimeMs / (60 * 1000));
      const remainingSeconds = Math.floor(
        (remainingTimeMs % (60 * 1000)) / 1000,
      );

      m.reply(
        `Anda harus menunggu ${remainingMinutes} menit ${remainingSeconds} detik lagi sebelum bisa streaming lagi.`,
      );
      return;
    }

    const judulVideo = args.slice(1).join(" ");
    //const kategoriVideo = args[2];

    if (!judulVideo) {
      m.reply(`Format salah. Gunakan: *streaming <judul>*`);
      return;
    }

    // Simulasi pembuatan video dengan durasi acak
    const durasiVideo = Math.floor(Math.random() * 10) + 5; // Durasi 5-15 menit

    // Waktu tunggu simulasi
    const waktuTunggu = durasiVideo * 60 * 1000;

    // Tandai sedang streaming
    youtubeData.isStreaming = true;

    m.reply(
      `Video "${judulVideo}" sedang diproses. Tunggu beberapa menit untuk melihat hasilnya.`,
    );

    setTimeout(() => {
      youtubeData.videos.push({ judul: judulVideo, durasi: durasiVideo });

      // Terapkan efek upgrade saat menghitung subs dan viewers
      let subsBoost = 1;
      let viewersBoost = 1;
      if (youtubeData.upgrades) {
        for (const item in youtubeData.upgrades) {
          if (youtubeData.upgrades[item]) {
            subsBoost *= upgradeItems[item].subsBoost;
            viewersBoost *= upgradeItems[item].viewersBoost;
          }
        }
      }

      const subsIncrease = Math.floor((Math.random() * 10 + 1) * subsBoost); // Tambah 1-10 subs dengan boost
      const viewersIncrease = Math.floor(
        (Math.random() * 100 + 1) * viewersBoost,
      ); // Tambah 1-100 viewers dengan boost

      youtubeData.subs += subsIncrease;
      youtubeData.viewers += viewersIncrease;

      // Hitung pendapatan YTCoin
      const ytMoneyIncrease = Math.floor(Math.random() * 1000) + 500; // Pendapatan YTCoin 500-1500
      youtubeData.ytMoney += ytMoneyIncrease;

      // Cek apakah mencapai threshold Play Button
      for (const button of Object.keys(playButtonThresholds)) {
        if (
          youtubeData.subs >= playButtonThresholds[button] &&
          !youtubeData.awards.includes(button)
        ) {
          youtubeData.awards.push(button);
          m.reply(
            `Selamat! Anda mendapatkan penghargaan ${button} Play Button! 🏆`,
          );
        }
      }

      // Tandai streaming selesai
      youtubeData.isStreaming = false;

      // Catat waktu streaming terakhir
      youtubeData.lastStreaming = currentTime;

      m.reply(
        `Video "${judulVideo}" berhasil diunggah!\n` +
          `⏱ Durasi: ${durasiVideo} menit\n` +
          `👥 Subs bertambah: ${subsIncrease}\n` +
          `👁️ Penonton bertambah: ${viewersIncrease}\n` +
          `💰 Pendapatan YTCoin: ${ytMoneyIncrease}`,
      );
    }, waktuTunggu);
  } else if (command === "convert") {
    if (!youtubeData) {
      m.reply("Anda belum memiliki akun YouTube.");
      return;
    }

    const ytMoneyToConvert = parseInt(args[1]);

    if (
      isNaN(ytMoneyToConvert) ||
      ytMoneyToConvert <= 0 ||
      youtubeData.ytMoney < ytMoneyToConvert
    ) {
      m.reply("Masukkan jumlah YTCoin yang valid untuk dikonversi.");
      return;
    }

    const conversionRate = 2.0; // 1 YTCoin = $0.01
    const moneyIncrease = Math.floor(ytMoneyToConvert * conversionRate);

    youtubeData.ytMoney -= ytMoneyToConvert;
    youtubeData.money += moneyIncrease;

    m.reply(
      `Berhasil mengkonversi ${ytMoneyToConvert} YTCoin menjadi $${moneyIncrease}`,
    );
  } else if (command === "upgrade") {
    if (!youtubeData) {
      m.reply("Anda belum memiliki akun YouTube.");
      return;
    }

    const item = args[1];

    if (!item || !upgradeItems[item]) {
      let itemList = "Daftar item upgrade:\n";
      for (const item in upgradeItems) {
        itemList += `*${item}* - Harga: $${upgradeItems[item].harga}\n`;
      }
      m.reply(itemList);
      return;
    }

    const harga = upgradeItems[item].harga;

    if (youtubeData.money < harga) {
      m.reply(`Uang Anda tidak cukup untuk membeli ${item}.`);
      return;
    }

    // Beli upgrade
    youtubeData.money -= harga;
    youtubeData.upgrades = youtubeData.upgrades || {};
    youtubeData.upgrades[item] = true;

    m.reply(`Anda berhasil membeli ${item}! 🎉`);
  } else if (command === "lihat") {
    if (!youtubeData) {
      m.reply("Anda belum memiliki akun YouTube.");
      return;
    }

    // Tampilkan daftar video yang telah diunggah dengan kategori
    let videoList = "Daftar video Anda:\n";
    if (youtubeData.videos.length > 0) {
      for (let i = 0; i < youtubeData.videos.length; i++) {
        videoList += `${i + 1}. ${youtubeData.videos[i].judul} (Durasi: ${youtubeData.videos[i].durasi} menit)\n`;
      }
    } else {
      videoList += "Belum ada video yang diunggah.\n";
    }
    m.reply(videoList);
  }
  // ... (perintah lainnya: event, leaderboard, mini-game, dll.)
};

handler.help = ["youtuber"];
handler.tags = ["game", "rpg"];
handler.group = true;
handler.command = ["youtuber"];

export default handler;
