/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

const handler = async (m, { conn, args }) => {
  if (args[0] === "add") {
    if (!args[1])
      return conn.reply(
        m.chat,
        "Silakan berikan nama cookie yang ingin ditambahkan",
        m,
      );
    if (!global.db.data.settings) global.db.data.settings = {};
    if (!global.db.data.settings.cookie) global.db.data.settings.cookie = [];
    if (global.db.data.settings.cookie.includes(args[1]))
      return conn.reply(m.chat, "Cookie sudah ada dalam list", m);
    global.db.data.settings.cookie.push(args[1]);
    conn.reply(m.chat, "Cookie berhasil ditambahkan ke list", m);
  } else if (args[0] === "remove") {
    if (!args[1]) {
      const cookies = global.db.data.settings.cookie || [];
      if (cookies.length > 0) {
        const list = cookies
          .map((cookie, index) => `${index + 1}. ${cookie}`)
          .join("\n");
        conn.reply(m.chat, `List cookie:\n\n${list}`, m);
      } else {
        conn.reply(m.chat, "Tidak ada cookie dalam list", m);
      }
      return;
    }
    const index = parseInt(args[1]) - 1;
    if (
      !global.db.data.settings ||
      !global.db.data.settings.cookie ||
      index < 0 ||
      index >= global.db.data.settings.cookie.length
    )
      return conn.reply(m.chat, "Indeks cookie tidak valid", m);
    const removedCookie = global.db.data.settings.cookie.splice(index, 1);
    conn.reply(
      m.chat,
      `Cookie "${removedCookie}" berhasil dihapus dari list`,
      m,
    );
  } else {
    conn.reply(
      m.chat,
      "Silakan gunakan format: *bingcookie add <nama_cookie>* untuk menambahkan cookie, atau *bingcookie remove <nomor_indeks>* untuk menghapus cookie dari list",
      m,
    );
  }
};
handler.help = ["bingcookie <add/remove>"];
handler.tags = ["owner"];
handler.owner = true;
handler.command = ["bingcookie"];
export default handler;
