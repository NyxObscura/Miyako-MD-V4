/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from 'axios';
import { sticker } from '../lib/sticker.js';

const handler = async (m, { conn, args, text }) => {
    const style = 1;

    const isSticker = true;
    const prompt = text.replace(/--\w+(\=\w+)?/g, '').trim();

    if (!prompt) {
        return m.reply(`⚠️ Masukkan teks untuk dibuat gambar!\n\nContoh penggunaan:\n*.furbrat Halo Dunia*\n\nOpsi:\n- *--id=<angka>*: Pilih style (1-7, default: 1).`);
    }

    const apiUrl = `https://fastrestapis.fasturl.link/tool/furbrat?text=${encodeURIComponent(prompt)}&style=${style}&mode=center`;

    try {
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);

        if (isSticker) {
            const stik = await sticker(false, buffer, global.config.stickpack, global.config.stickauth);
            await conn.sendFile(m.chat, stik, 'sticker.webp', '', m);
        } else {
            await conn.sendFile(m.chat, buffer, 'image.png', 'Berikut hasilnya.', m);
        }
    } catch (error) {
        console.error(error);
        m.reply('❌ Terjadi kesalahan saat membuat gambar.');
    }
};

handler.command = ['furbrat'];
handler.help = ['furbrat'];
handler.tags = ['sticker', 'tools'];
handler.limit = true;

export default handler;