/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import {
  resetLimit,
  resetInvestPrice,
  resetChatUser,
  resetChatGc,
} from "../lib/autoScedule.js";

export async function all(m) {
  const setting = global.db.data.settings[this.user.jid];
  if (new Date() * 1 - setting.dailyReset > 86400000) {
    await resetChatUser();
    await resetLimit();
    await resetInvestPrice();
    setting.dailyReset = new Date() * 1;
  }
  return !0;
}
