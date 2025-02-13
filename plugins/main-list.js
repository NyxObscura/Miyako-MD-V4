/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@adiwajshing/baileys')).default;

const handler = async (m, { conn, command, text, usedPrefix }) => {
let name = m.pushName || conn.getName(m.sender);
let duar = `▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
> *Halo Kak, Silahkan Pilih List Yang Ingin Di pesan*
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰`
let botnyah = conn.user.jid.split`@`[0]
const url1 = "https://files.catbox.moe/jj64lk.jpg"
const url2 = "https://files.catbox.moe/r6csyt.jpg"
const url3 = "https://files.catbox.moe/6sv6r1.jpg"
async function image(url) {
const { imageMessage } = await generateWAMessageContent({
    image: {
      url
    }
  }, {
    upload: conn.waUploadToServer
  })
  return imageMessage
}


    let msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: {
                text: duar   },
              carouselMessage: {
                cards: [
                  {
                    header: {
                      imageMessage: await image(url1),
                      hasMediaAttachment: true,
                    },
                    body: { text: 
`┏───────────────┈ 
┆     「 *\`[SEWA BOT]\`* 」
┣───────────────┈ 
┣──=[ *\`[ Lite Plan ]\`* ]==─
┆ • Durasi: 2 Minggu
┆ • Harga Rp,5000
┆ • Antilink 
┆ • SetWelcome & SetBye
┆ • Bot Masuk 1 Group Kamu
┆ • Dan Lain-Lain
┣──=[ *\`[ Standart Plan ]\`* ]==─
┆ • Durasi: 1 Bulan
┆ • Harga Rp,10.000
┆ • Antilink 
┆ • SetWelcome & SetBye
┆ • Bot Masuk 2 Group Kamu
┆ • Dan Lain-Lain
┣──=[ *\`[ Medium Plan ]\`* ]==─
┆ • Durasi: 4 Bulan
┆ • Harga Rp,20.000
┆ • Antilink 
┆ • SetWelcome & SetBye
┆ • Bot Masuk 4 Group Kamu
┆ • Dan Lain-Lain
┣──=[ *\`[ Hard Plan ]\`* ]==─
┆ • Durasi: 1 Tahun
┆ • Harga Rp,50.000
┆ • Antilink 
┆ • SetWelcome & SetBye
┆ • Bot Bebas Masuk Group
┆ • Dan Lain-Lain
┣──=[ *\`[ Extreme Plan ]\`* ]==─
┆ • Durasi: Selamanya
┆ • Harga Rp,100.000
┆ • Antilink 
┆ • SetWelcome & SetBye
┆ • Bot Bebas Masuk Group
┆ • Dan Lain-Lain
└────────────┈ ⳹` },
                    nativeFlowMessage: {
                      buttons: [
                  {
                    "name": "cta_url",
            "buttonParamsJson": `{"display_text":"CHAT OWNER","url":"https://wa.me/${global.nomorown}","merchant_url":"https://wa.me/${global.nomorown}"}`
                  },
                      ],
                    },
                  },
                  
                  {
                    header: {
                      imageMessage: await image(url2),
                      hasMediaAttachment: true,
                    },
                                        body: { text: 
`┏───────────────┈ 
┆     「 *\`[PREMIUM BOT]\`* 」
┣───────────────┈ 
┣──=[ *\`[ Lite Plan ]\`* ]==─
┆ • Durasi: 2 Minggu
┆ • Harga Rp,10.000
┆ • Nsfw Fitur 
┆ • Private Chat
┆ • No Limit
┆ • Akses 30 Lebih Fitur Premium
┆ • Dan Lain-Lain
┣──=[ *\`[ Standart Plan ]\`* ]==─
┆ • Durasi: 1 Bulan
┆ • Harga Rp,20.000
┆ • Nsfw Fitur 
┆ • Private Chat
┆ • No Limit
┆ • Akses 30 Lebih Fitur Premium
┆ • Dan Lain-Lain
┣──=[ *\`[ Medium Plan ]\`* ]==─
┆ • Durasi: 4 Bulan
┆ • Harga Rp,50.000
┆ • Nsfw Fitur 
┆ • Private Chat
┆ • No Limit
┆ • Akses 30 Lebih Fitur Premium
┆ • Dan Lain-Lain
┣──=[ *\`[ Hard Plan ]\`* ]==─
┆ • Durasi: 1 Tahun
┆ • Harga Rp,100.000
┆ • Nsfw Fitur 
┆ • Private Chat
┆ • No Limit
┆ • Akses 30 Lebih Fitur Premium
┆ • Dan Lain-Lain
┣──=[ *\`[ Extreme Plan ]\`* ]==─
┆ • Durasi: Selamanya
┆ • Harga Rp,120.000
┆ • Nsfw Fitur 
┆ • Private Chat
┆ • No Limit
┆ • Akses 30 Lebih Fitur Premium
┆ • Dan Lain-Lain
└────────────┈ ⳹` },
                    nativeFlowMessage: {
                      buttons: [
                  {
"name": "cta_url",
            "buttonParamsJson": `{"display_text":"CHAT OWNER","url":"https://wa.me/${global.nomorown}","merchant_url":"https://wa.me/${global.nomorown}"}`
                  },
                      ],
                    },
                  },
                  
                  {
                    header: {
                      imageMessage: await image(url3),
                      hasMediaAttachment: true,
                    },
                                        body: { text: 
`┏───────────────┈ 
┆     「 *\`[SEWA & PREMIUM]\`* 」
┣───────────────┈ 
┣──=[ *\`[ Lite Plan ]\`* ]==─
┆ • Durasi: 2 Minggu
┆ • Harga Rp,15,000
┆ • Nsfw Fitur 
┆ • Private Chat
┆ • No Limit
┆ • Akses 30 Lebih Fitur Premium
┆ • Antilink 
┆ • SetWelcome & SetBye
┆ • Bot Masuk 1 Group Kamu
┆ • Dan Lain-Lain
┣──=[ *\`[ Standart Plan ]\`* ]==─
┆ • Durasi: 1 Bulan
┆ • Harga Rp,20.000
┆ • Nsfw Fitur 
┆ • Private Chat
┆ • No Limit
┆ • Akses 30 Lebih Fitur Premium
┆ • Antilink 
┆ • SetWelcome & SetBye
┆ • Bot Masuk 2 Group Kamu
┆ • Dan Lain-Lain
┣──=[ *\`[ Medium Plan ]\`* ]==─
┆ • Durasi: 4 Bulan
┆ • Harga Rp,50.000
┆ • Nsfw Fitur 
┆ • Private Chat
┆ • No Limit
┆ • Akses 30 Lebih Fitur Premium
┆ • Antilink 
┆ • SetWelcome & SetBye
┆ • Bot Masuk 4 Group Kamu
┆ • Dan Lain-Lain
┣──=[ *\`[ Hard Plan ]\`* ]==─
┆ • Durasi: 1 Tahun
┆ • Harga Rp,120.000
┆ • Nsfw Fitur 
┆ • Private Chat
┆ • No Limit
┆ • Akses 30 Lebih Fitur Premium
┆ • Antilink 
┆ • SetWelcome & SetBye
┆ • Bot Bebas Masuk Group Kamu
┆ • Dan Lain-Lain
┣──=[ *\`[ Extreme Plan ]\`* ]==─
┆ • Durasi: Selamanya
┆ • Harga Rp,200.000
┆ • Nsfw Fitur 
┆ • Private Chat
┆ • No Limit
┆ • Akses 30 Lebih Fitur Premium
┆ • Antilink 
┆ • SetWelcome & SetBye
┆ • Bot Bebas Masuk Group Kamu
┆ • Dan Lain-Lain
└────────────┈ ⳹` },
                    nativeFlowMessage: {
                      buttons: [
                  {
"name": "cta_url",
            "buttonParamsJson": `{"display_text":"CHAT OWNER","url":"https://wa.me/${global.nomorown}","merchant_url":"https://wa.me/${global.nomorown}"}`
                  },
                      ],
                    },
                  },

                ],
                messageVersion: 1,
              },
            },
          },
        },
      },
      {}
    )

    await conn.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id,
    });
    }

handler.help = ["Sewa", "Premium"];
handler.tags = ["main"];
handler.command = /^(sewa|premium|sewabot|botsewa|premiumbot|botpremium)$/i;
export default handler