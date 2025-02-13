/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { run } from 'shannz-playwright'

// Fungsi untuk mengambil screenshot menggunakan shannz-playwright
async function ssweb(url, type) {
    const code = `
        const { chromium, devices } = require('playwright');

        const devicesMap = {
            mobile: devices['iPhone 12'],
            tablet: devices['iPad'],
            desktop: null
        };

        async function ssweb(url, type) {
            const device = devicesMap[type];

            const browser = await chromium.launch();
            const context = device ? await browser.newContext({ ...device }) : await browser.newContext();
            const page = await context.newPage();

            await page.goto(url);
            const screenshot = await page.screenshot({ path: 'screenshot.png', fullPage: true });

            await browser.close();
            return screenshot;
        }

        ssweb(\`${url}\`, \`${type}\`).then(() => console.log('Screenshot selesai.'));
    `;

    const start = await run('javascript', code);
    const result = start.result.files[0];
    return {
        url: 'https://try.playwright.tech' + result.publicURL,
        fileName: result.fileName,
        extension: result.extension,
    };
}

// Handler untuk menangani perintah screenshot
let handler = async (m, { conn, usedPrefix, command, args }) => {
    if (!args[0])
        return m.reply(
            `Masukan Urls! \n\nContoh: \n${usedPrefix + command} https://google.com mobile`,
        );

    if (!args[0].startsWith("http"))
        return m.reply("Link hanya diawali http/https");

    const deviceType = args[1] || "desktop"; // Default ke desktop jika tidak disebutkan
    const validTypes = ["mobile", "tablet", "desktop"];

    if (!validTypes.includes(deviceType)) {
        return m.reply(
            `Pilih tipe perangkat:\n• mobile\n• tablet\n• desktop`
        );
    }

    // Kirim pesan loading (jika ada konfigurasi loading)
    global.db.data.settings[conn.user.jid]?.loading
        ? await m.reply(global.config.loading)
        : false;

    try {
        const screenshot = await ssweb(args[0], deviceType);
        conn.sendFile(
            m.chat,
            screenshot.url,
            screenshot.fileName,
            `Screenshot dari: ${args[0]} dengan tipe ${deviceType}`,
            m,
        );
    } catch (error) {
        m.reply(`Gagal mengambil screenshot: ${error.message}`);
    }
};

handler.help = ["ssweb"];
handler.tags = ["internet"];
handler.command = /^(screenshot(web(site)?)|ss(web(site)?))$/i;
handler.limit = true;
handler.error = 0;

export default handler;