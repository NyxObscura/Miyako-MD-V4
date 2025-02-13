/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*  
*/

import { distance } from "../lib/scrape.js";

const handler = async (m, { conn, command, args }) => {
    const countries = [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia',
        'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
        'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde',
        'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)',
        'Congo (Congo-Kinshasa)', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 
        'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 
        'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 
        'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 
        'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 
        'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 
        'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 
        'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 
        'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 
        'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 
        'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 
        'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 
        'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 
        'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 
        'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 
        'Zimbabwe'
    ];

    const rewards = ['legendary', 'common', 'mythic', 'uncommon', 'pet', 'iron', 'gold'];

    // Perjalanan otomatis ke negara acak
    const destination = countries[Math.floor(Math.random() * countries.length)];
    const previousCity = global.db.data.users[m.sender].currentCity || countries[Math.floor(Math.random() * countries.length)];

    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];

    const lastPlayed = global.db.data.users[m.sender].lastFlight || 0;
    const cooldown = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

    if (Date.now() - lastPlayed < cooldown) {
        const remainingTime = cooldown - (Date.now() - lastPlayed);
        const hours = Math.floor(remainingTime / (60 * 60 * 1000));
        const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
        return conn.reply(m.chat, `⏳ Tunggu ${hours} jam ${minutes} menit lagi untuk bermain lagi.`, m);
    }

    const { img, desc } = await distance(previousCity.toLowerCase(), destination.toLowerCase());
    let { key } = await conn.sendMessage(m.chat, { image: img, caption: `*[ Penerbangan menuju ${destination} ]*\n\n> *\`Desc:\`* ${desc}` }, { quoted: m });
    await conn.delay(5000)

    global.db.data.users[m.sender].lastFlight = Date.now();
    global.db.data.users[m.sender].currentCity = destination;

    // Menghitung jumlah kali bermain
    global.db.data.users[m.sender].flightCount = (global.db.data.users[m.sender].flightCount || 0) + 1;
    const playCount = global.db.data.users[m.sender].flightCount;

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
        case 'uncommon ':
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

    return conn.sendMessage(m.chat, { image: img, caption: `✈️ Perjalanan dari ${previousCity} ke ${destination} berhasil! 🌍\n\nAnda mendapatkan:\n💰 ${randomMoney} money\n📦 ${rewardAmount} ${randomReward}\n✨ ${randomExp} exp\n\nSelamat menikmati hadiah Anda!`, edit: key }, m);
};

handler.command = ['pesawat']
handler.help = ['pesawat'];
handler.tags = ['rpg', 'game']
handler.onlyprem = true 
export default handler;