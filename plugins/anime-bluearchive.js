/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { list, detail } from "../lib/scraper/arsipbiru.js"; // Importing functions to scrape data
import axios from "axios"; // Importing axios for HTTP requests

let characterCache = {}; // Cache to store character lists for each user

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    global.db.data.settings[conn.user.jid].loading
      ? await m.reply(global.config.loading) // Send loading message if applicable
      : false;

    let result = await list(); // Fetch character list
    characterCache[conn.user.jid] = result; // Store the character list in cache

    let characterList = result.map((item, index) => `${index + 1}. ${item.name}`).join('\n'); // Create a numbered list of characters

    await m.reply(`Silahkan pilih karakter yang anda cari dengan membalas nomor:\n${characterList}`);
    return; // Exit the function
  }

  // Check if the text is a number
  const index = parseInt(text) - 1; // Convert text to number and adjust for zero-based index
  if (!isNaN(index) && index >= 0 && characterCache[conn.user.jid]) {
    let result = characterCache[conn.user.jid]; // Get character list from cache
    if (index < result.length) {
      // If index is valid
      let characterName = result[index].link; // Get character link (or name)
      
      // Fetch character details
      let detailResult = await detail(characterName);
      let teks = `
Title: ${detailResult.title || "none"}
Age: ${detailResult.biodata.Age || "none"}
Birthday: ${detailResult.biodata.Birthday}
Height: ${detailResult.biodata.Height}
School Year: ${detailResult.biodata["School Year"]}
Club: ${detailResult.biodata.Club}
Hobby: ${detailResult.biodata.Hobby}
Obtainability: ${detailResult.biodata.Obtainability}
Voice Actor: ${detailResult.biodata["Voice Actor"]}
Illustrator: ${detailResult.biodata.Illustrator}
`.trim();

      // Send character details along with the thumbnail image
      await conn.sendMessage(
        m.chat,
        {
          image: { url: detailResult.icons.getRandom().url }, // Send the character's thumbnail image
          caption: teks, // Send the character details as a caption
        },
        { quoted: m } // Quoting the original message
      );
    } else {
      await m.reply("Nomor yang anda masukkan tidak valid.");
    }
  } else {
    await m.reply(`Silahkan masukkan nomor karakter yang valid.`);
  }
};

handler.help = ["bluearchive"]; // Help command
handler.tags = ["anime"];
handler.command = /^(bluearchive)$/i;
handler.limit = true;
handler.error = 0;
export default handler;

async function originalUrl(url) {
  return (await axios(url)).request.res.responseUrl;
}

const delay = (time) => new Promise((res) => setTimeout(res, time));