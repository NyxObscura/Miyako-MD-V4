/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import moment from "moment-timezone";
import fs from "fs";
let handler = async (
  m,
  { conn, usedPrefix, command, args, isOwner, isAdmin, isMods, isPrems },
) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command);
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  let bot = global.db.data.settings[conn.user.jid] || {};
  if (!isOwner && m.chat.endsWith("@s.whatsapp.net"))
    return global.dfail("group", m, conn);
  let name = user.registered ? user.name : conn.getName(m.sender);
  let type = (args[0] || "").toLowerCase();
  let isAll = false,
    isUser = false;
  let caption = `
${
  !isOwner || m.chat.endsWith("@g.us")
    ? `
❏ *Admin Command :*
• adminonly ${chat.adminOnly ? "*( ON )*" : "*( OFF )*"}
• antilink ${chat.antiLinks ? "*( ON )*" : "*( OFF )*"}
• antibot ${chat.antibot ? "*( ON )*" : "*( OFF )*"}
• antinsfw ${chat.antiNsfw ? "*( ON )*" : "*( OFF )*"}
• autoclose ${chat.autoClose ? "*( ON )*" : "*( OFF )*"}
• antivn ${chat.antiVn ? "*( ON )*" : "*( OFF )*"}
• antilinkgc ${chat.antiLinkGc ? "*( ON )*" : "*( OFF )*"}
• antilinkwa ${chat.antiLinkWa ? "*( ON )*" : "*( OFF )*"}
• antilink2 ${chat.antiToxic ? "*( ON )*" : "*( OFF )*"}
• antibadword ${chat.antiBadword ? "*( ON )*" : "*( OFF )*"}
• antidelete ${chat.antidelete ? "*( ON )*" : "*( OFF )*"}
• antiviewonce ${chat.viewonce ? "*( ON )*" : "*( OFF )*"}
• antisticker ${chat.antiSticker ? "*( ON )*" : "*( OFF )*"}
• antivirtex ${chat.antiVirtex ? "*( ON )*" : "*( OFF )*"}
• restrict ${chat.pembatasan ? "*( ON )*" : "*( OFF )*"}
• game ${chat.game ? "*( ON )*" : "*( OFF )*"}
• rpg ${chat.rpg ? "*( ON )*" : "*( OFF )*"}
• nsfw ${chat.nsfw ? "*( ON )*" : "*( OFF )*"}
• welcome ${chat.welcome ? "*( ON )*" : "*( OFF )*"}
• autolevelup ${chat.autolevelup ? "*( ON )*" : "*( OFF )*"}
• autodownload ${chat.autodownload ? "*( ON )*" : "*( OFF )*"}
• komikupdate ${chat.komikUpdate ? "*( ON )*" : "*( OFF )*"}
• animeupdate ${chat.animeUpdate ? "*( ON )*" : "*( OFF )*"}
• youtubeupdate ${chat.youtubeupdate ? "*( ON )*" : "*( OFF )*"}
`
    : ""
}
❏ *Owner Command :*
• autobackup ${bot.backup ? "*( ON )*" : "*( OFF )*"}
• autocleartmp ${bot.cleartmp ? "*( ON )*" : "*( OFF )*"}
• autoread ${bot.autoread ? "*( ON )*" : "*( OFF )*"}
• autorestock ${bot.autoRestock ? "*( ON )*" : "*( OFF )*"}
• composing ${bot.composing ? "*( ON )*" : "*( OFF )*"}
• gconly ${opts.gconly ? "*( ON )*" : "*( OFF )*"}
• pconly ${opts.pconly ? "*( ON )*" : "*( OFF )*"}
• public ${!opts.self ? "*( ON )*" : "*( OFF )*"}
• anticall ${bot.anticall ? "*( ON )*" : "*( OFF )*"}
• noprint ${opts.noprint ? "*( ON )*" : "*( OFF )*"}
• adreply ${bot.adReply ? "*( ON )*" : "*( OFF )*"}

––––––––––––––––––––––––

💁🏻‍♂ ᴛɪᴘ :
➠ ᴛʏᴘᴇ ᴄᴏᴍᴍᴀɴᴅ :
${usedPrefix + command} [options]
• ᴇxᴀᴍᴩʟᴇ:
${usedPrefix + command} adminonly
`.trim();
  switch (type) {
    case "welcome":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.welcome = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "adminonly":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.adminOnly = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "autodownload":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.autodownload = isEnable;
      } else {
        if (!isPrems) {
          global.dfail("premium", m, conn);
          return false;
        }
        user.autodownload = isEnable;
      }
      break;
    case "autolevelup":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.autolevelup = isEnable;
      } else {
        if (!isPrems) {
          global.dfail("premium", m, conn);
          return false;
        }
        user.autolevelup = isEnable;
      }
      break;
      case 'acc':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.acc = isEnable
      break;         
    case "detect":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.detect = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "antiviewonce":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.viewonce = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "antivn":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antiVn = isEnable;
      } else return global.dfail("group", m, conn);
      break;
      case "antibot":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antibot = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "antidelete":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antidelete = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "delete":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antidelete = !isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "text":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.teks = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "public":
      isAll = true;
      if (!isMods) {
        global.dfail("mods", m, conn);
        return false;
      }
      global.opts["self"] = !isEnable;
      break;
    case "antilink":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antiLinks = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "antilinkgc":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antiLinkGc = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "antilinkwa":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antiLinkWa = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "nsfw":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.nsfw = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "rpg":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.rpg = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "antivirtex":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antiVirtex = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "composing":
      if (!isMods) {
        global.dfail("mods", m, conn);
        return false;
      }
      bot.composing = isEnable;
      break;
    case "adreply":
      if (!isOwner) {
        global.dfail("owner", m, conn);
        return false;
      }
      bot.adReply = isEnable;
      break;
    case "loading":
      if (!isOwner) {
        global.dfail("owner", m, conn);
        return false;
      }
      bot.loading = isEnable;
      break;
    case "antisticker":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
      } else return global.dfail("group", m, conn);
      chat.antiSticker = isEnable;
      break;
    case "antibadword":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antiBadword = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "antilink2":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antiToxic = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "restrict":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.pembatasan = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "game":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.game = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "autoclose":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.autoClose = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "anticall":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
      }
      bot.anticall = isEnable;
      break;
    case "komikupdate":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
      }
      chat.komikUpdate = isEnable;
      break;
    case "animeupdate":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
      }
      chat.animeUpdate = isEnable;
      break;
     case "youtubeupdate":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
      }
      chat.youtubeUpdate = isEnable;
      break;
    case "antinsfw":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
      }
      chat.antiNsfw = isEnable;
      break;
    case "whitelistmycontacts":
      if (!isOwner) {
        global.dfail("owner", m, conn);
        return false;
      }
      conn.callWhitelistMode = isEnable;
      break;
    case "autobackup":
      isAll = true;
      if (!isOwner) {
        global.dfail("owner", m, conn);
        return false;
      }
      bot.backup = isEnable;
      break;
    case "autocleartmp":
      isAll = true;
      if (!isOwner) {
        global.dfail("owner", m, conn);
        return false;
      }
      bot.cleartmp = isEnable;
      break;
    case "autorestock":
      isAll = true;
      if (!isOwner) {
        global.dfail("owner", m, conn);
        return false;
      }
      bot.autoRestock = isEnable;
      break;
    case "autoread":
      isAll = true;
      if (!isMods) {
        global.dfail("mods", m, conn);
        return false;
      }
      bot.autoread = isEnable;
      break;
    case "noprint":
      isAll = true;
      if (!isMods) {
        global.dfail("mods", m, conn);
        return false;
      }
      global.opts["noprint"] = isEnable;
      break;
    case "pconly":
      isAll = true;
      if (!isMods) {
        global.dfail("mods", m, conn);
        return false;
      }
      global.opts["pconly"] = isEnable;
      break;
    case "gconly":
      isAll = true;
      if (!isMods) {
        global.dfail("mods", m, conn);
        return false;
      }
      global.opts["gconly"] = isEnable;
      break;
    case "swonly":
      isAll = true;
      if (!isMods) {
        global.dfail("mods", m, conn);
        return false;
      }
      global.opts["swonly"] = isEnable;
      break;
    default:
      return conn.adReply(
  m.chat,
  caption,
  wish() + " " + name,
  "Setiap command memiliki fungsi masing masing",
  "https://files.catbox.moe/u874oc.jpg",
  m,
);
  }
  await m.reply(
    `${type} berhasil ${isEnable ? "dinyalakan" : "dimatikan"} untuk ${isAll ? "bot ini" : "chat ini"} !`,
  );
};
handler.help = ["enable", "disable"];
handler.tags = ["tools"];
handler.command =
  /^((en|dis)able|setting|settings|(tru|fals)e|(turn)?o(n|ff)|[01])$/i;

export default handler;

function wish() {
  let wishloc = "";
  const time = moment.tz("Asia/Jakarta").format("HH");
  wishloc = "Hi";
  if (time >= 0) {
    wishloc = "Selamat Malam";
  }
  if (time >= 4) {
    wishloc = "Selamat Pagi";
  }
  if (time >= 11) {
    wishloc = "Selamat Siang";
  }
  if (time >= 15) {
    wishloc = "️Selamat Sore";
  }
  if (time >= 18) {
    wishloc = "Selamat Malam";
  }
  if (time >= 23) {
    wishloc = "Selamat Malam";
  }
  return wishloc;
}