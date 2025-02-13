/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
let handler = async (m) => {

let anu =`
 〔 TUTORIAL  〕 
*.kerja 
untuk mendapatkan money dan exp
*.adventure
untuk mendapatkan money exp dan barang2 langka
*.mulung
untuk mendapatkan barang2 kebutuhan crafting
*.nambang
untuk menambang agar mendapakan resource
*mancing 
agar mendapatkan ikan
*.rampok 
untuk merampok seseorang
*.judi
agar mendapatkan money dengan cepat
*.buy
untuk membeli kebutuhan RPG
*.sell
untuk menjual resource yang kalian punya
*.dungeon
untuk mendapatkan resource langka dan lebih baik
*.crafting
untuk membuat barang seperti atm
*.atm/bank
untuk menyimpan uang kalian agar aman dari .rampok
*.upgrade
untuk mengupgrade hasil crafting kalian lebih baik
*.beli
sama seperti .buy tetapi lebih lengkap!
*.jual
sama seperti .sell tetapi lebih lengkap
*.taxy/roket
untuk mendapatkan uang dan exp lebih banyak
*.toko
lebih lengkap dari fitur .buy/.beli
*.transfer
untuk memberikan resource kalian kepada orang lain
(cocok untuk barter)
*.pasar 
untuk membeli bahan masak
『SISANYA TANYAKAN SEPUH(OWNER CAPEK NULIS)』

-----------------------------------------------------------------
*NOTE: JIKA LEVEL KALIAN TEMBUS 1000 AKAN MENDAPATKAN LIMIT UNLIMITED DAN HADIAH DARI OWNER. UNTUK AGAR LEBIH CEPAT NAIK LEVEL KE 1000 ADALAH BELI EXP DENGAN CATA #BUY EXP.*


`
await m.reply(anu)
}

handler.help = ["tutorialrpg"];
handler.tags = ["main"];
handler.command = /^(tutorial|tutorialrpg|tutorpg|tutor)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;

handler.admin = false;
handler.botAdmin = false;

handler.fail = null;

export default handler