/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*  
*/

import fs from 'fs';

const handler = async (m, { conn }) => {
    const mentionedJid = m.mentionedJid?.[0] ?? (m.fromMe ? conn.user.jid : m.sender);
    let fitur = Object.values(plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1);
    let totalf = Object.values(global.plugins).filter(
        (v) => v.help && v.tags
    ).length;

    let tek = `> Hi @${mentionedJid.split('@')[0]}
> I am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.

> ◎ *Library* : Baileys
> ◎ *TotalFitur* : ${fitur.length}
> ◎ *Version* : V1
> ◎ *Rest API* : https://api.xenzmyapi.my.id
> ◎ *Source* : https://github.com/XenzSenseiPedo/MiyakoTsukiyuki
> If you find an error or want to upgrade premium plan contact the owner.`;

    const thumbnailUrl = 'https://files.catbox.moe/u874oc.jpg';

    try {
        await conn.sendButtonFile(
            m.chat,
            thumbnailUrl,
            'menu_thumbnail.jpg',  // Filename for the image
            tek,  // Caption text for the message
            [
['listmenu', '.listmenu']
            ],
            m
        );
    } catch (error) {
        console.error('Error sending messages:', error);
        await conn.sendMessage(m.chat, { text: 'Maaf, terjadi kesalahan saat mengirim pesan.' }, { quoted: m });
    }
};

handler.command = ['menu', 'help'];
handler.help = ['menu'];
handler.tags = ['main'];

export default handler;