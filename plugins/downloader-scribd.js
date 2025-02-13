/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Masukan linknya om\n*Contoh*: .scribd https://id.scribd.com/doc/312779224/Hacker-Best-Tool');
  await m.reply(wait);

  const url = `https://mr-apis.com/api/downloader/scribd?url=${text}`;

  // Fetch URL
  const response = await fetch(url);

  // Cek apakah ada header Content-Disposition
  let fileName = '';
  const contentDisposition = response.headers.get('content-disposition');

  if (contentDisposition && contentDisposition.includes('filename')) {
    // Ambil nama file dari header
    fileName = contentDisposition.split('filename=')[1].replace(/["']/g, '');
  } else {
    // Jika tidak ada, ambil dari URL
    fileName = url.split('/').pop();
  }

  // Kirim file ke chat
  const buffer = await response.buffer();
  await conn.sendMessage(m.chat, { document: buffer, mimetype: 'application/pdf', fileName }, { quoted: m });
};

handler.command = handler.help = ['scribd'];
handler.tags = ['downloader'];
handler.limit = true;
handler.error = 0;

export default handler;