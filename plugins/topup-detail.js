/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

const handler = async (m, { conn, text }) => 
{
  const api = await fetch(`https://api.arifzyn.tech/topup/info-products?id=${text}&apikey=AR-I4lFJyL84mFj`)
  const js = await api.json()
  const list = js.result.products.map(a => [
    a.groupLabel,
    a.translations[0].title,
    'Harga: ' + toRupiah(a.price),
    `.topupbuy ${js.result.produkId} ${a.code}`
    ])
    if(js.result.products[0].groupLabelIco) {
    await conn.sendImgList(m.chat, js.result.products[0].groupLabelIcon, '', 'List Harga', wm, 'Pilih disini', 'List topup nya', list, m)
    } else {
      await conn.sendList(m.chat, '', 'List Harga', wm, 'Pilih disini', 'List topup nya', list, m)
    }
}
handler.command = ['topupdetail']
export default handler


function toRupiah(angka) {
  if (typeof angka !== 'number' || isNaN(angka)) return "Input bukan angka";

  const absoluteValue = Math.abs(angka);

  // Menangani kasus khusus untuk angka di bawah 1000
  if (absoluteValue < 1000) {
    return `Rp ${absoluteValue.toLocaleString('id-ID')} Perak`;
  }

  let suffix = "";

  // Tentukan suffix yang sesuai berdasarkan range angka
  if (absoluteValue < 10000) {
    suffix = "Ribu";
  } else if (absoluteValue < 100000) {
    suffix = "Puluh Ribu";
  } else if (absoluteValue < 1000000) {
    suffix = "Ratus Ribu";
  } else if (absoluteValue < 10000000) {
    suffix = "Juta";
  } else if (absoluteValue < 100000000) {
    suffix = "Puluh Juta";
  } else if (absoluteValue < 1000000000) {
    suffix = "Ratus Juta";
  } else if (absoluteValue < 10000000000) {
    suffix = "Miliar";
  } else if (absoluteValue < 100000000000) {
    suffix = "Puluh Miliar";
  } else if (absoluteValue < 1000000000000) {
    suffix = "Ratus Miliar";
  } else if (absoluteValue < 10000000000000) {
    suffix = "Triliun";
  }

  // Format angka dengan pemisah ribuan
  const formattedValue = absoluteValue.toLocaleString('id-ID');

  return `Rp ${formattedValue} ${suffix}`.trim();
}