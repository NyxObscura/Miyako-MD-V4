/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { usedPrefix }) => {
  let id = m.chat;
  if (!(id in global.db.data.bots.absen))
    return m.reply(`_*Mohon maaf, Tidak ada absen hari ini !*_\n\n*${usedPrefix}ᴍᴜʟᴀɪᴀʙꜱᴇɴ* - ᴜɴᴛᴜᴋ ᴍᴇᴍᴜʟᴀɪ ᴀʙꜱᴇɴ`);
  let absen = global.db.data.bots.absen[id][1];
  const wasVote = absen.includes(m.sender);
  if (wasVote) return m.reply("*Kamu sudah absen bang！🙄*");
  absen.push(m.sender);
  m.reply(`Done!`);
  let d = new Date();
  let date = d.toLocaleDateString("id", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  let list = absen.map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n");
  let caption = `
Tanggal: ${date}
${global.db.data.bots.absen[id][2]}
┌「 *Absen* 」  
├ Total: ${absen.length}
${list} 
└────
_Silahkan Ketik ${usedPrefix}absen Untuk Absen_
_Ketik ${usedPrefix}cekabsen Untuk Cek Absen_`.trim();
  await conn.reply(m.chat, caption, m, {
    contextInfo: { mentionedJid: absen },
  });
};
handler.help = ["absen"];
handler.tags = ["group"];
handler.command = /^(absen|hadir)$/i;
handler.group = true;

export default handler;
