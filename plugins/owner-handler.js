/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

const handler = async (m, { conn, args, usedPrefix }) => {
  try {
    const [pluginName, paramName, paramValue] = args;
    const pluginKeys = Object.keys(global.plugins);
    if (!pluginName || !paramName || !paramValue) {
      const usage =
        `Contoh penggunaan: ${usedPrefix}handler plugin1 owner true\n\nDaftar plugin yang tersedia:\n` +
        pluginKeys.map((key, index) => `${index + 1}. ${key}`).join("\n");
      await conn.reply(m.chat, usage, m);
      return;
    }
    const plugin = global.plugins[pluginName];
    if (!plugin) {
      await conn.reply(m.chat, `Plugin '${pluginName}' tidak ditemukan`, m);
      return;
    }
    if (plugin[paramName] !== undefined) {
      await conn.reply(
        m.chat,
        `Mengganti nilai ${paramName} yang sudah ada di ${pluginName}`,
        m,
      );
    }
    let parsedValue;
    if (/^(true|false|null|undefined)$/i.test(paramValue)) {
      parsedValue = eval(paramValue);
    } else {
      try {
        parsedValue = JSON.parse(paramValue);
      } catch (error) {
        parsedValue = paramValue;
      }
    }
    plugin[paramName] = parsedValue;
    global.plugins[pluginName] = plugin;
    await conn.reply(
      m.chat,
      `Menambahkan ${paramName}: ${parsedValue} ke ${pluginName}`,
      m,
    );
  } catch (error) {
    console.error(error.message);
    await conn.reply(m.chat, "Terjadi kesalahan saat menambahkan parameter", m);
  }
};

handler.help = ["handler"];
handler.tags = ["owner"];
handler.command = /^(handler)$/i;
handler.owner = true;
handler.private = false;

export default handler;
