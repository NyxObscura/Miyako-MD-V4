/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";

let handler = async (m, args) => {
  const panelData = global.db.data.bots.panel;

  for (let key in panelData) {
    let db = panelData[key];
    if (db.exppanel !== 0) {
      if (Date.now() >= db.exppanel) {
        conn.reply(
          db.nohp,
          "*Sewa Panel Kamu Telah Habis!*\n*Data Kamu Segera Dikirim*",
          0,
        );

        // Backup Pterodactyl
        const API_URL = domain;
        const API_KEY = c_apikey;
        const SERVER_ID = db.srvid;
        const timestamp = Date.now();
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        const backupName = `autobackup_${formattedDate}`;
        const backupIgnored = `/.cache
/.git
/.npm
/.pm2
/node_modules
/tmp`;

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
        conn.sendFile(
          db.nohp,
          dl,
          `${backupName}.zip`,
          "*Auto Backup From Your Servers*",
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
      }
    }
  }
};

handler.before = true;

export default handler;