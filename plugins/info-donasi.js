/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fs from "fs";
let handler = async (m, { conn, usedPrefix }) => {
  let donasi = `
╭─「 • *ᴘᴜʟꜱᴀ* • 」
│ • *ᴛʜʀᴇᴇ* ${global.config.pulsa}
╰─────

╭─「 • *ᴇ-ᴡᴀʟʟᴇᴛ* • 」
│ • *ᴅᴀɴᴀ* ${global.config.dana ? global.config.dana : "ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ"}
│ • *ɢᴏᴘᴀʏ* ${global.config.gopay ? global.config.gopay : "ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ"}
│ • *ᴏᴠᴏ* ${global.config.ovo ? global.config.ovo : "ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ"}
╰─────

_◛˖ ᴛᴇʀɪᴍᴀᴋᴀꜱɪʜ ᴜɴᴛᴜᴋ ʏᴀɴɢ ꜱᴜᴅᴀʜ ʙᴇʀᴅᴏɴᴀꜱɪ_`;
  await conn.sendFile(
    m.chat,
    fs.readFileSync("./media/qris.jpg"),
    "qris.jpg",
    donasi,
    m,
  );
};
handler.help = ["donasi"];
handler.tags = ["info"];
handler.command = /^(donasi|donation)$/i;

export default handler;
