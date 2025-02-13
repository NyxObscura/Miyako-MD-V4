/*
 * @Author: Cifumo
 * @Web: https://rest.cifumo.biz.id
 */
import speed from "performance-now";


async function loadCh(conn) {
  try {
    const ch = global.db.data.bots.link.chid || null
    if(ch === null) return
    let timestamp = speed();
    let latensi = speed() - timestamp;
    let ms = await latensi.toFixed(4);
    const _uptime = process.uptime() * 1000;
    //const info = await conn.groupMetadata(gc);
    //const link = await conn.groupInviteCode(gc);
    let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
    
    let user = global.db.data.users;
  let member = Object.keys(user)
    .filter(
      (v) => typeof user[v].chatTotal != "undefined" && v != conn.user.jid,
    )
    .sort((a, b) => {
      const totalA = user[a].chat;
      const totalB = user[b].chat;
      return totalB - totalA;
    });
  let nomor = 1;
  let chatToday = 0;
  let chatTotal = 0;
  for (let number of member) {
    chatToday += user[number].chat;
    chatTotal += user[number].chatTotal;
  }

    // Menghitung total plugin
    const totalPlugins = Object.values(global.plugins)
      .filter(v => v.help && v.tags)
      .length;

    // Mengambil statistik perintah yang paling sering digunakan
    const stats = Object.entries(global.db.data.stats).map(([key, val]) => {
      let name = Array.isArray(global.plugins[key]?.help) ?
        global.plugins[key]?.help?.join(" & ") :
        global.plugins[key]?.help || key;
      if (/exec/.test(name)) return;
      return { name, ...val };
    });

    // Menghitung jumlah pengguna terdaftar
    const totalRegisteredUsers = Object.values(global.db.data.users)
      .filter(user => user.registered == true)
      .length;

    // Deskripsi yang akan di-update
    let description = `
Halo, selamat datang di saluran XenzPedo Akut😂
    Info Saluran:
    "NameChannel": XenzPedo Akut😂
    "Desk": Admin akan berbagi informasi tentang kode,fitur,scrape,script,anime,game, dan lain-lain
    "TotalPengikut": 300+
    "LinkChannel": https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
    "IDChannel": 120363305604937139@newsletter
------------------------------------------------------------------
Contact me:
Tiktok: @gsckemz202
Facebook: XenzReal
WhatsApp: wa.me/6281297662535
Telegram: t.me/xenzyor
Instagram: XenzGfx

© Copyright by Xenz
\`\`\`
`;

    // Update deskripsi newsletter
    await conn.newsletterUpdateDescription(ch, description);
  } catch (e) {
    console.error(e);
  }
};

function clockString(ms) {
  let months = isNaN(ms) ? "--" : Math.floor(ms / 2592000000); // 30 days in ms
  let weeks = isNaN(ms) ? "--" : Math.floor((ms % 2592000000) / 604800000); // 7 days in ms
  let days = isNaN(ms) ? "--" : Math.floor((ms % 604800000) / 86400000); // 1 day in ms
  let hours = isNaN(ms) ? "--" : Math.floor((ms % 86400000) / 3600000); // 1 hour in ms
  let minutes = isNaN(ms) ? "--" : Math.floor((ms % 3600000) / 60000); // 1 minute in ms
  let seconds = isNaN(ms) ? "--" : Math.floor((ms % 60000) / 1000); // 1 second in ms

  return [
    `${months.toString().padStart(2, "0")} bulan`,
    `${weeks.toString().padStart(2, "0")} minggu`,
    `${days.toString().padStart(2, "0")} hari`,
    `${hours.toString().padStart(2, "0")} jam`,
    `${minutes.toString().padStart(2, "0")} menit`,
    `${seconds.toString().padStart(2, "0")} detik`
  ].filter(v => !v.startsWith("00")) // Remove zero values
   .join(", "); // Join them with commas
}

export { loadCh }