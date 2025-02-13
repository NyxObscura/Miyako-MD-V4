/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import axios from 'axios'
import moment from 'moment-timezone'

let handler = async (m, { usedPrefix, command, conn, text }) => {
let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} XenzSenseiPedo`
	if (!text) return m.reply(input)
let Quer = text.replace("https://github.com/", "").replace("@", "")
axios.get(`https://api.github.com/users/${Quer}`)
.then((res) =>{
let {
 login, 
 type,
 name,
 followers, 
 following, 
 created_at, 
 updated_at,
 public_gists,
 public_repos,
 twitter_username,
 bio,
 hireable,
 email,
 location, 
 blog,
 company,
 avatar_url,
 html_url
} = res.data
var teks = `乂 *G I T H U B*

*User Name :* ${login}
*Nick Name :* ${name}
*Followers :* ${followers}
*Following :* ${following}
*Public Gists :* ${public_gists}
*Public Repos :* ${public_repos}
*Twitter :* ${twitter_username==null?'-':twitter_username}
*Email :* ${email==null?'-':email}
*Location :* ${location==null?'-':location}
*Blog :* ${blog}
*Link :* ${html_url}
*Created Time :*
  - Date : ${moment(created_at).tz('Asia/Jakarta').format('DD-MM-YYYY')}
  - Time : ${moment(created_at).tz('Asia/Jakarta').format('HH:mm:ss')}
*Updated Time :* 
  - Date : ${moment(updated_at).tz('Asia/Jakarta').format('DD-MM-YYYY')}
  - Time : ${moment(updated_at).tz('Asia/Jakarta').format('HH:mm:ss')}
*Bio :* ${bio}`
conn.sendFile(m.chat, avatar_url, 'github-stalk.png', teks, m)
})

}
handler.help = ['githubstalk']
handler.tags = ['stalker']
handler.command = /^(ghstalk|githubstalk)$/i
handler.limit = true
export default handler