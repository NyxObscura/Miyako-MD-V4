/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

const handler = async (m, { conn, text }) => {
  const userCaiList = global.db.data.users[m.sender]?.cailist || [];

  if (userCaiList.length === 0) {
    m.reply("Anda belum memiliki karakter dalam daftar cailist.");
    return;
  }

  // Jika pengguna memilih karakter dari daftar
  if (text) {
    const characterIndex = parseInt(text) - 1;
    const selectedCharacter = userCaiList[characterIndex];

    if (selectedCharacter) {
      try {
        global.db.data.users[m.sender].cai = selectedCharacter;

        const message = `Anda telah memilih karakter:\n\nNama: ${selectedCharacter.char_name}\nID: ${selectedCharacter.character_id}\nChat ID: ${selectedCharacter.chat_id}\nAvatar: ${selectedCharacter.avatar_file_name}`;

        m.reply(message);
      } catch (error) {
        const errorMessage = error.response ?
          error.response.data.message :
          "An error occurred.";
        m.reply(errorMessage);
      }
    } else {
      m.reply("Pilihan karakter tidak valid. Silakan coba lagi.");
    }
    return;
  }

  // Jika pengguna hanya meminta daftar karakter
  let message = "Daftar karakter Anda:\n";
  let buttons = [];

  userCaiList.forEach((char, index) => {
    buttons.push({
      alias: index + 1,
      response: `.cailist ${index + 1}`
    });
    message += `- ${index + 1}. ${char.char_name}\n`;
  });

  message += "\n\nKirim nomor karakter untuk memilih atau set karakter:\nContoh: !cailist 1";

  conn.sendAliasMessage(m.chat, { text: message }, buttons, m);
};

handler.command = ["cailist"];
handler.tags = ["ai", "premium"];
handler.help = ["cailist"];
handler.limit = true;
handler.error = 0;
handler.premium = true;

export default handler;