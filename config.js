import { watchFile, unwatchFile } from "fs";
import fs from 'fs';
import chalk from "chalk";
import { fileURLToPath } from "url";

global.config = {
  /*============== INFO LINK ==============*/
  instagram: "https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i",
  github: "https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i",
  group: "https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i",
  website: "https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i",

  /*============== PAYMENT ==============*/
  dana: "0895324070395",
  ovo: "0895324070395",
  gopay: "0895324070395",
  pulsa: "0895324070395",

  /*============== STAFF ==============*/
  owner: [["6281297662535", "MaouXenz", true]],

  /*============= PAIRING =============*/
  pairingNumber: "62895422800236",
  pairingAuth: true,

  /*============== API ==============*/
  APIs: {
    xteam: "https://api.xteam.xyz",
    lol: "https://api.lolhuman.xyz",
    males: "https://malesin.xyz",
    zein: "https://api.zahwazein.xyz",
    rose: "https://api.itsrose.rest",
    xzn: "https://skizo.tech",
    saipul: "https://saipulanuar.cf",
    clayza: "https://api.maelyn.tech",
    btc : "https://api.botcahx.eu.org",
  },

  APIKeys: {
    "https://api.zahwazein.xyz": "zenzkey_8bb60993ae",
    "https://api.xteam.xyz": "cristian9407",
    "https://api.lolhuman.xyz": "ZenOfficialDev",
    "https://api.itsrose.life": "cDNWfULJNfbrmt6dlSDOW01XX64HsTAiMPkA63II7u4SYIum5d0KSzywHRmfTiHl",
    "https://skizoasia.xyz": "zenOfficial",
    "https://api.maelyn.tech": "Rk-Ruka",
    "https://api.botcahx.eu.org": "xenzpedo",
  },

  /*============== TEXT ==============*/
  watermark: "Miyako-BotMD",
  author: "MaouXenz",
  loading: "Wait for loading sensei!",
  errorMsg: "Error Sensei",

  stickpack: "",
  stickauth: "© Miyako 2024-Latest",
  msg: {
    owner: '*ᴏᴡɴᴇʀ ᴏɴʟʏ •* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ ʙᴏᴛ !!',
    mods: '*ᴅᴇᴠᴇʟᴏᴘᴇʀ ᴏɴʟʏ •* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙᴏᴛ !!',
    premium: '*ᴘʀᴇᴍɪᴜᴍ ᴏɴʟʏ •* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴍᴇᴍʙᴇʀ ᴘʀᴇᴍɪᴜᴍ !!',
    group: '*ɢʀᴏᴜᴘ ᴏɴʟʏ •* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴅᴀᴘᴀᴛ ᴅɪɢᴜɴᴀᴋᴀɴ ᴅɪ ɢʀᴏᴜᴘ !!',
    private: '*ᴘʀɪᴠᴀᴛᴇ ᴏɴʟʏ •* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴅᴀᴘᴀᴛ ᴅɪɢᴜɴᴀᴋᴀɴ ᴅɪ ᴄʜᴀᴛ ᴘʀɪʙᴀᴅɪ !!',
    admin: '*ᴀᴅᴍɪɴ ᴏɴʟʏ •* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴀᴅᴍɪɴ ɢʀᴏᴜᴘ !!',
    botAdmin: 'ᴊᴀᴅɪᴋᴀɴ ʙᴏᴛ ꜱᴇʙᴀɢᴀɪ ᴀᴅᴍɪɴ ᴜɴᴛᴜᴋ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ',
    segel: 'ᴍᴀᴀꜰ ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ᴛɪᴅᴀᴋ ʙɪꜱᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴋᴀʀɴᴀ ʀᴀᴡᴀɴ ʙᴀɴɴᴇᴅ !!',
    onlyprem: 'ʜᴀɴʏᴀ ᴜꜱᴇʀ *ᴘʀᴇᴍɪᴜᴍ* ʏᴀɴɢ ᴅᴀᴘᴀᴛ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ꜰɪᴛᴜʀ ɪɴɪ ᴅɪ *ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ* !!',
    nsfw: 'ᴀᴅᴍɪɴ ᴍᴇɴᴏɴᴀᴋᴛɪғᴋᴀɴ ғɪᴛᴜʀ *ɴsғᴡ* ᴅɪ ɢʀᴏᴜᴘ ɪɴɪ!',
    rpg: 'ᴀᴅᴍɪɴ ᴍᴇɴᴏɴᴀᴋᴛɪғᴋᴀɴ ғɪᴛᴜʀ *ʀᴘɢ ɢᴀᴍᴇ* ᴅɪ ɢʀᴏᴜᴘ ɪɴɪ!',
    game: 'ᴀᴅᴍɪɴ ᴍᴇɴᴏɴᴀᴋᴛɪғᴋᴀɴ ғɪᴛᴜʀ *ɢᴀᴍᴇ* ᴅɪ ɢʀᴏᴜᴘ ɪɴɪ!',
    limitExp: 'ʟɪᴍɪᴛ ᴋᴀᴍᴜ ᴛᴇʟᴀʜ ʜᴀʙɪꜱ ʙᴇʙᴇʀᴀᴘᴀ ᴄᴏᴍᴍᴀɴᴅ ᴛɪᴅᴀᴋ ᴅᴀᴘᴀᴛ ᴅɪᴀᴋꜱᴇꜱ! \nᴜɴᴛᴜᴋ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ʟɪᴍɪᴛ ᴀɴᴅᴀ ʙɪꜱᴀ ᴍᴇᴍʙᴇʟɪɴʏᴀ ᴅᴇɴɢᴀɴ *#ʙᴜʏ ʟɪᴍɪᴛ* ᴀᴛᴀᴜ ᴍᴇɴᴜɴɢɢᴜ ʟɪᴍɪᴛ ʀᴇꜰʀᴇꜱʜ ꜱᴇᴛɪᴀᴘ ʜᴀʀɪ.',
    restrict: 'ꜰɪᴛᴜʀ ɪɴɪ ᴛɪᴅᴀᴋ ᴅᴀᴘᴀᴛ ᴅɪɢᴜɴᴀᴋᴀɴ !!',
    unreg: 'sɪʟᴀʜᴋᴀɴ ᴅᴀғᴛᴀʀ ᴋᴇ *ᴅᴀᴛᴀʙᴀsᴇ* ʙᴏᴛ ᴛᴇʀʟᴇʙɪʜ ᴅᴀʜᴜʟᴜ ᴊɪᴋᴀ ɪɴɢɪɴ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ғɪᴛᴜʀ ɪɴɪ!\n\nᴄᴏɴᴛᴏʜ:\n#ᴅᴀғᴛᴀʀ ɴᴀᴍᴀᴍᴜ.ᴜᴍᴜʀᴍᴜ'
  }
};

