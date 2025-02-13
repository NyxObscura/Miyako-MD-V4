/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

let xenzsigma = async (m, { conn, participants }) => {
    let user = participants.map(x => x.id);
    let gc = await conn.groupMetadata(m.chat);
 global.info.nomorown
    let ownerNumber = global.info.nomorown + '@s.whatsapp.net';

    await conn.sendMessage(m.chat, { 
        sticker: { url: "https://files.catbox.moe/s1qlwo.webp" } 
    });

    for (let a of user) {
        if (a !== conn.user.jid && a !== gc.owner && a !== ownerNumber) {
            await conn.groupParticipantsUpdate(m.chat, [a], "remove");
        }
    }
};

xenzsigma.command = ['kudeta'];
xenzsigma.tags = ['group'];
xenzsigma.help = ['kudeta'];
xenzsigma.owner = true;

export default xenzsigma;