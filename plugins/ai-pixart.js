/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";

const handler = async (m, { conn, text, args }) => {
  const command = args.shift()?.toLowerCase(); // Mengambil command dari argumen pertama dan mengonversi ke huruf kecil

  if (command === "set") {
    if (!args[0]) {
      m.reply('Mohon masukkan model yang ingin diatur setelah command "set".');
      return;
    }

    const model = args[0]; // Mengambil model dari argumen setelah "set"
    const availableModels = [
      "Cinematic",
      "Photographic",
      "Anime",
      "Manga",
      "Digital Art",
      "Pixel art",
      "Fantasy art",
      "Neopunk",
      "3D Model",
    ];

    if (!availableModels.includes(model)) {
      m.reply(
        `Model yang dimasukkan tidak valid. Silakan pilih dari list model berikut:\n\n${availableModels.join("\n")}`,
      );
      return;
    }

    conn.model = model; // Atur model yang dipilih
    m.reply(`Model telah diatur menjadi ${model}`);
    return; // Keluar dari handler setelah mengatur model
  }

  if (!text) {
    m.reply(
      `Mohon masukkan prompt untuk menghasilkan gambar.\n\n*List Model:*\n- Cinematic\n- Photographic\n- Anime\n- Manga\n- Digital Art\n- Pixel art\n- Fantasy art\n- Neopunk\n- 3D Model\n\n*NOTE:* set model harus sesuai dengan bacaan nya jika mau work.`,
    );
    return;
  }

  await m.reply("tunggu sebentar kak, mungkin membutuhkan beberapa menit");
  await conn.sendReact(m.chat, "⏱️", m.key);
  conn.model = conn.model || "Anime"; // Mengatur model default menjadi 'Anime' jika tidak ada model yang ditentukan

  try {
    const req = await fetch(
      `https://itzpire.site/ai/pixart?image_style=${conn.model}&sampler=DPM-Solver&prompt=${text}&negative_prompt=(worst quality, low quality:1.3), extra hands, extra limbs, bad anatomy`,
    );
    const data = await req.json(); // Mengambil data dari respons
    await conn.sendReact(m.chat, "🖼️", m.key);
    await conn.sendFile(
      m.chat,
      data.data.img,
      "pixart.jpg",
      `*hasil dari:* ` + "`" + text + "`",
    );
  } catch (err) {
    console.error(err);
    global.db.data.users[m.sender].limit += 1;
    m.reply("error tidak diketahui. limit dikembalikan");
  }
};

handler.command = ["pixart"];
handler.help = ["pixart"];
handler.tags = ["ai", "premium"];
handler.onlyprem = true;
handler.limit = true; handler.error = 0
export default handler;
