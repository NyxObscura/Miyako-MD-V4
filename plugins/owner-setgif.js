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
- owner
- internet
- quotes
- fun
- anime
- info
- rpg
- maker
- islam
- game
- download
- group
- sticker
- aimenu
- premium
- tools
- ai
- all`;
    m.reply(
      `Harap masukkan URL setelah perintah ${usedPrefix + command} owner\n\nDaftar set yang tersedia:\n${setList}`,
    );
    return;
  }

  const args = text.trim().split(/\s+/);
  const linkType = args.shift().toLowerCase();
  const newLink = args.join(" ");

  switch (linkType) {
    case "owner":
      global.db.data.bots.menugif.menuowner = newLink;
      break;
    case "internet":
      global.db.data.bots.menugif.menuinternet = newLink;
      break;
    case "quotes":
      global.db.data.bots.menugif.menuquotes = newLink;
      break;
    case "fun":
      global.db.data.bots.menugif.menufun = newLink;
      break;
    case "anime":
      global.db.data.bots.menugif.menuanime = newLink;
      break;
    case "info":
      global.db.data.bots.menugif.menuinfo = newLink;
      break;
    case "rpg":
      global.db.data.bots.menugif.menurpg = newLink;
      break;
    case "maker":
      global.db.data.bots.menugif.menumaker = newLink;
      break;
    case "islam":
      global.db.data.bots.menugif.menuislam = newLink;
      break;
    case "game":
      global.db.data.bots.menugif.menugame = newLink;
      break;
    case "download":
      global.db.data.bots.menugif.menudownload = newLink;
      break;
    case "group":
      global.db.data.bots.menugif.menugroup = newLink;
      break;
    case "sticker":
      global.db.data.bots.menugif.menusticker = newLink;
      break;
    case "aimenu":
      global.db.data.bots.menugif.menuai = newLink;
      break;
    case "premium":
      global.db.data.bots.menugif.menupremium = newLink;
      break;
    case "tools":
      global.db.data.bots.menugif.menutools = newLink;
      break;
    case "ai":
      global.db.data.bots.menugif.menuai = newLink;
      break;
    case "all":
      global.db.data.bots.menugif.menuall = newLink;
      break;
    case "menu":
      global.db.data.bots.menugif.menu = newLink;
      break;
    default:
      m.reply("Tipe link tidak valid");
      return;
  }

  m.reply(`Berhasil mengubah ${linkType}`);
};

handler.help = ["setgif <tipe_link> <url>"];
handler.tags = ["owner"];
handler.owner = true;
handler.command = /^(setgif)$/i;

export default handler;
