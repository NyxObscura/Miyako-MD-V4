/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import axios from 'axios';
import cheerio from 'cheerio';


/*🍄 *Scraper Pastebin*

🔗 *Informasi Scraper*
- Website: https://pastebin.com/
- Mendapatkan Content Text, Download Link, Raw Link, Informasi Uploader, Informasi View, Informasi Date

*💖 Scraper Dibuat Oleh Zaenishi*
*/

async function pasteBin(url) {
    if (!url || typeof url !== 'string' || !url.startsWith('https://pastebin.com/')) {
        return 'URL tidak valid. Mohon berikan URL Pastebin yang valid.';
    }

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const pasteTitle = $('div.info-top h1').text().trim() || 'Judul tidak ditemukan';
        const rawLink = $('a[href^="/raw"]').attr('href');
        const downloadLink = $('a[href^="/dl"]').attr('href');

        const codeContent = [];
        $('.source.text ol li').each((i, el) => {
            codeContent.push($(el).text().trim());
        });

        const username = $('div.username a').text().trim() || 'Username tidak ditemukan';
        const datePosted = $('div.date span').text().trim() || 'Tanggal tidak ditemukan';
        const pasteViews = $('div.visits').text().trim() || 'Jumlah tampilan tidak ditemukan';

        return {
            creator: { nama: 'Zaenishi', website: 'https://zaenishi.xyz' },
            title: pasteTitle,
            rawLink: rawLink ? `https://pastebin.com${rawLink}` : 'Link raw tidak ditemukan',
            downloadLink: downloadLink ? `https://pastebin.com${downloadLink}` : 'Link unduh tidak ditemukan',
            content: codeContent.length ? codeContent.join('\n') : 'Konten kode tidak ditemukan',
            datePosted,
            username,
            viewCount: pasteViews
        };
    } catch (error) {
        return 'Terjadi kesalahan saat scraping: ' + error.message;
    }
}

const handler = async (m, { text, conn, args }) => {
    const url = args[0];
    const result = await pasteBin(url);

    if (typeof result === 'string') {
        return conn.reply(m.chat, result, m);
    }

    const contentBuffer = Buffer.from(result.content, 'utf-8');
    const message = ` 📋 *Judul*: ${result.title}\n📅 *Tanggal Posting*: ${result.datePosted}\n👤 *Uploader*: ${result.username}\n👁️ *Jumlah Tampilan*: ${result.viewCount}\n\n🔗 *Link Raw*: ${result.rawLink}\n🔗 *Link Unduh*: ${result.downloadLink}`;

    await conn.sendFile(m.chat, contentBuffer, 'pastebin.txt', message, m);
};

handler.command = ['pastebin'];
handler.help = ['pastebin <url>'];
handler.tags = ['scraper'];
handler.limit = true;

export default handler;