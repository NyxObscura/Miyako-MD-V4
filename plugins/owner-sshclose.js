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
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
try {
db.run('DELETE FROM VpsInfo');
return conn.reply(m.chat, 'Data VPS berhasil dihapus dari database.', m);
} catch (e) {
console.error(e);
return m.reply('Terjadi kesalahan dalam menjalankan permintaan Anda.')
}
}
handler.tags = ['owner']
handler.command = handler.help = ['sshclose']
handler.owner = true
export default handler;