import axios from "axios";
import cheerio from "cheerio";

async function search(query) {
  try {
    // Fetch the HTML content
    const { data: html } = await axios.get(
      "https://bokephd.pages.dev/?q=" + query,
    );
    const $ = cheerio.load(html);

    // Array to hold the extracted information
    const results = [];

    // Select the specific div using its class
    $(".grid .bg-card").each((index, element) => {
      const title = $(element).find("a").attr("title");
      const href = $(element).find("a").attr("href");
      const imgAlt = $(element).find("img").attr("alt");
      const imgSrc = $(element).find("img").attr("src");
      const imgSrcSet = $(element).find("img").attr("srcset");
      const imgWidth = $(element).find("img").attr("width");
      const imgHeight = $(element).find("img").attr("height");
      const jsonLd = JSON.parse(
        $(element).find('script[type="application/ld+json"]').html(),
      );

      // Add extracted data to results array
      results.push({
        title,
        href,
        imgAlt,
        imgSrc,
        imgSrcSet,
        imgWidth,
        imgHeight,
        jsonLd,
      });
    });

    // Return the extracted information
    return results;
  } catch (error) {
    console.error("Error fetching the HTML content:", error);
    return null;
  }
}

// URL dari website yang ingin di-scrape

// Fungsi untuk scraping
const video = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Ambil nilai atribut src dari tag <iframe>
    const src = $("iframe").attr("src");
    return src;
  } catch (error) {
    console.error("Error fetching the URL:", error);
    return error;
  }
};

export { search, video };
