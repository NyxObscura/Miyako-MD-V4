/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { Client } from "ssh2"


const handler = async(m, { text, conn }) =>
{
  let t = text.split(',');
    if (t.length < 2) return m.reply(`*Format salah!*\nPenggunaan: .uninstallpanel ipvps,password`);
    let ipvps = t[0].trim();
    let passwd = t[1].trim();
    const connSettings = {
        host: ipvps,
        port: '22',
        username: 'root',
        password: passwd
    };

    const command = 'bash <(curl -s https://pterodactyl-installer.se)';

    const ssh = new Client();
    let isSuccess = false; // Flag untuk menentukan keberhasilan koneksi
    ssh.on('ready', () => {
        m.reply('*PROSES UNINSTALL PANEL SEDANG BERLANGSUNG, MOHON TUNGGU 20 DETIK*');
        ssh.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream closed with code ' + code + ' and signal ' + signal);
                ssh.end();
            }).on('data', (data) => {
                console.log('STDOUT: ' + data);
                if (data.toString().includes('Input')) {
                    if (data.toString().includes('6')) {
                        stream.write('6\n');
                    } 
                    if (data.toString().includes('y/N')) {
                        stream.write('y\n');
                    } 
                    if (data.toString().includes('y/N')) {
                        stream.write('y\n');
                    }
                    if (data.toString().includes('y/N')) {
                      stream.write('y\n');
                    }
                    if (data.toString().includes('y/N')) {
                      stream.write('y\n');
                    }
                    if (data.toString().includes('y/N')) {
                      stream.write('y\n');
                    }
                }
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).connect(connSettings);
    await new Promise(resolve => setTimeout(resolve, 20000));
    if (isSuccess) {
            m.reply('`SUKSES UNINSTALL PANEL ANDA, SILAHKAN CEK`');
        }
}
handler.command = handler.help = ['uninstallpanel']
handler.tags = ['panel', 'owner']
handler.owner = true
export default handler