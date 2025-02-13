/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { otakudesu } from "@xct007/frieren-scraper";
import fs from "fs";
let handler = async (m, { conn, usedPrefix }) => {
  let result = await otakudesu.latest();
  let rows = [];
  for (let i = 0; i < result.length; i++) {
    let results = {
      header: "",
      title: result[i].title,
      description: `${result[i].day}, ${result[i].date}`,
      id: `${usedPrefix}otakudesu ${result[i].url}`,
    };
    rows.push(results);
  }
  let buttonMsg = {
    title: "Click Here",
    sections: [
      {
        title: "Otakudesu Latest",
        highlight_label: "Popular",
        rows: rows,
      },
    ],
  };
  let buttons = [
    {
      name: "single_select",
      buttonParamsJson: JSON.stringify(buttonMsg),
    },
  ];
  conn.sendButton(
    m.chat,
    "",
    "Berikut list anime terbaru dari otakudesu",
    global.config.watermark,
    buttons,
    m,
  );
};
handler.help = ["otakudesu-latest"];
handler.tags = ["anime"];
handler.command = /^(otakudesu((-)?ongoing|(-)?latest))$/i;
handler.limit = true; handler.error = 0
export default handler;
