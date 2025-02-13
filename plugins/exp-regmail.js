/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import nodemailer from "nodemailer";

let handler = async function (m, { conn, args, usedPrefix, command }) {
  try {
    let users = global.db.data.users[m.sender];
    let name = m.sender.split("@")[0];
    if (!users) users = {};

    if (users.registered === true)
      return m.reply(`*✅ Nomor Kamu Sudah Terverifikasi*`);
    if (!args || !args[0])
      return m.reply(
        `Silahkan Masukkan Emailnya !\nContoh: ${usedPrefix + command} gmailmu@gmail.com`,
      );
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi.test(
        args[0],
      )
    )
      return m.reply(`🚩 Email Tidak Valid, Harap Gunakan Email yang Benar !`);

    let emails = users.email || [];
    if (emails.includes(args[0]))
      return m.reply(`🚩 Email Sudah Terdaftar, Gunakan Email Lain !`);

    let code = getRandomInt(100, 900);
    users.codeExpire = Date.now() + 180000; // 3 menit dari sekarang
    users.code = code;
    users.email = args[0];

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "emiliaogiwara@gmail.com",
        pass: "qsvhiqljrlxfwsei",
      },
    });

    const mailOptions = {
      from: {
        name: "EmiliaOfficial - Verification",
        address: "emiliaogiwara@gmail.com",
      },
      to: args[0],
      subject: "Email Verification",
      html: `<div style="padding:20px;border:1px dashed #222;font-size:15px"><tt>Halo <b>${name} 😘</b><br><br>Konfirmasi Emailmu Supaya Dapat Menggunakan EmiliaBot. Kirim Angka Dibawah Ini Ke Nomor ${info.nomorbot}, Angka Hanya Berlaku 3 Menit.<br><center><h1>${code}</h1></center>atau Kamu Bisa Langsung Ke wa Bot Dengan Cara Mengklik Link Dibawah : <a href="https://wa.me/${info.nomorbot}?text=${code}">https://wa.me/${info.nomorbot}?text=${code}</a><br><br><hr style="border:0px; border-top:1px dashed #222"><br>Credit, <b>EmiliaOfficial - Bot</b></tt></div>`,
    };

    await transporter.sendMail(mailOptions);
    return m.reply(
      `✅ Kode Sudah Terkirim \nCek Email Untuk Mendapat Kode Verifikasi ! \n\nUntuk dapat *Redeem Kode* dengan cara ${usedPrefix}vercode *<code>*`,
    );
  } catch (e) {
    console.error(e);
    m.reply(`Error: ${e.message}`);
  }
};

handler.help = ["regmail <email>"];

handler.command = /^(reg|regmail)$/i;

export default handler;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
