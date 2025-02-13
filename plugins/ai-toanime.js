/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from 'node-fetch';
import FormData from 'form-data';
import {
    fileTypeFromBuffer
} from 'file-type';

let handler = async (m, { conn, usedPrefix, command, text }) => {

let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'Kirim/Reply Gambar Dengan Caption .toanime'

await m.reply('WAIT SENSEI')
let media = await q.download()
let url = await tourl(media)
let hasil = await (await fetch(`https://skizoasia.xyz/api/toanime?apikey=zenOfficial&url=${url}`)).buffer()
await conn.sendFile(m.chat, hasil, '', '', m)
}
handler.help = ['toanime', 'jadianime']
handler.tags = ['premium', 'ai']
handler.command = /^(jadianime|toanime)$/i
handler.premium = true

export default handler

async function tourl(buffer) {
    let {
        ext
    } = await fileTypeFromBuffer(buffer);
    let bodyForm = new FormData();
    bodyForm.append("fileToUpload", buffer, "file." + ext);
    bodyForm.append("reqtype", "fileupload");

    let res = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: bodyForm,
    });

    let data = await res.text();
    return data;
}