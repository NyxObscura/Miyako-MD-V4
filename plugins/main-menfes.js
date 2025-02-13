/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, text, args, command, usedPrefix }) => {
  const body = m.body;
  const budy = typeof m.text == "string" ? m.text : "";

  const isCmd = budy.startsWith(usedPrefix);
  const text1 = text.split("|")[0];
  const text2 = text.split("|")[1];
  const text3 = text.split("|")[2];

  let confess = "https://files.catbox.moe/9y5qxo.jpg"; // Tambahkan definisi variabel confess

  switch (command) {
    case "menfes":
    case "menfess":
    case "confes":
    case "confess":
      if (!global.db.data.menfess) global.db.data.menfess = {};

      let existingMenfess = Object.values(global.db.data.menfess).find(
        (room) =>
          room.id.startsWith("menfes") && [room.a, room.b].includes(m.sender),
      );
      if (existingMenfess)
        return m.reply(
          `Kamu masih berada dalam sesi menfes\nketik ${usedPrefix}stopmenfes untuk stop menfes`,
        );

      if (!text)
        return m.reply(
          `Kirim Perintah ${usedPrefix + command} nomor|pesan\n\nContoh :\n${usedPrefix + command} +62xxx|Halo`,
        );
      if (!text.includes("|"))
        return m.reply(
          `Kirim Perintah ${usedPrefix + command} nomor|pesan\n\nContoh :\n${usedPrefix + command} +62xxx|Halo`,
        );

      let crush = text1.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
      if (
        Object.values(global.db.data.menfess).find(
          (room) =>
            room.id.startsWith("menfes") && [room.a, room.b].includes(crush),
        )
      )
        return m.reply(
          `Orang yang kamu menfes sedang menfes bersama orang lain :)`,
        );
      if (crush.startsWith("0")) return m.reply(`Awali nomor dengan +62`);

      let cekno = conn.onWhatsApp(crush);
      if (cekno.length == 0)
        return m.reply(`Masukkan nomor yang valid dan terdaftar di WhatsApp!`);
      if (crush === m.sender) return m.reply(`Tidak bisa menfes diri sendiri!`);
      if (crush === conn.user.jid) return m.reply(`Tidak bisa menfes bot!`);

      let teks_menfes = `Hi 👋 ada menfess nih buat kamu\n\nPesan : ${text2}\n\n*Balas (Y/N)* untuk menerima atau menolak menfes\n\n_Pesan ini bersifat Rahasia dan Privasi_\n_Bot hanya menyampaikan saja_`;

      let id = "menfes_" + Date.now();
      global.db.data.menfess[id] = {
        id: id,
        a: m.sender,
        b: crush,
        status: "WAITING",
      };

      await conn.sendThumb(crush, teks_menfes, confess);
      await m.reply(
        `Pesan terkirim ke @${crush.split("@")[0]}\nSilahkan tunggu balasannya!`,
      );
      break;

    case "stop":
    case "stopmenfess":
    case "stopmenfes":
    case "stopconfes":
      if (!global.db.data.menfess) global.db.data.menfess = {};

      let room = Object.values(global.db.data.menfess).find(
        (room) =>
          room.id.startsWith("menfes") && [room.a, room.b].includes(m.sender),
      );
      if (!room) return m.reply("Belum ada sesi menfes!");

      let tujuan = room.a == m.sender ? room.b : room.a;
      await conn.sendMessage(
        tujuan,
        { text: `_Teman chat kamu telah menghentikan menfes ini_` },
        m,
      );
      await conn.reply(m.chat, "_Menfes berhasil di Berhentikan!_", m);
      delete global.db.data.menfess[room.id];
      break;

    default:
  }
};

handler.tags = ["main"];
handler.help = ["menfes", "confes", "stopconfes"];
handler.command =
  /^(menfe(s|ss)|confe(s|ss)|stop(menfes|menfess|confes|confess))$/i;
handler.register = true;
handler.private = true;

export default handler;
