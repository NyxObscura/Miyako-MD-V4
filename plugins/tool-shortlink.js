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
let handler = async (m, { conn, usedPrefix, command, args }) => {
  if (/short(url|link)?/i.test(command)) {
    switch (args[1] || "") {
      case "1":
        axios
          .get(API("lol", "/api/shortlink", { url: args[0] }, "apikey"))
          .then((v) => {
            m.reply(v.result);
          });
        break;
      case "2":
        axios
          .get(API("lol", "/api/shortlink2", { url: args[0] }, "apikey"))
          .then((v) => {
            m.reply(v.result);
          });
        break;
      case "3":
        axios
          .get(API("lol", "/api/shortlink3", { url: args[0] }, "apikey"))
          .then((v) => {
            m.reply(v.result);
          });
        break;
      case "4":
        axios
          .get(API("lol", "/api/shortlink3", { url: args[0] }, "apikey"))
          .then((v) => {
            m.reply(v.result);
          });
        break;
      default:
        return m.reply(
          `Format Salah!\n*Contoh:*\n${usedPrefix + command} https://google.com 1`,
        );
    }
  }
};
handler.help = ["shortlink"];
handler.tags = ["internet"];
handler.command = /^(short(url|link)?)$/i;
handler.limit = true; handler.error = 0
export default handler;
