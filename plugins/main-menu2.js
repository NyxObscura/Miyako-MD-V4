/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from 'node-fetch';

const loadingStickerUrl = 'https://files.catbox.moe/l0d4s0.webp';
const thumbnailUrl = 'https://files.catbox.moe/u874oc.jpg';

const getMenuText = (mentionedJid) => {
    return `> Hi @${mentionedJid.split('@')[0]}
> I am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.

> ◎ *Library* : Baileys
> ◎ *Version* : V1
> If you find an error or want to upgrade premium plan contact the owner.
> ›1. .aimenu
> ›2. .animemenu
> ›3. .downloadmenu
> ›4. .funmenu
> ›5. .gamemenu
> ›6. .groupmenu
> ›7. .infomenu
> ›8. .internetmenu
> ›9. .islamicmenu
> ›10. .mainmenu
> ›11. .makermenu
> ›12. .ownermenu
> ›13. .menuprem
> ›14. .quotesmenu
> ›15. .stikermenu
> ›16. .rpgmenu
> ›17. .toolsmenu`;
};

let handler = async (m, { conn }) => {
    let mentionedJid = [m.sender];
    let menuText = getMenuText(m.sender);
    const videoBuffer = await (await fetch('https://files.catbox.moe/yhzg1p.mp4')).buffer();

    await conn.sendMessage(m.chat, {
        video: videoBuffer,
        mimetype: 'video/mp4',
        fileLength: videoBuffer.length,
        caption: menuText,
        gifPlayback: true,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                forwardingScore: 2023,
                title: 'menu bot beta',
                thumbnailUrl: thumbnailUrl,
                sourceUrl: 'https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i',
                mediaType: 1,
                renderLargerThumbnail: true,
                mentionedJid: mentionedJid
            }
        }
    }, { quoted: m, ephemeralExpiration: 86400 });
};

handler.help = ['botstatus'];
handler.tags = ['info'];
handler.command = /^(menu2)?$/i;

export default handler;

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}