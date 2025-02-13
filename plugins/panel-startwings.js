/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { Client } from "ssh2"

const handler = async(m, { conn, text}) =>
{
  let t = text.split(',');
    if (t.length < 2) return m.reply(`*Format salah!*\nPenggunaan: .startwings ipvps,password,token (token configuration)`)
    
    let ipvps = t[0];
    let passwd = t[1];
    let token = t[2];
    const connSettings = {
        host: ipvps,
        port: '22',
        username: 'root',
        password: passwd
    };

    // Gunakan string terenkripsi di kode Anda
    const command = 'bash <(curl https://raw.githubusercontent.com/cifumo/Theme/main/install.sh)'
    const ssh = new Client();
 
    ssh.on('ready', () => {
        isSuccess = true; // Set flag menjadi true jika koneksi berhasil
        m.reply('*PROSES CONFIGURE WINGS*')
        
        ssh.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream closed with code ' + code + ' and signal ' + signal);
m.reply('SUCCES START WINGS DI PANEL ANDA COBA CEK PASTI IJO😁');
                ssh.end();
            }).on('data', (data) => {
            stream.write('VallzOffc\n');
                stream.write('3\n');
                stream.write(`${token}\n`)
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).on('error', (err) => {
        console.log('Connection Error: ' + err);
        m.reply('Katasandi atau IP tidak valid');
    }).connect(connSettings);
}
handler.command = handler.help = ['startwings']
handler.tags = ['panel','owner']
handler.owner = true
export default handler