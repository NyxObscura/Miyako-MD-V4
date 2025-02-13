/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { performance } from "perf_hooks";

const handler = async (m, { conn }) => {
  let old = performance.now();
  let { key } = await conn.sendMessage(
    m.chat,
    { text: "> ..." },
    { quoted: m },
  );
  let neww = performance.now();
  let speed = neww - old;
  await conn.sendMessage(
    m.chat,
    { text: `> bot on!\n${Math.round(speed)}ms\n${speed}`, edit: key },
    { quoted: m },
  );
};

handler.command = ["."];
export default handler;
