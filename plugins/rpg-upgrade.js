/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
const price = {
  fishingrod: {
    wood: 100,
    string: 100,
    money: 100000,
  },
  pickaxe: {
    wood: 100,
    iron: 100,
    money: 100000,
  },
  sword: {
    wood: 100,
    iron: 100,
    money: 100000,
  },
  armor: {
    iron: 100,
    gold: 10,
    money: 100000,
  },
  atm: {
    emerald: 10,
    money: 10000,
  },
};

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let { stock } = global.db.data.bots;
  let user = global.db.data.users[m.sender];
  let type = (args[0] || "").toLowerCase();
  let upgradeLevels = parseInt(args[1]) || 1; // Jumlah level yang di-upgrade, default 1 jika tidak ada argumen kedua

  switch (type) {
    case "fishingrod": {
      let { wood, string, money } = price[type];
      if (user[type] === 0) return m.reply(`Kamu belum memiliki ${type}`);
      if (user[type] > 9) return m.reply(`Level ${type} kamu telah Max!`);
      if (
        wood * user[type] > user.wood ||
        string * user[type] > user.string ||
        money * user[type] > user.money
      )
        return m.reply(
          `
Material kamu kurang!!
${wood * user[type] > user.wood ? `${global.rpg.emoticon("wood")}Wood Kamu Kurang *${wood * user[type] - user.wood}*` : ""}
${string * user[type] > user.string ? `${global.rpg.emoticon("string")}String Kamu Kurang *${string * user[type] - user.string}*` : ""}
${money * user[type] > user.money ? `${global.rpg.emoticon("money")}Uang Kamu Kurang *${money * user[type] - user.money}*` : ""}
`.trim(),
        );
      user.fishingrod += 1;
      user.wood -= wood * user[type];
      stock.wood += wood * user[type];

      user.string -= string * user[type];
      stock.string += string * user[type];

      user.money -= money * user[type];
      user.fishingroddurability = user.fishingrod * 50;
      m.reply(
        `Sukses mengupgrade ${type + global.rpg.emoticon(type)} ke level ${user.fishingrod} dan menambah durability sebanyak ${user[type + "durability"]}`,
      );
      break;
    }
    case "pickaxe": {
      let { wood, iron, money } = price[type];
      if (user[type] === 0) return m.reply(`Kamu belum memiliki ${type}`);
      if (user[type] > 9) return m.reply(`Level ${type} kamu telah Max!`);
      if (
        wood * user[type] > user.wood ||
        iron * user[type] > user.iron ||
        money * user[type] > user.money
      )
        return m.reply(
          `
Material kamu kurang!!
${wood * user[type] > user.wood ? `${global.rpg.emoticon("wood")}Wood Kamu Kurang *${wood * user[type] - user.wood}*` : ""}
${iron * user[type] > user.iron ? `${global.rpg.emoticon("iron")}Iron Kamu Kurang *${iron * user[type] - user.iron}*` : ""}
${money * user[type] > user.money ? `${global.rpg.emoticon("money")}Uang Kamu Kurang *${money * user[type] - user.money}*` : ""}
`.trim(),
        );
      user.pickaxe += 1;
      user.wood -= wood * user[type];
      stock.wood += wood * user[type];

      user.iron -= iron * user[type];
      stock.iron += iron * user[type];

      user.money -= money * user[type];
      user.pickaxedurability = user.pickaxe * 50;
      m.reply(
        `Sukses mengupgrade ${type + global.rpg.emoticon(type)} ke level ${user.pickaxe} dan menambah durability sebanyak ${user[type + "durability"]}`,
      );
      break;
    }
    case "sword": {
      let { wood, iron, money } = price[type];
      if (user[type] === 0) return m.reply(`Kamu belum memiliki ${type}`);
      if (user[type] > 9) return m.reply(`Level ${type} kamu telah Max!`);
      if (
        wood * user[type] > user.wood ||
        iron * user[type] > user.iron ||
        money * user[type] > user.money
      )
        return m.reply(
          `
Material kamu kurang!!
${wood * user[type] > user.wood ? `${global.rpg.emoticon("wood")}Wood Kamu Kurang *${wood * user[type] - user.wood}*` : ""}
${iron * user[type] > user.iron ? `${global.rpg.emoticon("iron")}Iron Kamu Kurang *${iron * user[type] - user.iron}*` : ""}
${money * user[type] > user.money ? `${global.rpg.emoticon("money")}Uang Kamu Kurang *${money * user[type] - user.money}*` : ""}
`.trim(),
        );
      user.sword += 1;
      user.wood -= wood * user[type];
      stock.wood += wood * user[type];

      user.iron -= iron * user[type];
      stock.iron += iron * user[type];

      user.money -= money * user[type];
      user.sworddurability = user.sword * 50;
      m.reply(
        `Sukses mengupgrade ${type + global.rpg.emoticon(type)} ke level ${user.sword} dan menambah durability sebanyak ${user[type + "durability"]}`,
      );
      break;
    }
    case "armor": {
      let { iron, gold, money } = price[type];
      if (user[type] === 0) return m.reply(`Kamu belum memiliki ${type}`);
      if (user[type] > 9) return m.reply(`Level ${type} kamu telah Max!`);
      if (
        iron * user[type] > user.iron ||
        gold * user[type] > user.gold ||
        money * user[type] > user.money
      )
        return m.reply(
          `
Material kamu kurang!!
${iron * user[type] > user.iron ? `${global.rpg.emoticon("iron")}Iron Kamu Kurang *${iron * user[type] - user.iron}*` : ""}
${gold * user[type] > user.gold ? `${global.rpg.emoticon("gold")}Gold Kamu Kurang *${gold * user[type] - user.gold}*` : ""}
${money * user[type] > user.money ? `${global.rpg.emoticon("money")}Uang Kamu Kurang *${money * user[type] - user.money}*` : ""}
`.trim(),
        );
      user.armor += 1;
      user.iron -= iron * user[type];
      stock.iron += iron * user[type];

      user.gold -= gold * user[type];
      stock.gold += gold * user[type];

      user.money -= money * user[type];
      user.armordurability = user.armor * 50;
      m.reply(
        `Sukses mengupgrade ${type + global.rpg.emoticon(type)} ke level ${user.armor} dan menambah durability sebanyak ${user[type + "durability"]}`,
      );
      break;
    }
    case "atm": {
      let { emerald, money } = price[type];
      if (user[type] === 0) return m.reply(`Kamu belum memiliki ${type}`);
      if (user[type] + upgradeLevels > 999)
        return m.reply(`Level ${type} kamu telah Max!`);

      if (
        emerald * upgradeLevels > user.emerald ||
        money * upgradeLevels > user.money
      )
        return m.reply(
          `
Material kamu kurang!!
${emerald * upgradeLevels > user.emerald ? `${global.rpg.emoticon("emerald")}Emerald Kamu Kurang *${emerald * upgradeLevels - user.emerald}*` : ""}
${money * upgradeLevels > user.money ? `${global.rpg.emoticon("money")}Uang Kamu Kurang *${money * upgradeLevels - user.money}*` : ""}
`.trim(),
        );

      user.atm += upgradeLevels;
      user.emerald -= emerald * upgradeLevels;
      stock.emerald += emerald * upgradeLevels;

      user.money -= money * upgradeLevels;
      user.fullatm = user.atm * 500000000;
      m.reply(
        `Sukses mengupgrade ${type + global.rpg.emoticon(type)} ke level ${user.atm} dan menambah storage sebanyak ${user["fullatm"]}`,
      );
      break;
    }
    default:
      return m.reply(
        `
█▀▀▀▀█▀▀▀▀█▀▀▀▀█
█────█────█────█
█▄▄▄▄█▄▄▄▄█▄▄▄▄█
█▀▀▀▀█▀▀▀▀█▀▀▀▀█
█────█────█────█
█▄▄▄▄█▄▄▄▄█▄▄▄▄█

Gunakan Format *${usedPrefix}${command} [type] [jumlah]*
contoh *${usedPrefix}${command} atm 100*

_*乂 List Yang Bisa Di Upgrade*_
▧ Fishingrod ${global.rpg.emoticon("fishingrod")}
▧ Pickaxe ${global.rpg.emoticon("pickaxe")}
▧ Sword ${global.rpg.emoticon("sword")}
▧ Armor ${global.rpg.emoticon("armor")}
▧ Atm ${global.rpg.emoticon("atm")}

_*乂 Recipe & Price*_
▧ Fishingrod ${global.rpg.emoticon("fishingrod")}
〉 ${price.fishingrod.wood * user.fishingrod} Wood
〉 ${price.fishingrod.string * user.fishingrod} String
〉 ${price.fishingrod.money * user.fishingrod} Money

▧ Pickaxe ${global.rpg.emoticon("pickaxe")}
〉 ${price.pickaxe.wood * user.pickaxe} Wood
〉 ${price.pickaxe.iron * user.pickaxe} Iron
〉 ${price.pickaxe.money * user.pickaxe} Money

▧ Sword ${global.rpg.emoticon("sword")}
〉 ${price.sword.wood * user.sword} Wood
〉 ${price.sword.iron * user.sword} Iron
〉 ${price.sword.money * user.sword} Money

▧ Armor ${global.rpg.emoticon("armor")}
〉 ${price.armor.iron * user.armor} Iron
〉 ${price.armor.gold * user.armor} Gold
〉 ${price.armor.money * user.armor} Money

▧ Atm ${global.rpg.emoticon("atm")}
〉 ${price.atm.emerald * user.atm} Emerald
〉 ${price.atm.money * user.atm} Money
`.trim(),
      );
  }
};
handler.help = ["upgrade"];
handler.tags = ["rpg"];
handler.command = /^(up(grade)?)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;

export default handler;
