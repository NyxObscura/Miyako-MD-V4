/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import uploadFile from "../lib/uploadFile.js";
import axios from "axios";

var handler = async (m, { text, conn }) => {
  var mesek =
    text && m.quoted
      ? m.quoted.text
        ? text + "\n\n" + m.quoted.text
        : text
      : text
        ? text
        : m.quoted
          ? m.quoted.text
            ? m.quoted.text
            : false
          : false;
  if (!mesek) return m.reply("Hallo, can I help you?");
  var body = text.replace(/\s+/g, "+");
  var q = m.quoted ? m.quoted : m;
  var mime = (q.msg || q).mimetype || q.mediaType || "";
  var img = /image/.test(mime) ? await q.download() : null;

  conn.bing = conn.bing ? conn.bing : { last_answer: 0 };

  if (!global.db.data.users[m.sender]) {
    global.db.data.users[m.sender] = {};
  }

  var game = global.db.data.users[m.sender].game || {};
  if (!game.bing) {
    game.bing = {
      is_first: true,
      conversationId: "",
      clientId: "",
      conversationSignature: "",
      cntMessage: 0,
      shouldRestart: false,
    };
  }

  try {
    console.log(mesek);
    await m.reply("*w r i t i n g. . .*");
    const currentDate = new Date().toDateString();
    let obe =
      game.bing.is_first || game.bing.cntMessage >= 5 || game.bing.shouldRestart
        ? {
            text: mesek,
            cookie: global.db.data.settings.cookie,
            ...(/image/.test(mime) ? { image: await uploadFile(img) } : {}),
            generateImage: true,
          }
        : {
            text: mesek,
            cookie: global.db.data.settings.cookie,
            conversationId: game.bing.conversationId,
            clientId: game.bing.clientId,
            conversationSignature: game.bing.conversationSignature,
            ...(/image/.test(mime) ? { image: await uploadFile(img) } : {}),
            generateImage: true,
          };

    var response = (
      await axios.post("https://skizo.tech/api/bing-ai", {
        apikey: "cifumo",
        text: obe.text,
        cookie: obe.cookie,
        image: obe.image || "",
        conversationId: obe.conversationId || "",
        clientId: obe.clientId || "",
        conversationSignature: obe.conversationSignature || "",
        generateImage: obe.generateImage,
        variant: "",
      })
    ).data;

    console.log(response);
    if (!game.bing.is_first) clearTimeout(game.bing.expired);
    game.bing.is_first = false;
    if (response.status !== true) {
      delete game.bing;
      return m.reply(response.message || "server error");
    }
    game.bing.conversationId = response.conversationId;
    game.bing.clientId = response.clientId;
    game.bing.conversationSignature = response.conversationSignature;
    ++game.bing.cntMessage;
    if (response.isDisengaged) {
      game.bing.shouldRestart = true;
    }
    game.lastaccesbimg = new Date().toDateString();
    game.bing.expired = setTimeout(
      (v) => {
        clearTimeout(game.bing.expired);
        delete game.bing;
      },
      5 * 60 * 1000,
    );

    var { id } = response.adaptiveResponse.image
      ? await conn.sendFile(
          m.chat,
          response.adaptiveResponse.image.url,
          "",
          response.adaptiveResponse.text || response.response.message,
          m,
        )
      : await conn.reply(
          m.chat,
          response.adaptiveResponse.text || response.response.message,
          m,
        );
    if (response.generatedImage) {
      if (response.generatedImage.status == true) {
        var imeg = response.generatedImage.data.filter(
          (v) => !v.includes(".svg"),
        );
        let pres = 0;
        for (let y of imeg) {
          await conn.delay(6000);
          ++pres;
          await conn.sendFile(
            m.chat,
            y,
            "",
            pres == 1 ? response.generatedImage.text : "",
            m,
          );
        }
      } else {
        game.bing.shouldRestart = true;
        await m.reply(response.generatedImage.message || `server overload`);
      }
    }
    game.bing.id = id;
  } catch (e) {
    await m.reply("oops, an error occured." + e);
  }
};

handler.help = handler.command = ["bing2"];
handler.tags = ["tools", "ai"];
handler.premium = true; handler.error = 0

export default handler;
