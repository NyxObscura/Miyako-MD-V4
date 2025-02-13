/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { promisify } from "util"
import cp, { exec as _exec } from "child_process"
import fs from 'fs';

const handler = async (m, { conn }) => {
        await m.reply(wait)
        let exec = promisify(_exec).bind(cp)
        let { stdout } = await exec("zip -r tmp/backup.zip * -x 'node_modules/*'")

        if (stdout) conn.sendMessage(m.sender, { document: await fs.readFileSync("./tmp/backup.zip"), fileName: "backup-script.zip", mimetype: "application/zip", caption: "Successfully backed up the script [ ✅ ]" }, { quoted: m })
        fs.unlinkSync("./tmp/backup.zip")
    }
handler.help = ["backupbot"];
handler.tags = ["owner"];
handler.command = /^(bekap)$/i;
handler.owner = true;
export default handler