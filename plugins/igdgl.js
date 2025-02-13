/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*Contoh:* ${usedPrefix + command} https://vt.tiktok.com/ZSjJDJr1r/`;

    conn.sendMessage(m.chat, {
        react: {
            text: '',
            key: m.key,
        }
    });

    try {
        let url = encodeURIComponent(text);

        switch (command) {
            case 'tt2':
            case 'ttdl2':
            case 'tiktok2':
                const tiktokRes = await fetch(`https://btch.us.kg/download/tikdl?url=${url}`);
                const tiktokData = await tiktokRes.json();
                if (!tiktokData?.status) throw 'Gagal mendownload video TikTok.';
                
                const { video, title, thumbnail } = tiktokData.result;
                await conn.sendFile(m.chat, video[0], 'tiktok.mp4', `🎬 ${title}`, m, { thumbnail });
                break;

            case 'ig':
            case 'igdl':
            case 'instagram':
                const igRes = await fetch(`https://btch.us.kg/download/igdl?url=${url}`);
                const igData = await igRes.json();
                if (!igData?.status) throw 'Gagal mendownload video Instagram.';

                const { url: igVideo, wm } = igData.result[0];
                await conn.sendFile(m.chat, igVideo, 'instagram.mp4', `Miyako-MD`, m);
                break;

            default:
                throw `Command tidak dikenal: ${command}`;
        }
    } catch (error) {
        console.error(error);
        conn.sendMessage(m.chat, `Terjadi kesalahan: ${error.message}`, m);
    }
};

handler.help = ['ttdl2', 'tiktok2', 'igdl', 'instagram'];
handler.tags = ['downloader'];
handler.command = /^(tt2|ttdl2|tiktok2|ig|igdl|instagram)$/i;
handler.premium = false;
handler.limit = true;

export default handler;