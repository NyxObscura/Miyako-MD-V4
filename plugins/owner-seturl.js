/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    const setList = `
- ig
- group
- chid
- chlink
- fb
- gh
- tt`;
    m.reply(
      `Harap masukkan URL setelah perintah ${usedPrefix + command}\n\nDaftar tipe link yang tersedia:\n${setList}`,
    );
    return;
  }

  const args = text.trim().split(/\s+/);
  const linkType = args.shift().toLowerCase();
  const newLink = args.join(" ");

  switch (linkType) {
    case "ig":
      global.db.data.bots.link.ig = newLink;
      break;
    case "group":
      global.db.data.bots.link.group = newLink;
      break;
    case "chid":
      global.db.data.bots.link.chid = newLink;
      break;
    case "chlink":
      global.db.data.bots.link.chlink = newLink;
      break;
    case "fb":
      global.db.data.bots.link.fb = newLink;
      break;
    case "gh":
      global.db.data.bots.link.gh = newLink;
      break;
    case "tt":
      global.db.data.bots.link.tt = newLink;
      break;
    default:
      m.reply("Tipe link tidak valid");
      return;
  }

  m.reply(`Berhasil mengubah ${linkType} link`);
};

handler.help = ["seturl <tipe_link> <url>"];
handler.tags = ["owner"];
handler.owner = true;
handler.command = /^(seturl)$/i;

export default handler;
