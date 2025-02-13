import puppeteer from "puppeteer";

async function terabox(url) {
  let browser;
  try {
    // Luncurkan browser dengan opsi no-sandbox
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://teradownloader.com/download?link=" + url, {
      waitUntil: "networkidle2",
    });

    // Tunggu sampai elemen yang diperlukan muncul di halaman
    await page.waitForSelector("h5.text-gray-900");

    // Ambil konten halaman setelah menunggu
    const data = await page.evaluate(() => {
      // Mengambil file name
      const fileName = document
        .querySelector("h5.text-gray-900")
        .innerText.trim();

      // Mengambil file size
      let fileSize;
      document.querySelectorAll("p").forEach((elem) => {
        const text = elem.innerText.trim();
        if (text.startsWith("File Size:")) {
          fileSize = text.replace("File Size:", "").trim();
        }
      });

      // Mengambil download links
      const downloadLinks = [];
      document.querySelectorAll("a").forEach((elem) => {
        const link = elem.href;
        const linkText = elem.innerText.trim();
        if (linkText.includes("Download")) {
          downloadLinks.push(link);
        }
      });

      // Mengembalikan hasil ekstraksi
      return {
        fileName,
        fileSize,
        downloadLinks,
      };
    });

    await browser.close();

    return data;
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    console.error("Error:", error);
    throw error;
  }
}

export { terabox };
