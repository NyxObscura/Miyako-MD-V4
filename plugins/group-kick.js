/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import { areJidsSameUser  } from "@adiwajshing/baileys";

let handler = async (m, { conn, participants, isOwner }) => {
  let usr = m.quoted ? [m.quoted.sender] : m.mentionedJid;
  let users = usr.filter((u) => !areJidsSameUser (u, conn.user.id));
  
  if (!(m.quoted || m.mentionedJid[0])) {
    return m.reply("Tag atau reply orang yang mau dikick!");
  }

  let kickedUser  = [];
  for (let user of users) {
    if (
      user.endsWith("@s.whatsapp.net") &&
      !(participants.find((v) => areJidsSameUser (v.id, user)) || { admin: true }).admin
    ) {
      try {
        await conn.sendFile(m.chat, 'https://files.catbox.moe/jzrftu.webp', 'sticker.webp', '', m);
        
        await delay(1 * 1000);

        const res = await conn.groupParticipantsUpdate(m.chat, [user], "remove");
        kickedUser .push(user);

      } catch (error) {
        console.error(`Failed to kick user ${user}:`, error);
        m.reply(`Gagal mengeluarkan ${user.split('@')[0]}.`);
      }
    }
  }

  if (kickedUser .length > 0) {
  } else {
    m.reply("Tidak ada pengguna yang dikeluarkan.");
  }
};

handler.help = ["kick"];
handler.tags = ["group"];
handler.command = /^(kick)$/i;

handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));