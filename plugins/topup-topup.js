/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

let url = 'https://api.arifzyn.tech/topup/products?apikey=AR-I4lFJyL84mFj'

const handler = async (m, {conn}) =>
{
  const anu = await fetch(url)
  const js = await anu.json()
  let tek = `*[ Top Up Via Bot ]*\n\n`;
  tek += `Halo, selamat datang di layanan top up via bot WhatsApp! 🎉\n\n`;
  tek += `Di sini, kalian bisa memilih dari berbagai pilihan top up yang tersedia di bawah ini. Tidak hanya game populer seperti Free Fire, Mobile Legends, dan Higgs Domino, tetapi juga beberapa aplikasi lain yang bisa kalian coba. Menarik, bukan? 😊\n\n`;
  tek += `Jadi, tunggu apa lagi? Yuk, segera coba fiturnya sekarang!\n\n`;
  const list = await js.result.map(a => 
    
      [
        '',
        a.name, 
        `TopUp Game: ${a.name}`, 
        `.topupdetail ${a.id}`
        ]
      
  )
  await conn.sendList(m.chat, '', tek, wm, 'Pilih disini', 'Listnya', list, m)
}
handler.command = ['topup']
handler.help = ['topup']
handler.tags = ['main', 'internet', 'info']
handler.private = true
export default handler