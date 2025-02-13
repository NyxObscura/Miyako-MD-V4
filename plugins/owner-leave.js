/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, usedPrefix, command, args, isOwner }) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let chat = Object.keys(conn.chats).filter((v) => v.endsWith("g.us"));
  let groups = Object.keys(conn.chats)
    .filter((key) => key.endsWith("@g.us"))
    .map((key) => conn.chats[key]);

  if (
    args[0] &&
    (args[0].toLowerCase() === "all" || args[0].toLowerCase() === "semua")
  ) {
    await Promise.all(
      chat.map(async (id) => {
        await conn.groupLeave(id);
        await delay(2000);
      }),
    );
    let pesan = "*Success!* All groups have been left";
    await m.reply(pesan);
  } else {
    try {
      if (!args[0] || isNaN(args[0])) {
        let usageMessage = `*Invalid input.* Please provide a valid group number.\n\n*• Example:* ${usedPrefix + command} *[number]*`;
        let listMessage =
          "*[ LIST GROUP  ]*\n" +
          groups
            .map((group, index) => `*${index + 1}.* ${group.subject}`)
            .join("\n");
        return m.reply(usageMessage + "\n\n" + listMessage);
      }

      let i = parseInt(args[0]);
      if (i <= 0 || i > groups.length) {
        let listMessage =
          "*Invalid input.* Please use a valid group number.\n\n" +
          groups
            .map((group, index) => `*${index + 1}.* ${group.subject}`)
            .join("\n");
        return m.reply(listMessage);
      }

      let groupIndex = i - 1;

      let str = `${[i]}
*Name Grup :* ${groups[groupIndex].subject} 
*Owner :* ${groups[groupIndex].owner ? "@" + groups[groupIndex].owner.split("@")[0] : "*Not found*"}
*Subject Owner :* ${groups[groupIndex].subjectOwner ? "@" + groups[groupIndex].subjectOwner.split("@")[0] : "*Not found*"}
*ID :* ${groups[groupIndex].id}
*Restrict :* ${groups[groupIndex].restrict}
*Announce :* ${groups[groupIndex].announce}
*Ephemeral :* ${new Date(groups[groupIndex].ephemeralDuration * 1000).toDateString()}
*Desc ID :* ${groups[groupIndex].descId}
*Description :* ${groups[groupIndex].desc?.toString().slice(0, 10) + "..." || "*Not found*"}
*Admins :* ${groups[groupIndex].participants
        .filter((p) => p.admin)
        .map((v, i) => `\n${i + 1}. @${v.id.split("@")[0]}`)
        .join(" [admin]")}
${isOwner ? `*Participants :* ${groups[groupIndex].participants.length}` : ""}
${isOwner ? `*isBotAdmin :* [ ${!!groups[groupIndex].participants.find((v) => v.id == conn.user.jid).admin} ]` : ""}
*Created :* ${new Date(groups[groupIndex].subjectTime * 1000).toDateString()}
*Creation :* ${new Date(groups[groupIndex].creation * 1000).toDateString()}
*Size :* ${groups[groupIndex].size}
`;

      await m.reply(str);
      await conn.groupLeave(groups[groupIndex].id);
      await delay(2000);
      await m.reply(
        "*Success!* Group " + groups[groupIndex].subject + " has been left!",
      );
    } catch (err) {
      await m.reply("*Error!* An error occurred.");
      console.error(err);
    }
  }
};

handler.help = ["leave", "leavegc"].map((v) => v + " *[number]*");
handler.tags = ["group"];
handler.command = /^leave(g(c|ro?up))2?$/i;
handler.ownwr = true;

export default handler;
