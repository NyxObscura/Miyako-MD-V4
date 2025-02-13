/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import uploadImage from "../lib/uploadImage.js";
import Replicate from "replicate";
const replicate = new Replicate({
  auth: "3a4886dd3230e523600d3b555f651dc82aba3a4e",
});

let handler = async (m, { conn, usedPrefix, text, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("Audionya mana? Reply audio atau upload");
  if (!/audio|mpeg/.test(mime)) return m.reply(`Tipe ${mime} tidak didukung!`);
  if (!languageList.includes(text))
    return m.reply(
      `Bahasa tidak valid! \n\nList bahasa yang di support : \n${languageList
        .map((v) => {
          return `• ${v}`;
        })
        .join("\n")} \n\nContoh : ${usedPrefix + command} indonesian`,
    );
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;
  let media = await q.download();
  let { files } = await uploadImage(media);
  let output = await replicate.run(
    "vaibhavs10/incredibly-fast-whisper:37dfc0d6a7eb43ff84e230f74a24dab84e6bb7756c9b457dbdcceca3de7a4a04",
    {
      input: {
        language: text,
        audio: files[0].url,
        return_timestamps: true,
      },
    },
  );
  await m.reply(
    `${output.chunks
      .map((v) => {
        return `${v.text} ( ${v.timestamp[0]} )`;
      })
      .join("\n")}`,
  );
};
handler.help = ["whisper"];
handler.tags = ["tools"];
handler.command = /^whisper/i;
handler.limit = true; handler.error = 0
export default handler;

const languageList = [
  "english",
  "chinese",
  "german",
  "spanish",
  "russian",
  "korean",
  "french",
  "japanese",
  "portuguese",
  "turkish",
  "polish",
  "catalan",
  "dutch",
  "arabic",
  "swedish",
  "italian",
  "indonesian",
  "hindi",
  "finnish",
  "vietnamese",
  "hebrew",
  "ukrainian",
  "greek",
  "malay",
  "czech",
  "romanian",
  "danish",
  "hungarian",
  "tamil",
  "norwegian",
  "thai",
  "urdu",
  "croatian",
  "bulgarian",
  "lithuanian",
  "latin",
  "maori",
  "malayalam",
  "welsh",
  "slovak",
  "telugu",
  "persian",
  "latvian",
  "bengali",
  "serbian",
  "azerbaijani",
  "slovenian",
  "kannada",
  "estonian",
  "macedonian",
  "breton",
  "basque",
  "icelandic",
  "armenian",
  "nepali",
  "mongolian",
  "bosnian",
  "kazakh",
  "albanian",
  "swahili",
  "galician",
  "marathi",
  "punjabi",
  "sinhala",
  "khmer",
  "shona",
  "yoruba",
  "somali",
  "afrikaans",
  "occitan",
  "georgian",
  "belarusian",
  "tajik",
  "sindhi",
  "gujarati",
  "amharic",
  "yiddish",
  "lao",
  "uzbek",
  "faroese",
  "haitian creole",
  "pashto",
  "turkmen",
  "nynorsk",
  "maltese",
  "sanskrit",
  "luxembourgish",
  "myanmar",
  "tibetan",
  "tagalog",
  "malagasy",
  "assamese",
  "tatar",
  "hawaiian",
  "lingala",
  "hausa",
  "bashkir",
  "javanese",
  "sundanese",
  "burmese",
  "valencian",
  "flemish",
  "haitian",
  "letzeburgesch",
  "pushto",
  "panjabi",
  "moldavian",
  "moldovan",
  "sinhalese",
  "castilian",
];
