/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";

let handler = async (m, { conn, usedPrefix, command, args, setting }) => {
  if (args.length > 0 && args[0].toLowerCase() === "help") {
    const caption =
      `Voice AI Commands:\n\n` +
      `1. *${
        usedPrefix + command
      } <voice_id> <YouTube URL>*: Generate music from Youtube URL using the specified model (using the default model if not specified).\n` +
      `2. *${usedPrefix + command} model*: View available AI models.`;
    return conn.reply(m.chat, caption, m, {
      contextInfo: {
        externalAdReply: {
          title: "Voice AI Helper",
          body: "",
          thumbnailUrl: thumb,
          sourceUrl: global.db.data.bots.link.group || sgc,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    });
  }
  if (args[0] === "model") {
    const response = await axios.request({
      baseURL: "https://api.itsrose.rest",
      url: "/audio/cover_ai/voices",
      method: "GET",
      headers: {
        Authorization: APIKeys[APIs["rose"]],
      },
    });

    if (response.data.status) {
      const voiceIds = response.data.result.voices;
      let message = "List Voice yang Tersedia:\n\n";
      voiceIds.forEach((voice, index) => {
        message += `${index + 1}. ${voice.id}\n`;
      });
      return conn.reply(m.chat, message, m);
    }
  }
  conn.svsVoice = conn.svsVoice ? conn.svsVoice : {};
  if (m.sender in conn.svsVoice) {
    return m.reply("Please wait, you have undone job.");
  }
  const [voice_id, source_url] = args;
  if (!voice_id || !source_url) {
    return m.reply("contoh .voiceai bruno_mars https://youtube.com/");
  }
  conn.svsVoice[m.sender] = true;
  const { key } = await conn.sendMessage(
    m.chat,
    { text: "Generating voice..." },
    { quoted: m },
  );
  const payload = {
    source_url: source_url,
    voice_id: voice_id,
    format: "audio",
  };
  const { data } = await axios
    .request({
      baseURL: "https://api.itsrose.rest",
      url: "/audio/cover_ai",
      method: "POST",
      headers: {
        Authorization: APIKeys[APIs["rose"]],
      },
      data: payload,
    })
    .catch((e) => e?.response);
  const { status, message, result } = data;
  if (!status) {
    delete conn.svsVoice[m.sender];
    return conn.reply(m.chat, message, m);
  }

  async function pullStatus() {
    return axios
      .get(`https://api.itsrose.rest/audio/cover_ai/query?id=${result.id}`, {
        headers: {
          accept: "application/json",
          Authorization: APIKeys[APIs["rose"]],
        },
      })
      .then((res) => res.data);
  }

  // TODO: find better way to do this
  let statusData;
  do {
    statusData = await pullStatus();
    await new Promise((resolve) => setTimeout(resolve, 15 * 1000));
  } while (statusData?.result.status !== "completed");

  const { url, source } = statusData.result;

  await conn.sendMessage(
    m.chat,
    {
      text: `Title: ${source.title}`,
      edit: key,
    },
    { quoted: m },
  );
  await conn.sendMessage(
    m.chat,
    { audio: { url: url }, mimetype: "audio/mpeg" },
    { quoted: m },
  );
  delete conn.svsVoice[m.sender];
};
handler.help = ["voiceai voice_id url"];
handler.tags = ["ai"];
handler.command = /^(voiceai)$/i;
handler.premium = true; handler.error = 0

export default handler;
