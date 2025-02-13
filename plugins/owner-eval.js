/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

export const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.reply(m.chat, "Contoh penggunaan: !eval 2 + 2", m);
    return;
  }

  let output = "";
  const originalConsoleLog = console.log;

  // Menangkap output dari console.log
  console.log = (...args) => {
    output += args.join(" ") + "\n";
  };

  try {
    // Menjalankan eval
    const result = eval(text);
    if (typeof result !== "undefined") {
      output += `Result: ${result}`;
    }
  } catch (e) {
    output += `Error: ${e.toString()}`;
  }

  // Mengembalikan fungsi console.log ke aslinya
  console.log = originalConsoleLog;

  // Mengirim balasan
  await m.reply(output.trim(), false, false, { smlcap: false });
};

handler.command = /^eval|js$/i;
handler.tags = ["owner"];
handler.help = ["eval", "js"];
handler.owner = true;
export default handler;
