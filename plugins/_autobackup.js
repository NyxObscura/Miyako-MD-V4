/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import moment from 'moment-timezone'
import fs from 'fs'
import { promisify } from 'util'
import cp, { exec as _exec } from 'child_process'

export async function all(m) {
    let setting = global.db.data.settings[this.user.jid]
    
    if (setting.backup) {
        // Backup script setiap 2 jam
        if (new Date() * 1 - setting.backupDB > 7200000) {
            let d = new Date()
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            
            // Eksekusi perintah zip untuk membackup seluruh script (kecuali node_modules)
            let exec = promisify(_exec).bind(cp)
            try {
                let { stdout } = await exec("zip -r tmp/script.zip * -x 'node_modules/*'")
                
                if (stdout) {
                    let fdoc = {key: {remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net'}, message: {documentMessage: {title: '𝙱 𝙰 𝙲 𝙺 𝚄 𝙿 𝚂 𝙲 𝚁 𝙸 𝙿 𝚃'}}}
                    
                    // Kirim file script.zip
                    this.reply(info.nomorown + '@s.whatsapp.net', `*🗓️ Backup Script:* ${date}`, null)
                    this.sendMessage(info.nomorown + '@s.whatsapp.net', {
                        document: fs.readFileSync('./tmp/script.zip'), 
                        mimetype: 'application/zip', 
                        fileName: 'script.zip'
                    }, { quoted: fdoc })
                    
                    setting.backupDB = new Date() * 1
                }

                // Hapus file backup setelah dikirim
                fs.unlinkSync('./tmp/script.zip')
            } catch (error) {
                console.error('❌ Error during script backup:', error)
            }
        }
    }
    return !0
}