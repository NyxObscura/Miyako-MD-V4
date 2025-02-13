/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
const {
    proto
} = (await import("@adiwajshing/baileys")).default;

import uploadImage from "../lib/uploadImage.js";

let handler = async (m, {
    conn,
    text,
    command,
    usedPrefix
}) => {
    let M = proto.WebMessageInfo;
    let store = global.db.data.chats[m.chat].store;

    if (!m.quoted && !text) return m.reply("Balas pesan atau berikan teks dengan perintah *" + usedPrefix + command + "*");
    let [cmd, caption] = text.split("@");
    if (!cmd) return m.reply(`Masukan nama command!\n\nContoh: \n${usedPrefix + command} diamond`);

    if (typeof store[cmd] === "undefined") return m.reply("[ " + cmd + " ] tidak ditemukan dalam list store");

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || "";
    let media = store[cmd].media || false; 

    if (/image\/(jpe?g|png)|video\/mp4/.test(mime)) {
        media = await q.download(); 
        let files = await uploadImage(media);
        store[cmd].media = files;
        m.reply(`Berhasil memperbarui media untuk command ${cmd}.`);
    }


    if (caption || m.quoted) {
        store[cmd].caption = caption ? caption : m.quoted.text || store[cmd].caption;
        m.reply(`Berhasil memperbarui caption untuk command ${cmd}.`);
    } else {
        m.reply(`Tidak ada perubahan pada caption untuk command ${cmd}.`);
    }


    if (!/image\/(jpe?g|png)|video\/mp4/.test(mime) && caption) {
        m.reply(`Berhasil memperbarui teks command ${cmd} tanpa mengganti media.`);
    }
};

handler.help = ["updatestore"];
handler.tags = ["store"];
handler.command = ["updatestore"];
handler.group = handler.admin = true;

export default handler;