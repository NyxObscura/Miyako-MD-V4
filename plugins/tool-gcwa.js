/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import fetch from 'node-fetch';
import cheerio from 'cheerio';

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Masukkan nama grupnya\n> contoh: .groupwa anime');
  
  // Memanggil fungsi `groupwa`
  let req = await groupwa(text);
  
  if (!req.length) return m.reply('Grup tidak ditemukan.');

  // Menghasilkan pesan dari hasil pencarian grup dengan format lebih rapi
  let message = `*Hasil Pencarian Grup WhatsApp untuk "${text}":*\n\n`;
  for (const group of req) {
    message += `📌 *Nama Grup:* ${group.name}\n`;
    message += `📄 *Deskripsi:* ${group.description || 'Tidak ada deskripsi'}\n`;
    message += `🔗 *Link Gabung:* ${group.joinLink}\n`;
    message += `📅 *Dibuat Pada:* ${group.date || 'Tidak diketahui'}\n`;
    message += `========================\n\n`;
  }

  conn.sendMessage(m.chat, { text: message }, { quoted: m });
}

handler.command = ['groupwa'];
handler.help = ['groupwa'];
handler.tags = ['internet'];
handler.limit = true;
export default handler;

async function groupwa(query) {
  try {
    const response = await fetch(`https://groupsor.link/group/searchmore/${query}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const groups = [];

    // Loop untuk mengumpulkan setiap grup dari hasil pencarian
    const groupPromises = $('.maindiv').map(async (index, element) => {
      const groupLink = $(element).find('a').first().attr('href');
      const groupData = await getname(groupLink);
      
      return {
        link: groupLink,
        name: groupData.title || 'Tidak ada nama',
        description: $(element).find('.descri').text().trim(),
        joinLink: 'https://chat.whatsapp.com/invite/' + $(element).find('.joinbtn a').attr('href').split('/')[5],
        image: groupData.image || 'Tidak ada gambar',
        date: groupData.date || 'Tidak diketahui'
      };
    }).get();

    // Menunggu semua promise selesai
    const groupResults = await Promise.all(groupPromises);
    return groupResults;

  } catch (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
}

async function getname(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const result = {
      image: $('img.proimg').attr('src'),
      title: $('b').text().trim(),
      date: $('span.cate').last().text().trim(),
      description: $('.predesc').text().trim(),
      joinLink: $('a.btn').attr('href')
    };
    
    return result;

  } catch (error) {
    console.error('Error fetching group details:', error);
    return {};
  }
}