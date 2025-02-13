/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";

const tempDB = {};

const handler = async (m, { conn, text }) => {
  const args = text.trim().split(" ");
  const command = args[0].toLowerCase();
  const argument = args.slice(1).join(" ");

  try {
    if (command === "search") {
      if (!argument) {
        conn.reply(m.chat, "Silakan masukkan kata kunci pencarian.", m);
        return;
      }

      const response = await axios.get(
        `${APIs['maelyn']}/api/juicy/search?q=${argument}&apikey=${APIKeys[APIs['maelyn']]}`,
      );
      const characters = response.data.result;

      tempDB[m.sender] = { characters };

      let characterList = "";
      characters.slice(0, 15).forEach((character, index) => {
        characterList += `${index + 1}. ${character.name}\n- Description: ${character.personality}\n- Tags: ${character.tags}\n- Character ID: ${character.character_id}\n- Avatar: ${character.avatar}\n\n`;
      });

      conn.reply(m.chat, `Hasil Pencarian Karakter:\n${characterList}`, m);
    } else if (command === "set") {
      const characterIndex = parseInt(argument) - 1;
      const selectedCharacter = tempDB[m.sender]?.characters[characterIndex];

      if (selectedCharacter) {
        const response = await axios.get(
          `${APIs['maelyn']}/api/juicy/createroom?charid=${selectedCharacter.character_id}&apikey=${APIKeys[APIs['maelyn']]}`,
        );
        const chatId = response.data.result.data.chat_key;
        tempDB[m.sender] = {
          character_id: selectedCharacter.character_id,
          chat_id: chatId,
          avatar: selectedCharacter.avatar,
        };
        conn.reply(
          m.chat,
          `Anda telah memilih karakter: ${selectedCharacter.name}.`,
          m,
        );
      } else {
        conn.reply(
          m.chat,
          "Pilihan karakter tidak valid. Silakan coba lagi.",
          m,
        );
      }
    } else if (command === "delsesi") {
      delete tempDB[m.sender];
      conn.reply(m.chat, "Sesi chat Anda telah dihapus.", m);
      return;
    } else {
      if (!tempDB[m.sender]) {
        conn.reply(
          m.chat,
          "Silakan atur karakter Anda terlebih dahulu dengan mengetikkan\ncai search [nama karakter]\ncai set [nomor]",
          m,
        );
        return;
      }

      if (!argument) {
        const usage = `Cara Penggunaan:\n\n1. Untuk mencari karakter: juicy search [kata kunci]\nContoh: juicy search Furina\n\n2. Untuk memilih karakter: juicy set [nomor karakter]\nContoh: cai set 1\n\n3. Untuk memulai percakapan dengan karakter yang telah dipilih: cai [pesan]`;
        conn.reply(m.chat, usage, m);
        return;
      }

      const { character_id, chat_id, avatar } = tempDB[m.sender];
      const message = text;

      try {
        const response = await axios.get(
          `${APIs['maelyn']}/api/juicy-chat?q=${message}&chatid=${chat_id}&apikey=${APIKeys[APIs['maelyn']]}`,
        );
        const rawContent = response.data.result;
        conn.sendThumb(m.chat, rawContent, avatar);

        // Simpan avatar karakter yang dipilih
        tempDB[m.sender].avatar = avatar;
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.message
          : "An error occurred.";
        conn.reply(m.chat, errorMessage, m);
      }
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred.";
    conn.sendMessage(m.chat, errorMessage, m);
  }
};

handler.command = ["juicy"];
handler.tags = ["ai", "premium"];
handler.help = ["juicy"];
handler.premium = true; handler.error = 0

setInterval(
  () => {
    for (const sender in tempDB) {
      if (new Date() - tempDB[sender].created_at > 60 * 60 * 1000) {
        delete tempDB[sender];
      }
    }
  },
  60 * 60 * 1000,
);

export default handler;
