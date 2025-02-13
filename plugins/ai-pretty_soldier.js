/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from 'axios';
import uplod from "../lib/uploadImage.js";

const handler = async (m, { conn, usedPrefix, command, text }) => {
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  const name = await conn.getName(who);
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';
  
  if (!mime) return conn.reply(m.chat, `Send/Reply Images with the caption *.${command}*`, m);
  
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }});
  
  const media = await q.download();
  const url = await uplod(media);
  const hasil = await axios.get(`https://skizo.tech/api/mirror?apikey=cifumo&url=${url}&filter=pretty_soldier`);
  const image = hasil.data.generated_image_addresses[0]

  await conn.sendFile(m.chat, image, 'pretty.jpg', '```Success...\nDont forget to donate```', m);
};

handler.help = ['pretty_soldier *<image>*'];
handler.tags = ['ai'];
handler.premium = false;
handler.command = /^(pretty_soldier)$/i;
handler.limit = true; handler.error = 0
handler.private = false;

export default handler;