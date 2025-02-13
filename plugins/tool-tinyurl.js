/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*
 * @Author: Cifumo
 * @Web: https://rest.cifumo.biz.id
 */

import axios from "axios";
import fetch from "node-fetch";
let handler = async (m, { text, conn, args }) => {
  if (!text) return m.reply("• *Example :* .tinyurl https://instagram.com")
  const url = await fetch(
    "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(text),
  );
  conn.reply(m.chat, url, m);
};

handler.help = ["tinyurl"].map((v) => v + " <link>");
handler.tags = ["tools"];
handler.command = /^tinyurl$/i;
handler.limit = true; handler.error = 0

export default handler;
