/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fs from 'fs'
import JavaScriptObfuscator from 'javascript-obfuscator'

let handler = async (m, {
    text,
    usedPrefix,
    command
}) => {


    let tex = m.quoted ? m.quoted.text : text
    if (!tex) throw 'reply atau kirim teksnya'

    let meg = await obfus(tex)
    let nem = './tmp/result.js'
    let enc = meg.author + meg.result
    await fs.writeFileSync(nem, enc)
    let t4 = await fs.readFileSync('./tmp/result.js')
    m.reply(enc)
    conn.sendMessage(m.chat, {
        document: t4,
        mimetype: 'document/application',
        fileName: 'result_enc.js',
        fileLength: 2023
    }, {
        quoted: m
    })
}
handler.help = ['enc']
handler.tags = ['owner']
handler.command = /^(enc)$/i
handler.premium = true
handler.limit = true


export default handler

async function obfus(query) {
    return new Promise((resolve, reject) => {
        try {
            const obfuscationResult = JavaScriptObfuscator.obfuscate(query, {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1,
                numbersToExpressions: true,
                simplify: true,
                stringArrayShuffle: true,
                splitStrings: true,
                stringArrayThreshold: 1
            });
            const result = {
                status: 200,
                author: `//Encrypt By Xenz\n//Miyako-MD\n\n`,
                result: obfuscationResult.getObfuscatedCode()
            }
            resolve(result)
        } catch (e) {
            reject(e)
        }
    })
}