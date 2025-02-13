/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import fetch from "node-fetch";
const handler = async (m, { conn }) => {
  let anu = `https://api.lolhuman.xyz/api/quotemaker2?apikey=gatadios&text=${pickRandom(global.dakwah)}&author=${conn.getName(m.sender)} 

`;
  conn.sendFile(m.chat, anu, "anu.jpg", wm, m);
};
handler.help = handler.command = ["dakwah"];
handler.tags = ["quotes"];
export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

global.dakwah = [
  "Jika cinta itu tak berlandaskan iman, maka ia akan mudah terombang-ambing bak pohon diterpa angin kencang. (Ustadz Nouman Ali Khan)",
  "Ketika hatimu berbunga-bunga, ingatlah bahwa Allah menciptakan pasangan untukmu, bukan sekadar untuk memenuhi hasratmu. (Ustazah Aisyah Dahlan)",
  "Cinta sejati adalah ketika kamu mengutamakan kebahagiaan orang yang kamu cintai, meski itu berarti mengorbankan perasaanmu sendiri. (Ustadz Felix Siauw)",
  "Jangan mencari cinta yang membutakan, nanti kamu tersesat. Carilah cinta yang mencerahkan, yang membimbingmu menuju Sang Maha Penyayang. (Ustazah Oki Setiana Dewi)",
  "Cinta sejati adalah cinta yang bersabar, cinta yang tetap bertahan saat badai menerpa. (Ustadz Abdul Somad)",
  "Jangan biarkan cinta membuatmu lupa diri. Ingatlah bahwa Allah adalah satu-satunya cinta yang abadi. (Ustazah Mamah Dedeh)",
  "Jangan mencari cinta di tempat yang salah. Carilah cinta dalam ketaatan kepada Allah. (Ustadz Yusuf Mansur)",
  "Cinta yang hakiki adalah cinta yang mendekatkanmu kepada Allah, bukan yang menjerumuskanmu ke dalam jurang maksiat. (Ustazah Halimah Alaydrus)",
  "Cukuplah Allah sebagai saksi bahwa cintamu kepadaku tak pernah berkurang, meski jarak memisahkan. (Ustadz Adi Hidayat)",
  "Cintailah dengan sepenuh hati, namun tetaplah ingat bahwa cinta sejati hanya untuk-Nya. (Ustadz Hanan Attaki)",
  "Pacaran itu ibarat menanam pohon. Kalau ditanam asal-asalan, nanti akan layu dan mati. Begitu juga dengan cinta, jika tidak dibangun dengan landasan yang kokoh, akan rapuh dan mudah hancur. (Ustaz Maulana)",
  "Jangan terburu-buru mencari pasangan. Jodoh itu seperti bus, akan datang tepat waktu sesuai dengan tujuanmu. (Buya Yahya)",
  "Cinta sejati itu bukan tentang seberapa sering kamu menyatakan cinta, tapi tentang seberapa banyak pengorbanan yang kamu lakukan untuknya. (Syekh Ali Jaber)",
  "Jangan mencari cinta yang sempurna, karena tidak ada yang sempurna di dunia ini. Carilah cinta yang mau melengkapi kekuranganmu. (Ustazah Oki Setiana Dewi)",
  "Jangan biarkan masa lalumu merusak masa depanmu. Belajarlah dari kesalahan dan move on, karena cinta yang baru akan datang pada waktunya. (Ustadz Hanan Attaki)",
  "Jika kamu belum menemukan cinta yang sejati, jangan berkecil hati. Allah SWT sedang mempersiapkan seseorang yang lebih baik untukmu. (Syekh Yusuf Estes)",
  "Cinta itu bukan tentang memiliki, tapi tentang memberi. Berikanlah cintamu dengan tulus, tanpa mengharapkan balasan. (Ustazah Maryam Jameelah)",
  "Jangan takut untuk jatuh cinta, karena itu salah satu anugerah terindah dari Allah SWT. Tapi ingatlah, jangan sampai cinta itu menjerumuskanmu ke dalam dosa. (Ustadz Khalid Basalamah)",
  "Jika hubunganmu tidak lagi membawa kebaikan, jangan ragu untuk mengakhirinya. Lebih baik jomblo dengan hati yang tenang daripada menjalin hubungan yang membuatmu terluka. (Ustaz Dennis Lim)",
  "Belajarlah untuk mencintai dirimu sendiri terlebih dahulu. Karena hanya orang yang mencintai dirinya sendiri yang bisa mencintai orang lain dengan benar. (Ustazah Halimah Alaydrus)",
  "Jangan tertipu dengan manisnya rayuan dunia, karena ibarat bunga, ia akan layu seiring berlalunya waktu. Carilah cinta sejati dan abadi yang hanya Allah yang bisa berikan. - Ustadz Adi Hidayat",
  "Ketika hati terluka karena cinta yang tak tersambut, ingatlah bahwa Allah memiliki rencana yang lebih indah untukmu. Jangan biarkan kesedihan menguasaimu, bangkit dan tatap masa depan dengan penuh harapan. - Ustadzah Nouman Ali Khan",
  "Jangan bersedih atas kekasih yang telah meninggalkanmu. Ketahuilah bahwa Allah akan menggantikannya dengan seseorang yang lebih baik, lebih perhatian, dan lebih mencintaimu. - Ustadz Khalid Basalamah",
  "Cinta sejati bukanlah tentang memiliki, melainkan tentang memberi. Jika seseorang tidak bersedia berkorban untukmu, maka dia tidak layak mendapatkan cintamu. - Ustadzah Halimah Alaydrus",
  "Jangan terburu-buru mencari cinta baru hanya untuk mengobati luka hati. Beri waktu pada dirimu untuk menyembuhkan dan belajar dari pengalaman masa lalu. - Ustadz Salim A. Fillah",
  "Allah yang telah menciptakanmu, Dia juga yang akan memulihkan hatimu yang terluka. Percaya dan berserahlah pada-Nya, maka Dia akan memberikan penghiburan dan kebahagiaan yang kau butuhkan. - Ustadzah Oki Setiana Dewi",
  "Tidak ada yang abadi di dunia ini, termasuk cinta. Jika cinta yang kalian bangun selama ini telah runtuh, jangan berkecil hati. Anggaplah itu sebagai ujian untuk menguatkan imanmu. - Ustadz Abdul Somad",
  "Ketika kau mengalami kegagalan dalam percintaan, jangan menyalahkan diri sendiri atau orang lain. Intropeksi diri, perbaiki kekuranganmu, dan jadilah pribadi yang lebih baik. - Ustadzah Aisyah Dahlan",
  "Cintamu pada seseorang tidak boleh melebihi cintamu pada Allah. Jika kau mendahulukan cinta makhluk, maka kau akan kecewa dan tersakiti. - Ustadz Bachtiar Nasir",
  "Allah maha baik. Dia tidak akan memberikan cobaan yang melebihi batas kemampuanmu. Jika kau sedang mengalami kekecewaan dalam cinta, percayalah bahwa itu bagian dari rencana-Nya untuk membawa kebahagiaan yang lebih besar di masa depan. - Ustadzah Dewi Yulianti",
  "punya quotes dakwah sendiri?? beritahu owner",
];
