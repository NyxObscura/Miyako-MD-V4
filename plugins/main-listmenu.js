/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'

const defaultMenu = {
  before: `
*❏ I N F O  U S E R*
▧ Name : %name
▧ Tag : %tag
▧ Status : %status
▧ Limit : %limit
▧ Role : %role
▧ Level : %level [ %xp4levelup Xp For LevelUp]
▧ Xp : %exp / %maxexp
▧ Total Exp : %totalexp

*❏ T O D A Y*
▧ Time : %wib WIB
▧ Days : %week %weton
▧ Date : %date
▧ Islamic Date %dateIslamic

*❏ I N F O  B O T*
▧ Bot Name : %me
▧ Mode : Public
▧ Platform : Linux
▧ Type : Node.Js
▧ Baileys : Multi Device
▧ Uptime : %muptime
▧ Database : %rtotalreg dari %totalreg

*❏ I N F O  C O M M A N D*
🅟 = Premium
🅛 = Limit

%readmore`.trimStart(),
  header: '❏┄┅━┅┄〈 〘 *%category* 〙\n│',
    body: '┊▧ %cmd %islimit %isPremium',
  footer: '│\n┗━═┅═━━┅┄๑\n',
  after: '',
}
let handler = async (m, { conn, usedPrefix, command, __dirname, isOwner, isMods, isPrems, args }) => {
    let tags
    let teks = `${args[0]}`.toLowerCase()
    let arrayMenu = ['all', 'main', 'ai', 'game', 'rpg', 'xp', 'sticker', 'quotes', 'fun', 'anime', 'group', 'premium', 'internet', 'news', 'downloader', 'tools', 'quran', 'owner']
    if (!arrayMenu.includes(teks)) teks = '404'
    if (teks == 'all') tags = {
        'main': 'Main',
        'ai': 'Ai',
        'game': 'Game',
        'rpg': 'RPG Games',
        'xp': 'Exp & Limit',
        'sticker': 'Sticker',
        'quotes': 'Quotes',
        'fun': 'Fun',
        'anime': 'Anime & Manga',
        'group': 'Group & Admin',
        'store': 'Store',
        'premium': 'Premium',
        'internet': 'Internet',
        'news': 'News',
        'downloader': 'Downloader',
        'search': 'Searching',
        'quran': 'Al Quran',
        'owner': 'Owner',
    }
    if (teks == 'main') tags = {
        'main': 'Main'
    }
    if (teks == 'ai') tags = {
        'ai': 'Ai'
    }
    if (teks == 'game') tags = {
        'game': 'Game'
    }
    if (teks == 'rpg') tags = {
        'rpg': 'RPG Games'
    }
    if (teks == 'xp') tags = {
        'xp': 'Exp & Limit'
    }
    if (teks == 'sticker') tags = {
        'sticker': 'Sticker'
    }
    if (teks == 'quotes') tags = {
        'quotes': 'Quotes'
    }
    if (teks == 'fun') tags = {
        'fun': 'Fun'
    }
    if (teks == 'anime') tags = {
        'anime': 'Anime & Manga'
    }
    if (teks == 'group') tags = {
        'group': 'Group & Admin'
    }
    if (teks == 'store') tags = {
        'store': 'Store'
    }
    if (teks == 'premium') tags = {
        'premium': 'Premium'
    }
    if (teks == 'internet') tags = {
        'internet': 'Internet'
    }
    if (teks == 'news') tags = {
        'news': 'News'
    }
    if (teks == 'downloader') tags = {
        'downloader': 'Downloader'
    }
    if (teks == 'tools') tags = {
        'tools': 'Tools'
    }
    if (teks == 'quran') tags = {
        'quran': 'Al Quran'
    }
    if (teks == 'owner') tags = {
        'owner': 'Owner'
    }
    if (teks == 'sound') tags = {
        'sound': 'Sound'
    }
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let tag = `@${m.sender.split('@')[0]}`
    let user = global.db.data.users[m.sender]
    let limit = isPrems ? 'Unlimited' : user.limit
    let name = user.registered ? user.name : conn.getName(m.sender)
    let status = isMods ? 'Developer' : isOwner ? 'Owner' : isPrems ? 'Premium User' : user.level > 1000 ? 'Elite User' : 'Free User'
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let listCmd =  `list menu miyako-md
`.trimStart()

    let rows = []
    for (let i = 0; i < arrayMenu.length; i++) {
        let result = {
            "header": "",
            "title": "Menu " + capitalize(arrayMenu[i]),
            "description": "Untuk Membuka Menu " + capitalize(arrayMenu[i]),
            "id": usedPrefix + arrayMenu[i] + "menu"
        }
        rows.push(result)
    }
    let buttonMsg = {
        "title": "Click Here",
        "sections": [{
            "title": "List Menu",
            "highlight_label": "Popular",
            "rows": rows
        }]
    }

    let buttons = [{
        "name": "single_select",
        "buttonParamsJson": JSON.stringify(buttonMsg)
    }]
    let hwaifu = JSON.parse(fs.readFileSync('./json/hwaifu.json', 'utf-8'))

    if (teks == '404') {
        return conn.sendButtonImg(m.chat, fs.readFileSync("./media/thumbnail.jpg"), "", listCmd.trim(), global.config.watermark, buttons, m, { 
            contextInfo: {
                mentionedJid: [m.sender],
            }
        })
    }
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
        help: Array.isArray(plugin.tags) ? plugin.help: [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags: [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
    }
    })
    let groups = {}
    for (let tag in tags) {
        groups[tag] = []
        for (let plugin of help)
            if (plugin.tags && plugin.tags.includes(tag))
            if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu: {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '': `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
        before,
        ...Object.keys(tags).map(tag => {
            return header.replace(/%category/g, tags[tag]) + '\n' + [
                ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
                    return menu.help.map(help => {
                        return body.replace(/%cmd/g, menu.prefix ? help: '%p' + help)
                        .replace(/%islimit/g, menu.limit ? '🅛' : '')
                        .replace(/%isPremium/g, menu.premium ? '🅟' : '')
                        .trim()
                    }).join('\n')
                }),
                footer
            ].join('\n')
        }),
        after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu: typeof conn.menu == 'object' ? _text: ''
    let replace = {
      '%': '%',
      p: usedPrefix, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role, tag, status, wib, 
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    await conn.adReply(m.chat, text.trim(), wish() + ' ' + name, '', fs.readFileSync('./media/thumbnail.jpg'), global.config.website, m)
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(listmenu|menulist)$/i
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function wish() {
    let wishloc = ''
    const time = moment.tz('Asia/Jakarta').format('HH')
    wishloc = ('Hi')
    if (time >= 0) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 4) {
        wishloc = ('Selamat Pagi')
    }
    if (time >= 11) {
        wishloc = ('Selamat Siang')
    }
    if (time >= 15) {
        wishloc = ('️Selamat Sore')
    }
    if (time >= 18) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 23) {
        wishloc = ('Selamat Malam')
    }
    return wishloc
}

function clockString(ms) {
    let h = isNaN(ms) ? '--': Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--': Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--': Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substr(1)
}