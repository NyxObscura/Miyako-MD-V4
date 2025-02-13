/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import axios from "axios";
import { create_room } from '../lib/scraper/cai.js'

const handler = async (m, { conn, text }) => {
    const characterIndex = parseInt(text) - 1;
    const selectedCharacter =
      global.db.data.users[m.sender]?.cai.characters[characterIndex];

    if (selectedCharacter) {
      /*const response = await axios.get(
        `${APIs['maelyn']}/api/cai/createroom?charid=${selectedCharacter.char_id}&apikey=${APIKeys[APIs['maelyn']]}`,
      );*/
      const response = await create_room(selectedCharacter.external_id)
      const chatId = response.result.chat_id;

      // Menyimpan informasi karakter ke dalam database cai
      global.db.data.users[m.sender].cai = {
        title: selectedCharacter.title,
        char_name: selectedCharacter.participant__name,
        character_id: selectedCharacter.external_id,
        chat_id: chatId,
        avatar_file_name: selectedCharacter.avatar_file_name,
      };

      // Menambahkan karakter ke dalam daftar cailist
      if (!global.db.data.users[m.sender].cailist) {
        global.db.data.users[m.sender].cailist = [];
      }
      global.db.data.users[m.sender].cailist.push({
        title: selectedCharacter.title,
        char_name: selectedCharacter.participant__name,
        character_id: selectedCharacter.external_id,
        chat_id: chatId,
        avatar_file_name: selectedCharacter.avatar_file_name,
      });
      
      let tek = `*[ C a i  S e l e c t ]*\n\n> *\`Name:\`* ${selectedCharacter.participant__name}\n> *\`Title:\`* ${selectedCharacter.title}\n> *\`Greeting:\`* ${selectedCharacter.greeting}\n> *\`Score:\`* ${selectedCharacter.search_score}\n> *\`Total Usage\`*: ${selectedCharacter.participant__num_interactions}
      `
      await conn.adReply(
          m.chat,
          tek,
          selectedCharacter.participant__name,
          selectedCharacter.title,
          'https://characterai.io/i/80/static/avatars/' + selectedCharacter.avatar_file_name,
          "",
          m,
          false,
        );
    } else {
      conn.reply(m.chat, "Pilihan karakter tidak valid. Silakan coba lagi.", m);
    }
};

handler.command = ["caiset"];
handler.tags = ["ai", "premium"];
handler.help = ["caiset"];
handler.limit = true; handler.error = 0
handler.onlyprem = false;

export default handler;
