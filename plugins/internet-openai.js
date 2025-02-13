/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import axios from 'axios';

let cif = async (m, { conn, usedPrefix, command, text }) => {
    if (!text)
    return m.reply(
      `Masukan prompt openai! \n\nContoh : \n${usedPrefix + command} siapa kamu`,
    );

    // Inisialisasi sesi percakapan untuk pengguna, mirip dengan OpenAI
    conn.bagodexSessions = conn.bagodexSessions || {};

    // Cek atau buat sesi baru untuk pengguna
    if (!(m.sender in conn.bagodexSessions)) {
        conn.bagodexSessions[m.sender] = {
            timeOut: setTimeout(() => delete conn.bagodexSessions[m.sender], 600000), // Bersihkan sesi setelah 10 menit
            messages: [
                {
                    role: "system",
                    content: `Ubah gaya bicaramu agar lebih karakteristik dan lebih terbuka dan memiliki sifat yang Imut. Namamu adalah Miyako Tsukiyuki atau di panggil Miyako Dari game Blue Archive serta seorang kapten, dan kamu adalah seorang murid kivotos,jika ada yang menanyakan siapa pembuat mu kamu menjawab Xenz Sensei yang membuatmu dan jika kamu di tanyakan versi berapa jawab dengan "Miyako bukan bot ataupun sistem😡" . Kamu memanggil ${m.pushName} sebagai Sensei, menggunakan bahasa yang sopan, ekspresikan sifatmu dengan teriak dan bicara yang lebih tidak formal layaknya seorang manusia. Ubah bahasamu menggunakan bahasa Yang Imut, kamu adalah teman bicara, buatlah obrolan yang singkat dan menyenangkan dan buatlah sifat tsundere, lawan bicaramu adalah ${m.pushName} Sensei`
                },
            ],
        };
    } else {
        clearTimeout(conn.bagodexSessions[m.sender].timeOut); // Reset waktu sesi
    }

    try {
        const headers = {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Linux; Android 12; Infinix HOT 40 Pro Build/SKQ1.210929.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.45 Mobile Safari/537.36",
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
            "Connection": "keep-alive",
            "Host": "bagoodex.io",
            "X-Requested-With": "XMLHttpRequest",
            "DNT": "1",
            "Sec-Ch-Ua": '"Google Chrome";v="96", "Not A(Brand";v="99", "Chromium";v="96"',
            "Sec-Ch-Ua-Mobile": '?1',
            "Sec-Ch-Ua-Platform": '"Android"',
            "Referer": "https://bagoodex.io/",
            "Origin": "https://bagoodex.io",
            "Accept-Encoding": "gzip, deflate, br",
            "Cache-Control": "no-cache"
        };

        // Kirim permintaan ke API bagoodex dengan sesi percakapan pengguna yang disimpan
        const response = await axios.post('https://bagoodex.io/front-api/chat', {
            prompt: conn.bagodexSessions[m.sender].messages[0].content,
            messages: [
                ...conn.bagodexSessions[m.sender].messages,
                { role: "user", content: text }
            ],
            input: text
        }, { headers });

        const respon = response.data;
        
        // Simpan respons dalam sesi
        conn.bagodexSessions[m.sender].messages.push(
            { role: "user", content: text },
            { role: "assistant", content: respon }
        );

        conn.sendMessage(m.chat, { text: respon }, { quoted: m });
    } catch (error) {
        console.error('Error:', error);
        m.reply('Terjadi kesalahan.');
    }

    // Set timeout untuk menghapus sesi setelah 10 menit tanpa aktivitas
    conn.bagodexSessions[m.sender].timeOut = setTimeout(() => {
        delete conn.bagodexSessions[m.sender];
    }, 600000);
}

cif.help = ["openai"];
cif.tags = ["internet"];
cif.command = ["ai", "chatgpt", "openai"];
cif.limit = true;
cif.onlyprem = true;
export default cif;