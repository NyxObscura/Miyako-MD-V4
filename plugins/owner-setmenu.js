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
      global.db.data.bots.menuthumb.menuowner = newLink;
      break;
    case "internet":
      global.db.data.bots.menuthumb.menuinternet = newLink;
      break;
    case "quotes":
      global.db.data.bots.menuthumb.menuquotes = newLink;
      break;
    case "fun":
      global.db.data.bots.menuthumb.menufun = newLink;
      break;
    case "anime":
      global.db.data.bots.menuthumb.menuanime = newLink;
      break;
    case "info":
      global.db.data.bots.menuthumb.menuinfo = newLink;
      break;
    case "rpg":
      global.db.data.bots.menuthumb.menurpg = newLink;
      break;
    case "maker":
      global.db.data.bots.menuthumb.menumaker = newLink;
      break;
    case "islam":
      global.db.data.bots.menuthumb.menuislam = newLink;
      break;
    case "game":
      global.db.data.bots.menuthumb.menugame = newLink;
      break;
    case "download":
      global.db.data.bots.menuthumb.menudownload = newLink;
      break;
    case "group":
      global.db.data.bots.menuthumb.menugroup = newLink;
      break;
    case "sticker":
      global.db.data.bots.menuthumb.menusticker = newLink;
      break;
    case "aimenu":
      global.db.data.bots.menuthumb.menuai = newLink;
      break;
    case "premium":
      global.db.data.bots.menuthumb.menupremium = newLink;
      break;
    case "tools":
      global.db.data.bots.menuthumb.menutools = newLink;
      break;
    case "ai":
      global.db.data.bots.menuthumb.menuai = newLink;
      break;
    case "all":
      global.db.data.bots.menuthumb.menuall = newLink;
      break;
    case "all":
      global.db.data.bots.menuthumb.menu = newLink;
      break;
    default:
      m.reply("Tipe link tidak valid");
      return;
  }

  m.reply(`Berhasil mengubah ${linkType}`);
};

handler.help = ["setmenu <tipe_link> <url>"];
handler.tags = ["owner"];
handler.owner = true;
handler.command = /^(setmenu)$/i;

export default handler;
