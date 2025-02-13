/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import axios from 'axios';

const cifumo = async(m, { conn, text }) => {
  if(!text) return m.reply('masukan usernamenya\n*contoh:* .robloxstalk santuygamingcom')
  try {
    await m.reply("_Getting user info_")
    const req = await axios.get(`https://rest.cifumo.biz.id/api/stalk/roblox?q=${text}`)
    const {
      description,
      created,
      isBanned,
      id,
      name,
      displayName,
      lastOnline,
      profileDetails
    } = req.data.data.userDetails
    let tek = `      *[ roblox stalker ]*\n\n`
    tek += `\`Username:\` ${name}\n`
    tek += `\`Name:\` ${displayName}\n`
    tek += `\`Created:\` ${created}\n`
    tek += `\`Id:\` ${id}\n`
    tek += `\`Last Online:\` ${req.data.data.lastOnline}\n\n`
    tek += `> *Description:* ${description}`
    await conn.sendFile(m.chat, req.data.data.profileDetails, 'error.jpg', tek, m)
  } catch(e) {
    console.log(e)
    m.reply('alamak error\n> error: ' + e)
  }
}
cifumo.command = ["robloxstalk", "stalkroblox", "sroblox", "robloxs"]
cifumo.help = ["robloxstalk <username>"]
cifumo.tags = ["tools", "internet"]
cifumo.limit = true
export default cifumo;