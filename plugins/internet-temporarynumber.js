/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";
import cheerio from "cheerio";

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
  let lister = ["country", "number", "msg"];

  let [feature, inputs, inputs_] = text.split("|");
  if (!lister.includes(feature))
    return m.reply(
      "*Example:*\n.num search|vpn\n\n*Pilih type yg ada*\n" +
        lister.map((v, index) => "  ○ " + v).join("\n"),
    );

  if (lister.includes(feature)) {
    if (feature === "country") {
      try {
        let res = await getCountry();
        let teks = res
          .map((item, index) => {
            return `🔍 *[ RESULT ${index + 1} ]*

*Name:* ${item.name}
*Link:* ${item.link}`;
          })
          .filter((v) => v)
          .join("\n\n________________________\n\n");
        await conn.reply(m.chat, teks, m);
      } catch (e) {}
    }

    if (feature === "number") {
      if (!inputs)
        return m.reply(
          `Input query link\nExample: ${usedPrefix + command} number|link`,
        );
      try {
        let res = await getCountryNumber(inputs);
        let teks = res
          .map((item, index) => {
            return `🔍 *[ RESULT ${index + 1} ]*

*Name:* ${item.name}
*Link:* ${item.link}
*Phone Number:* ${item.phoneNumber}
*Time:* ${item.time}`;
          })
          .filter((v) => v)
          .join("\n\n________________________\n\n");
        await conn.reply(m.chat, teks, m);
      } catch (e) {}
    }

    if (feature === "msg") {
      if (!inputs)
        return m.reply(
          `Input query link\nExample: ${usedPrefix + command} msg|link|opt\n( opt is all/first/number )`,
        );
      try {
        let res = await checkMessages(inputs, inputs_);
        let teks = res
          .map((item, index) => {
            return `🔍 *[ RESULT ${index + 1} ]*

*Sender:* ${item.sender}
*Time:* ${item.time}
*Message:* ${item.message}`;
          })
          .filter((v) => v)
          .join("\n\n________________________\n\n");
        await conn.reply(m.chat, teks, m);
      } catch (e) {}
    }
  }
};
handler.help = ["tmpnum"];
handler.tags = ["internet"];
handler.command = /^(tmpnum)$/i;
export default handler;

/* New Line */
async function getCountry() {
  const url = "https://temporary-phone-number.com/countrys/";
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    return $("div.col-sm-6.col-md-4.col-lg-3.col-xs-12 a.info-box")
      .map((_, el) => ({
        name: $(el).find("span.info-box-number").text().trim(),
        link: $(el).attr("href"),
      }))
      .get();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch countries.");
  }
}

async function getCountryNumber(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    return $("div.col-sm-6.col-md-4.col-lg-3.col-xs-12 a.info-box")
      .map((_, el) => ({
        name: $(el).find(".info-box-text").text().trim(),
        phoneNumber: $(el).find(".info-box-number").text().trim(),
        link: $(el).attr("href"),
        time: $(el).find(".info-box-time .text-primary").text().trim(),
      }))
      .get();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch country numbers.");
  }
}

async function checkMessages(url, option = 0) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const chatMessages =
      option === "all"
        ? $("div.direct-chat-msg")
        : $("div.direct-chat-msg").eq(option === "first" ? 0 : option);

    if (!chatMessages.length) throw new Error("No chat messages found.");

    return chatMessages
      .map((_, el) => ({
        sender: $(el).find(".direct-chat-info .pull-right").text().trim(),
        time: $(el).find(".direct-chat-info time.timeago").text().trim(),
        message: $(el).find(".direct-chat-text").text().trim(),
      }))
      .get();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch messages.");
  }
}
