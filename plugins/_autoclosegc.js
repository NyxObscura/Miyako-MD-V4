/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import cron from "node-cron";

const handler = (m) => m;

// Menggunakan flag untuk menandai apakah pesan sudah dikirim
let messageSent = false;

handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
  let chat = global.db.data.chats[m.chat];
  if (chat.autoClose) {
    if (!isAdmin && isBotAdmin) {
      cron.schedule(
        "0 23 * * *",
        async () => {
          await conn.groupSettingUpdate(m.chat, "announcement");
          if (!messageSent) {
            await conn.reply(
              m.chat,
              `[!] Pengumuman\n\nOyasuminasai Group Telah di tutup, selamat tidur.`,
              null,
            );
            messageSent = true;
          }

          console.log("group telah di buka");
        },
        {
          scheduled: true,
          timezone: "Asia/Jakarta",
        },
      );
    }
    return;
  }
  return;
};

export default handler;
