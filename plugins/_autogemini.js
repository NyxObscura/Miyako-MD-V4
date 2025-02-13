/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { fetch } from "undici";
import { Gemini } from "../lib/bard.js";
export async function before(m) {
  try {
    if (m.isBaileys && m.fromMe) return true;
    if (
      !m.isGroup ||
      !m.msg ||
      !m.message ||
      m.key.remoteJid !== m.chat ||
      db.data.users[m.sender].banned ||
      db.data.chats[m.chat].isBanned
    )
      return false;
    const gemini = new Gemini(
      "__Secure-1PSID",
      "g.a000gQhbTE4WvC7mwVL4CcWSxbt1Bde7Ady6qpt6951pafinWART4EEKmcskZMFX08uuSKwbvAACgYKAVYSAQASFQHGX2Mi1KAIQT0oz9dXZXKy0ioMBBoVAUF8yKpem3c3iJtHRDMQF3nSHOxU0076",
    );
    const { users, chats } = db.data;
    const { text, quoted } = m;
    if (
      m.mtype === "protocolMessage" ||
      m.mtype === "pollUpdateMessage" ||
      m.mtype === "reactionMessage" ||
      m.mtype === "stickerMessage"
    )
      return;
    if (!quoted || !quoted.isBaileys || !chats[m.chat].gemini) return true;
    const msg = encodeURIComponent(text);
    const candidates = await GoogleBard(msg);
    if (candidates) {
      if (candidates) m.reply(candidates);
    } else {
      const { result } = await AemtGemini(msg);
      if (result) m.reply(result);
    }
  } catch (error) {
    console.error(error);
  }
}
async function AemtGemini(query) {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  };
  const bardRes = await fetch(`https://aemt.me/gemini?text=${query}`, {
    method: "get",
    headers,
  });
  const bardText = await bardRes.json();
  return bardText;
}
async function GoogleBard(query) {
  try {
    const responseText = await gemini.question(query);
    return responseText.content;
  } catch (error) {
    console.error("An error occurred:", error.message);
    throw error;
  }
}
