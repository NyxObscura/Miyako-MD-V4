/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let handler = async (m, { conn }) => {
  var ayg = global.db.data.users[m.sender];
  var beb = global.db.data.users[global.db.data.users[m.sender].pacar];

  if (ayg.pacar == "") {
    return conn.reply(m.chat, `Kamu Tdak Memiliki pacar.`, m);
  }
  if (typeof beb == "undefined") {
    conn.reply(
      m.chat,
      `Berhasil Putus Hubungan Dengan @${global.db.data.users[m.sender].pacar.split("@")[0]}`,
      m,
      {
        contextInfo: {
          mentionedJid: [global.db.data.users[m.sender].pacar],
        },
      },
    );
    ayg.pacar = "";
  }

  if (m.sender == beb.pacar) {
    conn.reply(
      m.chat,
      `Berhasil Putus Hubungan Dengan @${global.db.data.users[m.sender].pacar.split("@")[0]}`,
      m,
      {
        contextInfo: {
          mentionedJid: [global.db.data.users[m.sender].pacar],
        },
      },
    );
    ayg.pacar = "";
    beb.pacar = "";
  } else {
    conn.reply(m.chat, `Kamu Tidak Memiliki pacar.`, m);
  }
};
handler.help = ["putus"];
handler.tags = ["group", "fun"];
handler.command = /^(putus)$/i;
handler.group = true;
handler.fail = null;
export default handler;
