/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, args }) => {
  if (!args || !args[0]) return m.reply("❔Siapa yang mau di Unwarning om?");
  let mention =
    m.mentionedJid[0] ||
    conn.parseMention(args[0]) ||
    args[0].replace(/[@.+-]/g, "").replace(" ", "") + "@s.whatsapp.net" ||
    "";
  if (!mention) return m.reply("⚠️Tag salah satu lah");
  if (!(mention in global.db.data.users))
    return m.reply("User tidak terdaftar dalam DATABASE!!");
  let user = global.db.data.users[mention];
  if (user.ownerBan) return m.reply("📛User telah terbanned!!");
  if (user.warning * 1 < 1) return m.reply("⛔ User tidak mempunyai warn");
  let count =
    (args[1] || args.length > 0
      ? !isNaN(parseInt(args[1]))
        ? parseInt(args[1])
        : 1
      : 1) || 1;
  if (user.warning * 1 < count * 1)
    return m.reply(`User hanya memiliki *${user.warning * 1}* warn!`);
  user.warning -= count * 1;
  m.reply("✔️Berhasil Unwarning user!!");
  conn.sendMessage(
    mention,
    "*Kamu telah di Unwarning OWNER Atau MODERATOR, sekarang kamu memiliki *" +
      global.db.data.users[mention].warning * 1 +
      "* warning",
    wm,
  );
};

handler.help = ["unwarn @mention"];
handler.tags = ["owner"];
handler.command = /^unwarn(user)?$/i;
handler.mods = true;

export default handler;
