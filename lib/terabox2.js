import fetch from "node-fetch";

async function terabox(url) {
  try {
    // Fungsi untuk mengambil ID dari URL
    function getIdFromUrl(url) {
      const urlParts = url.split("/");
      return urlParts[urlParts.length - 1];
    }

    // Ambil ID dari URL
    const id = getIdFromUrl(url);

    // Panggil API pertama untuk mendapatkan informasi file
    let response = await fetch(
      `https://terabox.hnn.workers.dev/api/get-info?shorturl=${id}&pwd=`,
    );

    // Periksa apakah respons sukses
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    // Parse respons JSON
    let data = await response.json();

    // Cek dan tampilkan informasi spesifik dari respons JSON
    if (data.ok) {
      let { shareid, uk, sign, timestamp, list } = data;
      let downloadUrls = [];

      // Loop melalui setiap file dan panggil API kedua untuk mendapatkan URL download
      for (let file of list) {
        try {
          let downloadResponse = await fetch(
            "https://terabox.hnn.workers.dev/api/get-download",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "User-Agent":
                  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
                Referer: "https://terabox.hnn.workers.dev/",
              },
              body: JSON.stringify({
                shareid: shareid,
                uk: uk,
                sign: sign,
                timestamp: timestamp,
                fs_id: file.fs_id,
              }),
            },
          );

          // Parse respons JSON dari API kedua
          let downloadData = await downloadResponse.json();

          if (downloadData.ok) {
            let downloadUrl = downloadData.downloadLink;
            downloadUrls.push({
              name: file.filename,
              url: downloadUrl,
            });
          } else {
            console.error(
              `Error retrieving download URL for ${file.filename}: ${downloadData.msg}`,
            );
          }
        } catch (error) {
          console.error(
            `Error retrieving download URL for ${file.filename}: ${error.message}`,
          );
        }
      }

      return downloadUrls;
    } else {
      throw new Error("Error: " + data.msg);
    }
  } catch (error) {
    // Tangani kesalahan jika ada
    console.error("There has been a problem with your fetch operation:", error);
    return error;
  }
}

export { terabox };
