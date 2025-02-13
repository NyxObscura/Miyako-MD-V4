/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { login, getBalance } from "../lib/saweria.js";

const handler = async (m, { conn, text }) => {
  const email = "mtiosaputra61@gmail.com";
  const pass = "susuwkuda13";

  try {
    if (/akun/i.test(text)) {
      await m.reply("akun");
      const loginn = await login(email, pass);
      const cap = `*[ Login Success ]*
*Akun Id* : ${loginn.data.user_id}

*Token* : ${loginn.data.token}
      `;
      await m.reply(cap);
    } else if (/cek/i.test(text)) {
      await m.reply("cek akun");
      const balance = await getBalance(email, pass);
      const caption = `*[ Cek akun ]*
*pending* : ${balance.data.pending}

*available* : ${balance.data.available}
      `;
      await m.reply(caption);
    } else {
      await m.reply('Masukkan query "akun" atau "cek"');
    }
  } catch (error) {
    await m.reply(`Terjadi kesalahan: ${error.message}`);
  }
};

handler.command = ["saweria"];
export default handler;
