/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";
import axios from "axios";
import crypto from "crypto";
import { sizeFormatter } from "human-readable";

const format = sizeFormatter();
let handler = async (
  m,
  { conn, args, text, usedPrefix, command, isROwner, isMods },
) => {
  /// MEMINTA LIST USER DARI API PANEL
  let a = await (
    await fetch(global.db.data.bots.panelSet.domain + `/api/application/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.db.data.bots.panelSet.plta,
      },
    })
  ).json();

  let data = a.data;
  let existingUsers = data.map((i) => i.attributes.id); // Mengambil daftar ID user dari API

  /// CEK USER DI DB YANG TIDAK ADA DI API DAN HAPUS
  for (let panelUserId in global.db.data.bots.panel) {
    let panelUser = global.db.data.bots.panel[panelUserId];

    if (!existingUsers.includes(panelUser.userid)) {
      // Jika user ID di DB tidak ada di daftar API, hapus dari panel
      delete global.db.data.bots.panel[panelUserId];
      console.log(`User ID ${panelUser.userid} dihapus dari panel karena tidak ditemukan di API`);
    }
  }

  /// HAPUS USER DI API PANEL
  for (let i of data) {
    let id = i.attributes.id;

    fetch(global.db.data.bots.panelSet.domain + `/api/application/users/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.db.data.bots.panelSet.plta,
      },
    })
      .then((response) => {
        if (response.status === 204) {
          console.log(`User ID ${id} berhasil dihapus dari API`);
        } else {
          console.log(`Gagal menghapus User ID ${id} dari API`);
        }
      })
      .catch((error) => console.error(error));
  }

  m.reply("Sukses Clear User Non Server !");
};

handler.help = ["resetpanel"];
handler.command = ["resetpanel"];
handler.tags = ["panel"];
handler.owner = true;

export default handler;