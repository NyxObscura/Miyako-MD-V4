/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import { Client } from 'ssh2';
import sqlite3 from 'sqlite3';

let db = new sqlite3.Database('VpsInfo.db');

let handler = async (m, { conn, text, args }) => {
if (args.length < 3) {
return conn.reply(m.chat, '• *Example :* .ssh ip username password', m);
}
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
try {
const ip = args[0];
const username = args[1];
const password = args[2];

db.run('INSERT INTO VpsInfo (ip, username, password) VALUES (?, ?, ?)', [ip, username, password]);

const conn = new Client();

conn.on('ready', () => {
console.log('Client :: ready');
conn.shell((err, stream) => {
if (err) throw err;

stream.on('close', () => {
console.log('Stream :: close');
conn.end();
}).on('data', (data) => {
m.reply(data.toString('utf8'))
});

process.stdin.setRawMode(true);
process.stdin.pipe(stream);

process.stdin.on('data', (key) => {
if (key === '\u0003') {
stream.write('\x03');
conn.end();
process.exit();
} else {
stream.write(key);
}
});
});
}).connect({
host: ip,
port: 22,
username: username,
password: password
});

return m.reply(`Sedang terhubung ke ${ip}...`)
} catch (e) {
console.error(e);
return m.reply('Terjadi kesalahan dalam menjalankan permintaan Anda.')
}
}
handler.tags = ['owner']
handler.command = handler.help = ['sshopen']
handler.owner = true
export default handler;