/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";
import crypto from "crypto";
import fs from "fs-extra";
import { addDataPanel } from "../function/datapanel.js";
import { sizeFormatter } from "human-readable";

const format = sizeFormatter();
let handler = async (
  m,
  { conn, args, text, usedPrefix, command, isROwner, isMods },
) => {
  let s = text.split(",");
  if (s.length < 6)
    return m.reply(`*Format salah!*

Penggunaan:
${usedPrefix + command} name,desc,userId,memory/disk,cpu,nohp,exp`);
  let name = s[0];
  let desc = s[1] || "";
  let usr_id = s[2];
  let egg = "16";
  let loc = "1";
  let memo_disk = s[3].split`/`;
  let cpu = s[4];
  let nohp = s[5] + "@s.whatsapp.net";
  let bb = s[6];
  let exp = +new Date() + bb * 1000 * 60 * 60 * 24;

  let f1 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + a_apikey,
    },
  });
  let data = await f1.json();
  //console.log(data.attributes.startup)
  let startup_cmd = data.attributes.startup;

  let f = await fetch(domain + "/api/application/servers", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + a_apikey,
    },
    body: JSON.stringify({
      name: name,
      description: desc,
      user: usr_id,
      egg: parseInt(egg),
      docker_image: "kangyud/node:19",
      startup: startup_cmd,
      environment: {
        INST: "npm",
        USER_UPLOAD: "0",
        AUTO_UPDATE: "0",
        CMD_RUN: "bash",
        PTEROIGNORE_URL:
          "https://drive.google.com/uc?id=1nDckTjpaMEXitpWsvK8V5ZgO_TQ9QDfz",
      },
      limits: {
        memory: memo_disk[0],
        swap: 0,
        disk: memo_disk[1],
        io: 500,
        cpu: cpu,
      },
      feature_limits: {
        databases: 5,
        backups: 5,
        allocations: 5,
      },
      // "allocation": {
      //     "default": 36
      // }
      deploy: {
        locations: [parseInt(loc)],
        dedicated_ip: false,
        port_range: [],
      },
    }),
  });
  let res = await f.json();
  if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));
  let server = res.attributes;

  await addDataPanel(
    nohp,
    usr_id,
    server.id,
    exp,
    server.identifier,
    memo_disk[0],
    cpu,
    memo_disk[1],
    m.sender,
    false,
  );

  let crot = `*SUCCESSFULLY ADD SERVER*

TYPE: ${res.object}

ID: ${server.id}
UUID: ${server.uuid}
NAME: ${server.name}
DESCRIPTION: ${server.description}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%
CREATED AT: ${server.created_at}
EXPIRED: *${msToDate(exp - new Date() * 1)}*`;
  await m.reply(crot);
  await conn.reply(nohp, crot, 0);
};

handler.command = ["addsrv2"];
handler.tags = ["panel"];
handler.adminpanel = true;

export default handler;

function msToDate(ms) {
  let temp = ms;
  let days = Math.floor(ms / (24 * 60 * 60 * 1000));
  let daysms = ms % (24 * 60 * 60 * 1000);
  let hours = Math.floor(daysms / (60 * 60 * 1000));
  let hoursms = ms % (60 * 60 * 1000);
  let minutes = Math.floor(hoursms / (60 * 1000));
  let minutesms = ms % (60 * 1000);
  let sec = Math.floor(minutesms / 1000);
  return days + " Hari Lagi";
  // +minutes+":"+sec;
}
