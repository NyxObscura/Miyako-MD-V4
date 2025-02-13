/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

export function before(m) {
  if (m.isBaileys) return;
  if (!m.text) return;
  
  this.listAfk = this.listAfk || {};
  let user = global.db.data.users[m.sender];
  
  if (user.afk > -1) {
    const idToRemove = m.sender;
    this.listAfk[m.chat] = this.listAfk[m.chat]
      ? this.listAfk[m.chat].filter((user) => user.id !== idToRemove)
      : [];
    let caption = `
${user.registered ? user.name : conn.getName(m.sender)} (@${m.sender.replace(/@.+/, "")}) berhenti AFK
${user.afkReason ? " setelah " + user.afkReason : ""}

Selama ${Math.floor((new Date() - user.afk) / 1000)} detik.
    `.trim();
    m.reply(caption);
    user.afk = -1;
    user.afkReason = "";
  }

  let jids = [
    ...new Set([
      ...(m.mentionedJid || []),
      ...(m.quoted ? [m.quoted.sender] : []),
    ]),
  ];
  for (let jid of jids) {
    let user = global.db.data.users[jid];
    if (!user) continue;
    let afkTime = user.afk;
    if (!afkTime || afkTime < 0) continue;
    let reason = /wa.me\/settings/i.exec(user.afkReason)
      ? "#HIDDEN#"
      : user.afkReason || "";
    let caption = `
Jangan tag dia! ${user.registered ? user.name : conn.getName(m.sender)} (@${m.sender.replace(/@.+/, "")}) sedang AFK
${reason ? "dengan alasan: " + reason : "tanpa alasan"}.
AFK selama ${Math.floor((new Date() - afkTime) / 1000)} detik.
    `.trim();
    m.reply(caption);
  }

  return true;
}