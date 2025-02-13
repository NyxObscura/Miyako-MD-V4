/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";
let handler = async (m, { conn, command }) => {
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let url = await axios.get(
    "https://raw.githubusercontent.com/veann-xyz/result-daniapi/main/cecan/cecan.json",
  );
  let image = url.data.getRandom();
  conn.sendFile(m.chat, image, "cecan.jpeg", null, m, false);
};
handler.help = ["cecan"];
handler.tags = ["internet"];
handler.command = /^(cecan)$/i;
handler.limit = true; handler.error = 0
export default handler;
