/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import cheerio from "cheerio";
import fs from "fs";
import fetch from "node-fetch";
import crypto from "crypto";
import { addDataPanel } from "../function/datapanel.js";
import moment from "moment-timezone";
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let wibh = moment.tz("Asia/Jakarta").format("HH");
  let wibm = moment.tz("Asia/Jakarta").format("mm");
  let wibs = moment.tz("Asia/Jakarta").format("ss");
  let wktuwib = `${wibh} : ${wibm} : ${wibs}`;
  let d = new Date(new Date() + 3600000);
  let locale = "id";
  let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
    Math.floor(d / 84600000) % 5
  ];
  let week = d.toLocaleDateString(locale, { weekday: "long" });
  let date = d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let domain = global.db.data.bots.panelSet.domain
  let c_apikey =
    global.db.data.bots.panelSet.pltc
  let capikey =
    global.db.data.bots.panelSet.pltc
  let apikey =
    global.db.data.bots.panelSet.plta
  let sgc = global.db.data.bots.link.group || global.sgc;
  let ctf = "";

  switch (command) {
    case "listusr":
      {
        let page = args[0] ? args[0] : "1";
        let f = await fetch(domain + "/api/application/users?page=" + page, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        let res = await f.json();
        let users = res.data;
        let messageText = "Berikut list user:\n\n";

        for (let user of users) {
          let u = user.attributes;
          messageText += `ID: ${u.id} - Status: ${u.attributes?.user?.server_limit === null ? "Inactive" : "Active"}\n`;
          messageText += `${u.username}\n`;
          messageText += `${u.first_name} ${u.last_name}\n\n`;
        }

        messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total Users: ${res.meta.pagination.count}`;

        await conn.sendMessage(m.chat, { text: messageText }, { quoted: m });

        if (
          res.meta.pagination.current_page < res.meta.pagination.total_pages
        ) {
          m.reply(
            `Gunakan perintah ${prefix}listusr ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`,
          );
        }
      }
      break;
    case "delsrv":
      {
        let srv = args[0];
        if (!srv) return reply("Nama Server apa?");
        let f = await fetch(domain + "/api/application/servers/" + srv, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        let res = f.ok
          ? {
              errors: null,
            }
          : await f.json();
        if (res.errors) return m.reply("*SERVER NOT FOUND*");
        m.reply("*SUCCESSFULLY DELETE THE SERVER*");
      }
      break;
    case "listsrv":
      {
        let page = args[0] ? args[0] : "1";
        let f = await fetch(domain + "/api/application/servers?page=" + page, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        let res = await f.json();
        let servers = res.data;
        let sections = [];
        let messageText = "Berikut adalah daftar server:\n\n";

        for (let server of servers) {
          let s = server.attributes;

          let f3 = await fetch(
            domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources",
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + capikey,
              },
            },
          );

          let data = await f3.json();
          let status = data.attributes
            ? data.attributes.current_state
            : s.status;

          messageText += `ID Server: ${s.id}\n`;
          messageText += `Nama Server: ${s.name}\n`;
          messageText += `Status: ${status}\n\n`;
        }

        messageText += `Halaman: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total Server: ${res.meta.pagination.count}`;

        await conn.sendMessage(m.chat, { text: messageText }, { quoted: m });

        if (
          res.meta.pagination.current_page < res.meta.pagination.total_pages
        ) {
          m.reply(
            `Gunakan perintah ${prefix}listsrv ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`,
          );
        }
      }
      break;
    case "1gb":
      {
        let t = text.split(",");
        if (t.length < 3)
          return conn.reply(
            m.chat,
            `*Format salah!*

Penggunaan:
${usedPrefix + command} user,nomer,exp`,
          );
        let username = t[0];
        let u = m.quoted
          ? m.quoted.sender
          : t[1]
            ? t[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
            : m.mentionedJid[0];
        let bb = t[2];
        let name = username;
        let egg = "15";
        let loc = "1";
        let memo = "1000";
        let cpu = "150";
        let disk = "10000";
        let email = username + "@buyer.xenz";
        let exp = +new Date() + bb * 1000 * 60 * 60 * 24;
        if (!u) return;
        let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {};
        let password = username + `${command.toUpperCase()}`;
        let f = await fetch(domain + "/api/application/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            language: "en",
            password: password.toString(),
          }),
        });
        let data = await f.json();
        if (data.errors)
          return conn.reply(m.chat, JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;
        let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        conn.reply(m.chat, `SUCCES CREATE USER ID: ${user.id}`);
        ctf = `Hai @${u.split`@`[0]}

> ID : ${user.id}
> EMAIL : ${user.email}
> USERNAME : ${user.username}
> PASSWORD : ${password.toString()}
> TANGGAL : ${week} ${date}
> JAM : ${wktuwib} WIB
> EXPIRED: ${msToDate(exp - new Date() * 1)}
> LOGIN : ${domain}


> *NOTE*
OWNER HANYA MENGIRIM 1X DATA  AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI -----------------------------------

> ${global.info.wm || global.db.data.bots.info.wm}`;
        conn.sendMessage(
          u,
          { text: ctf, mentions: [`${u.split("@")[0]}@s.whatsapp.net`] },
          { quoted: conn.chat },
        );
       /* conn.sendCopy(
          u,
          '',
          ctf,
          '',
          [['Copy Username', user.username], ['Copy Password', password.toString()]],
          conn.chat
        );*/
        let data2 = await f2.json();
        let startup_cmd = data2.attributes.startup;

        let f3 = await fetch(domain + "/api/application/servers", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            name: name,
            description: `PAKET PANEL ${command}`,
            user: user.id,
            egg: parseInt(egg),
            docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
            startup: startup_cmd,
            environment: {
              INST: "npm",
              USER_UPLOAD: "0",
              AUTO_UPDATE: "0",
              CMD_RUN: "npm start",
            },
            limits: {
              memory: memo,
              swap: 0,
              disk: disk,
              io: 500,
              cpu: cpu,
            },
            feature_limits: {
              databases: 5,
              backups: 5,
              allocations: 5,
            },
            deploy: {
              locations: [parseInt(loc)],
              dedicated_ip: false,
              port_range: [],
            },
          }),
        });
        let res = await f3.json();
        if (res.errors)
          return conn.reply(m.chat, JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;
        await addDataPanel(
          u,
          user.id,
          server.id,
          exp,
          server.identifier,
          memo,
          cpu,
          disk,
          m.sender,
          false,
        );
        let p = await conn.reply(
          m.chat,
          `

*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID : ${user.id}
USERNAME : ${user.username}
EMAIL : ${user.email}
NAME : ${user.first_name} ${user.last_name}
MEMORY : ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK : ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU : ${server.limits.cpu}%
TANGGAL : ${week} ${date}
JAM : ${wktuwib} WIB
`,
        );
      }
      break;
    case "2gb":
      {
        let t = text.split(",");
        if (t.length < 3)
          return conn.reply(
            m.chat,
            `*Format salah!*

Penggunaan:
${usedPrefix + command} user,nomer,exp`,
          );
        let username = t[0];
        let u = m.quoted
          ? m.quoted.sender
          : t[1]
            ? t[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
            : m.mentionedJid[0];
        let bb = t[2];
        let name = username;
        let egg = "15";
        let loc = "1";
        let memo = "2000";
        let cpu = "200";
        let disk = "15000";
        let email = username + "@buyer.xenz";
        let exp = +new Date() + bb * 1000 * 60 * 60 * 24;

        if (!u) return;
        let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {};
        let password = username + `${command.toUpperCase()}`;
        let f = await fetch(domain + "/api/application/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            language: "en",
            password: password.toString(),
          }),
        });
        let data = await f.json();
        if (data.errors)
          return conn.reply(m.chat, JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;
        let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        conn.reply(m.chat, `SUCCES CREATE USER ID: ${user.id}`);
        ctf = `Hai @${u.split`@`[0]}

> ID : ${user.id}
> EMAIL : ${user.email}
> USERNAME : ${user.username}
> PASSWORD : ${password.toString()}
> TANGGAL : ${week} ${date}
> EXPIRED: ${msToDate(exp - new Date() * 1)}
> JAM : ${wktuwib} WIB
> LOGIN : ${domain}


> *NOTE*
OWNER HANYA MENGIRIM 1X DATA  AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI -----------------------------------

${global.info.wm || global.db.data.bots.info.wm}`;
        conn.sendMessage(
          u,
          { text: ctf, mentions: [`${u.split("@")[0]}@s.whatsapp.net`] },
          { quoted: conn.chat },
        );
        /*conn.sendCopy(
          u,
          '',
          ctf,
          '',
          [['Copy Username', user.username], ['Copy Password', password.toString()]],
          conn.chat
        );*/

        let data2 = await f2.json();
        let startup_cmd = data2.attributes.startup;

        let f3 = await fetch(domain + "/api/application/servers", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            name: name,
            description: `PAKET PANEL ${command}`,
            user: user.id,
            egg: parseInt(egg),
            docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
            startup: startup_cmd,
            environment: {
              INST: "npm",
              USER_UPLOAD: "0",
              AUTO_UPDATE: "0",
              CMD_RUN: "npm start",
            },
            limits: {
              memory: memo,
              swap: 0,
              disk: disk,
              io: 500,
              cpu: cpu,
            },
            feature_limits: {
              databases: 5,
              backups: 5,
              allocations: 5,
            },
            deploy: {
              locations: [parseInt(loc)],
              dedicated_ip: false,
              port_range: [],
            },
          }),
        });
        let res = await f3.json();
        if (res.errors)
          return conn.reply(m.chat, JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;
        await addDataPanel(
          u,
          user.id,
          server.id,
          exp,
          server.identifier,
          memo,
          cpu,
          disk,
          m.sender,
          false,
        );
        let p = await conn.reply(
          m.chat,
          `

*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID : ${user.id}
USERNAME : ${user.username}
EMAIL : ${user.email}
NAME : ${user.first_name} ${user.last_name}
MEMORY : ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK : ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU : ${server.limits.cpu}%
TANGGAL : ${week} ${date}
JAM : ${wktuwib} WIB
`,
        );
      }
      break;
    case "3gb":
      {
        let t = text.split(",");
        if (t.length < 3)
          return conn.reply(
            m.chat,
            `*Format salah!*

Penggunaan:
${usedPrefix + command} user,nomer,exp`,
          );
        let username = t[0];
        let u = m.quoted
          ? m.quoted.sender
          : t[1]
            ? t[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
            : m.mentionedJid[0];
        let bb = t[2];
        let name = username;
        let egg = "15";
        let loc = "1";
        let memo = "3000";
        let cpu = "250";
        let disk = "20000";
        let email = username + "@buyer.xenz";
        let exp = +new Date() + bb * 1000 * 60 * 60 * 24;

        if (!u) return;
        let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {};
        let password = username + `${command.toUpperCase()}`;
        let f = await fetch(domain + "/api/application/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            language: "en",
            password: password.toString(),
          }),
        });
        let data = await f.json();
        if (data.errors)
          return conn.reply(m.chat, JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;
        let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        conn.reply(m.chat, `SUCCES CREATE USER ID: ${user.id}`);
        ctf = `Hai @${u.split`@`[0]}

> ID : ${user.id}
> EMAIL : ${user.email}
> USERNAME : ${user.username}
> PASSWORD : ${password.toString()}
> TANGGAL : ${week} ${date}
> EXPIRED: ${msToDate(exp - new Date() * 1)}
> JAM : ${wktuwib} WIB
> LOGIN : ${domain}


> *NOTE*
OWNER HANYA MENGIRIM 1X DATA  AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI -----------------------------------

${global.info.wm || global.db.data.bots.info.wm}`;
        conn.sendMessage(
          u,
          { text: ctf, mentions: [`${u.split("@")[0]}@s.whatsapp.net`] },
          { quoted: conn.chat },
        );
        /*conn.sendCopy(
          u,
          '',
          ctf,
          '',
          [['Copy Username', user.username], ['Copy Password', password.toString()]],
          conn.chat
        );*/
        let data2 = await f2.json();
        let startup_cmd = data2.attributes.startup;

        let f3 = await fetch(domain + "/api/application/servers", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            name: name,
            description: `PAKET PANEL ${command}`,
            user: user.id,
            egg: parseInt(egg),
            docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
            startup: startup_cmd,
            environment: {
              INST: "npm",
              USER_UPLOAD: "0",
              AUTO_UPDATE: "0",
              CMD_RUN: "npm start",
            },
            limits: {
              memory: memo,
              swap: 0,
              disk: disk,
              io: 500,
              cpu: cpu,
            },
            feature_limits: {
              databases: 5,
              backups: 5,
              allocations: 5,
            },
            deploy: {
              locations: [parseInt(loc)],
              dedicated_ip: false,
              port_range: [],
            },
          }),
        });
        let res = await f3.json();
        if (res.errors)
          return conn.reply(m.chat, JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;
        await addDataPanel(
          u,
          user.id,
          server.id,
          exp,
          server.identifier,
          memo,
          cpu,
          disk,
          m.sender,
          false,
        );
        let p = await conn.reply(
          m.chat,
          `

*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID : ${user.id}
USERNAME : ${user.username}
EMAIL : ${user.email}
NAME : ${user.first_name} ${user.last_name}
MEMORY : ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK : ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU : ${server.limits.cpu}%
TANGGAL : ${week} ${date}
EXPIRED: ${msToDate(exp - new Date() * 1)}
JAM : ${wktuwib} WIB
`,
        );
      }

      break;
    case "4gb":
      {
        let t = text.split(",");
        if (t.length < 3)
          return conn.reply(
            m.chat,
            `*Format salah!*

Penggunaan:
${usedPrefix + command} user,nomer,exp`,
          );
        let username = t[0];
        let u = m.quoted
          ? m.quoted.sender
          : t[1]
            ? t[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
            : m.mentionedJid[0];
        let bb = t[2];
        let name = username;
        let egg = "15";
        let loc = "1";
        let memo = "4000";
        let cpu = "300";
        let disk = "25000";
        let email = username + "@buyer.xenz";
        await addDataPanel(
          u,
          user.id,
          server.id,
          exp,
          server.identifier,
          memo,
          cpu,
          disk,
          m.sender,
          false,
        );

        if (!u) return;
        let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {};
        let password = username + `${command.toUpperCase()}`;
        let f = await fetch(domain + "/api/application/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            language: "en",
            password: password.toString(),
          }),
        });
        let data = await f.json();
        if (data.errors)
          return conn.reply(m.chat, JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;
        let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        conn.reply(m.chat, `SUCCES CREATE USER ID: ${user.id}`);
        ctf = `Hai @${u.split`@`[0]}

> ID : ${user.id}
> EMAIL : ${user.email}
> USERNAME : ${user.username}
> PASSWORD : ${password.toString()}
> TANGGAL : ${week} ${date}
> JAM : ${wktuwib} WIB
> EXPIRED: ${msToDate(exp - new Date() * 1)}
> LOGIN : ${domain}


> *NOTE*
OWNER HANYA MENGIRIM 1X DATA  AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI -----------------------------------

${global.info.wm || global.db.data.bots.info.wm}`;
        conn.sendMessage(
          u,
          { text: ctf, mentions: [`${u.split("@")[0]}@s.whatsapp.net`] },
          { quoted: conn.chat },
        );
        /*conn.sendCopy(
          u,
          '',
          ctf,
          '',
                  [['Copy Username', user.username], ['Copy Password', password.toString()]],
          conn.chat
        );*/
        let data2 = await f2.json();
        let startup_cmd = data2.attributes.startup;

        let f3 = await fetch(domain + "/api/application/servers", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            name: name,
            description: `PAKET PANEL ${command}`,
            user: user.id,
            egg: parseInt(egg),
            docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
            startup: startup_cmd,
            environment: {
              INST: "npm",
              USER_UPLOAD: "0",
              AUTO_UPDATE: "0",
              CMD_RUN: "npm start",
            },
            limits: {
              memory: memo,
              swap: 0,
              disk: disk,
              io: 500,
              cpu: cpu,
            },
            feature_limits: {
              databases: 5,
              backups: 5,
              allocations: 5,
            },
            deploy: {
              locations: [parseInt(loc)],
              dedicated_ip: false,
              port_range: [],
            },
          }),
        });
        let res = await f3.json();
        if (res.errors)
          return conn.reply(m.chat, JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;
        await addDataPanel(
          u,
          user.id,
          server.id,
          exp,
          server.identifier,
          memo,
          cpu,
          disk,
          m.sender,
          false,
        );
        let p = await conn.reply(
          m.chat,
          `

*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID : ${user.id}
USERNAME : ${user.username}
EMAIL : ${user.email}
NAME : ${user.first_name} ${user.last_name}
MEMORY : ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK : ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU : ${server.limits.cpu}%
TANGGAL : ${week} ${date}
JAM : ${wktuwib} WIB
`,
        );
      }

      break;
    case "5gb":
      {
        let t = text.split(",");
        if (t.length < 3)
          return conn.reply(
            m.chat,
            `*Format salah!*

Penggunaan:
${usedPrefix + command} user,nomer,exp`,
          );
        let username = t[0];
        let u = m.quoted
          ? m.quoted.sender
          : t[1]
            ? t[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
            : m.mentionedJid[0];
        let bb = t[2];
        let name = username;
        let egg = "15";
        let loc = "1";
        let memo = "5000";
        let cpu = "350";
        let disk = "30000";
        let email = username + "@buyer.xenz";
        let exp = +new Date() + bb * 1000 * 60 * 60 * 24;

        if (!u) return;
        let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {};
        let password = username + `${command.toUpperCase()}`;
        let f = await fetch(domain + "/api/application/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            language: "en",
            password: password.toString(),
          }),
        });
        let data = await f.json();
        if (data.errors)
          return conn.reply(m.chat, JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;
        let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        conn.reply(m.chat, `SUCCES CREATE USER ID: ${user.id}`);
        ctf = `Hai @${u.split`@`[0]}

> ID : ${user.id}
> EMAIL : ${user.email}
> USERNAME : ${user.username}
> PASSWORD : ${password.toString()}
> TANGGAL : ${week} ${date}
> JAM : ${wktuwib} WIB
> EXPIRED: ${msToDate(exp - new Date() * 1)}
> LOGIN : ${domain}


> *NOTE*
OWNER HANYA MENGIRIM 1X DATA  AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI -----------------------------------

${global.info.wm || global.db.data.bots.info.wm}`;
        conn.sendMessage(
          u,
          { text: ctf, mentions: [`${u.split("@")[0]}@s.whatsapp.net`] },
          { quoted: conn.chat },
        );
        /*conn.sendCopy(
          u,
          '',
          ctf,
          '',
                  [['Copy Username', user.username], ['Copy Password', password.toString()]],
          conn.chat
        );*/
        let data2 = await f2.json();
        let startup_cmd = data2.attributes.startup;

        let f3 = await fetch(domain + "/api/application/servers", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            name: name,
            description: `PAKET PANEL ${command}`,
            user: user.id,
            egg: parseInt(egg),
            docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
            startup: startup_cmd,
            environment: {
              INST: "npm",
              USER_UPLOAD: "0",
              AUTO_UPDATE: "0",
              CMD_RUN: "npm start",
            },
            limits: {
              memory: memo,
              swap: 0,
              disk: disk,
              io: 500,
              cpu: cpu,
            },
            feature_limits: {
              databases: 5,
              backups: 5,
              allocations: 5,
            },
            deploy: {
              locations: [parseInt(loc)],
              dedicated_ip: false,
              port_range: [],
            },
          }),
        });
        let res = await f3.json();
        if (res.errors)
          return conn.reply(m.chat, JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;
        await addDataPanel(
          u,
          user.id,
          server.id,
          exp,
          server.identifier,
          memo,
          cpu,
          disk,
          m.sender,
          false,
        );
        let p = await conn.reply(
          m.chat,
          `

*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID : ${user.id}
USERNAME : ${user.username}
EMAIL : ${user.email}
NAME : ${user.first_name} ${user.last_name}
MEMORY : ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK : ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU : ${server.limits.cpu}%
TANGGAL : ${week} ${date}
JAM : ${wktuwib} WIB
`,
        );
      }

      break;
    case "6gb":
      {
        let t = text.split(",");
        if (t.length < 3)
          return conn.reply(
            m.chat,
            `*Format salah!*

Penggunaan:
${usedPrefix + command} user,nomer,exp`,
          );
        let username = t[0];
        let u = m.quoted
          ? m.quoted.sender
          : t[1]
            ? t[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
            : m.mentionedJid[0];
        let bb = t[2];
        let name = username;
        let egg = "15";
        let loc = "1";
        let memo = "6000";
        let cpu = "400";
        let disk = "35000";
        let email = username + "@buyer.xenz";
        let exp = +new Date() + bb * 1000 * 60 * 60 * 24;

        if (!u) return;
        let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {};
        let password = username + `${command.toUpperCase()}`;
        let f = await fetch(domain + "/api/application/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            language: "en",
            password: password.toString(),
          }),
        });
        let data = await f.json();
        if (data.errors)
          return conn.reply(m.chat, JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;
        let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        conn.reply(m.chat, `SUCCES CREATE USER ID: ${user.id}`);
        ctf = `Hai @${u.split`@`[0]}

> ID : ${user.id}
> EMAIL : ${user.email}
> USERNAME : ${user.username}
> PASSWORD : ${password.toString()}
> TANGGAL : ${week} ${date}
> JAM : ${wktuwib} WIB
> EXPIRED: ${msToDate(exp - new Date() * 1)}
> LOGIN : ${domain}


> *NOTE*
OWNER HANYA MENGIRIM 1X DATA  AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI -----------------------------------

${global.info.wm || global.db.data.bots.info.wm}`;
        conn.sendMessage(
          u,
          { text: ctf, mentions: [`${u.split("@")[0]}@s.whatsapp.net`] },
          { quoted: conn.chat },
        );
        /*conn.sendCopy(
          u,
          '',
          ctf,
          '',
                  [['Copy Username', user.username], ['Copy Password', password.toString()]],
          conn.chat
        );*/
        let data2 = await f2.json();
        let startup_cmd = data2.attributes.startup;

        let f3 = await fetch(domain + "/api/application/servers", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            name: name,
            description: `PAKET PANEL ${command}`,
            user: user.id,
            egg: parseInt(egg),
            docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
            startup: startup_cmd,
            environment: {
              INST: "npm",
              USER_UPLOAD: "0",
              AUTO_UPDATE: "0",
              CMD_RUN: "npm start",
            },
            limits: {
              memory: memo,
              swap: 0,
              disk: disk,
              io: 500,
              cpu: cpu,
            },
            feature_limits: {
              databases: 5,
              backups: 5,
              allocations: 5,
            },
            deploy: {
              locations: [parseInt(loc)],
              dedicated_ip: false,
              port_range: [],
            },
          }),
        });
        let res = await f3.json();
        if (res.errors)
          return conn.reply(m.chat, JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;
        await addDataPanel(
          u,
          user.id,
          server.id,
          exp,
          server.identifier,
          memo,
          cpu,
          disk,
          m.sender,
          false,
        );
        let p = await conn.reply(
          m.chat,
          `

*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID : ${user.id}
USERNAME : ${user.username}
EMAIL : ${user.email}
NAME : ${user.first_name} ${user.last_name}
MEMORY : ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK : ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU : ${server.limits.cpu}%
TANGGAL : ${week} ${date}
JAM : ${wktuwib} WIB
`,
        );
      }

      break;
    case "7gb":
      {
        let t = text.split(",");
        if (t.length < 3)
          return conn.reply(
            m.chat,
            `*Format salah!*

Penggunaan:
${usedPrefix + command} user,nomer,exp`,
          );
        let username = t[0];
        let u = m.quoted
          ? m.quoted.sender
          : t[1]
            ? t[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
            : m.mentionedJid[0];
        let bb = t[2];
        let name = username;
        let egg = "15";
        let loc = "1";
        let memo = "7000";
        let cpu = "450";
        let disk = "40000";
        let email = username + "@buyer.xenz";
        let exp = +new Date() + bb * 1000 * 60 * 60 * 24;

        if (!u) return;
        let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {};
        let password = username + `${command.toUpperCase()}`;
        let f = await fetch(domain + "/api/application/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            language: "en",
            password: password.toString(),
          }),
        });
        let data = await f.json();
        if (data.errors)
          return conn.reply(m.chat, JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;
        let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        conn.reply(m.chat, `SUCCES CREATE USER ID: ${user.id}`);
        ctf = `Hai @${u.split`@`[0]}

> ID : ${user.id}
> EMAIL : ${user.email}
> USERNAME : ${user.username}
> PASSWORD : ${password.toString()}
> TANGGAL : ${week} ${date}
> JAM : ${wktuwib} WIB
> EXPIRED: ${msToDate(exp - new Date() * 1)}
> LOGIN : ${domain}


> *NOTE*
OWNER HANYA MENGIRIM 1X DATA  AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI -----------------------------------

${global.info.wm || global.db.data.bots.info.wm}`;
        conn.sendMessage(
          u,
          { text: ctf, mentions: [`${u.split("@")[0]}@s.whatsapp.net`] },
          { quoted: conn.chat },
        );
        /*conn.sendCopy(
          u,
          '',
          ctf,
          '',
                  [['Copy Username', user.username], ['Copy Password', password.toString()]],
          conn.chat
        );*/
        let data2 = await f2.json();
        let startup_cmd = data2.attributes.startup;

        let f3 = await fetch(domain + "/api/application/servers", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            name: name,
            description: `PAKET PANEL ${command}`,
            user: user.id,
            egg: parseInt(egg),
            docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
            startup: startup_cmd,
            environment: {
              INST: "npm",
              USER_UPLOAD: "0",
              AUTO_UPDATE: "0",
              CMD_RUN: "npm start",
            },
            limits: {
              memory: memo,
              swap: 0,
              disk: disk,
              io: 500,
              cpu: cpu,
            },
            feature_limits: {
              databases: 5,
              backups: 5,
              allocations: 5,
            },
            deploy: {
              locations: [parseInt(loc)],
              dedicated_ip: false,
              port_range: [],
            },
          }),
        });
        let res = await f3.json();
        if (res.errors)
          return conn.reply(m.chat, JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;
        await addDataPanel(
          u,
          user.id,
          server.id,
          exp,
          server.identifier,
          memo,
          cpu,
          disk,
          m.sender,
          false,
        );
        let p = await conn.reply(
          m.chat,
          `

*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID : ${user.id}
USERNAME : ${user.username}
EMAIL : ${user.email}
NAME : ${user.first_name} ${user.last_name}
MEMORY : ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK : ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU : ${server.limits.cpu}%
TANGGAL : ${week} ${date}
JAM : ${wktuwib} WIB
`,
        );
      }

      break;
    case "8gb":
      {
        let t = text.split(",");
        if (t.length < 3)
          return conn.reply(
            m.chat,
            `*Format salah!*

Penggunaan:
${usedPrefix + command} user,nomer`,
          );
        let username = t[0];
        let u = m.quoted
          ? m.quoted.sender
          : t[1]
            ? t[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
            : m.mentionedJid[0];
        let bb = t[2];
        let name = username;
        let egg = "15";
        let loc = "1";
        let memo = "8000";
        let cpu = "500";
        let disk = "45000";
        let email = username + "@buyer.xenz";

        if (!u) return;
        let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {};
        let password = username + `${command.toUpperCase()}`;
        let f = await fetch(domain + "/api/application/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            language: "en",
            password: password.toString(),
          }),
        });
        let data = await f.json();
        if (data.errors)
          return conn.reply(m.chat, JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;
        let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        conn.reply(m.chat, `SUCCES CREATE USER ID: ${user.id}`);
        ctf = `Hai @${u.split`@`[0]}

> ID : ${user.id}
> EMAIL : ${user.email}
> USERNAME : ${user.username}
> PASSWORD : ${password.toString()}
> TANGGAL : ${week} ${date}
> JAM : ${wktuwib} WIB
> EXPIRED: ${msToDate(exp - new Date() * 1)}
> LOGIN : ${domain}


> *NOTE*
OWNER HANYA MENGIRIM 1X DATA  AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI -----------------------------------

${global.info.wm || global.db.data.bots.info.wm}`;
        conn.sendMessage(
          u,
          { text: ctf, mentions: [`${u.split("@")[0]}@s.whatsapp.net`] },
          { quoted: conn.chat },
        );
        /*conn.sendCopy(
          u,
          '',
          ctf,
          '',
                  [['Copy Username', user.username], ['Copy Password', password.toString()]],
          conn.chat
        );*/
        let data2 = await f2.json();
        let startup_cmd = data2.attributes.startup;

        let f3 = await fetch(domain + "/api/application/servers", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            name: name,
            description: `PAKET PANEL ${command}`,
            user: user.id,
            egg: parseInt(egg),
            docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
            startup: startup_cmd,
            environment: {
              INST: "npm",
              USER_UPLOAD: "0",
              AUTO_UPDATE: "0",
              CMD_RUN: "npm start",
            },
            limits: {
              memory: memo,
              swap: 0,
              disk: disk,
              io: 500,
              cpu: cpu,
            },
            feature_limits: {
              databases: 5,
              backups: 5,
              allocations: 5,
            },
            deploy: {
              locations: [parseInt(loc)],
              dedicated_ip: false,
              port_range: [],
            },
          }),
        });
        let res = await f3.json();
        if (res.errors)
          return conn.reply(m.chat, JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;
        await addDataPanel(
          u,
          user.id,
          server.id,
          exp,
          server.identifier,
          memo,
          cpu,
          disk,
          m.sender,
          false,
        );
        let p = await conn.reply(
          m.chat,
          `

*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID : ${user.id}
USERNAME : ${user.username}
EMAIL : ${user.email}
NAME : ${user.first_name} ${user.last_name}
MEMORY : ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK : ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU : ${server.limits.cpu}%
TANGGAL : ${week} ${date}
JAM : ${wktuwib} WIB
`,
        );
      }

      break;
    case "9gb":
      {
        let t = text.split(",");
        if (t.length < 2)
          return conn.reply(
            m.chat,
            `*Format salah!*

Penggunaan:
${usedPrefix + command} user,nomer`,
          );
        let username = t[0];
        let u = m.quoted
          ? m.quoted.sender
          : t[1]
            ? t[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
            : m.mentionedJid[0];
        let bb = t[2];
        let name = username;
        let egg = "15";
        let loc = "1";
        let memo = "9000";
        let cpu = "550";
        let disk = "55000";
        let email = username + "@buyer.xenz";
        let exp = +new Date() + bb * 1000 * 60 * 60 * 24;

        if (!u) return;
        let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {};
        let password = username + `${command.toUpperCase()}`;
        let f = await fetch(domain + "/api/application/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            language: "en",
            password: password.toString(),
          }),
        });
        let data = await f.json();
        if (data.errors)
          return conn.reply(m.chat, JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;
        let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        conn.reply(m.chat, `SUCCES CREATE USER ID: ${user.id}`);
        ctf = `Hai @${u.split`@`[0]}

> ID : ${user.id}
> EMAIL : ${user.email}
> USERNAME : ${user.username}
> PASSWORD : ${password.toString()}
> TANGGAL : ${week} ${date}
> JAM : ${wktuwib} WIB
> EXPIRED: ${msToDate(exp - new Date() * 1)}
> LOGIN : ${domain}


> *NOTE*
OWNER HANYA MENGIRIM 1X DATA  AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI -----------------------------------

${global.info.wm || global.db.data.bots.info.wm}`;
        conn.sendMessage(
          u,
          { text: ctf, mentions: [`${u.split("@")[0]}@s.whatsapp.net`] },
          { quoted: conn.chat },
        );
        /*conn.sendCopy(
          u,
          '',
          ctf,
          '',
                  [['Copy Username', user.username], ['Copy Password', password.toString()]],
          conn.chat
        );*/
        let data2 = await f2.json();
        let startup_cmd = data2.attributes.startup;

        let f3 = await fetch(domain + "/api/application/servers", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            name: name,
            description: `PAKET PANEL ${command}`,
            user: user.id,
            egg: parseInt(egg),
            docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
            startup: startup_cmd,
            environment: {
              INST: "npm",
              USER_UPLOAD: "0",
              AUTO_UPDATE: "0",
              CMD_RUN: "npm start",
            },
            limits: {
              memory: memo,
              swap: 0,
              disk: disk,
              io: 500,
              cpu: cpu,
            },
            feature_limits: {
              databases: 5,
              backups: 5,
              allocations: 5,
            },
            deploy: {
              locations: [parseInt(loc)],
              dedicated_ip: false,
              port_range: [],
            },
          }),
        });
        let res = await f3.json();
        if (res.errors)
          return conn.reply(m.chat, JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;
        await addDataPanel(
          u,
          user.id,
          server.id,
          exp,
          server.identifier,
          memo,
          cpu,
          disk,
          m.sender,
          false,
        );
        let p = await conn.reply(
          m.chat,
          `

*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID : ${user.id}
USERNAME : ${user.username}
EMAIL : ${user.email}
NAME : ${user.first_name} ${user.last_name}
MEMORY : ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK : ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU : ${server.limits.cpu}%
TANGGAL : ${week} ${date}
JAM : ${wktuwib} WIB
`,
        );
      }

      break;
    case "10gb":
      {
        let t = text.split(",");
        if (t.length < 3)
          return conn.reply(
            m.chat,
            `*Format salah!*

Penggunaan:
${usedPrefix + command} user,nomer,exp`,
          );
        let username = t[0];
        let u = m.quoted
          ? m.quoted.sender
          : t[1]
            ? t[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
            : m.mentionedJid[0];
        let bb = t[2];
        let name = username;
        let egg = "15";
        let loc = "1";
        let memo = "10000";
        let cpu = "600";
        let disk = "60000";
        let email = username + "@buyer.xenz";
        let exp = +new Date() + bb * 1000 * 60 * 60 * 24;

        if (!u) return;
        let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {};
        let password = username + `${command.toUpperCase()}`;
        let f = await fetch(domain + "/api/application/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            language: "en",
            password: password.toString(),
          }),
        });
        let data = await f.json();
        if (data.errors)
          return conn.reply(m.chat, JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;
        let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        conn.reply(m.chat, `SUCCES CREATE USER ID: ${user.id}`);
        ctf = `Hai @${u.split`@`[0]}

> ID : ${user.id}
> EMAIL : ${user.email}
> USERNAME : ${user.username}
> PASSWORD : ${password.toString()}
> TANGGAL : ${week} ${date}
> JAM : ${wktuwib} WIB
> EXPIRED: ${msToDate(exp - new Date() * 1)}
> LOGIN : ${domain}


> *NOTE*
OWNER HANYA MENGIRIM 1X DATA  AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI -----------------------------------

${global.info.wm || global.db.data.bots.info.wm}`;
        conn.sendMessage(
          u,
          { text: ctf, mentions: [`${u.split("@")[0]}@s.whatsapp.net`] },
          { quoted: conn.chat },
        );
        /*conn.sendCopy(
          u,
          '',
          ctf,
          '',
                  [['Copy Username', user.username], ['Copy Password', password.toString()]],
          conn.chat
        );*/
        let data2 = await f2.json();
        let startup_cmd = data2.attributes.startup;

        let f3 = await fetch(domain + "/api/application/servers", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            name: name,
            description: `PAKET PANEL ${command}`,
            user: user.id,
            egg: parseInt(egg),
            docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
            startup: startup_cmd,
            environment: {
              INST: "npm",
              USER_UPLOAD: "0",
              AUTO_UPDATE: "0",
              CMD_RUN: "npm start",
            },
            limits: {
              memory: memo,
              swap: 0,
              disk: disk,
              io: 500,
              cpu: cpu,
            },
            feature_limits: {
              databases: 5,
              backups: 5,
              allocations: 5,
            },
            deploy: {
              locations: [parseInt(loc)],
              dedicated_ip: false,
              port_range: [],
            },
          }),
        });
        let res = await f3.json();
        if (res.errors)
          return conn.reply(m.chat, JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;
        await addDataPanel(
          u,
          user.id,
          server.id,
          exp,
          server.identifier,
          memo,
          cpu,
          disk,
          m.sender,
          false,
        );
        let p = await conn.reply(
          m.chat,
          `

*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID : ${user.id}
USERNAME : ${user.username}
EMAIL : ${user.email}
NAME : ${user.first_name} ${user.last_name}
MEMORY : ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK : ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU : ${server.limits.cpu}%
TANGGAL : ${week} ${date}
JAM : ${wktuwib} WIB
`,
        );
      }

      break;
    case "unli": {
      let t = text.split(",");
      if (t.length < 3)
        return conn.reply(
          m.chat,
          `*Format salah!*

Penggunaan:
${usedPrefix + command} user,nomer,exp`,
        );
      let username = t[0];
      let u = m.quoted
        ? m.quoted.sender
        : t[1]
          ? t[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
          : m.mentionedJid[0];
      let bb = t[2];
      let name = username;
      let egg = "15";
      let loc = "1";
      let memo = "0";
      let cpu = "0";
      let disk = "0";
      let email = username + "@buyer.xenz";
      let exp = +new Date() + bb * 1000 * 60 * 60 * 24;

      if (!u) return;
      let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {};
      let password = username + `${command.toUpperCase()}`;
      let f = await fetch(domain + "/api/application/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + apikey,
        },
        body: JSON.stringify({
          email: email,
          username: username,
          first_name: username,
          last_name: username,
          language: "en",
          password: password.toString(),
        }),
      });
      let data = await f.json();
      if (data.errors)
        return conn.reply(m.chat, JSON.stringify(data.errors[0], null, 2));
      let user = data.attributes;
      let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + apikey,
        },
      });
      conn.reply(m.chat, `SUCCES CREATE USER ID: ${user.id}`);
      ctf = `Hai @${u.split`@`[0]}

> ID : ${user.id}
> EMAIL : ${user.email}
> USERNAME : ${user.username}
> PASSWORD : ${password.toString()}
> TANGGAL : ${week} ${date}
> JAM : ${wktuwib} WIB
> EXPIRED: ${msToDate(exp - new Date() * 1)}
> LOGIN : ${domain}


> *NOTE*
OWNER HANYA MENGIRIM 1X DATA  AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI -----------------------------------

${global.info.wm || global.db.data.bots.info.wm}`;
      conn.sendMessage(
        u,
        { text: ctf, mentions: [`${u.split("@")[0]}@s.whatsapp.net`] },
        { quoted: conn.chat },
      );
      /*conn.sendCopy(
        u,
        '',
        ctf,
        '',
                [['Copy Username', user.username], ['Copy Password', password.toString()]],
        conn.chat
      );*/
      let data2 = await f2.json();
      let startup_cmd = data2.attributes.startup;

      let f3 = await fetch(domain + "/api/application/servers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + apikey,
        },
        body: JSON.stringify({
          name: name,
          description: `PAKET PANEL ${command}`,
          user: user.id,
          egg: parseInt(egg),
          docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
          startup: startup_cmd,
          environment: {
            INST: "npm",
            USER_UPLOAD: "0",
            AUTO_UPDATE: "0",
            CMD_RUN: "npm start",
          },
          limits: {
            memory: memo,
            swap: 0,
            disk: disk,
            io: 500,
            cpu: cpu,
          },
          feature_limits: {
            databases: 5,
            backups: 5,
            allocations: 5,
          },
          deploy: {
            locations: [parseInt(loc)],
            dedicated_ip: false,
            port_range: [],
          },
        }),
      });
      let res = await f3.json();
      if (res.errors)
        return conn.reply(m.chat, JSON.stringify(res.errors[0], null, 2));
      let server = res.attributes;
      await addDataPanel(
        u,
        user.id,
        server.id,
        exp,
        server.identifier,
        memo,
        cpu,
        disk,
        m.sender,
        false,
      );
      let p = await conn.reply(
        m.chat,
        `

*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID : ${user.id}
USERNAME : ${user.username}
EMAIL : ${user.email}
NAME : ${user.first_name} ${user.last_name}
MEMORY : ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK : ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU : ${server.limits.cpu}%
TANGGAL : ${week} ${date}
JAM : ${wktuwib} WIB

`,
      );
      break;
    }
  }
};

handler.help = [
  "1gb",
  "2gb",
  "3gb",
  "4gb",
  "5gb",
  "6gb",
  "7gb",
  "8gb",
  "9gb",
  "10gb",
  "unli",
  "listsrv",
  "delsrv",
  "listusr",
];
handler.tags = ["panel"];
handler.command = [
  "1gb",
  "2gb",
  "3gb",
  "4gb",
  "5gb",
  "6gb",
  "7gb",
  "8gb",
  "9gb",
  "10gb",
  "unli",
  "listsrv",
  "delsrv",
  "listusr",
];
handler.owner = true;
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
