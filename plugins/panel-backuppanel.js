/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";

let handler = async (m, { usedPrefix, command, text }) => {
  const panelData = global.db.data.bots.panel;

  for (let key in panelData) {
    let db = panelData[key];
    if (db.nohp == m.sender) {
      // Backup Pterodactyl
      const API_URL = global.db.data.bots.panelSet.domain;
      const API_KEY = global.db.data.bots.panelSet.pltc;
      const SERVER_ID = db.srvid;
      const timestamp = Date.now();
      const date = new Date(timestamp);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;

      const backupName = `backup_${SERVER_ID}`;
      const backupIgnored = `/.cache
/.git
/.npm
/.pm2
/node_modules`;

      // Create Backup
      const response = await (
        await fetch(`${API_URL}/api/client/servers/${SERVER_ID}/backups`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            name: backupName,
            ignored: backupIgnored,
          }),
        })
      ).json();

      // Send Backup
      const downloadLink = `${API_URL}/api/client/servers/${SERVER_ID}/backups/${response.attributes.uuid}/download`;
      const downloadResponse = await (
        await fetch(downloadLink, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        })
      ).json();

      const dl = downloadResponse.attributes.url;

      await conn.sendFile(
        db.nohp,
        dl,
        `${backupName}.zip`,
        "*Backup From Your Servers*",
        0,
      );

      // Delete Backup
      const deleteLink = `${API_URL}/api/client/servers/${SERVER_ID}/backups/${response.attributes.uuid}`;
      const deleteResponse = await fetch(deleteLink, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      });
    } else {
      m.reply("Nomor tidak terdaftar, Kamu belum mesen panel di Owner");
    }
  }
};

//handler.owner = true;
handler.help = ["backuppanel"];
handler.tags = ["panel"];
handler.command = ["backuppanel"];

export default handler;