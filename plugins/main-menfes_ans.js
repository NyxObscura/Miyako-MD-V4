/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

export async function before(m, { conn, usedPrefix, command }) {
  const body = m.body;
  const budy = typeof m.text == "string" ? m.text : "";

  const isCmd = budy.startsWith(usedPrefix);

  if (!global.db.data.menfess) global.db.data.menfess = {}; // Tambahkan pemeriksaan keberadaan objek

  if (!m.fromMe && !m.isGroup) {
    let room = Object.values(global.db.data.menfess).find(
      (room) => room.status == "WAITING" && [room.a, room.b].includes(m.sender),
    );
    let teks_menfes = `_Chat Sudah Terhubung Otomatis ✓_\n_Sekarang kamu dapat mengirim pesan_\n_Atau bisa kirim media seperti_\n_Sticker/Audio/Video/Image/VN_\n\n_Dilarang Spam Room Chat_\n_Ketahuan : Banned_\n\n_Jika pesan kamu direaction : 📨_\n_Tandanya pesan kamu terkirim ke target_\n\n_Ketik /stopmenfes untuk Berhenti menfess_`;

    if (room && m.sender == room.b && room.status == "WAITING") {
      if (m.text.toLowerCase() === "y") {
        room.status = "CHATTING";
        await conn.reply(room.a, teks_menfes, m);
        await conn.reply(room.b, teks_menfes, m);
      } else if (m.text.toLowerCase() === "n") {
        await conn.reply(room.b, "Menfes berhasil di tolak!", m);
        await conn.reply(
          room.a,
          `@${room.b.split("@")[0]} menolak menfes kamu :(`,
          m,
        );
        delete global.db.data.menfess[room.id];
      } else {
        return m.reply(
          `Mohon masukkan keyword dengan benar!\n\nKirim Y untuk menerima menfes dan kirim N untuk menolak menfes`,
        );
      }
    }
  }

  if (!m.fromMe && !m.isGroup) {
    let room = Object.values(global.db.data.menfess).find(
      (room) =>
        [room.a, room.b].includes(m.sender) && room.status == "CHATTING",
    );
    if (room) {
      let other = room.a == m.sender ? room.b : room.a;
      await conn.copyNForward(
        other,
        m,
        true,
        m.quoted && m.quoted.fromMe
          ? { contextInfo: { ...m.msg.contextInfo, participant: other } }
          : {},
      );
      await conn.sendMessage(m.chat, { react: { text: "📨", key: m.key } });
    }
  }
}
