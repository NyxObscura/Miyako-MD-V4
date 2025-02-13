/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

export async function before(m) {
  this.autosholat = this.autosholat ? this.autosholat : {};
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? this.user.jid
        : m.sender;
  let id = m.chat;
  if (id in this.autosholat) {
    return false;
  }
  let jadwalSholat = {
    Fajr: "04:42",
    Sunrise: "05:58",
    Dhuhr: "12:03",
    Asr: "15:09",
    Sunset: "18:08",
    Maghrib: "18:08",
    Isha: "19:38",
    Imsak: "04:32",
    Midnight: "00:03",
    Firstthird: "22:04",
    Lastthird: "02:01",
  };
  const date = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    }),
  );
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
    if (timeNow === waktu) {
      let caption = `@${who.split`@`[0]},\nWaktu *${sholat}* telah tiba, ambilah air wudhu dan segeralah shalat.\n\n*${waktu}*\n_untuk wilayah Jakarta dan sekitarnya._`;
      this.autosholat[id] = [
        this.reply(m.chat, caption, null, {
          contextInfo: {
            mentionedJid: [who],
            externalAdReply: {
              title: "Auto Sholat",
              thumbnail: await (
                await this.getFile(
                  "https://files.catbox.moe/3h9rn6.jpg",
                )
              ).data,
            },
          },
        }),
        setTimeout(() => {
          delete this.autosholat[id];
        }, 57000),
      ];
    }
  }
}
export const disabled = false;
