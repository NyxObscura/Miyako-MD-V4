/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";

let handler = (m) => m;
handler.before = async function (m) {
  const panelData = global.db.data.bots.panel;

  for (let key in panelData) {
    let db = panelData[key];
    if (db.exppanel !== 0) {
      if (new Date() * 1 >= db.exppanel) {
        console.log(db);
        conn.reply(
          db.nohp,
          "*Sewa Panel Kamu Telah Habis!*\n*Data Kamu Segera Dikirim*",
          0,
        );

        // Backup Pterodactyl
        const API_URL = global.db.data.bots.panelSet.domain;
        const API_KEY = global.db.data.bots.panelSet.pltc;
        const A_API_KEY = global.db.data.bots.panelSet.plta;
        const SERVER_ID = db.srvid;
        const SRV_ID = db.serverid;
        const timestamp = Date.now();
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        const USER_ID = db.userid;
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

        // Add a 10-second delay
        await new Promise((resolve) => setTimeout(resolve, 5000));

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
          "*Auto Backup From Your Servers*",
          0,
        );
        // Add a 10-second delay
        await new Promise((resolve) => setTimeout(resolve, 5000));

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

        // Add a 10-second delay
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Delete Server
        const deleteServerLink = `${API_URL}/api/application/servers/${SRV_ID}`;
        const deleteServerResponse = await fetch(deleteServerLink, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ` + A_API_KEY,
          },
        });

        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Hapus userid
        const deleteUserId = `${API_URL}/api/application/users/${USER_ID}`;
        const deleteUserResponse = await fetch(deleteUserId, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ` + A_API_KEY,
          },
        });

        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Hapus data dari panel
        await deletePanelUser(db.userid);

        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  }
};

export default handler;

function deletePanelUser(userid) {
  const panelData = global.db.data.bots.panel;

  if (panelData[userid]) {
    delete panelData[userid];
    console.log(`User with ID ${userid} has been removed from global.db.data.bots.panel`);
  } else {
    console.log(`User with ID ${userid} not found in global.db.data.bots.panel`);
  }
}