/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fs from 'fs'

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply('Kodenya mana?\nContoh: .reedem hbafd21\n\nHuruf Besar Kecil Harus Sama!!')
    if (fs.existsSync(`./database/userclaim/${m.sender}.json`)) return m.reply('Anda Telah Claim Kode Hari Ini Tunggu Besok hari')
    
    let user = db.data.users[m.sender]
    let teks = 'Selamat Anda Berhasil Claim Kode reedem\nAnda Mendapatkan:\n\n'
    let rand = pickRandom(['1','0','2','3','3','4','5','5','6','7','8','7','4','8','9','10','9']);
    
    // Read the redeem codes from the JSON file
    let data;
    try {
        data = JSON.parse(fs.readFileSync("./database/codereedem.json"));
    } catch (error) {
        return m.reply('Terjadi kesalahan saat membaca data redeem codes.');
    }

    // Ensure data is an array
    if (!Array.isArray(data)) {
        return m.reply('Data redeem codes tidak valid.');
    }

    let itemrand = ['money', 'exp', 'diamond', 'iron', 'potion', 'rock', 'wood'];

    if (data.includes(args[0])) {
        for (let i = 0; i < rand; i++) {
            let item = pickRandom(itemrand);
            let jumlah = pickRandom(['1','3','1','1','2','0','2','0']);
            teks += `Mendaptkan Item: ${item} Sebanyak: ${jumlah}\n`
            user[pickRandom(itemrand)] += jumlah * 1
        }
        m.reply(teks)
        let unp = data.indexOf(args[0])
        data.splice(unp, 1)
        fs.writeFileSync("./database/codereedem.json", JSON.stringify(data))
    } else {
        m.reply('Tidak Ada Kode Seperti itu\nHarap Huruf Kecil&Besar sama!!')
    }
}

handler.help = ['reedemkode']
handler.tags = ['rpg']
handler.command = /^(reedemkode|reedem)$/i

export default handler

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}