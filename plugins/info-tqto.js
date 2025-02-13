/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*
😈😈 GAUSAH JUAL LAH KONTOL, YATIM LU YA GABISA BUAT ESCEH BISANYA JUAL KOPAS ORANG
Instagram: https://instagram.com/basrenggood
😈😈
*/

let handler = async function (m, { conn, text, usedPrefix }) {
  
let bokepyah = `
≡ _Saya sangat berterima kasih kepada kalian semua_

╭╾─⊷ _*THANKS TO*_
⋄ My self 
⋄ Allah Swt
⋄ Cifumoo
⋄ Rapikz
⋄ Pann
⋄ Penyedia Api
⋄ Adiwijshing (baileys)
⋄ Creator Bot..
╰╾──•••
`

    conn.sendFile(m.chat, thumb, 'menu.jpg', bokepyah, m)
}

handler.command = ["tqto"]
handler.help = ["tqto|credits|credit|creadit"]
handler.tags = ['info']

export default handler