/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import { googleImage, pinterest } from '@bochilteam/scraper';

const cooldown = 3600300;

let jarspy = async (m, { conn, text, usedPrefix }) => {
    let user = global.db.data.users[m.sender]; // Mengambil data user dari global.db.data.users
    let wmtitle = 'R o l e  P l a y';
    let wmbody = 'K e n c a n';

   if(user.kepercayaanwaifu > 100) return m.reply('kamu tidak perlu kencan lagi, karena Kepercayaan waifu kamu sudah maxxxxxxxxxxx :v')

    if (new Date() - user.lastkencan < cooldown) {
        throw `Kamu sudah berkencan sebelumnya. Tunggu selama *${((user.lastkencan + cooldown) - new Date()).toTimeString()}* untuk berkencan lagi!`;
    }

    if (user.waifu === '-') {
        throw 'Kamu belum mempunyai waifu! Ketik */lamarwaifu* untuk melamar waifu';
        return;
    }

    let tempat = `${['pantai', 'taman kota', 'kebun binatang', 'taman bermain', 'kolam renang', 'teater', 'pusat seni dan budaya', 'museum seni', 'pusat sains', 'perpustakaan', 'kafe', 'restoran', 'kebun bunga', 'taman anggur', 'lapangan golf', 'lapangan tenis', 'pusat perbelanjaan', 'pasar seni', 'galeri seni', 'pertunjukan musik', 'lapangan bola basket', 'lapangan baseball', 'lapangan sepak bola', 'pusat yoga', 'karaoke', 'kebun buah', 'pertunjukan seni', 'arena balap', 'pusat bowling'].getRandom()}`;
    let alesan = `${['belajar bersama tentang cinta', 'merayakan momen-momen penting bersama', 'berbagi hobi dan minat bersama', 'menguatkan hubungan', 'bersenang-senang bersama', 'mempererat komunikasi', 'merayakan hubungan', 'membangun kenangan', 'mempererat hubungan'].getRandom()}`;
    let tempat2 = `${['rumah mertua', 'pusat seni kuliner', 'studio musik', 'pesta seni pertunjukan', 'pesta seni kreatif', 'studio perhiasan', 'pusat seni keramik', 'pusat seni berkebun', 'arena konser', 'studio lukisan', 'pusat seni film', 'pusat hiking indoor', 'pemandian air panas', 'memancing', 'kebun apel', 'pusat mainan', 'taman bermain air', 'lapangan futsal'].getRandom()}`;
    let alesan2 = `${['saling mengenal lebih baik', 'membangun ikatan emosional yang lebih dalam', 'bersenang-senang bersama', 'mempererat komunikasi', 'merayakan hubungan', 'membangun kenangan', 'mempererat hubungan'].getRandom()}`;
    let perasaan = `${['senang', 'semakin cinta denganmu', 'sangat cinta denganmu', 'biasa saja', 'sangat senang', 'bahagia', 'sangat bahagia', 'cukup senang'].getRandom()}`;
    let gaun = `${['blazer & celana pendek yang bergaya', 'blouse & rok yang anggun', 'jeans & blus yang kasual', 'kimono yang indah', 'yukata yang sangat cantik', 'gaun pendek yang elegan', 'gaun panjang yang anggun', 'kemeja & celana panjang yang rapih', 'crop top & rok mini'].getRandom()}`;
    let gift = `${['seikat bunga matahari kuning cerah', 'sebuah coklat', 'sebuah kartu ucapan'].getRandom()}`;
    let tempat3 = `${['taman bermain. Mereka tertawa dan bersenang-senang seperti anak-anak, naik roller coaster, dan bermain permainan karnaval', 'restoran. Mereka menikmati hidangan yang begitu lezat dan mereka saling menyuap-nyuapi dengan sangat romantis', 'sebuah kafe yang nyaman. Mereka duduk di sudut yang tenang, berbagi coklat panas dan kue'].getRandom()}`;

    let waifu = `${user.waifu}`;
    let kapital = capitalizeFirstLetter(waifu);

    // Mengirim beberapa pesan beruntun dengan jeda waktu
    setTimeout(() => {
        conn.sendMessage(m.chat, {
            text: `*Jam 07:00 Pagi*\n\n⋄ Pagi yang cerah menyapa ${kapital} dan ${user.name}. Mereka berdua telah merencanakan kencan spesial ini dengan penuh antusiasme. ${kapital} bangun lebih awal untuk bersiap-siap. Dia memakai ${gaun} dan tersenyum senang.`,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: wmtitle,
                    body: wmbody,
                    mediaType: 1,
                    sourceUrl: sig,
                    thumbnailUrl: 'https://telegra.ph/file/285e88f487756188b9d8b.jpg',
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    }, 1500);

    setTimeout(() => {
        conn.sendMessage(m.chat, {
            text: `*Jam 07:15 Pagi*\n\n⋄ Sementara itu, ${user.name} sudah bersiap di luar rumah ${kapital}. Dia membawa ${gift} untuk ${kapital}. Saat ${kapital} melihat ${user.name}, senyum mereka bertemu dan mata mereka bersinar.`,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: wmtitle,
                    body: wmbody,
                    mediaType: 1,
                    sourceUrl: sig,
                    thumbnailUrl: 'https://telegra.ph/file/ddfebf4ac1acbbe92d64f.jpg',
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    }, 27000);

    setTimeout(() => {
        conn.sendMessage(m.chat, {
            text: `*Jam 07:30 Pagi*\n\n⋄ Keduanya memutuskan untuk pergi ke ${tempat} untuk ${alesan}. Mereka berjalan berdua, berbicara tentang segala hal, dari hobi mereka hingga impian masa depan. Setiap jalanan dipenuhi dengan bunga-bunga yang berwarna-warni, seperti perasaan mereka satu sama lain.`,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: wmtitle,
                    body: wmbody,
                    mediaType: 1,
                    sourceUrl: sig,
                    thumbnailUrl: 'https://telegra.ph/file/318a7e44f82ae524b94c0.jpg',
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    }, 55000);

    setTimeout(() => {
        conn.sendMessage(m.chat, {
            text: `*Jam 08:00 Pagi - 15:00 Siang*\n\n⋄ Setelah menikmati ${tempat}, ${kapital} dan ${user.name} pergi ke ${tempat2} untuk ${alesan2}. Mereka saling memandang dengan penuh kasih sayang, merasakan ikatan mereka semakin kuat.`,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: wmtitle,
                    body: wmbody,
                    mediaType: 1,
                    sourceUrl: sig,
                    thumbnailUrl: 'https://telegra.ph/file/14675c53f9dd40473fa12.jpg',
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    }, 75000);

    setTimeout(() => {
        conn.sendMessage(m.chat, {
            text: `*Jam 15:00 Siang - 22:00 Malam*\n\n⋄ Kencan mereka berlanjut ke ${tempat3}. Hingga malam pun datang begitu cepat, dan mereka merencanakan untuk menonton bintang-bintang bersama.`,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: wmtitle,
                    body: wmbody,
                    mediaType: 1,
                    sourceUrl: sig,
                    thumbnailUrl: 'https://telegra.ph/file/d979049fb7980796d06e4.jpg',
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    }, 95000);

    setTimeout(() => {
        conn.sendMessage(m.chat, {
            text: `*Jam 22:00 Malam*\n\n⋄ Di malam yang tenang, mereka berdua duduk di bawah langit yang penuh dengan bintang. ${user.name} merangkul ${kapital} dengan lembut, dan mereka saling berbagi cerita dan impian mereka. Waktu berlalu begitu cepat, dan kencan pun telah selesai. Kamu mengantar ${kapital} pulang kerumah dan ${kapital} merasa ${perasaan} dari kencan tadi.\n\n+1 💘 Kepercayaan ${kapital}`,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: wmtitle,
                    body: wmbody,
                    mediaType: 1,
                    sourceUrl: sig,
                    thumbnailUrl: 'https://telegra.ph/file/125f2e54440d3a99b0948.jpg',
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    }, 115000);

    // Menambahkan +1 kepercayaan waifu dan menyimpan waktu terakhir kencan
    setTimeout(() => {                         
        global.db.data.users[m.sender].kepercayaanwaifu += 1; // Menambahkan kepercayaan waifu
        global.db.data.users[m.sender].lastkencan = new Date() * 1; // Update waktu kencan terakhir
    }, 75000);
};

jarspy.help = ['kencan'];
jarspy.tags = ['roleplay'];
jarspy.command = /^(kencan)$/i;

jarspy.cooldown = cooldown;

export default jarspy;

function capitalizeFirstLetter(str) {
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join(" ");
}