/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import fetch from "node-fetch";

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  const domainConfig = global.db.data.bots.subdo;

  // Tampilkan contoh penggunaan dan daftar domain jika tidak ada argumen
  if (!args.length) {
    const domainList = domainConfig
      .map(
        (config, i) => `*${i + 1}.* ${config.tld}`
      )
      .join("\n");

    const usageExample = `Contoh Penggunaan:\n` +
      `1. Tambah subdomain: *${usedPrefix}${command} index|host|ip*\n` +
      `   Contoh: *${usedPrefix}${command} 1|blog|192.168.1.1*\n\n` +
      `2. Hapus subdomain: *${usedPrefix}${command} delete <index> <dns_record_id>*\n` +
      `   Contoh: *${usedPrefix}${command} delete 1 <dns_record_id>*\n\n` +
      `3. Lihat subdomain: *${usedPrefix}${command} list <index>*\n` +
      `   Contoh: *${usedPrefix}${command} list 1*\n\n`;

    return conn.reply(
      m.chat,
      `Berikut adalah daftar domain yang tersedia:\n\n${domainList}\n\n${usageExample}`,
      m
    );
  }

  // List subdomains
  if (args.length === 2 && args[0].toLowerCase() === "list") {
    const index = parseInt(args[1]);
    if (isNaN(index) || index < 1 || index > domainConfig.length) {
      return conn.reply(
        m.chat,
        `Index tidak valid. Berikan angka yang sesuai antara 1 hingga ${domainConfig.length}.`,
        m
      );
    }

    const config = domainConfig[index - 1];

    try {
      const subdomains = await getSubdomains(config.zone, config.apitoken);
      const aliasList = subdomains.map((subdomain, i) => ({
        alias: i + 1,
        response: `.domain delete ${index} ${subdomain.dns_record_id}`
      }));

      // Mengganti sendList dengan sendAliasMessage
      await conn.sendAliasMessage(
        m.chat,
        { text: "Daftar Subdomain\nSilakan pilih salah satu untuk menghapus subdomain." },
        aliasList,
        m
      );
    } catch (error) {
      throw error;
    }
  }

  // Delete subdomain
  if (args.length === 3 && args[0].toLowerCase() === "delete") {
    const index = parseInt(args[1]);
    if (isNaN(index) || index < 1 || index > domainConfig.length) {
      return conn.reply(
        m.chat,
        `Index tidak valid. Berikan angka yang sesuai antara 1 hingga ${domainConfig.length}.`,
        m
      );
    }

    const config = domainConfig[index - 1];
    const dnsRecordId = args[2];

    try {
      await deleteSubdomain(config.zone, config.apitoken, dnsRecordId);
      return conn.reply(m.chat, "Subdomain berhasil dihapus.", m);
    } catch (error) {
      throw error;
    }
  }

  // Add subdomain
  if (args.length === 1 && args[0].toLowerCase().includes("|")) {
    const [index, host, ip] = args[0].split("|").map((v) => v.trim());
    const i = parseInt(index) - 1;
    if (isNaN(i) || i < 0 || i >= domainConfig.length) {
      return conn.reply(
        m.chat,
        `Index tidak valid. Berikan angka yang sesuai antara 1 hingga ${domainConfig.length}.\n\nContoh: .domain index|host|ip`,
        m
      );
    }

    const config = domainConfig[i];

    if (!host || !ip) {
      return conn.reply(m.chat, "Mohon berikan host dan IP yang valid.", m);
    }

    try {
      const json = await createSubDomain(
        config.zone,
        config.apitoken,
        config.tld,
        host,
        ip
      );
      const v = json.result;
      const caption = `🔍 *[ HASIL ]*

🆔 *ID:* ${v.id || "Tidak diketahui"}
🗺️ *Zone ID:* ${v.zone_id || "Tidak diketahui"}
🏷️ *Zone Name:* ${v.zone_name || "Tidak diketahui"}
📛 *Name:* ${v.name || "Tidak diketahui"}
⏰ *Created On:* ${v.created_on || "Tidak diketahui"}
⏰ *Modified On:* ${v.modified_on || "Tidak diketahui"}`;

      await m.reply(
        caption
      );
    } catch (error) {
      throw error;
    }
  }
};

handler.help = [
  "domain",
  "domain delete <index> <dns_record_id>",
  "domain list <index>",
];
handler.tags = ["owner"];
handler.owner = true;
handler.command = ["domain"];

export default handler;

async function createSubDomain(zone, apitoken, tld, host, ip) {
  const headers = {
    Authorization: "Bearer " + apitoken,
    "Content-Type": "application/json",
  };

  const data = {
    type: "A",
    name: `${host.replace(/[^a-z0-9.-]/gi, "")}.${tld}`,
    content: ip.replace(/[^0-9.]/gi, ""),
    ttl: 3600,
    priority: 10,
    proxied: false,
  };

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    }
  );

  const res = await response.json();
  return res;
}

async function getSubdomains(zone, apitoken) {
  const headers = {
    Authorization: "Bearer " + apitoken,
    "Content-Type": "application/json",
  };

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
    {
      method: "GET",
      headers: headers,
    }
  );

  const res = await response.json();
  return res.result.map((subdomain) => ({
    id: subdomain.id,
    name: subdomain.name,
    type: subdomain.type,
    dns_record_id: subdomain.id,
  }));
}

async function deleteSubdomain(zone, apitoken, dnsRecordId) {
  const headers = {
    Authorization: "Bearer " + apitoken,
    "Content-Type": "application/json",
  };

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records/${dnsRecordId}`,
    {
      method: "DELETE",
      headers: headers,
    }
  );

  if (!response.ok) {
    throw new Error(
      `Gagal menghapus subdomain. HTTP status ${response.status}`
    );
  }
}