/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*
*/
import axios from 'axios'

let handler = async (m, { 
conn, text, command, usedPrefix
}) => {
if (!text) return m.reply(`Gunakan format ${usedPrefix + command} <url>\n\n*Contoh :* ${usedPrefix + command} https://github.com/ShirokamiRyzen`)
m.reply("_Loading. . ._")
var phone = await ssweb(text, 'phone')
var desktop = await ssweb(text, 'desktop')
var tablet = await ssweb(text, 'tablet')
var res = text
if (command === 'sshp') {
await conn.sendFile(m.chat, phone.result, '',res, m, false)
}
if (command === 'ssweb' || command === 'sstablet') {
await conn.sendFile(m.chat, tablet.result, '',res, m, false)
}
if (command === 'sspc') {
await conn.sendFile(m.chat, desktop.result, '',res, m, false)
}
}
handler.help = ['ssweb2']
handler.tags = ['internet']
handler.command = /^(ssweb2|sstablet2|sspc2|sshp2)$/i

handler.limit = true

export default handler

async function ssweb(url, device = 'desktop') {
    return new Promise((resolve, reject) => {
        const base = 'https://www.screenshotmachine.com';
        const param = {
            url: url,
            device: device,
            cacheLimit: 0
        };

        axios({
            url: base + '/capture.php',
            method: 'POST',
            data: new URLSearchParams(Object.entries(param)),
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        .then((response) => {
            const cookies = response.headers['set-cookie'];
            if (response.data.status === 'success') {
                axios.get(base + '/' + response.data.link, {
                    headers: {
                        'cookie': cookies.join('')
                    },
                    responseType: 'arraybuffer'
                })
                .then(({ data }) => {
                    let result = {
                        status: 200,
                        author: 'Ryzn',
                        result: data
                    };
                    resolve(result);
                })
                .catch(err => {
                    console.error('Kesalahan saat mengambil tangkapan layar:', err);
                    reject({ status: 500, message: 'Kesalahan saat mengambil tangkapan layar', error: err });
                });
            } else {
                console.error('Kesalahan dari API Screenshot Machine:', response.data);
                reject({ status: 404, author: 'Ryzn', message: response.data });
            }
        })
        .catch(err => {
            console.error('Kesalahan dengan permintaan API Screenshot Machine:', err);
            reject({ status: 500, message: 'Kesalahan dengan permintaan API', error: err });
        });
    });
}