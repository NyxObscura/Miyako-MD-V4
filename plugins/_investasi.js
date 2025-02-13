/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

export function all(m) {
  const bot = global.db.data.bots;
  const persen = [
    0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07,
    0.08, 0.09, 0.1,
  ];
  if (new Date() * 1 - bot.invest.cooldown > 100000) {
    let invest = Object.entries(bot.invest.item);
    for (const [name, value] of invest) {
      const isPersen = persen[Math.floor(Math.random() * persen.length)];
      const onePercent = (value.harga * isPersen).toString().split(".")[0];
      const isRise = rise[name][Math.floor(Math.random() * rise[name].length)];
      if (isRise == "naik") {
        value.harga += parseFloat(onePercent);
      } else if (isRise == "turun") {
        value.harga -= parseFloat(onePercent);
      }
    }
    bot.invest.cooldown = new Date() * 1;
  }
}

let rise = {
  bitcoin: [, "naik", "stay", "stay", "stay", "stay", "turun"],
  polygon: ["naik", "naik", "stay", "stay", "stay", "turun"],
  dogecoin: ["naik", "naik", "stay", "stay", "stay", "turun"],
  etherium: [, "naik", "stay", "stay", "stay", "stay", "stay", "turun"],
  solana: [, "naik", "stay", "stay", "stay", "stay", "stay", "stay", "turun"],
  memecoin: ["naik", "naik", "stay", "stay", "stay", "turun"],
};
