/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

const defaultUserData = {
  nama: '-',
  role: 'Novice',
  umur: '-',
  gender: 'non-binary',
  skill: '-',
  location: '-',
  partner: '-',
  jail: false,
  social: 0,
  premium: false,
  level: 0,
  waifu: '',
  kepercayaanwaifu: 0
};

let jarspy = async (m, { conn, text, usedPrefix, command }) => {
  let userId = m.sender;

  // Pengecekan dan inisialisasi data user jika belum ada di database
  if (!text) return m.reply('Masukan nama waifunya\n\nJika ingin melihat list waifunya harap ketik .waifulist\n> Note: jika ingin merequest waifu bisa kontak owner saja :v')

  const user = global.db.data.users[userId];


  // Pengecekan umur user
  if (parseInt(user.age) < 17) {
    m.reply(`Kamu tidak bisa memilih waifu karena umurmu masih di bawah 17 tahun. Minimal 17 tahun agar bisa melamar waifu.`)
    return;
  }

  // Pengecekan level user
  if (user.level < 10) {
    m.reply(`Kamu harus minimal level 10 agar bisa melamar waifu.`)
    return;
  }
  if (user.waifu) return m.reply('kamu sudah memiliki waifu tidak bisa di ganti')

  // Pengecekan apakah waifu sudah diambil orang lain
  let isNameExist = Object.values(global.db.data.users).some(user => (user.waifu || '').toLowerCase() === text.toLowerCase());

  if (isNameExist) {
    m.reply('Waifu tersebut sudah diambil orang lain! Lamarlah waifu yang lain...')
    return;
  }

  // Validasi waifu yang dimasukkan
  if (!text || !['miyako shikimori', 'cecilia', 'runa sasaki', 'akane kinoshita', 'shiori katase', 'kana arima', 'akane kurokawa', 'ai hoshino', 'ruby hoshino', 'yukino yukinoshita', 'yui yuigahama', 'shizuka hiratsuka', 'iroha isshiki', 'ayase ayatsuji', 'touka toudou', 'shizuku kurogane', 'stella vermillion', 'aki adagaki', 'izumi sagiri', 'nanako kogure', 'rikka takanashi', 'sanae dekomori', 'shinka nibutani', 'satone shichimiya', 'megumin', 'shinju inui', 'inui sajuna', 'marin kitagawa', 'chizuru tachibana', 'shoko makinohara', 'nodoka toyohama', 'kaede azusagawa', 'rio futaba', 'tomoe koga', 'mai sakurajima', 'shinozaki rika', 'shino asada', 'suguha kirigaya', 'ayano keiko', 'tsukuyo', 'sarutobi ayame', 'shimura tae', 'kyouko hori', 'kagura yato', 'ume kurumizawa', 'nobara kugisaki', 'yor forger', 'kaori miyazono', 'shinobu oshino', 'kanna kamui', 'nagisa kubo', 'makima', 'nero', 'yorha 2b', 'roxy migurdia', 'mitama chan', 'yotsuya miko', 'shinomiya kaguya', 'fujiwara chika', 'hayasaka ai', 'shirogane kei', 'ganyu', 'sangonomiya kokomi', 'eula', 'nilou', 'nahida', 'yae miko', 'kujou sara', 'kamisato ayaka', 'hutao', 'raiden shogun', 'asuna yuuki', 'nakano itsuki', 'nakano nino', 'nakano yotsuba', 'nakano ichika', 'nakano miku', 'ichinose chizuru', 'ruka sarashina', 'mami nanami', 'sumi sakurasawa', 'elaina', 'zero two', 'rimuru tempest', 'milim nava', 'shuna', 'shizue izawa', 'tokisaki kurumi', 'mio takamiya', 'tohka yatogami', 'itsuka kotori', 'yoshino himekawa', 'tobiichi origami', 'miku izayoi', 'mana takamiya', 'chitoge kirisaki', 'kosaki onodera', 'emilia re zero'].includes(text.toLowerCase())) {
    let message = `Contoh pemakaian: ${usedPrefix}${command} nakano miku

➥ Daftar waifu dapat dilihat melalui */waifulist*

✎ Sedikit Penjelasan:
*Waifu* adalah istilah yang berasal dari budaya otaku dan anime, terutama populer di kalangan penggemar anime dan manga. Waifu mengacu pada karakter perempuan dalam anime, manga, permainan video, atau media populer lainnya yang menjadi favorit seseorang.
`.trim();
    conn.reply(m.chat, message, m);
    return;
  }

  let waifu = `${text}`;
  let kapital = capitalizeFirstLetter(waifu);
  let katanya = `${['Terima kasih, kamu telah membuatku merasa istimewa. Saya akan sangat senang untuk menjadi bagian dari hidupmu.', 'Ini adalah momen yang saya tunggu-tunggu. Saya menerimamu dengan hati terbuka.', 'Kamu adalah impian yang menjadi kenyataan dalam hidup saya. Saya bersedia menjadi milikmu selamanya.', 'Ketika kamu berlutut di hadapan saya, kamu juga merobek hati saya. Ya, saya mau.', 'Bersama-sama, kita akan menjalani petualangan yang indah. Saya menerima lamaranmu dengan sukacita.', 'Ini adalah jawaban dari hatiku yang paling dalam. Saya mencintaimu, dan saya akan menjadi milikmu.', 'Saya yakin bahwa kita adalah pasangan yang cocok. Saya menerimamu dengan cinta sejati.', 'Saya tak sabar untuk memulai babak baru dalam hidup bersamamu. Terima kasih telah menjadi bagian penting dalam cerita hidup saya.', 'Dalam dirimu, saya menemukan kebahagiaan sejati. Saya mau, dengan segenap hati.', 'Penerimaan ini adalah awal dari perjalanan kami bersama. Mari kita ciptakan kenangan yang tak terlupakan bersama-sama.'].getRandom()}`;
  
  setTimeout(() => {
    conn.reply(m.chat, `Kamu telah melamar ${kapital} untuk menjadi waifumu, tunggulah balasan darinya...`, m);
  }, 0);
  
  setTimeout(() => {
    conn.reply(m.chat, `Kamu mendapat balasan!
💭 ${kapital} mengatakan....
_"${katanya}"_`, m);
  }, 60000);

  setTimeout(() => {
    conn.reply(m.chat, `🥳 Lamaran kamu telah diterima oleh *${kapital}*, dan sekarang kalian memiliki status hubungan.
  
Ketik */waifuku* untuk melihat detail waifu.`.trim(), m);
  }, 63000);

  setTimeout(() => {
    global.db.data.users[userId].waifu = text.toLowerCase();
  }, 63000);

  // Update kepercayaan waifu
  if (user.kepercayaanwaifu > 10) {
    global.db.data.users[userId].kepercayaanwaifu = 10;
  } else if (user.kepercayaanwaifu < 10) {
    global.db.data.users[userId].kepercayaanwaifu = 10;
  }
};

jarspy.help = ['lamarwaifu'];
jarspy.tags = ['roleplay'];
jarspy.command = /^lamarwaifu$/i;
jarspy.register = true

export default jarspy;

function capitalizeFirstLetter(str) {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  return words.join(" ");
}