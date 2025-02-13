/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

const handler = async (m, { conn, text, args }) => {
  if (!text)
    return m.reply(`
  *List setinfo*
  - wm
  - ownername
  - nomorown
  - nomorbot
  - namabot
  - author
  - chtext
  - sambutan
  `);

  const infoType = args[0]?.toLowerCase();
  const newInfo = args.slice(1).join(" ");
  const infoData = global.db.data.bots.info;

  if (!infoType || !newInfo)
    return m.reply("Mohon masukkan tipe informasi dan teks baru dengan benar");

  switch (infoType) {
    case "wm":
      if (!newInfo) return m.reply("Mohon masukkan watermark baru");
      infoData.wm = newInfo;
      break;
    case "ownername":
      if (!newInfo) return m.reply("Mohon masukkan nama pemilik baru");
      infoData.ownername = newInfo;
      break;
    case "nomorown":
      if (!newInfo) return m.reply("Mohon masukkan nomor pemilik baru");
      infoData.nomorown = newInfo;
      break;
    case "nomorbot":
      if (!newInfo) return m.reply("Mohon masukkan nomor bot baru");
      infoData.nomorbot = newInfo;
      break;
    case "namabot":
      if (!newInfo) return m.reply("Mohon masukkan nama bot baru");
      infoData.namabot = newInfo;
      break;
    case "author":
      if (!newInfo) return m.reply("Mohon masukkan penulis baru");
      infoData.author = newInfo;
      break;
    case "chtext":
      if (!newInfo) return m.reply("Mohon masukkan teks perubahan baru");
      infoData.chtext = newInfo;
      break;
    case "sambutan":
      if (!newInfo) return m.reply("Mohon masukkan sambutan baru");
      infoData.sambutan = newInfo;
      break;
    default:
      return m.reply("Error: Tipe informasi tidak valid");
  }
  m.reply(`Berhasil mengganti ${infoType} menjadi ${newInfo}`);
};

handler.command = ["setinfo"];
handler.help = ["setinfo <type> <text>"];
handler.tags = ["owner"];
handler.owner = true;

export default handler;
