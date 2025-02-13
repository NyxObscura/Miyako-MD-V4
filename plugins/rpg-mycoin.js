/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, usedPrefix, command, args }) => {
  let bot = global.db.data.bots;
  let user = global.db.data.users[m.sender];
  let invest = Object.entries(user.invest).filter((v) => v[1].stock != 0);
  let cap = `
*Market Bot ${conn.user.name}*
*Investor:* ${conn.getName(m.sender)}

${invest
  .map((v, i) => {
    function capitalize(word) {
      return word.charAt(0).toUpperCase() + word.substr(1);
    }

    const hargaSebelumnya = v[1].harga;
    const hargaSekarang = bot.invest.item[v[0]].harga;

    const keuntungan =
      ((hargaSekarang - hargaSebelumnya) / hargaSebelumnya) * 100;
    const profit = bot.invest.item[v[0]].harga - v[1].harga;
    return `
*${i + 1}.* ${capitalize(v[0])} 
Avarage : ${v[1].harga}
Harga Sekarang : ${bot.invest.item[v[0]].harga}
Stock : ${v[1].stock}
Profit : ${profit > 0 ? `+${profit * v[1].stock}` : profit * v[1].stock} ( ${keuntungan.toFixed(2)}% )
`.trim();
  })
  .join("\n\n")}
`.trim();
  m.reply(cap);
};
handler.help = ["mycoin"];
handler.tags = ["rpg"];
handler.command = /^(mycoin)$/i;
handler.rpg = true;
handler.group = true;
export default handler;
