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
  let invest = Object.entries(bot.invest.item);
  let cap = `
*Market Bot ${conn.user.name}*

${invest
  .map((v, i) => {
    const hargaSebelumnya = v[1].hargaBefore;
    const hargaSekarang = v[1].harga;

    const keuntungan =
      ((hargaSekarang - hargaSebelumnya) / hargaSebelumnya) * 100;
    const update = v[1].harga - v[1].hargaBefore;
    return `
*${i + 1}.* ${v[1].name}
Harga Awal : ${v[1].hargaBefore}
Harga Sekarang : ${v[1].harga}
Update : ${update > 0 ? `+${update}` : update} ( ${keuntungan.toFixed(2)}% )
Stock : ${v[1].stock}
`.trim();
  })
  .join("\n\n")}


> *Untuk membeli coin ketik:*
> ${usedPrefix}invest-buy bitcoin 100
> *Untuk menjual coin ketik:*
> ${usedPrefix}invest-sell bitcoin 100
`.trim();
  let commands = command.split("-")[1];
  let coinName = (args[0] || "").toLowerCase();
  if (!(coinName || commands)) return m.reply(cap);
  let coin = Object.entries(bot.invest.item).find(
    (v) => v[1].name.toLowerCase() == args[0],
  );
  if (!coin)
    return m.reply(
      `Nama koin tidak ditemukan! \n*List koin:* \n\n${invest
        .map((v) => {
          return `*•* ${v[1].name}`;
        })
        .join("\n")}`,
    );
  user.invest[coinName] = user.invest[coinName] || { harga: 0, stock: 0 };
  let total =
    Math.floor(
      isNumber(args[1])
        ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER)
        : 1,
    ) * 1;
  switch (commands) {
    case "buy": {
      if (coin[1].stock == 0) return m.reply("Stock koin ini telah habis");
      if (total > coin[1].stock)
        return m.reply("Tidak dapat membeli jika melebihi stock");
      let price = coin[1].harga * total;
      if (price > user.bank)
        return m.reply("Saldo bank kamu kurang untuk membeli koin ini");
      if (user.invest[coinName].stock + total > 100000)
        return m.reply("Hanya diperbolehkan membeli maksimal 100000");
      let avarage = await calculateAverage(
        user.invest[coinName].harga,
        user.invest[coinName].stock,
        coin[1].harga,
        total,
      );

      user.bank -= price * 1;
      user.invest[coinName].stock += total;
      bot.invest.item[coinName].stock -= total;
      user.invest[coinName].harga = avarage;
      m.reply(`Berhasil membeli *${total} ${coinName}* seharga *${price}*`);
      break;
    }
    case "sell": {
      if (user.invest[coinName].stock < total)
        return m.reply(
          `Kamu hanya mempunyai *${user.invest[coinName].stock} ${coinName}*`,
        );
      let price = coin[1].harga * total;
      let avarage = await calculateAverage(
        user.invest[coinName].harga,
        user.invest[coinName].stock,
        coin[1].harga,
        total,
      );

      user.bank += price * 1;
      user.invest[coinName].stock -= total;
      bot.invest.item[coinName].stock += total;
      user.invest[coinName].harga = avarage;
      m.reply(`Berhasil menjual *${total} ${coinName}* seharga *${price}*`);
      break;
    }
    default:
  }
};
handler.help = ["crypto"];
handler.tags = ["rpg"];
handler.command = /^((invest(asi)?|crypto)(-buy|-sell)?)$/i;
handler.rpg = true;
handler.group = true;
export default handler;

async function calculateAverage(hargaNew, stockNew, harga, stock) {
  let stockHarga = new Array(stock).fill(harga);

  for (let i = 0; i < stockNew; i++) {
    stockHarga.push(hargaNew);
  }

  let totalBiaya = stockHarga.reduce((total, harga) => total + harga, 0);
  let jumlahTransaksi = stockHarga.length;
  let biayaRataRata = totalBiaya / jumlahTransaksi;
  let split = biayaRataRata.toString().split(".")[0];
  return parseFloat(split);
}

function isNumber(number) {
  if (!number) return number;
  number = parseInt(number);
  return typeof number == "number" && !isNaN(number);
}
