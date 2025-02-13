/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from "node-fetch";

let handler = async (m, { text, command, usedPrefix }) => {
  if (!(m.quoted && m.quoted.text && text))
    return m.reply(
      "*Example:*\n" + usedPrefix + command + " js (with reply code)",
    );
  const model = text.trim();
  const question = m.quoted.text;

  if (command === "zcodequest") {
    try {
      const payload = {
        p1: model,
        p2: question,
        option1: "3 - A detailed answer",
        option2: "Professional",
        option3: "Indonesian",
      };
      const msg = await fetchAndParse(payload, "answer-question");
      await m.reply(msg);
    } catch (e) {
      return m.reply(eror);
    }
  }

  if (command === "zcodegen") {
    try {
      const payload = {
        p1: model,
        p2: question,
        option1: "3 - A detailed answer",
        option2: "Professional",
        option3: "Indonesian",
      };
      const msg = await fetchAndParse(payload, "code-generator");
      await m.reply(msg);
    } catch (e) {
      return m.reply(eror);
    }
  }

  if (command === "zcodebug") {
    try {
      const payload = {
        p1: model,
        p2: null,
        p3: question,
        option1: "find and explain bug",
        option2: "Professional",
        option3: "Indonesian",
      };
      const msg = await fetchAndParse(payload, "code-debug");
      await m.reply(msg);
    } catch (e) {
      return m.reply(eror);
    }
  }

  if (command === "zcoderef") {
    try {
      const payload = {
        p1: model,
        p2: null,
        p3: question,
        option1: "Refactor my code and explain me",
        option2: "Professional",
        option3: "Indonesian",
      };
      const msg = await fetchAndParse(payload, "code-refactor");
      await m.reply(msg);
    } catch (e) {
      return m.reply(eror);
    }
  }

  if (command === "zcoderev") {
    try {
      const payload = {
        p1: model,
        p2: null,
        p3: question,
        option1: "Make a full code review",
        option2: "Professional",
        option3: "Indonesian",
      };
      const msg = await fetchAndParse(payload, "code-review");
      await m.reply(msg);
    } catch (e) {
      return m.reply(eror);
    }
  }

  if (command === "zcodedoc") {
    try {
      const payload = {
        p1: model,
        p2: null,
        p3: question,
        option1: "Add comment everwhere you can",
        option2: "Professional",
        option3: "Indonesian",
      };
      const msg = await fetchAndParse(payload, "code-documentation");
      await m.reply(msg);
    } catch (e) {
      return m.reply(eror);
    }
  }
};
handler.command = /^(zcode(quest|gen|bug|ref|rev|doc))$/i;
handler.help = ["zcodequest", "zcodegen", "zcodebug", "zcoderev", "zcodedoc"];
handler.tags = ["ai"];
export default handler;

async function fetchAndParse(payload, tool) {
  try {
    const url = "https://zzzcode.ai/api/tools/" + tool;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const input = await response.text();
    const match = input.match(/zzzredirectmessageidzzz:\s*([a-zA-Z0-9-]+)/);
    const id = match ? match[1] : null;

    const url2 = "https://zzzcode.ai/api/tools/" + tool;
    const response2 = await fetch(url2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const output = await response2.text();
    const lines = output.split("\n").slice(1, -3);
    const parsedLines = lines.map((line) => {
      if (line.startsWith('data: "')) {
        return JSON.parse(`{"msg": "${line.slice(7, -1)}"}`);
      }
      return JSON.parse(`{"msg": "${line}"}`);
    });
    return parsedLines.map((parsedLine) => parsedLine.msg).join("");
  } catch (e) {
    return null;
  }
}
