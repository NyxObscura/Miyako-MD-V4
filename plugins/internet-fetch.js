/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";
import { format } from "util";
import path from "path";
import qs from "querystring";

let handler = async (m, { text, conn, usedPrefix, command }) => {

  let urlMatch = text.match(/https?:\/\/[^\s]+/);
  if (!urlMatch)
    return m.reply(`Contoh : ${usedPrefix + command} https://google.com

Contoh input data : 
1. data = --header "Referer: https://google.com/"
2. data = --header "Referer: https://google.com/" --header "Origin: https://google.com/"

List Options :
--method 'GET/POST/DELETE' untuk metode permintaan
--headers 'name: value'
--data 'name: value'
--form 'name: value'
--redirect --direct untuk respon pengalihan URL
--cookie 'name: value' untuk mengirim cookie dari string
--head untuk mendapatkan respon headers
--family '0/4/6' untuk menggunakan IPv4/IPv6`);

  let url = urlMatch[0];
  let optionsText = text.replace(url, '').trim();
  let options = optionsText ? parseOptions(optionsText) : {};

  let requestOptions = {
    method: options.method || 'GET',
    headers: options.headers,
    redirect: options.redirect ? 'follow' : 'manual',
    family: options.family || 0,
  };

  // Handle non-GET and non-HEAD requests for sending data
  if (['POST', 'PUT', 'DELETE'].includes(requestOptions.method)) {
    if (options.data || options.form) {
      requestOptions.body = qs.stringify(options.data || options.form);
      requestOptions.headers = {
        ...requestOptions.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      };
    }
  }

  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.config.loading)
    : false;

  let redirectUrl = url;
  let maxRedirects = 999999;
  let redirectCount = 0;

  while (redirectCount < maxRedirects) {
    let res = await fetch(redirectUrl, requestOptions);

    if (res.headers.get("content-length") > 100 * 1024 * 1024) {
      res.body.destroy();
      m.reply(`Content-Length: ${res.headers.get("content-length")}`);
      break; // Stop further processing if content is too large
    }

    const contentType = res.headers.get("content-type");
    const contentDisposition = res.headers.get("content-disposition");
    let filename;

    if (contentDisposition && contentDisposition.includes("filename=")) {
      filename = contentDisposition.split("filename=")[1].trim();
    } else if (contentDisposition) {
      filename = contentDisposition.replace(/^filename=/i, "").trim();
    } else {
      filename = path.basename(new URL(redirectUrl).pathname);
    }

    // Handle response based on content type
    if (/^image\//.test(contentType)) {
      try {
        await conn.sendFile(m.chat, redirectUrl, filename, text, m);
      } catch (err) {
        await m.reply("Respons bukan gambar");
        await conn.sendFile(m.chat, redirectUrl, filename, text, m);
      }
    } else if (/^text\//.test(contentType)) {
      try {
        let txt = await res.text();
        await conn.sendMessage(m.chat, { text: txt.slice(0, 65536) + "" }, { quoted: m });
        await conn.sendFile(m.chat, Buffer.from(txt), "file.txt", "", m);
      } catch (e) {
        await m.reply("Respons bukan teks");
      }
    } else if (/^application\/json/.test(contentType)) {
      try {
        let json = await res.json();
        let formattedJson = rapihkan(json);
        await conn.sendMessage(m.chat, { text: formattedJson }, { quoted: m });
        await conn.sendFile(m.chat, Buffer.from(JSON.stringify(json, null, 2)), "file.json", "", m);
      } catch (error) {
        m.reply("Respons bukan JSON");
      }
    } else if (/^text\/html/.test(contentType)) {
      try {
        let html = await res.text();
        await conn.sendFile(m.chat, Buffer.from(html), "file.html", "", m);
      } catch (error) {
        await m.reply("Respons bukan HTML");
      }
    } else {
      await conn.sendFile(m.chat, redirectUrl, filename, text, m);
    }

    // Handle redirects
    if (res.status === 301 || res.status === 302 || res.status === 307 || res.status === 308) {
      let location = res.headers.get("location");
      if (location) {
        redirectUrl = location;
        redirectCount++;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  if (redirectCount >= maxRedirects) {
    m.reply(`Terlalu banyak pengalihan (max: ${maxRedirects})`);
  }
};

handler.help = ["fetch", "get"].map((v) => v + " <url>");
handler.tags = ["internet"];
handler.command = /^(fetch|get)$/i;

export default handler;

function parseOptions(text) {
  let options = {
    headers: {},
    data: {},
    form: {},
  };

  // Parse method
  let methodMatch = text.match(/--method\s+['"]?(GET|POST|DELETE|PUT)['"]?/i);
  if (methodMatch) {
    options.method = methodMatch[1];
  }

  // Parse headers
  let headersMatch = [...text.matchAll(/--headers?\s+['"]([^:]+):\s*([^'"]+)['"]/g)];
  for (let [, name, value] of headersMatch) {
    options.headers[name] = value;
  }

  // Parse data
  let dataMatch = [...text.matchAll(/--data\s+['"]([^:]+):\s*([^'"]+)['"]/g)];
  for (let [, name, value] of dataMatch) {
    options.data[name] = value;
  }

  // Parse form data
  let formMatch = [...text.matchAll(/--form\s+['"]([^:]+):\s*([^'"]+)['"]/g)];
  for (let [, name, value] of formMatch) {
    options.form[name] = value;
  }

  // Handle redirect flag
  if (/--redirect/.test(text)) {
    options.redirect = true;
  }

  // Handle head flag
  if (/--head/.test(text)) {
    options.head = true;
  }

  // Parse family (IP version)
  let familyMatch = text.match(/--family\s+['"]?(0|4|6)['"]?/i);
  if (familyMatch) {
    options.family = parseInt(familyMatch[1], 10);
  }

  return options;
}

function rapihkan(json, depth = 0, array = []) {
  for (const key in json) {
    array.push("┊".repeat(depth) + (depth > 0 ? " " : "") + `*${key}:*`);
    if (typeof json[key] === "object") {
      rapihkan(json[key], depth + 1, array);
    } else {
      array[array.length - 1] += " " + json[key];
    }
  }
  return array.join("\n");
}