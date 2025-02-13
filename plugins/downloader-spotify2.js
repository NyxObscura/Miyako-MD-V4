/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Judulnya apa, ya?');
  try {
    await m.reply("`Tunggu Sebentar.....`")
    const search = await fetch(`https://api.maher-zubair.tech/search/spotify?q=${text}`);
    const results = await search.json();
    let { title, duration, popularity, artist, url } = results.result[0];
    
    const lagu = await fetch(`https://api.maher-zubair.tech/download/spotify?url=${url}`);
    const reslagu = await lagu.json();
    let { song, album_name, release_date, cover_url } = reslagu.result;
    let teks = `     *[ Spotify ]*
> *Judul:* ${title} 
> *Populeritas:* ${popularity}
> *Durasi:* ${duration}
> *Artis:* ${artist}
> *Album:* ${album_name}
> *Rilis:* ${release_date}

_Tunggu, sedang mengirim audio..._
    `;
   let msg = await conn.sendFile(m.chat, cover_url, 'cover.jpg', teks, m);
    await conn.sendFile(m.chat, reslagu.result.url, 'lagu.mp3', teks, msg, false, { mimetype: 'audio/mpeg'});
  } catch (e) {
    m.reply(e);
  }
};

handler.command = ['spotify2'];
handler.help = ['spotify2 <query>'];
handler.tags = ['downloader'];
handler.limit = true; handler.error = 0

export default handler;