/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";
import uploadfile from "../lib/uploadFile.js";

const handler = async (m, { conn, text }) => {
  if (!m.quoted || !m.quoted.download)
    return m.reply("Silakan reply video atau audionya");

  await m.reply("Tunggu sebentar...");
  try {
    const url = await uploadfile(m.quoted.download?.());
    const bufer = await fetch(
      `https://rest.cifumo.biz.id/api/ai/vocalremover?url=${url}`,
    );
    const js = await buffer.json();
    const { vocal_path, instrumental_path } = js.data;

    await conn.sendFile(
      m.chat,
      vocal_path,
      "vocal.mp3",
      "Berikut vokalnya",
      m,
      false,
      { mimetype: "audio/mpeg" },
    );
    await conn.sendFile(
      m.chat,
      instrumental_path,
      "instrumental.mp3",
      "Berikut instrumentalnya",
      m,
      false,
      { mimetype: "audio/mpeg" },
    );
  } catch (error) {
    console.error(error);
    m.reply(error.message);
  }
};

handler.command = ["vocalremove", "rmvocal", "vocalrm", "removevocal"];
handler.help = ["vocalremove", "rmvocal", "vocalrm", "removevocal"];
handler.tags = ["ai"];
handler.limit = true; handler.error = 0

export default handler;
