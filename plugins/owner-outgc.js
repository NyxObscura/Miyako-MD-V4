/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, args, command, usedPrefix, text, participants }) => {
var groups = Object.keys(conn.chats)
.filter(key => key.endsWith('@g.us'))
.map(key => conn.chats[key]);

if (args.length === 0) {
var list = groups.map((group, index) => `*${index + 1}.* ${group.subject}`).join('\n');
var teks = '`L i s t - G r o u p`\n\n'
conn.reply(m.chat, `${teks}`+`${list}`, m);
} else if (args.length === 1 && /^\d+$/.test(args[0])) {
var index = parseInt(args[0]) - 1;
if (index >= 0 && index < groups.length) {
var group = groups[index];
var capt = `[ W a r n i n g ]\n\nSistem sedang melakukan pembersihan group...`
let kemii = await conn.sendMessage(group.id, { text: capt, mentions: participants.map(a => a.id) }, {quoted:fkontak})
await conn.groupLeave(group.id)
await conn.reply(m.chat, `[ Succes ]\nSukses keluar dari Group Tersebut`, m)
} else {
conn.reply(m.chat, 'Grup dengan urutan tersebut tidak ditemukan.', m);
}
} else {
conn.reply(m.chat, `🚩 *Example :* ${usedPrefix}outgc number`, m);
}
}
handler.help = ['outgc']
handler.tags = ['owner']
handler.command = /^(outgc)$/i

handler.owner = true

export default handler;