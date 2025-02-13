/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

export async function before(m, { conn, participants }) {
  const currentTime = Math.floor(Date.now() / 1000);

  // Fetch user data from the database
  let userData = global.db.data.users[m.sender];

  if (!userData) {
    // Initialize user data if it does not exist
    global.db.data.users[m.sender] = { joinTime: 0, title: "", premium: false };
    userData = global.db.data.users[m.sender];
  }

  const userJoinTime = userData.joinTime;

  if (!m.isGroup || userJoinTime > currentTime) {
    return;
  }

  const nama = m.pushName;
  const title = userData.title || ""; // Get user's title if it exists, else use an empty string
  const isPremium = userData.premium; // Check if the user is premium

  // Check if the sender is the bot owner or a user
  const isBotOwner =
    m.sender ===
    `${global.db.data.bots.info.nomorown || global.info.nomorown}@s.whatsapp.net`;
  const isUser = !isBotOwner; // Additional condition for regular users if needed

  if (isUser && title) {
    let greetingText = `Selamat datang ${nama} _*(${title})*_!`;

    if (isPremium) {
      greetingText = title
        ? `Selamat datang ${nama} _*${title}*_!`
        : `Selamat datang user premium (${nama})!`;
    }

    await conn.sendMessage(
      m.chat,
      {
        text: greetingText,
      },
      {
        quoted: m,
      },
    );

    // Update the user's join time in the database
    global.db.data.users[m.sender].joinTime =
      Math.floor(Date.now() / 1000) + 2 * 1000; // Adjust the time as needed
  }
}
