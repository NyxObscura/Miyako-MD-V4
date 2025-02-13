/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, usedPrefix }) => {
  let __timers = new Date() - global.db.data.users[m.sender].lastmisi;
  let _timers = 3600000 - __timers;
  let user = global.db.data.users[m.sender];
  let order = global.db.data.users[m.sender].roket;
  let timers = clockString(_timers);
  let name = user.registered ? user.name : conn.getName(m.sender);
  let id = m.sender;
  let kerja = "roket";
  conn.misi = conn.misi ? conn.misi : {};
  if (id in conn.misi)
    return conn.reply(
      m.chat,
      `Selesaikan misi ${conn.misi[id][0]} terlebih dahulu`,
      m,
    );
  if (user.health < 80) return m.reply(`Anda harus memiliki minimal 80 health`);
  if (new Date() - global.db.data.users[m.sender].lastmisi > 3600000) {
    let ngerok4 = Math.floor(Math.random() * 10);
    let ngerok5 = Math.floor(Math.random() * 10);

    let ngrk4 = ngerok4 * 100000;
    let ngrk5 = ngerok5 * 1000;

    let hsl = `
*—[ Hasil Ngroket ${name} ]—*
➕ 💹 Uang = [ ${ngrk4} ]
➕ ✨ Exp = [ ${ngrk5} ]
➕ 😍 Mendarat Selesai = +1
➕ 📥Total Mendarat Sebelumnya : ${order}
`.trim();

    user.money += ngrk4;
    user.exp += ngrk5;
    user.roket += 1;
    user.health -= 80;

    // Pastikan user.title dan user.titlelist ada
    if (typeof user.title !== "string") {
      user.title = "";
    }
    if (!user.titlelist) {
      user.titlelist = [];
    }

    if (user.roket >= 100 && user.title !== "100x menyelesaikan roket") {
      if (user.title) {
        user.titlelist.push(user.title);
      }
      user.title = "100x menyelesaikan roket";
      user.legendary += 30000000; // Tambahkan 30 juta uang
      conn.reply(
        m.chat,
        `🎉 Selamat ${name}, Anda telah menyelesaikan misi roket sebanyak 100 kali, mendapatkan title "100x menyelesaikan roket" dan hadiah tambahan sebesar 30 juta!`,
        m,
      );
    }

    setTimeout(() => {
      conn.reply(m.chat, `🔍 ${name} memulai penerbangan...`, m);
    }, 0);

    conn.misi[id] = [
      kerja,
      setTimeout(() => {
        delete conn.misi[id];
      }, 27000),
    ];

    setTimeout(() => {
      conn.reply(m.chat, hsl, m);
    }, 27000);

    user.lastmisi = new Date() * 1;
  } else
    m.reply(`Silahkan menunggu selama ${timers}, untuk bisa ${kerja} kembali`);
};
handler.help = ["roket"];
handler.tags = ["rpg"];
handler.command = /^(roket|ngroket|groket|jadiroket)$/i;
handler.register = true;
handler.group = true;
handler.level = 10;
handler.rpg = true;
export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
