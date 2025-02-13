/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, usedPrefix }) => {
  let id = m.chat;
  if (!(id in global.db.data.bots.absen))
    return m.reply(`_*Tidak ada absen berlangsung digrup ini!*_\n\n*${usedPrefix}mulaiabsen* - untuk memulai absen`);

  let d = new Date();
  let date = d.toLocaleDateString("id", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  let absen = global.db.data.bots.absen[id][1];
  let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join("\n");
  conn.reply(
    m.chat,
    `*「 ABSEN 」*

Tanggal: ${date}
${global.db.data.bots.absen[id][2]}

┌ *Yang sudah absen:*
│ 
│ Total: ${absen.length}
${list}
│ 
└────
`.trim(),
    m,
    { contextInfo: { mentionedJid: absen } },
  );
};
handler.help = ["cekabsen"];
handler.tags = ["group"];
handler.command = /^cekabsen$/i;
handler.group = true;

export default handler;
