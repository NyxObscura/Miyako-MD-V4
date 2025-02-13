/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { createCanvas } from 'canvas'
import fetch from 'node-fetch'
const {
    proto,
    generateWAMessageFromContent,
    prepareWAMessageMedia
} = (await import('@adiwajshing/baileys')).default

let previousResult = null

var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text || !text.includes('|')) {
        return m.reply(`Silakan masukkan beberapa opsi dipisahkan oleh "|" (contoh: ${usedPrefix}${command} ayam|nasi|pisang|apel)`)
    }

    const items = text.split('|').map(item => item.trim())

    if (items.length < 2) {
        return m.reply('Masukkan setidaknya dua pilihan untuk diputar!')
    }

    let randomIndex, selectedItem
    do {
        randomIndex = Math.floor(Math.random() * items.length)
        selectedItem = items[randomIndex]
    } while (selectedItem === previousResult)

    previousResult = selectedItem

    const canvas = createCanvas(400, 400)
    const ctx = canvas.getContext('2d')

    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const outerRadius = 150
    const innerRadius = 30
    const angleStep = (2 * Math.PI) / items.length

    items.forEach((item, index) => {
        const startAngle = index * angleStep
        const endAngle = startAngle + angleStep

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle)
        ctx.fillStyle = colors[index % colors.length]
        ctx.fill()
        ctx.stroke()

        const textAngle = startAngle + angleStep / 2
        const textX = centerX + outerRadius / 1.5 * Math.cos(textAngle)
        const textY = centerY + outerRadius / 1.5 * Math.sin(textAngle)
        ctx.fillStyle = 'black'
        ctx.font = '20px Arial'
        ctx.fillText(item, textX - ctx.measureText(item).width / 2, textY)
    })

    ctx.beginPath()
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI)
    ctx.fillStyle = 'white'
    ctx.fill()

    const arrowLength = 50
    const arrowWidth = 10
    const selectedAngle = randomIndex * angleStep + angleStep / 2

    const arrowTipX = centerX + (outerRadius + 10) * Math.cos(selectedAngle)
    const arrowTipY = centerY + (outerRadius + 10) * Math.sin(selectedAngle)
    const arrowBase1X = centerX + (outerRadius + 10 + arrowWidth) * Math.cos(selectedAngle - Math.PI / 12)
    const arrowBase1Y = centerY + (outerRadius + 10 + arrowWidth) * Math.sin(selectedAngle - Math.PI / 12)
    const arrowBase2X = centerX + (outerRadius + 10 + arrowWidth) * Math.cos(selectedAngle + Math.PI / 12)
    const arrowBase2Y = centerY + (outerRadius + 10 + arrowWidth) * Math.sin(selectedAngle + Math.PI / 12)

    ctx.beginPath()
    ctx.moveTo(arrowTipX, arrowTipY)
    ctx.lineTo(arrowBase1X, arrowBase1Y)
    ctx.lineTo(arrowBase2X, arrowBase2Y)
    ctx.closePath()
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.fillStyle = 'black'
    ctx.font = '15px Arial'
    ctx.fillText(`@${wm}`, 10, canvas.height - 10)

    const buffer = canvas.toBuffer()

    let msgs = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `_Nih Kak Hasil Putaran: *${selectedItem}*_`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: 'Spin Lagi untuk mencoba lagi'
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false,
                        ...await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer })
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                            "name": "quick_reply",
                            "buttonParamsJson": `{\"display_text\":\"Spin Lagi\",\"id\":\".putar ${text}\"}`
                        }],
                    })
                })
            }
        }
    }, { quoted: m })

    return await conn.relayMessage(m.chat, msgs.message, {})
}

handler.help = ['putar']
handler.tags = ['fun']
handler.command = /^(putar)$/i

export default handler