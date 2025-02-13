/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from 'node-fetch'; // Ensure you have node-fetch installed

// Regular expression to match Mediafire URLs
const mediafireRegex = /^https?:\/\/(www\.)?mediafire\.com\/(file|download)\/[a-zA-Z0-9]+\/?.*$/;

// Handler function for downloading Mediafire files
const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*• Example :* ${usedPrefix + command} *[url mediaFire]*`;
    if (!mediafireRegex.test(text))
        throw `*• Example :* ${usedPrefix + command} *[url mediaFire]*`;
    
    m.reply("Downloading...");
    
    try {
        const response = await fetch(`https://api.vreden.my.id/api/mediafiredl?url=${text}`);
        const data = await response.json();
        
        const cap = `┌─⭓「 *Mediafire Downloader* 」
│ *• Title :* ${data.result[0].nama}
│ *• Type :* ${data.result[0].mime}
│ *• Size :* ${data.result[0].size}
└───────────────⭓
*• Url :* ${data.result[0].link}`;

        const file = await conn.getFile(data.result[0].link, true);
        await conn.sendMessage(
            m.chat, {
                document: file.data,
                fileName: data.result[0].nama,
                mimetype: file.mime,
                caption: cap,
            }, {
                quoted: m,
            },
        );
    } catch (e) {
        throw e;
    }
};

// Define help, tags, and command properties
handler.help = ["mediafire", "mf"].map((a) => a + " *[url mediaFire]*");
handler.tags = ["downloader"];
handler.command = ["mediafire", "mf"];
handler.limit = true
handler.onlyprem = true

// Export the handler
export default handler;