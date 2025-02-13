/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `Masukkan query! \n\nContoh: \n${usedPrefix + command} furina`,
    );
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let result = await fetch(`https://rest.cifumo.biz.id/api/genshin/info?q=${text}`);
  let js = await result.json();
  let {
    name,
    element,
    weapon,
    role,
    portrait,
    materials,
    bestWeapons,
    bestArtifacts,
    stats,
    teams,
    talents,
    passives,
    constellations,
  } = js.data;
  let tek = `*[ Genshin Character Info ]*\n\n`;
  tek += `🌟 *Name:* ${name}\n`;
  tek += `🔥 *Element:* ${element}\n`;
  tek += `⚔️ *Weapon:* ${weapon}\n`;
  tek += `🎭 *Role:* ${role}\n\n`;
  tek += `> *Stats*\n`;
  tek += `- *Sands:* ${stats.Sands}\n`;
  tek += `- *Goblet:* ${stats.Goblet}\n`;
  tek += `- *Circlet:* ${stats.Circlet}\n`;
  tek += `- *Substats:* ${stats.Substats}`;

  let materialText = `> 📜 *Materials*\n`;
  materials.forEach((v, i) => {
    materialText += `• ${v.name}\n`;
  });

  let bestWeaponText = `> 🗡️ *Best Weapons*\n`;
  bestWeapons.forEach((v, i) => {
    bestWeaponText += `- ${v.rank} - ${v.name}\n`;
  });

  let bestArtifactText = `> 🛡️ *Best Artifacts*\n`;
  bestArtifacts.forEach((v, i) => {
    bestArtifactText += `- ${v.rank} - ${v.name} (${v.count})\n`;
  });

  let teamText = '';
  if (teams.length > 0) {
    teamText = `> 👥 *Teams*\n`;
    teams.forEach((team, index) => {
      teamText += `🌟 *Team ${index + 1}: ${team.name}*\n`;
      team.characters.forEach((v, i) => {
        teamText += `- ${v.name} - ${v.element}\n`;
      });
      teamText += `\n`;
    });
  }

  let talentsText = `> 🎮 *Talents*\n`;
  talents.forEach((v, i) => {
    talentsText += `• *${v.title} - ${v.name}*\n`;
    talentsText += `\`${v.description}\`\n\n`;
  });

  let passivesText = `> ⚙️ *Passives*\n`;
  passives.forEach((v, i) => {
    passivesText += `• *${v.title} - ${v.name}*\n`;
    passivesText += `\`${v.description}\`\n\n`;
  });

  let constellationsText = `> 🌌 *Constellations*\n`;
  constellations.forEach((v, i) => {
    constellationsText += `• *${v.title} - ${v.name}*\n`;
    constellationsText += `\`${v.description}\`\n\n`;
  });

  let message = tek + '\n\n' +
    materialText + '\n\n' +
    bestWeaponText + '\n\n' +
    bestArtifactText + '\n\n' +
    teamText + '\n\n' +
    talentsText + '\n\n' +
    passivesText + '\n\n' +
    constellationsText;

  await conn.sendFile(m.chat, portrait, 'error.jpg', message, m)
};

handler.help = ["infogenhsin"];
handler.tags = ["search"];
handler.command = /^(infogenshin)$/i;
handler.limit = true; handler.error = 0

export default handler;