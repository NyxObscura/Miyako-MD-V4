/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";

let handler = async (m, { conn, text }) => {
  try {
    let apiURL;
    let json;
    if (text) {
      // Jika ada teks, gunakan API pencarian
      apiURL = `https://anabot.my.id/api/random/searchLahelu?query=${encodeURIComponent(text)}&apikey=ReiiNt`;
      let api = await fetch(apiURL);
      json = await api.json();
    } else {
      // Jika tidak ada teks, gunakan API random
      apiURL = "https://anabot.my.id/api/random/lahelu?apikey=ReiiNt";
      let api = await fetch(apiURL);
      json = await api.json();
    }

    let {
      postID,
      userID,
      title,
      totalUpvotes,
      totalDownvotes,
      totalComments,
      media,
    } = json.result;

    let caption = `[ lahelu random ]
*Title* : ${title}
*Post Id* : ${postID}
*User Id* : ${userID}
*Up Vote* : ${totalUpvotes}
*Down Vote* : ${totalDownvotes}
*Total Comment* : ${totalComments}
`;

    // Menentukan apakah media adalah gambar atau video
    if (media.includes("image")) {
      await conn.sendMessage(
        m.chat,
        { image: { url: media }, caption: caption },
        { quoted: m },
      );
    } else if (media.includes("video")) {
      await conn.sendMessage(
        m.chat,
        { video: { url: media }, caption: caption },
        { quoted: m },
      );
    } else {
      await m.reply("aduh om error nih");
    }
  } catch (e) {
    console.error(e);
    await m.reply(e);
  }
};

handler.help = ["meme"];
handler.tags = ["internet"];
handler.command = /^(meme)$/i;
handler.limit = true; handler.error = 0

export default handler;
