/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import _blockcmd from "../lib/blockcmd.js";
let handler = async (m, { conn, text, isOwner }) => {
  const listcmdblock = db.data.blockcmd || {};
  if (!text)
    return m.reply(`Textnya mana cih\n\nContoh : .blockcmd menu\nGituuuuuuu`);
  if (_blockcmd.check(text, listcmdblock))
    return m.reply(`Command tersebut sudah ada di database`);
  _blockcmd.add(text, listcmdblock);
  m.reply(
    `Berhasil memblokir command 「 *${text}* 」\nsilakan ketik .listblockcmd untuk melihat\ndaftar command yang telah di block`,
  );
};
handler.help = ["user"];
handler.tags = ["owner"];
handler.command = ["blockcmd"];
handler.owner = true;

export default handler;
