/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

const xpperlimit = 1;
let handler = async (m, { conn, command, args }) => {
  let user = global.db.data.users[m.sender];
  let all = command.replace(/^tarik/i, "");
  let count = all ? all : args[0];
  count = count
    ? /all/i.test(count)
      ? Math.floor(user.bank / xpperlimit)
      : parseInt(count)
    : args[0]
      ? parseInt(args[0])
      : 1;
  count = Math.max(1, count);
  if (user.atm == 0) return m.reply("kamu belum mempuyai kartu ATM !");
  if (user.bank >= xpperlimit * count) {
    user.bank -= xpperlimit * count;
    user.money += count;
    conn.reply(m.chat, `Sukses menarik sebesar ${count} Money 💹`, m);
  } else
    conn.reply(
      m.chat,
      `[❗] Uang dibank anda tidak mencukupi untuk ditarik sebesar ${count} money 💹`,
      m,
    );
};
handler.help = ["tarik"];
handler.tags = ["rpg"];
handler.command = /^tarik([0-9]+)|tarik|tarikall$/i;
handler.group = true;
handler.rpg = true;
export default handler;
