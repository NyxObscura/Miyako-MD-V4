/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*  
*/

import fetch from 'node-fetch';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        throw `*Contoh:* ${usedPrefix}${command} https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link`;
    }

    if (!args[0].match(/instagram/gi)) {
        throw `URL Instagram Tidak Valid!`;
    }

    await m.reply('⏳ Memproses permintaan Anda...');
    
    try {
        const apiResponse = await fetch(
            `https://api.botcahx.eu.org/api/dowloader/igdowloader?url=${args[0]}&apikey=xenzpedo`
        );
        const res = await apiResponse.json();

        const limitnya = 3;
        for (let i = 0; i < Math.min(limitnya, res.result.length); i++) {
            await sleep(1000);
            await conn.sendFile(m.chat, res.result[i].url, null, `*Instagram Downloader*`, m);
        }
    } catch (e) {
        throw 'Terjadi kesalahan saat memproses permintaan.';
    }
};

// Metadata handler untuk bot
handler.help = ['instagram'].map((v) => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(ig|instagram|igdl|instagramdl|igstory)$/i;
handler.onlyprem = true
handler.limit = true;

export default handler;