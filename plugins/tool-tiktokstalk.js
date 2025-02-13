/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import cheerio from "cheerio";

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
  try {
    if (!text) return m.reply('Masukkan username TikTok yang ingin di-stalk');
    text = text.toLowerCase()
    let res = await stalk(text);
    if (res.status === 'error') throw res.message;
    await m.reply(wait);

    let verifiedBadge = res.user.verified ? '✅' : '';
    let privateBadge = res.user.privateAccount ? '🔒' : '';
    let sellerBadge = res.user.ttSeller ? '🛒' : '';

    let tek = `*───[ TikTok Stalker ]───*\n\n`
    tek += `👤 *\`Username:\`* ${res.user.uniqueId || 'none'} ${verifiedBadge}\n`
    tek += `🏷️ *\`Nickname:\`* ${res.user.nickname || 'none'}\n`
    tek += `✍️ *\`Bio:\`* ${res.user.signature || 'Tidak ada bio'}\n`
    tek += `🔗 *\`Bio Link:\`* ${res.user.bioLink ? res.user.bioLink.link : 'Tidak ada'}\n`
    tek += `🌍 *\`Region:\`* ${res.user.region || 'Unknown'}\n`
    tek += `📅 *\`Akun Dibuat:\`* ${new Date(res.user.createTime * 1000).toLocaleDateString('id-ID')}\n`
    tek += `👥 *\`Followers:\`* ${res.stats.followerCount.toLocaleString() || '0'}\n`
    tek += `👤 *\`Following:\`* ${res.stats.followingCount.toLocaleString() || '0'}\n`
    tek += `❤️ *\`Hearts:\`* ${res.stats.heartCount.toLocaleString() || '0'}\n`
    tek += `🎥 *\`Videos:\`* ${res.stats.videoCount.toLocaleString() || '0'}\n`
    tek += `🔒 *\`Akun Pribadi:\`* ${res.user.privateAccount ? 'Ya' : 'Tidak'} ${privateBadge}\n`
    tek += `🛒 *\`Penjual Terverifikasi:\`* ${res.user.ttSeller ? 'Ya' : 'Tidak'} ${sellerBadge}\n`
    
    tek += `\n> ${global.wm}`
    await conn.sendFile(m.chat, res.user.avatarLarger, 'profile.jpg', tek, m)
  } catch (error) {
    m.reply(`Terjadi kesalahan: ${error.message}`);
  }
};
handler.tags = ['tools']
handler.help = ['tiktokstalk']
handler.limit = true
handler.command = /^tt(stalk|iktokstalk)$/i;

export default handler;

async function stalk(user) {
  try {
    const url = await fetch(`https://tiktok.com/@${user}`, {
      headers: {
        'User-Agent': 'PostmanRuntime/7.32.2'
      }
    });
    const html = await url.text();
    const $ = cheerio.load(html);
    const data = $('#__UNIVERSAL_DATA_FOR_REHYDRATION__').text();
    const result = JSON.parse(data);
    if (result['__DEFAULT_SCOPE__']['webapp.user-detail'].statusCode !== 0) {
      const ress = {
        status: 'error',
        message: 'User tidak ditemukan!',
      };
      console.log(ress);
      return ress;
    }
    const res = result['__DEFAULT_SCOPE__']['webapp.user-detail']['userInfo'];
    return res;
  } catch (err) {
    console.log(err);
    return String(err);
  }
};