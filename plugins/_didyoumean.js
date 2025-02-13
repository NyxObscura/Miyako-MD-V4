/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import similarity from 'similarity';

const emojiMap = {
  100: '✨',
  90: '💯',
  80: '🌟',
  70: '😍',
  60: '😊',
  50: '😎',
  40: '🤔',
  30: '😐',
  20: '🤓',
  10: '😅',
  0: '😶‍🌫️'
};

const getRandomEmoji = (percentageScore) => emojiMap[Math.floor(percentageScore / 10) * 10];

export async function before(m, { match, usedPrefix }) {
  try {
    if ((usedPrefix = (match[0] || '')[0]) !== undefined) {
    const q = m || m.quoted || null;
      const noPrefix = (q.text.replace(usedPrefix, '').trim().split(' ')[0].toLowerCase());
      const help = [...new Set((await Promise.all(Object.values(plugins)
        .filter(v => v.help && !v.disabled)
        .map(async v => (await Promise.all(v.help.map(entry => entry.trim().split(' ')[0].toLowerCase()))).filter(value => value.trim())))).flat())];

      const ratings = await Promise.all(help.map(async target => ({ target, rating: similarity(noPrefix, target) })));

      const filteredMatches = ratings
        .sort((a, b) => b.rating - a.rating)
        .map(item => ({ ...item, rating: item.rating.toFixed(2) }))
        .filter(item => item.rating > 0.5);

      const groupedMatches = new Map();

      await Promise.all(filteredMatches.map(async item => {
        const percentageScore = (item.rating * 100).toFixed(0);
        if (!groupedMatches.has(percentageScore)) {
          groupedMatches.set(percentageScore, { score: percentageScore, targets: [] });
        }
        const group = groupedMatches.get(percentageScore);
        if (group.targets.length < 5) group.targets.push(item.target);
      }));

      const resultText = (await Promise.all(Array.from(groupedMatches.values())
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(async (group, index) => {
          const sortedTargets = (await Promise.all(group.targets.slice(0, 5).sort((a, b) => a.localeCompare(b)).map(async target => `   - ${usedPrefix + target}`))).join('\n');
          return `*${index + 1}.* Similarity: *${group.score}%*\n${sortedTargets}`;
        }))).join('\n\n');

      const mentionedJid = m.mentionedJid?.[0] ?? (m.fromMe ? this.user.jid : m.sender);
      const senderName = (await this.getName(mentionedJid)).split('\n')[0];

      const shouldSendMessage = (
  groupedMatches.size > 0 &&
  !filteredMatches.some(item => item.target === noPrefix) &&
  !m.isCommand &&
  !help.some(item => item === noPrefix) &&
  !['=>', '>', '$'].some(char => q.text.startsWith(char))
);

if (shouldSendMessage) {
  await this.sendMessage(m.chat, {
    text: `Halo @${mentionedJid.split('@')[0]} !\n*Apakah Ini Yang di Cari?:* \n ${resultText}`,
    mentions: [mentionedJid]
  }, { quoted: m });
  groupedMatches.clear();
}
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

export const disabled = false;