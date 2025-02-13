import axios from "axios";
import cheerio from "cheerio";
import puppeteer from "puppeteer";
//latest
const url = "https://nontonanimeid.cyou/"; // Ganti dengan URL yang sesuai

// Fungsi untuk melakukan scraping
async function latest() {
  try {
    // Mendapatkan HTML dari halaman
    const { data } = await axios.get('https://webcache.googleusercontent.com/search?q=cache:' + url);

    // Memuat HTML ke cheerio
    const $ = cheerio.load(data);

    // Menyeleksi elemen yang ingin di-scrape
    const episodes = [];

    $("#postbaru .animeseries").each((i, element) => {
      const episode = {
        title: $(element).find("h3.title span").text().trim(),
        episodeNumber: $(element).find(".types.episodes").text().trim(),
        link: $(element).find("a").attr("href"),
        imageUrl: $(element).find("img").attr("src"),
        altText: $(element).find("img").attr("alt"),
      };

      episodes.push(episode);
    });

    return {
      creator: wm,
      status: true,
      result: {
        episode: episodes,
      },
    };
  } catch (error) {
    return {
      creator: wm,
      status: false,
      result: error.data,
    };
  }
  console.error("Error scraping data:", error);
}

// Fungsi untuk mengambil data dari URL
async function search(query) {
  try {
    // Ganti URL berikut dengan URL yang Anda ingin scrape
    const url = "https://nontonanimeid.cyou/?s=" + query;
    const { data } = await axios.get('https://webcache.googleusercontent.com/search?q=cache:' + url);

    // Memuat data HTML ke dalam Cheerio
    const $ = cheerio.load(data);

    // Menyimpan hasil scraping
    const results = [];

    // Memilih setiap elemen 'li' di dalam 'ul' yang berada di dalam 'div.result'
    $(".result ul li").each((index, element) => {
      const result = $(element).find("a");
      const anime = {
        title: result.find("h2").text(),
        link: result.attr("href"),
        image: result.find(".top img").attr("src"),
        description: result.find(".descs").text().trim(),
        rating: result.find(".nilaiseries").text(),
        type: result.find(".typeseries").text(),
        season: result.find(".rsrated").text(),
        genres: [],
      };

      // Mendapatkan genre
      result.find(".genrebatas .genre").each((i, elem) => {
        anime.genres.push($(elem).text());
      });

      results.push(anime);
    });

    return {
      creator: wm,
      status: true,
      result: {
        data: results,
      },
    };
  } catch (error) {
    return {
      creator: wm,
      status: false,
      result: error.data,
    };
    console.error(error);
  }
}

//detail

async function detail(url) {
  try {
    const response = await axios.get('https://webcache.googleusercontent.com/search?q=cache:' + url);
    const html = response.data;
    const $ = cheerio.load(html);

    const animeDetails = {};

    animeDetails.title = $("h1.entry-title").text();
    animeDetails.image = $(".poster img").attr("src");
    animeDetails.status = $("span.statusseries").text();
    animeDetails.episodes = $("span.durasiseries").text();
    animeDetails.rating = $("span.ratedseries").text();
    animeDetails.score = $("span.nilaiseries").text();
    animeDetails.type = $("span.typeseries").text();
    animeDetails.airing = $("span.dateseries a").text();
    animeDetails.popularity = $('span:contains("Popularity")').next().text();
    animeDetails.members = $('span:contains("Members")').next().text();
    animeDetails.duration = $('span:contains("Duration")').next().text();
    animeDetails.studios = $('span:contains("Studios")').next().text();
    animeDetails.aired = $('span:contains("Aired")').next().text();
    animeDetails.englishTitle = $('span:contains("English")').next().text();
    animeDetails.synonyms = $('span:contains("Synonyms")').next().text();

    animeDetails.genres = [];
    $(".tagline a").each((index, element) => {
      animeDetails.genres.push($(element).text());
    });

    // Mengambil sinopsis dari elemen dengan kelas seriesdesc
    animeDetails.synopsis = $(".entry-content.seriesdesc p").text();

    animeDetails.episodesList = [];
    $(".misha_posts_wrap2 li").each((index, element) => {
      const episode = {};
      episode.title = $(element).find(".t1 a").text();
      episode.link = $(element).find(".t1 a").attr("href");
      episode.date = $(element).find(".t3").text();
      animeDetails.episodesList.push(episode);
    });

    // Mengambil URL trailer
    animeDetails.trailer = $(".rt .trailerbutton").attr("href");

    return {
      creator: wm,
      status: true,
      result: {
        animeDetails,
      },
    };
  } catch (error) {
    return {
      creator: wm,
      status: false,
      result: error.data,
    };
    console.error(error);
  }
}

//episode

async function download(url) {
  try {
    const response = await axios.get('https://webcache.googleusercontent.com/search?q=cache:' + url);
    const html = response.data;
    const $ = cheerio.load(html);

    const downloadArea = $("#download_area");

    const info = {
      title: downloadArea.find(".name").text().trim(),
      downloads: [],
    };

    downloadArea.find(".listlink").each((index, element) => {
      const resolution = $(element).find("span").text().trim();
      const links = [];
      $(element)
        .find("a")
        .each((index, linkElement) => {
          links.push({
            href: $(linkElement).attr("href"),
            text: $(linkElement).text().trim(),
          });
        });
      info.downloads.push({
        resolution: resolution,
        links: links,
      });
    });
    let anu = await info.downloads[0].links[2].href;

    const anu1 = await axios.get('https://webcache.googleusercontent.com/search?q=cache:' + anu);
    const $1 = cheerio.load(anu1.data);

    // Mengambil URL dari elemen dengan id #notfound a
    const downloadUrl = $1("#notfound a").attr("href");

    return {
      creator: wm,
      status: true,
      result: {
        downloadUrl,
      },
    };
  } catch (error) {
    return {
      creator: wm,
      status: false,
      result: error.data,
    };
  }
}

//getVideo

async function getvideo(url) {
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

export { search, detail, latest, download, getvideo };
