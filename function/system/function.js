/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import axios from 'axios'
import ytdl from 'ytdl-core'
import fetch from 'node-fetch'



    /*close gc */
    export async function closegc() {

        const moment = (await import('moment-timezone')).default;
        let data = fs.readFileSync("./function/database/grup.json")
        let json = JSON.parse(data)
        const time = moment.tz('Asia/Jakarta').format('HH:mm');

     
        for (let schedule of json) {
        try {
            let anon = (await conn.groupMetadata(schedule)).announce;
            if (time === '00:00' && anon === false) {
                await conn.groupSettingUpdate(schedule, 'announcement');
                await conn.delay(1000)
                await conn.reply(schedule, '*[System Notice]*\n\n\`\`\`Halo semua, maaf mengganggu. Sistem grup WhatsApp akan ditutup sementara karena sudah larut malam. Mohon maaf atas ketidaknyamanannya. Silakan istirahat yang baik dan kita akan melanjutkan percakapan besok pagi. Terima kasih atas pengertian dan kerjasamanya. Selamat malam!.\`\`\`', null);

            } else if (time === '05:30' && anon === true) {
                await conn.groupSettingUpdate(schedule, 'not_announcement');
                await conn.delay(1000)

                await conn.reply(schedule, '*[System Notice]*\n\n\`\`\`Selamat pagi, teman-teman! Semoga hari ini penuh dengan semangat dan kebahagiaan. Mari kita mulai hari ini dengan semangat yang tinggi dan berbagi kebaikan di grup WhatsApp kita. Selamat beraktivitas dan semoga hari ini menjadi hari yang produktif dan menyenangkan bagi kita semua.\`\`\`', null);

                let anon = (await conn.groupMetadata(schedule)).announce;
            } else if (time === '18:00' && anon === false) {
                await conn.groupSettingUpdate(schedule, 'announcement');
                await conn.delay(1000)
                await conn.reply(schedule, '*[System Notice]*\n\n\`\`\`Halo semuanya! Sistem grup WhatsApp akan ditutup sementara karena sudah memasuki waktu magrib. Silakan istirahat sejenak dan nikmati waktu bersama keluarga atau melakukan aktivitas lainnya. Kami akan membuka kembali sistem grup ini setelah waktu Maghrib. Terima kasih atas pengertian dan kerjasamanya. Selamat beristirahat!\`\`\`', null);

            } else if (time === '18:10' && anon === true) {
                await conn.groupSettingUpdate(schedule, 'not_announcement');
                await conn.delay(1000)

                await conn.reply(schedule, '*[System Notice]*\n\n\`\`\`Selamat malam semuanya! Sistem grup WhatsApp telah dibuka setelah magrib. Semoga kita semua telah menjalankan ibadah dengan baik dan mendapatkan berkah di hari ini. Mari kita berbagi cerita, informasi, dan kebahagiaan bersama di grup ini. Selamat bergabung dan semoga kita memiliki waktu yang menyenangkan!\`\`\`', null);


            }
    
            } catch (e) {
      //  console.log('eror: bot tidak terdaftar dalam grup')
        json.splice(json.indexOf(schedule), 1);
                // Menyimpan perubahan kembali ke file grup.json
         fs.writeFileSync('./function/database/grup.json', JSON.stringify(json));
                return json
        }
        } 
        }
        

    export async function regex(string) {
        return string.replace(/[.*=+:\-?^${}()|[\]\\]|\s/g, '\\$&')
    }
    
    export async function delay(ms) {
return new Promise(res => setTimeout(res, ms))
}
    export async function random(ext) {
return `${Math.floor(Math.random() * 10000)}${ext}`
}
    export async function isUrl(url) {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}
    export async function pickRandom(arr) {
return arr[Math.floor(Math.random() * arr.length)]
}

    export async function toRupiah(x) {
x = x.toString()
var pattern = /(-?\d+)(\d{3})/;
while (pattern.test(x))
x = x.replace(pattern, "$1.$2");
return x;
}
    export async function toSize(number) {
var SI_POSTFIXES = ["B", " KB", " MB", " GB", " TB", " PB", " EB"]
var tier = Math.log10(Math.abs(number)) / 3 | 0
if(tier == 0) return number
var postfix = SI_POSTFIXES[tier]
var scale = Math.pow(10, tier * 3)
var scaled = number / scale
var formatted = scaled.toFixed(1) + ''
if (/\.0$/.test(formatted))
formatted = formatted.substr(0, formatted.length - 2)
return formatted + postfix
}
    export async function toTime(ms) {
let h = Math.floor(ms / 3600000)
let m = Math.floor(ms / 60000) % 60
let s = Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
    export async function translate(query = "", lang) {
	if (!query.trim()) return "";
	const url = new URL("https://translate.googleapis.com/translate_a/single");
	url.searchParams.append("client", "gtx");
	url.searchParams.append("sl", "auto");
	url.searchParams.append("dt", "t");
	url.searchParams.append("tl", lang);
	url.searchParams.append("q", query);

	try {
		const response = await fetch(url.href);
		const data = await response.json();
		if (data) {
			return [data[0].map((item) => item[0].trim()).join("\n"), data[2]];
		} else {
			return "";
		}
	} catch (err) {
		throw err;
	}
}
 export async function hitungMundur(tanggal, bulan, tahun) {
let from = new Date(`${bulan} ${tanggal}, ${tahun} 00:00:00`).getTime();
let now = Date.now();
let distance = from - now;
let days = Math.floor(distance / (1000 * 60 * 60 * 24));
let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
let seconds = Math.floor((distance % (1000 * 60)) / 1000);
return days + ' Hari ' + hours + ' Jam ' + minutes + ' Menit ' + seconds + ' Detik'
}

    export async function styleText(type, text) {
if (type === 'bold') {
return '*' + text + '*'
} else if (type === 'italic') {
return '_' + text + '_'
} else if (type === 'monospace') {
return '```' + text + '```'
} else {
return '~' + text + '~'
}
}

    export async function makeid(length) {
let result = '';
let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let charactersLength = characters.length;
for (let i = 0; i < length; i++) {
result += characters.charAt(Math.floor(Math.random() *
charactersLength));
}
return result;
}

    export async function randomNomor(min, max = null) {
if (max !== null) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
} else {
return Math.floor(Math.random() * min) + 1
}
}

    export async function resize(image, width = 200, height = 200) {
let img = await read(image);
let hasil = await img.resize(width, height).getBufferAsync(MIME_JPEG);
return hasil
}

    export async function fetchText(url, options) {
     new Promise(async(resolve, reject) => {
fetch(url, options).then(response => response.text())
.then(text => {
resolve(text)
}).catch((err) => {
reject(err)
})
})
}

    export async function fetchBuffer(url, options) {
	try {
		options ? options : {}
		const res = await axios({
			method: "GET",
			url,
			headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

    export async function fetchJson(url, options) {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

    export async function jsonFormat(obj) {
try {
let print = (obj && (obj.constructor.name == 'Object' || obj.constructor.name == 'Array')) ? require('util').format(JSON.stringify(obj, null, 2)) : require('util').format(obj)
return print
} catch {
return require('util').format(obj)
}
}

    export async function texted(type, text) {
if (type === 'bold') {
return '*' + text + '*'
} else if (type === 'italic') {
return '_' + text + '_'
} else if (type === 'monospace') {
return '```' + text + '```'
} else {
return '~' + text + '~'
}
}

    export async function msToTime(ms) {
var milliseconds = parseInt((ms % 1000) / 100),
seconds = Math.floor((ms / 1000) % 60),
minutes = Math.floor((ms / (1000 * 60)) % 60),
hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
let h = (hours < 10) ? '0' + hours : hours
let m = (minutes < 10) ? '0' + minutes : minutes
let s = (seconds < 10) ? '0' + seconds : seconds
return h + ':' + m + ':' + s
}

    export async function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

    export async function uuid() {
var dt = new Date().getTime()
var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
var r = (dt + Math.random() * 16) % 16 | 0;
var y = Math.floor(dt / 16);
return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
});
return uuid
}

    export async function ytmp3(url) {
return new Promise((resolve, reject) => {
try {
const id = ytdl.getVideoID(url)
const yutub = ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`).then((data) => {
let pormat = data.formats
let audio = []
let video = []
for (let i = 0; i < pormat.length; i++) {
if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
let aud = pormat[i]
audio.push(aud.url)
}
}
const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
const result = {
creator: 'Tio',
title: title,
thumb: thumb,
channel: channel,
published: published,
views: views,
url: audio[0]
}
resolve(result)
})
return(yutub)
} catch (error) {
reject(error)
console.log(error)
}
})
}

    export async function ytmp4tion(url) {
return new Promise((resolve, reject) => {
try {
const id = ytdl.getVideoID(url)
const yutub = ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`).then((data) => {
let pormat = data.formats
let video = []
for (let i = 0; i < pormat.length; i++) {
if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
let vid = pormat[i]
video.push(vid.url)
}
}
const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
const result = {
creator: 'Tio',
title: title,
thumb: thumb,
channel: channel,
published: published,
views: views,
url: video[0]
}
resolve(result)
})
return(yutub)
} catch (error) {
reject(error)
console.log(error)
}
})
}


export async function deleteFolder(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
    console.log('Folder berhasil dihapus.');
  } else {
    console.log('Folder tidak ditemukan.');
  }
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'function.js'"))
  import(`${file}?update=${Date.now()}`)
})