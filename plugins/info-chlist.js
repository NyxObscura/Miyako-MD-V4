/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import moment from "moment-timezone"; // Mengganti require dengan import

let handler = async (m, { conn, command }) => {

    //User Case
    switch (command) {
        case "chlist": {
            let id = Object.keys(db.data.chats).filter(a => a.endsWith("@newsletter"))
            let ar = []
            for (let i of id) {
                let meta = await conn.newsletterMetadata("jid", i)
                ar.push({
                    subject: meta.name,
                    id: meta.id,
                    role: meta.viewer_metadata.role,
                    followers: meta.subscribers.toLocaleString(),
                    create: moment(meta.creation_time * 1000).format("DD/MM/YYYY HH:mm:ss"), // Menggunakan moment dari import
                    picture: meta.picture ? "https://pps.whatsapp.net" + meta.picture : "N/A",
                    url: "https://whatsapp.com/channel/" + meta.invite
                })
            }
            let cap = `*– 乂 N E W S L E T T E R -  L I S T*

${ar.map(a => Object.entries(a).map(([a, b]) => `   ◦ ${a} : ${b}`).join("\n")).join("\n\n")}


> Total Newsletter Chat : ${ar.length}`

            m.reply(cap)
        }
        break;
    }
}

handler.help = handler.command = ["chlist"];
handler.tags = ["info"]

export default handler