/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
const { BingImageCreator } = await import("../lib/bing-image.js");

const handler = async (m, { conn, args, usedPrefix, command }) => {
  let text;
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else {
    m.reply("Input teks atau reply teks!");
  }

  await m.reply(wait);
  try {
    // Ambil cookie dari global.db.data.settings
    const settings = global.db.data.settings || {};
    const cookies = settings.cookie || [];

    let data = [];

    // Loop melalui setiap cookie
    for (let i = 0; i < cookies.length; i++) {
      const res = new BingImageCreator({ cookie: cookies.getRandom() });
      try {
        data = await res.createImage(text);

        // Jika berhasil mendapatkan data, hentikan loop
        if (data.length > 0) {
          break;
        }
      } catch (error) {
        // Jika terjadi kesalahan selain "Max retries reached: Request failed", lempar kesalahan
        if (!error.message.includes("Max retries reached: Request failed")) {
          throw error;
        }
      }
    }

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        try {
          if (!data[i].endsWith(".svg")) {
            await conn.sendFile(
              m.chat,
              data[i],
              "",
              `Image *(${i + 1}/${data.length})*\n\n*Prompt*: ${text}`,
              m,
              false,
              { mentions: [m.sender] },
            );
            await conn.delay(1000);
          }
        } catch (error) {
          console.error(`Error sending file: ${error.message}`);
          await m.reply(`Failed to send image *(${i + 1}/${data.length})*`);
        }
      }
    } else {
      await m.reply("No images found.");
    }
  } catch (error) {
    console.error(`Error in handler: ${error.message}`);
    await m.reply(`${error}\n\n${error.message}`);
  }
};

handler.help = ["bing-img *[query]*"];
handler.tags = ["ai"];
handler.command = /^(bing(img|image|-image|-img)?)$/i;
handler.register = true;
handler.premium = true; handler.error = 0
export default handler;
