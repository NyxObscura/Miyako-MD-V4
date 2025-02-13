/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

function editExppanel(userid, additionalExppanel) {
  const panel = global.db.data.bots.panel;

  if (panel[userid]) {
    var now = new Date().getTime(); // Mendapatkan timestamp saat ini
    if (now < panel[userid].exppanel) {
      panel[userid].exppanel += additionalExppanel; // Menambahkan exp jika belum expired
    } else {
      panel[userid].exppanel = now + additionalExppanel; // Mengatur exp baru jika sudah expired
    }
    console.log(
      `exppanel untuk pengguna ${userid} telah diperbarui menjadi ${panel[userid].exppanel}`,
    );
  } else {
    console.log(`Pengguna ${userid} tidak ditemukan di panel`);
  }
}

// Handler untuk command addsewapanel
let handler = (m, { usedPrefix, command, text }) => {
  const args = text.split(" ");
  const userid = args[0];
  const exp = 86400000 * args[1]; // Mengonversi hari menjadi milidetik
  const additionalExppanel = Number(exp);

  if (!userid || !additionalExppanel) {
    return m.reply(
      "Mohon sertakan ID pengguna dan exp panel tambahan yang valid",
    );
  }

  editExppanel(userid, additionalExppanel);

  return m.reply(
    `Exp panel untuk pengguna ${userid} telah ditambahkan sebanyak ${additionalExppanel / 86400000} hari.`,
  );
};

handler.tags = ["panel"];
handler.command = ["addsewapanel"];
handler.owner = true;

export default handler;