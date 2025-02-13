/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import axios from "axios";
import { chat } from '../lib/scraper/cai.js'

const handler = async (m, { conn, text }) => {
  // Tangani perintah lainnya di sini
  const args = text.trim().split(" ");
  const command = args[0].toLowerCase();

  try {
    if (!global.db.data.users[m.sender]?.cai) {
      const usage = `Silakan atur karakter Anda terlebih dahulu dengan mengetikkan:\n\n1. caisearch [nama charakter]\nContoh: caisearch Furina\n\n2. caiset [nomor karakter]\nContoh: caiset 1\n\n3.cai on dan off untuk mengaktifkan auto cai`;
      conn.reply(m.chat, usage, m);
      return;
    }

    if (!text) {
      const usage = `Silakan atur karakter Anda terlebih dahulu dengan mengetikkan:\n\n1. caisearch [nama charakter]\nContoh: caisearch Furina\n\n2. caiset [nomor karakter]\nContoh: caiset 1\n\n3.cai on dan off untuk mengaktifkan auto cai`;
      conn.reply(m.chat, usage, m);
      return;
    }

    const { character_id, chat_id, avatar_file_name, title, char_name, on } =
      global.db.data.users[m.sender].cai;
    const message = text;

    try {
      if (command === "del") {
        delete global.db.data.users[m.sender].cai;
        conn.reply(m.chat, "Data sesi telah dihapus.", m);
        return;
      } else if (command === "on") {
        // Aktifkan handler per user
        global.db.data.users[m.sender].cai.on = true;
        conn.reply(m.chat, "Auto AI diaktifkan untuk Anda.", m);
        return;
      } else if (command === "off") {
        // Nonaktifkan handler per user
        global.db.data.users[m.sender].cai.on = false;
        conn.reply(m.chat, "Auto AI dinonaktifkan untuk Anda.", m);
        return;
      }

      /*const response = await axios.get(
        `${APIs['maelyn']}/api/cai/chat?q=${message}&charid=${character_id}&chatid=${chat_id}&apikey=${APIKeys[APIs['maelyn']]}`,
      );*/
      const response = await chat(message, chat_id, character_id)
      //const rawContent = response.data.result.candidates[0].raw_content;
      conn.adReply(
        m.chat,
        response.result,
        char_name,
        title,
        'https://characterai.io/i/80/static/avatars/' + avatar_file_name,
        "",
        m,
        false,
      );
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred.";
      conn.reply(m.chat, errorMessage, m);
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred.";
    conn.sendMessage(m.chat, errorMessage, m);
  }
};

handler.before = async (m, { conn }) => {
  // Hanya jalankan handler jika per user on
  if (!global.db.data.users[m.sender]?.cai?.on) return;

  if (global.db.data.users[m.sender]?.cai) {
    if (m.isBaileys && m.fromMe) return;
    if (!m.text) return;
   // if (m.isGroup) return;

    if (
      m.text.startsWith(".") ||
      m.text.startsWith("#") ||
      m.text.startsWith("!") ||
      m.text.startsWith("/") ||
      m.text.startsWith("\\/")
    )
      return;

    if (global.db.data.users[m.sender]?.cai && m.text) {
      let name = conn.getName(m.sender);
      await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

      try {
        const { character_id, chat_id, avatar_file_name, char_name, title } =
          global.db.data.users[m.sender].cai;
        const message = m.text;
        const response = await chat(message, chat_id, character_id)
        await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
        conn.adReply(
          m.chat,
          response.result,
          char_name,
          title,
          'https://characterai.io/i/80/static/avatars/' + avatar_file_name,
          "",
          m,
          false,
        );
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.message
          : "An error occurred.";
        conn.reply(m.chat, errorMessage, m);
      }
    }
  }
};

handler.command = ["cai"];
handler.tags = ["ai", "premium"];
handler.help = ["cai"];
handler.limit = true; 
handler.error = 0;
handler.premium = true;

export default handler;