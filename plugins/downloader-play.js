/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
    if (!text) {
        // Usage message if no text input is provided
        const usageMessage = `⚠️ *Penggunaan perintah yang benar:* ⚠️\n\n` +
                             `• *${command} <judul video>*\n` +
                             `Misalnya:\n` +
                             `• *play Stereo love*`;

        await conn.sendMessage(m.chat, { text: usageMessage }, { quoted: m });
        return;
    }

    // Notify user that processing has started
    await conn.sendMessage(m.chat, { text: '⌛ Sedang diproses... Mohon jangan spam, tunggu proses selesai.' }, { quoted: m });

    try {
        // Step 1: Search for the video on YouTube (YTS)
        const searchResults = await yts(text);
        if (!searchResults || searchResults.videos.length < 1) throw new Error('Video tidak ditemukan!');

        // Extract video details
        const video = searchResults.videos[0];
        const { url: videoUrl, title, thumbnail, timestamp: duration, views, likes } = video;
        
        // Convert likes and views to strings for display
        const formattedViews = views.toLocaleString();
        const formattedLikes = likes ? likes.toLocaleString() : 'N/A';

        // Step 2: Convert video to MP3 using agatz.xyz API
        const mp3Response = await fetch(`https://api.agatz.xyz/api/ytmp3?url=${encodeURIComponent(videoUrl)}`);
        const mp3Data = await mp3Response.json();
        
        // Check for successful conversion
        if (mp3Data.status !== 200 || !mp3Data.data) throw new Error('Gagal mengonversi video ke MP3!');
        
        const audioUrl = mp3Data.data; // Direct MP3 download link

        // Step 3: Send a message with video details, including the thumbnail
        const message = {
            text: `🎵 *Judul*: ${title}\n` +
                  `⏱️ *Durasi*: ${duration}\n` +
                  `👁️ *Views*: ${formattedViews}\n` +
                  `👍 *Likes*: ${formattedLikes}\n\n` +
                  `🔗 *Link YouTube*: ${videoUrl}`,
            image: { url: thumbnail },
            footer: 'Audio akan segera dikirim di bawah.',
        };
        await conn.sendMessage(m.chat, message, { quoted: m });

        // Step 4: Send the audio file directly to the user
        await conn.sendFile(m.chat, audioUrl, `${title}.mp3`, '', m, {
            mimetype: 'audio/mp3',
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(m.chat, { text: '❗ Terjadi kesalahan saat memproses perintah play!' }, { quoted: m });
    }
};

handler.help = ['play2 <judul>'];
handler.tags = ['downloader'];
handler.command = /^(play2)$/i;

export default handler;