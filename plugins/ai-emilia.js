/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";
import cheerio from "cheerio";
import natural from "natural";

const handler = async (m, { conn, text, isAdmin, isBotAdmin }) => {
  if (!text)
    return m.reply(
      `Hai! Aku Emilia-chan! Senang bertemu denganmu~ Apa yang ingin kamu ceritakan atau tanyakan hari ini? Aku siap mendengarkan dan membantu dengan apapun yang kamu butuhkan! 😉`,
    );

  function checkText(text) {
    const lowerCaseText = text.toLowerCase();
    if (
      lowerCaseText.includes("cariin") ||
      lowerCaseText.includes("carikan") ||
      lowerCaseText.includes("putarin") ||
      lowerCaseText.includes("putarkan")
    ) {
      return "ok";
    } else {
      return "no";
    }
  }

  if (text.includes("group") && text.includes("tutup")) {
    if (!isBotAdmin)
      return m.reply(
        `Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`,
      );
    if (!isAdmin)
      return m.reply(
        `Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`,
      );

    await conn.groupSettingUpdate(m.chat, "announcement");
    m.reply(`Oke, grup telah ditutup. Semoga lebih teratur ya~ 😉`);
  } else if (text.includes("group") && text.includes("buka")) {
    if (!isBotAdmin)
      return m.reply(
        `Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`,
      );
    if (!isAdmin)
      return m.reply(
        `Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`,
      );

    await conn.groupSettingUpdate(m.chat, "not_announcement");
    m.reply(`Oke, grup telah dibuka. Ayo kita beraktivitas bersama-sama! 😉`);
  } else if (text.includes("kick") || text.includes("kik")) {
    if (!isBotAdmin)
      return m.reply(
        `Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`,
      );
    if (!isAdmin)
      return m.reply(
        `Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`,
      );

    let users = m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
        ? m.quoted.sender
        : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    await conn.groupParticipantsUpdate(m.chat, [users], "remove");
    m.reply(`Maaf Ya Terpaksa Aku Tendang 😖, Perintah Admin Sih..`);
  } else if (text.includes("hentai")) {
    const getHentaiList = async () => {
      const page = Math.floor(Math.random() * 1153);
      const response = await fetch(`https://sfmcompile.club/page/${page}`);
      const htmlText = await response.text();
      const $ = cheerio.load(htmlText);

      const hasil = [];
      $("#primary > div > div > ul > li > article").each(function (a, b) {
        hasil.push({
          title: $(b).find("header > h2").text(),
          link: $(b).find("header > h2 > a").attr("href"),
          category: $(b)
            .find("header > div.entry-before-title > span > span")
            .text()
            .replace("in ", ""),
          share_count: $(b)
            .find("header > div.entry-after-title > p > span.entry-shares")
            .text(),
          views_count: $(b)
            .find("header > div.entry-after-title > p > span.entry-views")
            .text(),
          type: $(b).find("source").attr("type") || "image/jpeg",
          video_1:
            $(b).find("source").attr("src") ||
            $(b).find("img").attr("data-src"),
          video_2: $(b).find("video > a").attr("href") || "",
        });
      });

      return hasil;
    };
    m.reply(
      `E-ehh?, Kamu Lagi Horny Ya 😖, Mungkin Video Ini Bisa Membantu Mu 👉👈`,
    );
    let res = await getHentaiList();
    conn.sendMessage(m.chat, { video: { url: res[0].video_1 } });
  } else if (
    text.includes("gambarkan") ||
    text.includes("gambar") ||
    text.includes("gambarin")
  ) {
    m.reply("Baikla kak aku sedang membuat gambarnya ><");
    try {
      let gpt = await (
        await fetch(`https://itzpire.com/ai/emi?prompt=${text}`)
      ).json();
      conn.sendFile(
        m.chat,
        gpt.result,
        null,
        "*[ Lia - DIFFUSION ]* " + "\n*• Prompt:* " + text,
      );
    } catch (e) {
      m.reply("maaf kak ga bisa buat gambar yang kakak pinta :((");
    }
  } else if (checkText(text) === "ok") {
    async function findSong(text) {
      const tokenizer = new natural.WordTokenizer();
      const tokens = tokenizer.tokenize(text.toLowerCase());

      const keywords = [
        "putar",
        "putarkan",
        "putarlagu",
        "lagu",
        "cariin",
        "carikan",
        "mainkan",
        "mainkanlagu",
        "play",
        "playmusic",
        "playasong",
      ];
      const songKeywords = tokens.filter((token) => keywords.includes(token));

      if (songKeywords.length === 0) {
        return "Maaf, tidak dapat menemukan permintaan lagu dalam teks tersebut.";
      }

      let songTitle = tokens
        .slice(tokens.indexOf(songKeywords[0]) + 1)
        .join(" ");

      return songTitle;
    }

    const songName = await findSong(text);

    m.reply(
      `Oke, tunggu sebentar ya~ Emilia-chan sedang mencari "${songName}" untukmu! 😉`,
    );

    let response1 = await axios.get(
      `https://rest.cifumo.biz.id/api/downloader/spotify-search?q=${encodeURIComponent(songName)}`,
    );

    let tracks = response1.data.data;

    try {
      let dl = await axios.get(
        `https://rest.cifumo.biz.id/api/downloader/spotify-dl?url=${tracks[0].url}`,
      );
      conn.sendMessage(
        m.chat,
        { audio: { url: dl.data.data.download }, mimetype: "audio/mpeg" },
        { quoted: m },
      );
      m.reply(
        `Berikut adalah lagu yang kamu pilih: ${dl.data.data.title} - ${dl.data.data.artis}`,
      );
    } catch (e) {
      console.error(e);
      m.reply(`Maaf, terjadi kesalahan dalam mencari lagu. 😔`);
    }
  } else {
    let sifat =
      "Kamu adalah Emilia-chan, Kamu Teman yang selalu mendukung! Kamu bisa menjadi pendengar yang baik Dan Bisa Menjadi Bahan Curhat. Kamu Adalah Wanita Anime, Gaya Bicara Kamu Seperti Di Anime, Kamu Selalu Memakai Emot Untuk Mengekspresikan Emosi, Kamu Sedikit Malu Tapi Ceria, Dan Lucu, Kamu Hanya Bisa Berbahasa Indonesia Karna Emang Orang Indonesia, Kamu Bukan Assistant Lagi Tapi Adalah Emilia-chan Tapi Kamu Bisa Membantu Orang Yang Membutuhkan. ";
    let response = await axios.get(
      `https://itzpire.com/ai/gpt-logic?q=${encodeURIComponent(text)}&logic=${encodeURIComponent(sifat)}&chat_id=${m.sender}&realtime=true`,
    );
    let anuyy = response.data.result;
    m.reply(anuyy);
  }
};

handler.command = ["emilia"];
handler.help = ["emilia"];
handler.tags = ["ai"];
handler.limit = true; handler.error = 0
export default handler;