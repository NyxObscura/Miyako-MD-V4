/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import pkg from "@adiwajshing/baileys";
const { WA_DEFAULT_EPHEMERAL: WA_DEFAULT_EPHEMERAL } = pkg, handler = async (m, { conn: conn, args: args, usedPrefix: usedPrefix }) => {
  const validValues = {
      lastseen: ["all", "contacts", "contact_blacklist", "none"],
      online: ["all", "match_last_seen"],
      picture: ["all", "contacts", "contact_blacklist", "none"],
      status: ["all", "contacts", "contact_blacklist", "none"],
      readreceipts: ["all", "none"],
      groupsadd: ["all", "contacts", "contact_blacklist", "none"],
      disappearingmode: [WA_DEFAULT_EPHEMERAL, 0, 86400, 604800, 7776e3]
    },
    typeNumber = parseInt(args[0]),
    valueNumber = parseInt(args[1]),
    typeKeys = Object.keys(validValues),
    helpMessage = `Cara Penggunaan: ${usedPrefix}setprivacy [type_number] [value_number]\n\nDaftar Type:\n` + Object.keys(validValues).map(((type, index) => `${index + 1}. ${type}`)).join("\n");
  if (!typeNumber || isNaN(typeNumber) || typeNumber < 1 || typeNumber > typeKeys.length) return void m.reply(helpMessage);
  const selectedType = typeKeys[typeNumber - 1],
    validTypeValues = validValues[selectedType],
    typeHelpMessage = `Cara Penggunaan: ${usedPrefix}setprivacy [type_number] [value_number]\n\nDaftar Value:\n` + validTypeValues.map(((type, index) => `${index + 1}. ${type}`)).join("\n");
  if (!valueNumber || isNaN(valueNumber) || valueNumber < 1 || valueNumber > validTypeValues.length) return void m.reply(typeHelpMessage);
  const selectedValue = validTypeValues[valueNumber - 1],
    privacyType = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);
  switch (selectedType) {
    case "lastseen":
      await conn.updateLastSeenPrivacy(selectedValue).then((() => {
        m.reply(`Privacy ${privacyType} telah diubah menjadi ${selectedValue}`);
      })).catch((() => {
        m.reply(`Tidak dapat mengubah privacy ${privacyType}`);
      }));
      break;
    case "online":
      await conn.updateOnlinePrivacy(selectedValue).then((() => {
        m.reply(`Privacy ${privacyType} telah diubah menjadi ${selectedValue}`);
      })).catch((() => {
        m.reply(`Tidak dapat mengubah privacy ${privacyType}`);
      }));
      break;
    case "picture":
      await conn.updateProfilePicturePrivacy(selectedValue).then((() => {
        m.reply(`Privacy ${privacyType} telah diubah menjadi ${selectedValue}`);
      })).catch((() => {
        m.reply(`Tidak dapat mengubah privacy ${privacyType}`);
      }));
      break;
    case "status":
      await conn.updateStatusPrivacy(selectedValue).then((() => {
        m.reply(`Privacy ${privacyType} telah diubah menjadi ${selectedValue}`);
      })).catch((() => {
        m.reply(`Tidak dapat mengubah privacy ${privacyType}`);
      }));
      break;
    case "readreceipts":
      await conn.updateReadReceiptsPrivacy(selectedValue).then((() => {
        m.reply(`Privacy ${privacyType} telah diubah menjadi ${selectedValue}`);
      })).catch((() => {
        m.reply(`Tidak dapat mengubah privacy ${privacyType}`);
      }));
      break;
    case "groupsadd":
      await conn.updateGroupsAddPrivacy(selectedValue).then((() => {
        m.reply(`Privacy ${privacyType} telah diubah menjadi ${selectedValue}`);
      })).catch((() => {
        m.reply(`Tidak dapat mengubah privacy ${privacyType}`);
      }));
      break;
    case "disappearingmode":
      await conn.updateDefaultDisappearingMode(selectedValue).then((() => {
        m.reply(`Privacy ${privacyType} telah diubah menjadi ${selectedValue}`);
      })).catch((() => {
        m.reply(`Tidak dapat mengubah privacy ${privacyType}`);
      }));
      break;
    default:
      m.reply(typeHelpMessage);
  }
};
handler.help = ["setprivacy"], handler.tags = ["owner"], handler.command = /^(setprivacy|setpriv)$/i;
handler.owner = true
export default handler;