/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import PDFDocument from 'pdfkit';
import { Writable } from 'stream';

const handler = async (m, { conn, text, args }) => {
  let content = m.quoted && m.quoted.text ? m.quoted.text : text;

  if (!content) {
    return m.reply(
      `Silakan masukkan teks atau reply teks yang ingin diubah ke PDF.\n\n` +
      `Contoh Format:\n` +
      `- **Teks Tebal**: **Ini teks tebal**\n` +
      `- *Teks Miring*: *Ini teks miring*\n` +
      `- ~Teks Besar~: ~Ini teks besar~\n` +
      `- <Link>: <https://example.com>\n` +
      `- _Underline_: _Ini teks bergaris bawah_\n` +
      `- ~~Strikethrough~~: ~~Teks dicoret~~\n` +
      `- {red}Teks Merah{end}: Teks dengan warna merah.\n\n` +
      `Kirim teks langsung atau reply pesan dengan format di atas, lalu ketik /text2pdf.`
    );
  }

  try {
    const pdfBuffer = await generatePDF(content);
    await conn.sendFile(
      m.chat,
      pdfBuffer,
      'document.pdf',
      'Berikut adalah PDF dari teks yang Anda kirim.',
      m
    );
  } catch (err) {
    console.error('Error membuat PDF:', err);
    m.reply('Terjadi kesalahan saat membuat PDF.');
  }
};

const generatePDF = (text) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const stream = new Writable();
    let chunks = [];

    stream._write = (chunk, _, next) => {
      chunks.push(chunk);
      next();
    };

    stream.on('finish', () => resolve(Buffer.concat(chunks)));
    stream.on('error', (err) => reject(err));

    doc.pipe(stream);

    const lines = text.split('\n');

    lines.forEach((line, index) => {
      if (line.trim() === '' || /^\s+/.test(line)) {
        doc.moveDown();
      } else {
        if (/^\*{2}(.*?)\*{2}$/.test(line)) {
          doc.font('Helvetica-Bold').text(line.replace(/^\*{2}|(\*{2})$/g, ''), { align: 'left' });
        } else if (/^\*(.*?)\*$/.test(line)) {
          doc.font('Helvetica-Oblique').text(line.replace(/^\*|(\*)$/g, ''), { align: 'left' });
        } else if (/^~(.*?)~$/.test(line)) {
          doc.fontSize(20).text(line.replace(/^~|~$/g, ''), { align: 'left' });
        } else if (/^<https?:\/\/[^\s>]+>$/.test(line)) {
          doc.fillColor('blue').text(line, { link: line.slice(1, -1), underline: true });
        } else if (/^_(.*?)_$/.test(line)) {
          doc.underline(0, 0, 500, 10).text(line.replace(/^_|_$/g, ''), { align: 'left' });
        } else if (/^~~(.*?)~~$/.test(line)) {
          doc.strike().text(line.replace(/^~~|~~$/g, ''), { align: 'left' });
        } else if (/{(red|green|blue|black)}(.*?){end}/.test(line)) {
          const [_, color, coloredText] = line.match(/{(red|green|blue|black)}(.*?){end}/);
          doc.fillColor(color).text(coloredText, { align: 'left' });
        } else {
          doc.font('Helvetica').fontSize(12).text(line, { align: 'left' });
        }
      }

      if (index < lines.length - 1 && lines[index + 1].trim() === '') {
        doc.moveDown();
      }
    });

    doc.end();
  });
};
handler.command = ['txttopdf', 'text2pdf', 'txt2pdf'];
handler.help = ['txttopdf <text>'];
handler.tags = ['tools'];
handler.limit = true;

export default handler;