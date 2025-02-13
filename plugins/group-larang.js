/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, text, command }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;

    let bl = db.data.chats[m.chat].blacklist || [];
    let peserta = await conn.groupMetadata(m.chat);

    switch (command) {
        case 'larang':
            if (!who) return conn.reply(m.chat, 'Tag/reply orangnya untuk Larangan', m);

            try {
                if (Object.values(bl).find(v => v.id == who)) throw `Nomor ${who.split(`@`)[0]} sudah ada di *Larangan*`;

                bl.unshift({ id: who });
                db.data.chats[m.chat].blacklist = bl;
                await conn.reply(m.chat, `Sukses menambahkan @${who.split(`@`)[0]} ke *Larangan*`, m, { contextInfo: { mentionedJid: [who] }});
            } catch (e) {
                throw e;
            }
            break;
        case 'unlarang':
            if (!who) throw 'Tag/reply orangnya untuk Larangan';

            try {
                if (!Object.values(bl).find(v => v.id == who)) throw `Nomor ${who.split(`@`)[0]} tidak ada di *Larangan*`;

                bl.splice(bl.findIndex(v => v.id == who), 1);
                db.data.chats[m.chat].blacklist = bl;
                await conn.reply(m.chat, `Sukses menghapus Nomor: @${who.split(`@`)[0]} dari *Larangan*`, m, { contextInfo: { mentionedJid: [who] }});
            } catch (e) {
                throw e;
            }
            break;
        case 'listlarang':
        case 'listl':
            let txt = `*「 Daftar Nomor Larangan 」*\n\n*Total:* ${bl.length}\n\n┌─[ *Larangan* ]\n`;

            for (let i of bl) {
                txt += `├ @${i.id.split("@")[0]}\n`;
            }
            txt += "└─•";

            return conn.reply(m.chat, txt, m, { contextInfo: { mentionedJid: bl.map(v => v.id) } }, {mentions: bl.map(v => v.id)});
            break;
    }
};

handler.help = ['unlarang', 'larang', 'listlarang'];
handler.tags = ['group'];
handler.command = ['unlarang', 'larang', 'listlarang'];
handler.admin = handler.group = true;

handler.before = function(m, { conn, isAdmin }) {
    if (!m.isGroup) return;
    if (m.fromMe) return;

    let bl = db.data.chats[m.chat].blacklist || [];

    if (Object.values(bl).find(users => users.id == m.sender) && !isAdmin) {
        // Menghapus pengguna dari grup jika ada di dalam daftar hitam
        conn.sendMessage(m.chat, { delete: { ...m.key }});
    }
}

export default handler;

/*
<> *BLACKLIST*<>
Source: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
  "aku janji jika hapus watermark ini maka aku rela miskin hingga 7 turunan"
*/