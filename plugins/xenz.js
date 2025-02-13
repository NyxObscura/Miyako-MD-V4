/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

/* 
*/

import fetch from 'node-fetch';

async function GeminiImage(image, query) {
    const response = await fetch(`https://ai.xterm.codes/api/img2txt/gemini-image?key=Bell409`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, query })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    return data.response;
}

async function RegularAPI(query) {
    const response = await fetch(`https://btch.us.kg/prompt/gpt?prompt=Kamu%20hoshino%20manusia%20dari%20blue%20archive%20bukan%20asisten%20atau%20pun%20ai&text=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
        throw new Error('Gagal mendapatkan respons dari API');
    }

    const data = await response.json();
    return data.result;
}

async function Text2ImageAPI(prompt, negativePrompt) {
    const response = await fetch(`https://aihub.xtermai.xyz/api/text2img/dalle3?prompt=${encodeURIComponent(prompt)}&negativePrompt=${encodeURIComponent(negativePrompt)}&key=Bell409`);
    
    if (!response.ok) {
        throw new Error('Gagal mendapatkan respons dari API text2image');
    }

    const data = await response.json();
    return data.result;
}

async function MetaImageAPI(prompt) {
    const response = await fetch(`https://anabot.my.id/api/ai/meta-ai?prompt=${encodeURIComponent(prompt)}&apikey=ReiiNt`);
    
    if (!response.ok) {
        throw new Error('Gagal mendapatkan respons dari API Meta');
    }

    const data = await response.json();
    return data.result;
}

let handler = async (m, { conn, command, text }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!text) {
        return m.reply('Mau nanya apa??\nContoh: .meta siapa presiden Indonesia?');
    }

    try {
        if (/^(buat|buatkan)\s+(logo|foto|image)\s*(.*)$/i.test(text)) {
            const match = text.match(/^(buat|buatkan)\s+(logo|foto|image)\s*(.*)$/i);
            const userPrompt = match[3] ? match[3] : "default prompt";

            const metaResponse = await MetaImageAPI(userPrompt);
            const { chat, image } = metaResponse;

            await conn.sendReact(m.chat, '', m.key);

            if (Array.isArray(image) && image.length > 0) {
                for (let img of image) {
                    await conn.sendFile(m.chat, img, '', '', m);
                    await conn.delay(500);
                }
            } else {
                await m.reply(chat);
            }
        } else if (mime && mime.startsWith('image/')) {
            let media = await q.download();
            await m.reply("Please wait...");
            let res = await GeminiImage(media, text);
            conn.reply(m.chat, `${res}`.trim(), m);
        } else {
            let res = await RegularAPI(text);
            conn.reply(m.chat, `${res}`.trim(), m);
        }
    } catch (error) {
        console.error('Error:', error);
        await m.reply('Terjadi kesalahan saat menghubungi API. Silakan coba lagi nanti.');
    }
}

handler.help = ['xenz'];
handler.tags = ['ai'];
handler.command = ['xenz'];
handler.limit = true;

export default handler;