/*========MongoDb==========*/
global.mongodb ="-"
global.dbName = "MaouXenz"
/*================*/

global.wait = global.loading;
global.rose = 'cDNWfULJNfbrmt6dlSDOW01XX64HsTAiMPkA63II7u4SYIum5d0KSzywHRmfTiHl'
global.btc = "xenzpedo"
global.APIs = {
  // API Prefix
  maelyn: "https://api.maelyn.tech",
  zeltoria: "https://api.zeltoria.my.id",
  xteam: "https://api.xteam.xyz",
  lol: "https://api.lolhuman.xyz",
  males: "https://malesin.xyz",
  zein: "https://api.zahwazein.xyz",
  rose: "https://api.itsrose.rest",
  xzn: "https://skizoasia.xyz",
  saipul: "https://saipulanuar.cf",
  emi: "https://rest.cifumo.biz.id",
  btc: "https://api.botcahx.eu.org",
};
global.APIKeys = {
  // APIKey Here
  // 'https://website': 'apikey'
  "https://api.maelyn.tech": "Rk-Ruka",
  "https://api.zeltoria.my.id": "Elistz",
  "https://api.zahwazein.xyz": "zenzkey_8bb60993ae",
  "https://api.xteam.xyz": "cristian9407",
  "https://api.lolhuman.xyz": "ZenOfficialDev",
  "https://api.itsrose.rest": "cDNWfULJNfbrmt6dlSDOW01XX64HsTAiMPkA63II7u4SYIum5d0KSzywHRmfTiHl",
  "https://skizoasia.xyz": "zenOfficial",
  "https://api.botcahx.eu.org": "xenzpedo",
};
global.sig = "https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i";
global.sgh = "https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i";
global.sgc = "https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i";
global.thumb = "https://files.catbox.moe/u874oc.jpg";
global.elainajpg = [
    'https://telegra.ph/file/3e43fcfaea6dc1ba95617.jpg',
    'https://telegra.ph/file/c738a9fc0722a59825cbb.mp4',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',]
//============== PROXY ============
global.proxy = 'https://proxy.scrapeops.io/v1/?api_key=9bcd9402-72c9-4a33-af18-16c9275edb9b&url='
/*============== INFO OWNER ==============*/
global.link = {
  ig: "-",
  gh: "-",
  gc: "https://chat.whatsapp.com/CpDIoaepBWT4uc2YqbLTOi",
  web: "-",
  nh: "https://nhentai.net/g/365296/",
};
/*============== NOMOR ==============*/
global.info = {
  nomorbot: "62895422800236",
  nomorown: "6281297662535",
  namebot: "Miyako-BotMD",
  nameown: "XenzPedofil",
};
/*============== WATERMARK ==============*/
global.wm = "Miyako-Bot";
global.author = "THIS IS XENZ";
global.nomordev = "6289324070395"; // jangan ganti

/*============== TEXT ==============*/
global.wait = "WAIT SENSEI";

/*=========== TYPE DOCUMENT ===========*/
global.doc = {
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  pdf: "application/pdf",
  rtf: "text/rtf",
};

/*============== STICKER WM ==============*/
global.stickpack = "";
global.stickauth = "© Miyako 2024-Latest";

global.multiplier = 200; // Jangan ganti nnti ngebug
global.htjava = "乂";
global.htki = htjava + "───『";
global.htka = "』───" + htjava;

/*========== tags premium dan limit =========*/
global.lopr = "🅟";
global.lolm = "🅛";

/*========== HIASAN ===========*/
global.decor = {
  menut: "❏═┅═━–〈",
  menub: "┊•",
  menub2: "┊",
  menuf: "┗––––––––––✦",
  hiasan: "꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷",

  menut: "––––––『",
  menuh: "』––––––",
  menub: "┊☃︎ ",
  menuf: "┗━═┅═━––––––๑\n",
  menua: "",
  menus: "☃︎",

  htki: "––––––『",
  htka: "』––––––",
  haki: "┅━━━═┅═❏",
  haka: "❏═┅═━━━┅",
  lopr: "Ⓟ",
  lolm: "Ⓛ",
  htjava: "❃",
};
/*============== EMOJI ==============*/
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      level: "📊",
      limit: "🎫",
      health: "❤️",
      exp: "✨",
      atm: "💳",
      money: "💰",
      bank: "🏦",
      potion: "🥤",
      diamond: "💎",
      common: "📦",
      uncommon: "🛍️",
      mythic: "🎁",
      legendary: "🗃️",
      superior: "💼",
      pet: "🔖",
      trash: "🗑",
      armor: "🥼",
      sword: "⚔️",
      pickaxe: "⛏️",
      fishingrod: "🎣",
      wood: "🪵",
      rock: "🪨",
      string: "🕸️",
      horse: "🐴",
      cat: "🐱",
      dog: "🐶",
      fox: "🦊",
      robo: "🤖",
      petfood: "🍖",
      iron: "⛓️",
      gold: "🪙",
      emerald: "❇️",
      upgrader: "🧰",
      bibitanggur: "🌱",
      bibitjeruk: "🌿",
      bibitapel: "☘️",
      bibitmangga: "🍀",
      bibitpisang: "🌴",
      anggur: "🍇",
      jeruk: "🍊",
      apel: "🍎",
      mangga: "🥭",
      pisang: "🍌",
      botol: "🍾",
      kardus: "📦",
      kaleng: "🏮",
      plastik: "📜",
      gelas: "🧋",
      chip: "♋",
      umpan: "🪱",
      skata: "🧩",
      steak: '🥩',
      ayam_goreng: '🍗',
      ribs: '🍖',
      roti: '🍞',
      udang_goreng: '🍤',
      bacon: '🥓',
      gandum: '🌾',
      minyak: '🥃',
      garam: '🧂',
      babi: '🐖',
      ayam: '🐓',
       sapi: '🐮',
        udang: '🦐'  ,
        mahkota: '👑',
        batunissan: '🪦',
        petimati: '⚰️',
        gucci: '⚱',
    };
    let results = Object.keys(emot)
      .map((v) => [v, new RegExp(v, "gi")])
      .filter((v) => v[1].test(string));
    if (!results.length) return "";
    else return emot[results[0][0]];
  },
};

//------ JANGAN DIUBAH -----
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  import(`${file}?update=${Date.now()}`);
});