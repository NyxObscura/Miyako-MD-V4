/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*  
*/

const handler = async (m, { conn, command, args }) => {
    const cities = [
        'Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Makasar', 'Medan', 'Bali', 'Semarang', 'Palembang', 'Balikpapan',
        'Denpasar', 'Batam', 'Pekanbaru', 'Bogor', 'Malang', 'Manado', 'Pontianak', 'Samarinda', 'Banjarmasin', 'Jayapura',
        'Ambon', 'Kupang', 'Mataram', 'Padang', 'Bukittinggi', 'Cirebon', 'Sukabumi', 'Tasikmalaya', 'Tangerang', 'Depok',
        'Solo', 'Salatiga', 'Kediri', 'Magelang', 'Banda Aceh', 'Jambi', 'Tanjung Pinang', 'Tarakan', 'Palu', 'Gorontalo',
        'Ternate', 'Sorong', 'Bengkulu', 'Lhokseumawe', 'Cilegon', 'Serang', 'Probolinggo', 'Sidoarjo', 'Pasuruan', 'Kudus',
        'Tegal', 'Purwokerto', 'Blitar', 'Kendari', 'Palangkaraya', 'Mamuju', 'Lombok', 'Bangka', 'Belitung', 'Labuan Bajo'
    ];
    const rewards = ['legendary', 'common', 'mythic', 'uncommon', 'pet', 'iron', 'gold'];

    // Mengambil kota acak dari daftar kota
    const destination = cities[Math.floor(Math.random() * cities.length)];
    const previousCity = global.db.data.users[m.sender].currentCity || cities[Math.floor(Math.random() * cities.length)];

    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];

    const lastPlayed = global.db.data.users[m.sender].lastTrain || 0;
    const cooldown = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

    if (Date.now() - lastPlayed < cooldown) {
        const remainingTime = cooldown - (Date.now() - lastPlayed);
        const hours = Math.floor(remainingTime / (60 * 60 * 1000));
        const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
        return conn.reply(m.chat, `⏳ Tunggu ${hours} jam ${minutes} menit lagi untuk bermain lagi.`, m);
    }

    global.db.data.users[m.sender].lastTrain = Date.now();
    global.db.data.users[m.sender].currentCity = destination;

    // Menghitung jumlah kali bermain
    global.db.data.users[m.sender].trainCount = (global.db.data.users[m.sender].trainCount || 0) + 1;
    const playCount = global.db.data.users[m.sender].trainCount;

    // Menghitung hadiah berdasarkan jumlah kali bermain dan rarity
    const randomExp = (Math.floor(Math.random() * 100) + 1) * playCount; // Random exp between 1 and 100, multiplied by play count
    const randomMoney = (Math.floor(Math.random() * 1000) + 1) * playCount; // Random money between 1 and 1000, multiplied by play count

    let rewardAmount;
    switch (randomReward) {
        case 'legendary':
            rewardAmount = Math.floor(Math.random() * 5) + 1; // 1 to 5
            break;
        case 'mythic':
            rewardAmount = Math.floor(Math.random() * 3) + 1; // 1 to 3
            break;
        case 'common':
        case 'uncommon':
            rewardAmount = Math.floor(Math.random() * 10) + 1; // 1 to 10
            break;
        case 'pet':
            rewardAmount = 1; // Always 1
            break;
        case 'iron':
        case 'gold':
            rewardAmount = Math.floor(Math.random() * 50) + 1; // 1 to 50
            break;
        default:
            rewardAmount = 1; // Default for money and exp
    }

    // Menyimpan hadiah di database pengguna
    global.db.data.users[m.sender].money = (global.db.data.users[m.sender].money || 0) + randomMoney;
    global.db.data.users[m.sender].exp = (global.db.data.users[m.sender].exp || 0) + randomExp;
    global.db.data.users[m.sender][randomReward] = (global.db.data.users[m.sender][randomReward] || 0) + rewardAmount;

    return conn.reply(m.chat, `🚂 Perjalanan dari ${previousCity} ke ${destination} berhasil! 🌍\n\nAnda mendapatkan:\n💰 ${randomMoney} money\n📦 ${rewardAmount} ${randomReward}\n✨ ${randomExp} exp\n\nSelamat menikmati hadiah Anda!`, m);
};

handler.command = handler.help = ['kereta'];
handler.tags = ['game', 'rpg'];
handler.group = true;
handler.error = 0;
export default handler;