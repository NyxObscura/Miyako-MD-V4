/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*  
*/

/*
 • Fitur By Anomaki Team
 • Created : Nazand Code
 • Info os dengan canvas (gbut+pening bjir) 
 • Jangan Hapus Wm
 • https://whatsapp.com/channel/0029Vaio4dYC1FuGr5kxfy2l
*/

import os from 'os';
import {
    createCanvas,
    loadImage
} from 'canvas';
const generateOSImage = async (botProfile) => {
    const canvasWidth = 800;
    const canvasHeight = 600;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    const isDarkBackground = Math.random() > 0.5;
    ctx.fillStyle = isDarkBackground ? '#000000' : '#FFFFFF';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const textColor = isDarkBackground ? '#FFFFFF' : '#000000';
    ctx.fillStyle = textColor;

    ctx.font = 'bold 50px "Arial Black"';
    ctx.textAlign = 'center';
    ctx.fillText('📊 System Information', canvasWidth / 2, 80);

    const cpus = os.cpus();
    const cpuModel = cpus[0]?.model || 'Unknown CPU';
    const cpuSpeed = cpus[0]?.speed || 'Unknown';
    const coreCount = cpus.length;

    ctx.font = '30px "Courier New"';
    ctx.textAlign = 'left';
    ctx.fillText(`🖥️ CPU: ${cpuModel}`, 20, 150);
    ctx.fillText(`⚡ Speed: ${cpuSpeed} MHz`, 20, 200);
    ctx.fillText(`🧵 Cores: ${coreCount}`, 20, 250);

    const totalMemory = (os.totalmem() / (1024 ** 3)).toFixed(2);
    const freeMemory = (os.freemem() / (1024 ** 3)).toFixed(2);
    ctx.fillText(`💾 Total Memory: ${totalMemory} GB`, 20, 300);
    ctx.fillText(`📂 Free Memory: ${freeMemory} GB`, 20, 350);

    const uptime = os.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;
    ctx.fillText(`⏱️ Uptime: ${hours}h ${minutes}m ${seconds}s`, 20, 400);

    const runtime = process.uptime();
    const runtimeHours = Math.floor(runtime / 3600);
    const runtimeMinutes = Math.floor((runtime % 3600) / 60);
    const runtimeSeconds = Math.floor(runtime % 60);
    ctx.fillText(`⚙️ Runtime: ${runtimeHours}h ${runtimeMinutes}m ${runtimeSeconds}s`, 20, 450);
    try {
        const profileImage = await loadImage(botProfile || 'https://files.catbox.moe/2pmzgn.png');
        const radius = 75;
        const centerX = canvasWidth - 150;
        const centerY = 150;

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(profileImage, centerX - radius, centerY - radius, radius * 2, radius * 2);
        ctx.restore();
        ctx.strokeStyle = textColor;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
    } catch (error) {
        console.error('Failed to load profile picture:', error.message);
    }

    return canvas.toBuffer();
};

const handler = async (m, {
    conn,
    info,
    media,
    url
}) => {
    try {
        const botProfile = await conn.profilePictureUrl(conn.user.jid, 'image').catch(() => null);

        const cpus = os.cpus();
        const cpuModel = cpus[0]?.model || 'Unknown CPU';
        const cpuSpeed = cpus[0]?.speed || 'Unknown';
        const coreCount = cpus.length;

        const totalMemory = (os.totalmem() / (1024 ** 3)).toFixed(2);
        const freeMemory = (os.freemem() / (1024 ** 3)).toFixed(2);

        const uptime = os.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;

        const runtime = process.uptime();
        const runtimeHours = Math.floor(runtime / 3600);
        const runtimeMinutes = Math.floor((runtime % 3600) / 60);
        const runtimeSeconds = Math.floor(runtime % 60);
        const caption = `
📊 *System Information*
🖥️ *CPU*: ${cpuModel}
⚡ *Speed*: ${cpuSpeed} MHz
✨ *Cores*: ${coreCount}
💾 *Total Memory*: ${totalMemory} GB
📑 *Free Memory*: ${freeMemory} GB
⏱️ *Uptime*: ${hours}h ${minutes}m ${seconds}s
⚙️ *Runtime*: ${runtimeHours}h ${runtimeMinutes}m ${runtimeSeconds}s
    `.trim();
        const buffer = await generateOSImage(botProfile);
        await conn.sendMessage(
            m.chat, {
                text: caption,
                contextInfo: {
                    externalAdReply: {
                        title: 'I N F O • S I S T E M 🔥',
                        body: 'System Information',
                        thumbnail: buffer,
                        sourceUrl: 'https://chat.whatsapp.com/',
                        mediaType: 1,
                        renderLargerThumbnail: true,
                    },
                },
            }, {
                quoted: m
            }
        );
    } catch (error) {
        return conn.sendMessage(
            m.chat, {
                text: `${error.message}`
            }, {
                quoted: m
            }
        );
    }
};

handler.command = ['os'];
handler.tags = ['info'];
handler.help = ['osinfo'];
export default handler;