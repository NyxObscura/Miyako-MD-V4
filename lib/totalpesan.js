import { WAMessageStubType, isJidGroup } from "@adiwajshing/baileys";
import db from "../lib/database.js";

async function handleMessage(conn, m) {
  let chat = db.data.chats[m.chat] || {};
  if (!("messages" in chat)) chat.messages = {};
  if (!("startMessage" in chat)) chat.startMessage = Date.now();

  if (!Object.keys(chat.messages).length) {
    try {
      const groupMetadata = await conn.groupMetadata(m.chat);
      const participant =
        (groupMetadata.participants ?? []).map((v) => v.id) || [];
      if (participant.length) {
        for (const id of participant) {
          if (isJidGroup(id)) continue;
          chat.messages[id] = 0;
        }
      }
    } catch (error) {
      console.error("Error fetching group metadata:", error);
    }
  }

  if (!(m.sender in chat.messages)) {
    if (!isJidGroup(m.sender)) chat.messages[m.sender] = 0;
  }

  if (!isJidGroup(m.sender)) chat.messages[m.sender]++;

  if (m.messageStubType) {
    if (
      m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
      m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_LEAVE
    ) {
      const senderJid =
        (m.messageStubParameters || []).length > 0
          ? m.messageStubParameters[0]
          : m.sender;
      if (senderJid in chat.messages) delete chat.messages[senderJid];
    }
  }
}

export default handleMessage;
