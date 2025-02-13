/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import { sticker } from "../lib/sticker.js";
import axios from "axios";
import uploadFile from "../lib/uploadFile.js";

const handler = async (m, { conn, text }) => {
  try {
    const q = m.quoted;
    const mime = q?.mimetype;
    const allowed = ["image", "video", "webp"];
    const mediaUrl =
      mime && allowed.includes(mime.split("/")[0])
        ? await uploadFile(await q.download())
        : null;

    const senderId = parseInt(m.sender.split("@")[0]);
    const senderName = await conn.getName(m.sender);
    const senderPhotoUrl = await conn
      .profilePictureUrl(m.sender, "image")
      .catch(() => 'https://telegra.ph/file/014b20ec0da69848e1c05.jpg');

    const replyMessage = q
      ? {
          entities: [],
          avatar: true,
          id: parseInt(q.sender.split("@")[0]),
          name: await conn.getName(q.sender),
          photo: {
            url: await conn
              .profilePictureUrl(q.sender, "image")
              .catch(() => 'https://telegra.ph/file/014b20ec0da69848e1c05.jpg'),
          },
          text:
            q.text ||
            q.caption ||
            q.description ||
            q.message?.documentMessage?.caption ||
            "",
        }
      : null;

    const messageText =
      text ||
      q?.text ||
      q?.caption ||
      q?.description ||
      q?.message?.documentMessage?.caption ||
      m.text ||
      m.caption ||
      m.message?.documentMessage?.caption ||
      "";

    const message = {
      entities: [],
      avatar: true,
      from: { id: senderId, name: senderName, photo: { url: senderPhotoUrl } },
      text: messageText,
      ...(replyMessage && { replyMessage }),
      ...(mediaUrl && {
        media: { url: `https://wsrv.nl/?url=${mediaUrl}&output=png` },
      }),
    };

    const json = {
      type: "quote",
      format: "png",
      backgroundColor: "#ffffff",
      width: 512,
      height: 768,
      scale: 2,
      messages: [message],
    };

    const buffer = await Quotly(json);
    if (!buffer) return m.reply("Error generating quote image.");

    const stickerBuffer = await sticker(
      buffer,
      false,
      senderName,
      m.sender.split("@")[0],
    );
    if (!stickerBuffer) return m.reply("Error creating sticker.");

    await conn.sendFile(m.chat, stickerBuffer, "Quotly.webp", "", m);
  } catch (error) {
    console.error("Handler Error:", error);
    m.reply("An error occurred while processing your request.");
  }
};

handler.help = ["qc", "fc", "fakechat"];
handler.tags = ["sticker"];
handler.command = /^(qc|fc|fakechat)$/i;

export default handler;

async function Quotly(data) {
  try {
    const response = await axios.post("https://quote.btch.bz/generate", data, {
      headers: { "Content-Type": "application/json" },
    });
    return Buffer.from(response.data?.result?.image, "base64");
  } catch (e) {
    console.error("Quotly Error:", e);
    try {
      const fallbackResponse = await axios.post(
        "https://quotly.netorare.codes/generate",
        data,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      return Buffer.from(fallbackResponse.data?.result?.image, "base64");
    } catch (e) {
      console.error("Quotly Error (Backup):", e);
      return null;
    }
  }
}
