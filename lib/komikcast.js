import axios from "axios";
import cheerio from "cheerio";

//const url = 'https://komikcast.lol/komik/the-cuckoos-fiancee/'; // Ganti dengan URL yang benar jika melakukan request langsung

// Fungsi untuk melakukan scraping
async function detail(url) {
  try {
    const { data } = await axios.get(url); // Mengambil data HTML dari URL
    const $ = cheerio.load(data); // Memuat HTML ke Cheerio

    // Mendapatkan informasi komik
    const komikInfo = {};
    komikInfo.title = $(".komik_info-content-body-title").text().trim();
    komikInfo.nativeTitle = $(".komik_info-content-native").text().trim();
    komikInfo.genres = [];
    $(".komik_info-content-genre .genre-item").each((i, elem) => {
      komikInfo.genres.push($(elem).text().trim());
    });
    komikInfo.released = $(".komik_info-content-info-release")
      .text()
      .replace("Released:", "")
      .trim();
    komikInfo.author = $('.komik_info-content-info:contains("Author:")')
      .text()
      .replace("Author:", "")
      .trim();
    komikInfo.status = $('.komik_info-content-info:contains("Status:")')
      .text()
      .replace("Status:", "")
      .trim();
    komikInfo.type = $(".komik_info-content-info-type a").text().trim();
    komikInfo.totalChapter = $(
      '.komik_info-content-info:contains("Total Chapter:")',
    )
      .text()
      .replace("Total Chapter:", "")
      .trim();
    komikInfo.updatedOn = $(".komik_info-content-update time").attr("datetime");
    komikInfo.rating = $(".data-rating strong")
      .text()
      .replace("Rating", "")
      .trim();

    // Mendapatkan deskripsi komik
    komikInfo.description = $(".komik_info-description-sinopsis").text().trim();

    // Mendapatkan daftar chapter
    komikInfo.chapters = [];
    $(".komik_info-chapters-item").each((i, elem) => {
      const chapter = {};
      chapter.title = $(elem).find(".chapter-link-item").text().trim();
      chapter.url = $(elem).find(".chapter-link-item").attr("href");
      chapter.time = $(elem).find(".chapter-link-time").text().trim();
      komikInfo.chapters.push(chapter);
    });
    return komikInfo;
    console.log(komikInfo);
  } catch (error) {
    console.error(error);
  }
}

//S e a r c h================

// Fungsi untuk memparsing HTML dan mengembalikan hasil pencarian
async function search(query) {
  const { data } = await axios.get("https://komikcast.lol/?s=" + query);
  const $ = await cheerio.load(data);
  const results = [];

  $(".list-update_item").each((index, element) => {
    const title = $(element).find(".title").text().trim();
    const link = $(element).find("a").attr("href");
    const image = $(element).find("img").attr("src");
    const chapter = $(element).find(".chapter").text().trim();
    const rating = $(element).find(".rating-bintang span").css("width");
    const score = $(element).find(".numscore").text().trim();

    results.push({
      title,
      link,
      image,
      chapter,
      rating,
      score,
    });
  });

  return results;
}

//C h a p t h e r==============

async function chapter(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Mengambil judul
    const title = $('.chapter_headpost h1[itemprop="name"]').text().trim();

    // Mengambil breadcrumb
    const breadcrumbs = [];
    $(".chapter_breadcrumb-list li").each((index, element) => {
      breadcrumbs.push($(element).text().trim());
    });

    // Mengambil link gambar
    const imageLinks = [];
    $("#chapter_body img").each((index, element) => {
      imageLinks.push($(element).attr("src"));
    });

    // Mengambil daftar chapter lain
    const chapters = [];
    $("#slch option").each((index, element) => {
      const chapterTitle = $(element).text().trim();
      const chapterLink = $(element).attr("value");
      chapters.push({ title: chapterTitle, link: chapterLink });
    });

    return {
      title,
      breadcrumbs,
      imageLinks,
      chapters,
    };
  } catch (error) {
    console.error(error);
  }
}

export { detail, search, chapter };
