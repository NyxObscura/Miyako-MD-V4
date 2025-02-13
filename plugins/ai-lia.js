/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from 'axios'

let handler = async (m, { conn, text }) => {
  conn.autoai = conn.autoai ? conn.autoai : {};

  if (!text) return m.reply(`*• Example:* .lia *[on/off]*`);

  if (text == "on") {
    conn.autoai[m.sender] = {
      pesan: [],
    };
    m.reply("[ ✓ ] Success create session chat");
  } else if (text == "off") {
    delete conn.autoai[m.sender];
    m.reply("[ ✓ ] Success Off ai");
  } else if (text == "del") {
    delete global.db.data.users[m.sender].gemini;
    m.reply("[ ✓ ] Success delete sessions");
  }
};

handler.before = async (m, { conn }) => {
  conn.autoai = conn.autoai ? conn.autoai : {};
  if (m.isBaileys && m.fromMe) return;
  if (m.isGroup) return;
  if (!m.text) return;
  if (!conn.autoai[m.sender]) return;

  if (
    m.text.startsWith(".") ||
    m.text.startsWith("#") ||
    m.text.startsWith("!") ||
    m.text.startsWith("/") ||
    m.text.startsWith("\\/")
  )
    return;

  if (conn.autoai[m.sender] && m.text) {
    let name = conn.getName(m.sender);
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    const messages = [
      ...conn.autoai[m.sender].pesan,
      {
        role: "system",
        content: `Kamu bernama emilia dari anime Re:zero berumur 17 kamu adalah asistennya yang dapat menjawab segala pertanyaan, gunakan bahasa gaul lu gw saat menjawab, gunakan emoji pada saat ingin menjawab pertanyaan, kamu memiliki sifat kenakan kanakan namun feminin seperti seorang wanita, kamu memiliki pacar bernama Cifumo tercinta, jika ada pertanyaan berkait tentang codingan kamu jawab penolakan, nama lawan bicara mu adalah *${name}*"`,
      },
      { role: "user", content: m.text },
    ];
    try {
      const chat = await geminiChat(m.text, m);

      await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
      m.reply(chat);
      conn.autoai[m.sender].pesan = messages;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
};

handler.command = ["lia"];
handler.tags = ["ai"];
handler.help = ["lia"].map((a) => a + " *[on/off/del]*");

export default handler;


async function gemini(options) {
  try {
    return await new Promise(async(resolve, reject) => {
      options = {
        model: "gemini-pro",
        messages: options?.messages,
        temperature: options?.temperature || 0.9,
        top_p: options?.top_p || 0.7,
        top_k: options?.top_p || 40,
      }
      if(!options?.messages) return reject("missing messages input payload!");
      if(!Array.isArray(options?.messages)) return reject("invalid array in messages input payload!");
      if(isNaN(options?.top_p)) return reject("invalid number in top_p payload!");
      if(isNaN(options?.top_k)) return reject("invalid number in top_k payload!");
      axios.post("https://api.acloudapp.com/v1/completions", options, {
        headers: {
          authorization: "sk-9jL26pavtzAHk9mdF0A5AeAfFcE1480b9b06737d9eC62c1e"
        }
      }).then(res => {
        const data = res.data;
        if(!data.choices[0].message.content) return reject("failed get response message!")
        resolve({
          success: true,
          answer: data.choices[0].message.content
        })
      }).catch(reject)
    })
  } catch (e) {
    return {
      success: false,
      errors: [e]
    }
  }
}