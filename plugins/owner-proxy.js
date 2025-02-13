/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";
import fs from "fs";

const handler = async (m, { conn, args }) => {
  try {
    const command = args[0].toLowerCase();

    if (command === "update" || command === "up") {
      await m.reply("> Waiting for update proxy");
      const urls = [
        "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt",
        "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks4.txt",
        "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt",
        "https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt",
        "https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/socks4.txt",
        "https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/socks5.txt",
        "https://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt",
        "https://raw.githubusercontent.com/prxchk/proxy-list/main/socks4.txt",
        "https://raw.githubusercontent.com/prxchk/proxy-list/main/socks5.txt",
        "https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt",
        "https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/https.txt",
        "https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/socks5.txt",
        "https://raw.githubusercontent.com/zloi-user/hideip.me/main/http.txt",
        "https://raw.githubusercontent.com/zloi-user/hideip.me/main/https.txt",
        "https://raw.githubusercontent.com/zloi-user/hideip.me/main/socks4.txt",
        "https://raw.githubusercontent.com/zloi-user/hideip.me/main/socks5.txt",
        "https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/all/data.txt",
        "https://raw.githubusercontent.com/yemixzy/proxy-list/main/proxies/unchecked.txt",
      ];

      let proxies = "";
      for (const url of urls) {
        let response = await fetch(url);
        let data = await response.text();
        proxies += data + "\n";
      }

      if (fs.existsSync("proxy.txt")) {
        fs.unlinkSync("proxy.txt");
      }

      fs.writeFileSync("proxy.txt", proxies);
      conn.reply(m.chat, "Proxy successfully updated", m);
    } else if (command === "sent") {
      if (fs.existsSync("proxy.txt")) {
        conn.sendFile(m.chat, "proxy.txt", "proxy.txt", "Here you proxy.", m);
      } else {
        conn.reply(m.chat, "File proxy.txt tidak ditemukan.", m);
      }
    } else if (command === "total") {
      if (fs.existsSync("proxy.txt")) {
        let data = fs.readFileSync("proxy.txt", "utf8");
        let total = data.trim().split("\n").length;
        conn.reply(m.chat, `Total proxy yang tersedia: *${total}*`, m);
      } else {
        conn.reply(m.chat, "File proxy.txt tidak ditemukan.", m);
      }
    } else {
      conn.reply(
        m.chat,
        'Format command salah. Gunakan "update", "sent", atau "total"',
        m,
      );
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "Terjadi kesalahan dalam menjalankan perintah.", m);
  }
};

handler.command = ["proxy"];
handler.help = ["proxy (up/sent/total)"];
handler.tags = ["owner"];
handler.owner = ["true"];
export default handler;
