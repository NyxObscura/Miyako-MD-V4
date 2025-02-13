/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import cp, { exec as _exec } from "child_process";
import { promisify } from "util";
let exec = promisify(_exec).bind(cp);

let handler = async (m, { conn, isOwner, command, text }) => {
  if (!text) return m.reply('*[! Warning ]*\n\n> *Contoh:* .yttranscript linkyt')

  let curlCommand = `
    curl 'https://serp_9_4011.aiktp.com/' \
    -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
    -H 'Accept: */*' \
    -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36' \
    -H 'Referer: https://aiktp.com/id/youtube-summarizer' \
    --data-raw 'task=getYoutubeTranscript&userToken=dzhmSG5jeWxkN1hiWmVrdWNubW9GUWx6amlyT3FuUGRUMzQ2bUNDaUl5cz06OhmRJVUdUyeq2W9THyYLwQU&language=Indonesian&youtubeUrl=${text}' \
    --compressed
  `;

  let o;
  try {
    o = await exec(curlCommand);
  } catch (e) {
    o = e;
  } finally {
    let { stdout, stderr } = o;
    if (stdout.trim()) {
      const result = JSON.parse(stdout);
      const formattedTranscript = result.data.transcriptTxt
        .replace(/&amp;#39;/g, "'")
        .replace(/&amp;quot;/g, '"')
        .replace(/&amp;/g, '&');

      conn.sendMessage(
        m.chat,
        { text: `*[ Youtube Transcript ]*\n\n*\`Title:\`* ${result.data.title}\n\n*\`Transcript:\`* ${await conn.translate('id', formattedTranscript)}` },
        { quoted: m }
      );
    }
    if (stderr.trim()) {
      conn.sendMessage(m.chat, { text: stderr }, { quoted: m });
    }
  }
};

handler.help = ["yttranscript", "yt2text"];
handler.tags = ["tools"];
handler.command = ['yttranscript', 'transcriptyt', "yt2text"]
handler.limit = true;

export default handler;