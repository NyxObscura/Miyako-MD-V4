/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";
import { sizeFormatter } from "human-readable";
let formatSize = sizeFormatter({
  std: "JEDEC",
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0])
    return m.reply(
      `Masukan link Gdrive! \n\nContoh : \n${usedPrefix + command} https://drive.google.com/file/d/1A65dgGvA18X_6ns5uN5yLW8FOWrq1i2d/view?usp=drivesdk`,
    );
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  GDriveDl(args[0]).then(async (res) => {
    if (!res) return m.reply(`${res}`);
    await conn.sendMessage(
      m.chat,
      {
        document: { url: res.downloadUrl },
        fileName: res.fileName,
        mimetype: res.mimetype,
      },
      { quoted: m },
    );
  });
};
handler.help = ["gdrive"];
handler.tags = ["downloader"];
handler.command = /^gd(rive(d(own(load(er)?)?|l))?|dle|l)$/i;
handler.limit = true; handler.error = 0
export default handler;

async function GDriveDl(url) {
  let id;
  if (!(url && url.match(/drive\.google/i))) return m.reply("Invalid URL");
  id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1];
  if (!id) return m.reply("ID Not Found");
  let res = await fetch(
    `https://drive.google.com/uc?id=${id}&authuser=0&export=download`,
    {
      method: "post",
      headers: {
        "accept-encoding": "gzip, deflate, br",
        "content-length": 0,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        origin: "https://drive.google.com",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
        "x-client-data": "CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=",
        "x-drive-first-party": "DriveWebUi",
        "x-json-requested": "true",
      },
    },
  );
  let { fileName, sizeBytes, downloadUrl } = JSON.parse(
    (await res.text()).slice(4),
  );
  if (!downloadUrl) return m.reply("Link Download Limit!");
  let data = await fetch(downloadUrl);
  if (data.status !== 200) return m.reply(data.statusText);
  return {
    downloadUrl,
    fileName,
    fileSize: formatSize(sizeBytes),
    mimetype: data.headers.get("content-type"),
  };
}
