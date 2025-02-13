/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

/*
MASIH TAHAP PENGEMBANGAN
let handler = async (m, { conn, text }) => {
  let user = global.db.data.users[m.sender];

  if (user.demon) {
    return conn.reply(m.chat, 'Anda bukan anggota Korps Pembasmi Iblis, Anda adalah Iblis.', m);
  }

  let monsters = [
    { area: "Kings Demon", name: "Kibutsuji Muzan", tier: "King", difficulty: "Extreme" },
    { area: "Top Tier", name: "Kokushibo", tier: "Top", difficulty: "Hard" },
    { area: "Top Tier", name: "Doma", tier: "Top", difficulty: "Hard" },
    { area: "Top Tier", name: "Akaza", tier: "Top", difficulty: "Hard" },
    { area: "Top Tier", name: "Hantengu", tier: "Top", difficulty: "Hard" },
    { area: "Top Tier", name: "Gyokko", tier: "Top", difficulty: "Hard" },
    { area: "Top Tier", name: "Daki dan Gyutaro", tier: "Top", difficulty: "Hard" },
    { area: "Mid Tier", name: "Enmu", tier: "Mid", difficulty: "Moderate" },
    { area: "Mid Tier", name: "Rokuro", tier: "Mid", difficulty: "Moderate" },
    { area: "Low Tier", name: "Wakuraba", tier: "Low", difficulty: "Easy" },
    { area: "Low Tier", name: "Mukago", tier: "Low", difficulty: "Easy" },
    { area: "Low Tier", name: "Rui", tier: "Low", difficulty: "Easy" },
    { area: "Low Tier", name: "Kamanue", tier: "Low", difficulty: "Easy" },
    { area: "Low Tier", name: "Susamaru", tier: "Low", difficulty: "Easy" },
    { area: "Low Tier", name: "Yahaba", tier: "Low", difficulty: "Easy" },
    { area: "Low Tier", name: "Kyogai", tier: "Low", difficulty: "Easy" },
    { area: "Low Tier", name: "Mother Spider Demon", tier: "Low", difficulty: "Easy" },
    { area: "Low Tier", name: "Father Spider Demon", tier: "Low", difficulty: "Easy" },
    { area: "Low Tier", name: "Older Brother Spider Demon", tier: "Low", difficulty: "Easy" },
    { area: "Low Tier", name: "Older Sister Spider Demon", tier: "Low", difficulty: "Easy" },
    { area: "Special Case", name: "Tamayo", tier: "Special", difficulty: "Moderate" },
    { area: "Special Case", name: "Yushiro", tier: "Special", difficulty: "Moderate" }
  ];

  let pengirim = m.sender.split("@")[0];

  let __timers = (new Date - user.lasthunt);
  let _timers = (300000 - __timers);
  let timers = clockString(_timers);

  let area_monsters = monsters[Math.floor(Math.random() * monsters.length)];
  let monster = area_monsters.name;
  let monsterArea = area_monsters.area;
  let monsterName = monster.toUpperCase();
  let monsterDifficulty = area_monsters.difficulty;
  let monsterTier = area_monsters.tier;

  const reductions = {
    'King': { health: 50, stamina: 40, strength: 20, defense: 20, attack: 30 },
    'Top': { health: 30, stamina: 25, strength: 15, defense: 15, attack: 20 },
    'Mid': { health: 20, stamina: 15, strength: 10, defense: 10, attack: 15 },
    'Low': { health: 10, stamina: 10, strength: 5, defense: 5, attack: 10 },
    'Special': { health: 15, stamina: 15, strength: 10, defense: 10, attack: 15 }
  };

  let reduction = reductions[monsterTier];

  if (new Date - user.lasthunt > 300000) {
    let coins = parseInt(Math.floor(Math.random() * 100000));
    let exp = parseInt(Math.floor(Math.random() * 10000));
    let _healing = `${Math.floor(Math.random() *     100)}`.trim();
    let healing = (_healing * 1);
    let demonBlood = Math.random() < 0.5 ? 1 : 0;

    user.health -= healing + reduction.health;
    user.stamina -= reduction.stamina;
    user.strength -= reduction.strength;
    user.defense -= reduction.defense;
    user.attack -= reduction.attack;
    user.lasthunt = new Date * 1;

    if (user.health < 0) {
      let msg = `*@${pengirim}* Anda Mati Dibunuh Oleh ${monsterName} 🩸`;
      if (user.level > 0) {
        if (user.katana > 0) {
          user.level -= 1;
          user.katanadurability -= 5;
          user.exp -= exp * 1;
          msg += `\nLevel Anda Turun 1 Karena Mati Saat Berburu!\nDurability Katana Anda Berkurang 5 Karena Mati Saat Berburu!`;
        }
      }
      user.health = 100;
      conn.reply(m.chat, msg, m);
      return;
    }

    user.money += coins * 1;
    user.exp += exp * 1;
    user.katanadurability -= 1;
    user.tiketcoin += 1;
    user.demonblood = (user.demonblood || 0) + demonBlood;

    if (!user.demonkill) {
      user.demonkill = 0;
    }
    user.demonkill += 1;

    let pesan = `Kamu Bertemu *${monsterName}* 🩸\ndari _${monsterArea}_ Dan Berhasil Membunuhnya:\n
💰 ${new Intl.NumberFormat('en-US').format(coins)} *Money*
🧠 ${new Intl.NumberFormat('en-US').format(exp)} *Xp*
❤️ -${healing} *Health*\n
Pengurangan:
❤️ -${reduction.health} *Health*
💪 -${reduction.strength} *Strength*
🛡️ -${reduction.defense} *Defense*
⚔️ -${reduction.attack} *Attack*
🏃‍♂️ -${reduction.stamina} *Stamina*\n
• Tersisa ${user.health} *Health*
🎟️ +1 *Tiketcoin*
⚔️ *Katana Durability* ${user.katanadurability}
${demonBlood > 0 ? `🩸 +${demonBlood} *Demon Blood*` : ''}
👹 *Total Demon Killed* ${user.demonkill}
🩸 *Total Demon Blood* ${user.demonblood || 0}`;
    
    conn.reply(m.chat, pesan, m, {
      contextInfo: {
        externalAdReply: {
          mediaType: 1,
          title: 'Lorzaby',
          thumbnailUrl: 'https://telegra.ph/file/fdc90de73b6b0d8d199e3.jpg',
          renderLargerThumbnail: true,
          sourceUrl: ''
        }
      }
    });
  } else {
    conn.reply(m.chat, `Tunggu *${timers}* Untuk Berburu Demon Lagi ⏳`, m);
  }
};

handler.help = ['demonslayer'];
handler.tags = ['game'];
handler.command = /^demonslayer/i;
handler.limit = true;
handler.group = true;
handler.fail = null;

export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
*/