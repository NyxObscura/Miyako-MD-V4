/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let handler = async (m, { text, command, usedPrefix }) => {
  if (!text)
    return m.reply(
      `Masukan Soal!\n\nContoh:\n${usedPrefix + command} Manusia Terbuat Dari Apa?`,
    );
  let res = await global.fetch(
    API("lol", "/api/brainly", { query: text }, "apikey"),
  );
  let { result } = await res.json();
  let cap = result
    .map((v, i) => {
      return `
*${i + 1}.* ${v.question.content}

Answer : 
${v.answer.content.replace(/Jawaban(:)?/i, "")}
`.trim();
    })
    .join("\n\n");
  m.reply(cap);
};
handler.help = ["brainly"];
handler.tags = ["internet"];
handler.command = /^brainly$/i;
handler.limit = true; handler.error = 0
export default handler;
