/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*  
*/

/*  
*/

/*  
*/

import { totalmem, freemem } from 'os';
import osu from 'node-os-utils';
import { performance } from 'perf_hooks';
import { sizeFormatter } from 'human-readable';

const format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

const createBar = (percentage, length = 10) => {
  const filled = Math.round((percentage / 100) * length);
  return `[${'■'.repeat(filled)}${'□'.repeat(length - filled)}] ${percentage}%`;
};

const getStorageInfo = async () => {
  const drive = osu.drive;
  const { totalGb, usedGb } = await drive.info();
  return { total: totalGb, used: usedGb };
};

const xenz = async (m, { conn }) => {
  let start = performance.now();

  let { key } = await conn.sendMessage(m.chat, { text: 'TESTING' });

  let end = performance.now();
  let ping = Math.round(end - start);

  const totalMemory = totalmem();
  const freeMemory = freemem();
  const usedMemory = totalMemory - freeMemory;
  const memoryUsage = Math.round((usedMemory / totalMemory) * 100);

  const storage = await getStorageInfo();
  const storageUsage = Math.round((storage.used / storage.total) * 100);

  const output = `
PING: ${ping} ms

RAM:
${createBar(memoryUsage)}

STORAGE:
${createBar(storageUsage)}

Total Storage: ${storage.total} GB
Used Storage: ${storage.used} GB
  `.trim();

  await conn.sendMessage(m.chat, { text: output, edit: key });
};

xenz.help = ['ping', 'systeminfo'];
xenz.tags = ['info', 'tools'];
xenz.command = /^(ping|systeminfo|info)$/i;

export default xenz;