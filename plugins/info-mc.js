/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import axios from "axios";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return m.reply(`Masukan Ip atau domain servernya\nContoh: ${usedPrefix + command} mineaese.xyz`)
  try {
    const response = await axios.get(
      `https://api.mcstatus.io/v2/status/java/${text}`,
    );
    const { online, host, ip_address, port, version, players, motd } = response.data;
    const thumb = await `https://api.mcstatus.io/v2/widget/java/${text}`
    const anu = players.list.map((a) => `- ${a.name_clean}`).join('\n')

    if (!online) return m.reply("*SERVER OFFLINE!!*");

    let petik = "```";
    let cap = `*S E R V E R - S T A T U S*

┌  ◦ *Status* : ONLINE
│  ◦ *Player Count* : ${players.online} / ${players.max}
│  ◦ *Ip* : ${ip_address}
│  ◦ *Port* : ${port}
│  ◦ *Host* : ${host}
│  ◦ *Version* : ${version.name_clean}
│  ◦ *Motd* : ${motd.clean.trim()}
│
└  ◦ *Players* :\n${anu}
`;

    await conn.sendFile(m.chat, thumb, 'anu.jpg', cap, m)
  } catch (e) {
    console.log(e);
    return m.reply("Gagal Mendapatkan Status Server\nerror: " + e);
  }
};

handler.help = handler.command = ["mc"];
handler.tags = ["info"];
export default handler;
