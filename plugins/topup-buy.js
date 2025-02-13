/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

import QRCode from 'qrcode';
import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  if (args.length < 2) {
    return m.reply('Format salah. Gunakan: buytopup <productId> <productCode>');
  }

  const [productId, productCode] = args;

  // Cek apakah pengguna sudah memiliki task yang belum selesai
  if (conn.topup && conn.topup[m.sender]) {
    return m.reply('Anda masih memiliki task yang belum selesai. Harap selesaikan terlebih dahulu.');
  }

  // Simpan task untuk meminta User ID dan Zone ID (opsional)
  conn.topup[m.sender] = { productId, productCode, step: 'requestUserId' };

  m.reply('Silakan masukkan User ID:');
};

handler.before = async (m, { conn }) => {
  // Inisialisasi conn.topup jika belum ada
  if (!conn.topup) conn.topup = {};

  // Jika tidak ada task untuk pengguna ini, lewati
  if (!conn.topup[m.sender]) return;

  const task = conn.topup[m.sender];

  // Menangani tahap permintaan ID pengguna
  if (task.step === 'requestUserId') {
    task.userId = m.text.trim();
    task.step = 'requestZoneIdOrProcess';

    m.reply('Silakan masukkan Zone ID (ketik "lewati" jika tidak diperlukan):');
  } 
  // Menangani tahap permintaan Zone ID atau langsung memproses order
  else if (task.step === 'requestZoneIdOrProcess') {
    const input = m.text.trim().toLowerCase();

    // Jika pengguna mengetik "lewati", set zoneId sebagai null
    if (input === 'lewati') {
      task.zoneId = '';
    } else {
      task.zoneId = input;
    }

    task.step = 'processingOrder';

    // Panggil fungsi createTopupOrder setelah mendapatkan User ID dan Zone ID (opsional)
    try {
      const result = await createTopupOrder(m.sender, task.productId, task.productCode, task.userId, task.zoneId);

      if (result.status === 200) {
        const order = result.result;

        // Simpan orderId dan orderCode untuk pengecekan status
        task.orderId = order.orderId;
        task.orderCode = order.orderCode;
        task.step = 'waitingForPayment';

        // Generate QR code dari checkoutUrl
        const qrCodeImage = await QRCode.toBuffer(order.qrCode);

        const message = `
Order ID: ${order.orderId}
Order Code: ${order.orderCode}
Payment Status: ${order.paymentStatus}
Processing Status: ${order.processingStatus}
Contact: ${order.contact.phoneNumber}
Payment Method: ${order.paymentMethod.method}
Total Price: ${await toRupiah(order.paymentMethod.totalPrice)}
Product: ${order.product.title}
Package: ${order.productPackage.title}
Expiry Date: ${order.expiryDate}
`;

        // Kirim QR code dan informasi lainnya
        await conn.sendMessage(m.chat, { image: qrCodeImage, caption: message });

        // Mulai pengecekan status setiap menit
        checkPaymentStatus(m.sender, conn, m);
      } else {
        m.reply(`Terjadi kesalahan: ${result.message}`);
        delete conn.topup[m.sender];
      }

    } catch (error) {
      console.error('Error:', error);
      m.reply('Gagal membuat order topup.');
      delete conn.topup[m.sender];
    }
  }
};

/*// Fungsi untuk memeriksa status pembayaran
async function checkPaymentStatus(sender, conn) {
  const task = conn.topup[sender];
  if (!task) return;

  const checkUrl = `https://api.arifzyn.tech/topup/orders?id=${task.orderId}&code=${task.orderCode}&apikey=AR-I4lFJyL84mFj`;

  const intervalId = setInterval(async () => {
    try {
      const response = await fetch(checkUrl);
      const data = await response.json();

      if (data.status === 200) {
        const result = data.result;

        if (result.paymentStatus === 'SUCCEEDED') {
          // Hapus task user setelah sukses
          delete conn.topup[sender];
          clearInterval(intervalId);

          await m.reply(`Pembayaran berhasil untuk Order ID: ${result.orderId}. Terima kasih!`);
        } else if (result.paymentStatus === 'FAILED') {
          // Hapus task jika gagal
          delete conn.topup[sender];
          clearInterval(intervalId);

          await m.reply(`Pembayaran gagal untuk Order ID: ${result.orderId}. Silakan coba lagi.`);
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  }, 60000); // Cek setiap 1 menit
}*/

// Fungsi untuk memeriksa status pembayaran
async function checkPaymentStatus(sender, conn, m) {
  const task = conn.topup[sender];
  if (!task) return;

  const checkUrl = `https://api.arifzyn.tech/topup/orders?id=${task.orderId}&code=${task.orderCode}&apikey=AR-I4lFJyL84mFj`;

  // Fungsi untuk menarik status pembayaran
  async function pullStatus() {
    try {
      const response = await axios.get(checkUrl);
      return response.data;
    } catch (error) {
      console.error('Error checking payment status:', error);
      throw error;
    }
  }

  let statusData;
  do {
    statusData = await pullStatus();
    await new Promise((resolve) => setTimeout(resolve, 15 * 1000)); // Tunggu 15 detik sebelum pengecekan berikutnya
  } while (statusData?.result.paymentStatus !== 'SUCCEEDED' && statusData?.result.paymentStatus !== 'FAILED');

  // Setelah status diketahui, tangani hasilnya
  if (statusData?.result.paymentStatus === 'SUCCEEDED') {
    // Hapus task user setelah sukses
    delete conn.topup[sender];

    await m.reply(
      `Pembayaran berhasil untuk Order ID: ${statusData.result.orderId}. Terima kasih!`
    );
    await conn.reply(global.nomorown, `*[ Notif Pembayaran ]*\nPembayaran berhasil untuk Order ID: ${statusData.result.orderId}. Terima kasih!`,)
  } else if (statusData?.result.paymentStatus === 'FAILED') {
    // Hapus task jika gagal
    delete conn.topup[sender];

    await m.reply(
      `Pembayaran gagal untuk Order ID: ${statusData.result.orderId}. Silakan coba lagi.`
    );
  }
}

// Fungsi untuk membuat topup order
async function createTopupOrder(m, productId, productCode, userId, zoneId) {
  const url = "https://api.arifzyn.tech/topup/orders";

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'AR-Arifzyn19',
      },
      body: JSON.stringify({
        "contacts": "+" + m.split("@")[0],
        "productId": productId,
        "productCode": productCode,
        "userId": userId,
        "zoneId": zoneId || '' // Jika zoneId null, kirim string kosong
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating topup order:', error);
    throw error;
  }
}

handler.command = ['topupbuy']
export default handler;


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