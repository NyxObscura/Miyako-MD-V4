/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import { unpackToFiles } from 'xnb';

const handler = async (m, { conn }) => {
    let q = m.quoted || m;
    if (!q) return m.reply('reply file xnb nya');
    await m.reply(wait);
    const buper = await q.download();
    const unpek = await unpackToFiles(buper, { fileName: "anu.xnb", contentOnly: true });
    const bup = await blobToArrayBuffer(unpek);
    await conn.sendFile(m.chat, Buffer.from(bup), 'anu.png', '*[ Converter xnb To png ]*', m);
};

handler.command = ["xnb2png"];
handler.help = ["xnb2png"];
handler.tags = ["tools"];
handler.limit = true; handler.error = 0

export default handler;

async function blobToArrayBuffer(blob) {
    const response = new Response(blob);
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
}