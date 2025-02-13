/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { wiki } from "vtuber-wiki"

const handler = async (m, { conn, text }) =>
{

if (!text) return m.reply(`Example .vtuber kobo kanaeru`)

async function getVTuber(vtuber) {
    try {
        const result = await wiki(vtuber);
        if (!result.image_url) return { error: "No such vTuber" };
        return result;
    } catch (err) {
        return { error: "No such vTuber" };
    }
}
let tuber = await getVTuber(text)
let pituber = `*[ VTUBER WIKI ]*

*\`Judul:\`* ${tuber.title} 
*\`Link:\`* ${tuber.url}
*\`Author:\`* ${tuber.author}
*\`Account:\`* ${tuber.account}
*\`Date:\`* ${tuber.date}
*\`Type:\`* ${tuber.type}
*\`Channel:\`* ${tuber.channel}
*\`Social Media:\`* ${tuber.social_media}
*\`Offcial Website:\`* ${tuber.official_website}
*\`Gender:\`* ${tuber.gender}
*\`Age:\`* ${tuber.age}
*\`Description:\` ${tuber.description}
*\`More:\`* ${tuber.more}
`

await conn.sendMessage(m.chat, {image: {url: tuber.image_url}, caption: pituber}, {quoted: m})
}
handler.command = ['vtuber', 'virtualyoutuber']
handler.help = ['vtuber']
handler.tags = ['anime']
handler.error = 0
handler.limit = true 
export default handler