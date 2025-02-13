/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

export async function before(m, { conn, participants }) {
  conn.danil_join = conn.danil_join
    ? conn.danil_join
    : {
        join: false,
        time: 0,
      };
  const currentTime = Math.floor(Date.now() / 1000);
  if (!m.isGroup || conn.danil_join["time"] > currentTime) {
    return;
  }

  // Periksa apakah pengguna adalah premium
  const isPremium = global.db.data.users[m.chat]?.premium;
  const nama = m.pushName;
  if (
    m.sender ===
    `${global.db.data.bots.info.nomorown || global.info.nomorown}@s.whatsapp.net`
  ) {
    await conn.sendMessage(
      m.chat,
      {
        text: global.db.data.bots.info.sambutan,
      },
      {
        quoted: fkontak,
      },
    );
    conn.danil_join = {
      join: true,
      time: Math.floor(Date.now() / 1000) + 2 * 1000,
    };
  }
}
