/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { dare } from "@bochilteam/scraper";

let handler = async (m, { conn, usedPrefix }) => {
  m.reply(await dare());
};
handler.help = ["dare"];
handler.tags = ["fun"];
handler.command = /^(dare)$/i;

export default handler;
