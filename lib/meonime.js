import axios from "axios";
import cheerio from "cheerio";

// Fungsi untuk melakukan scraping
//ongoing
async function ongoing() {
  try {
    // Mengambil HTML dari URL dengan User-Agent khusus
    const { data } = await axios.get("https://moenime.com/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
      },
    });

    // Memuat HTML ke Cheerio
    const $ = cheerio.load(data);

    // Array untuk menyimpan hasil scraping
    const results = [];

    // Seleksi elemen artikel
    $("article").each((index, element) => {
      const title = $(element).find(".entry-title a").text().trim();
      const episode = $(element).find(".postedon").text().trim();
      const imageUrl = $(element).find("picture img").attr("src");
      const link = $(element).find(".entry-title a").attr("href");

      // Tambahkan hasil ke array
      results.push({ title, episode, imageUrl, link });
    });

    return results;
  } catch (error) {
    console.error("Error scraping website:", error);
  }
}

//search
async function search(query) {
  try {
    // Send a GET request with custom headers
    const response = await axios.get("https://moenime.com/search/" + query, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
      },
    });

    // Load the HTML into Cheerio
    const html = response.data;
    const $ = cheerio.load(html);

    // Define an array to store the scraped data
    const scrapedData = [];

    // Use Cheerio to select elements and extract data
    $("article").each((index, element) => {
      const title = $(element).find("h1.entry-title a").text();
      const link = $(element).find("h1.entry-title a").attr("href");
      const imgSrc = $(element).find("img").attr("src");
      const score = $(element).find(".postedon i").text();

      // Push the data into the array
      scrapedData.push({
        title,
        link,
        imgSrc,
        score,
      });
    });

    // Return the scraped data
    return scrapedData;
  } catch (error) {
    console.error("Error scraping data:", error);
  }
}

// Call the function and log the results

//detail
async function detail(url) {
  try {
    // Konfigurasi header
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
    };

    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const title = $("h1.entry-title").text().trim();
    const imageUrl = $(".single-featured.wp-post-image").attr("src");
    const publishDate = $("time.published").attr("datetime");
    const updatedDate = $("time.updated").attr("datetime");
    const author = $("span.author.vcard a").text().trim();

    const infoTable = $("ul li")
      .map((i, el) => {
        return $(el).text().trim();
      })
      .get();

    const synopsis = $('table:contains("Sinopsis No Game No Life: Zero")')
      .next()
      .text()
      .trim();

    const downloadLinks = $("table.table-hover tbody tr:has(td a)")
      .map((i, el) => {
        const qualitySizeText = $(el).prev("tr").find("td").text().trim();
        const [quality, size] = qualitySizeText.split(" — ");

        const links = $(el)
          .find("a")
          .map((j, link) => {
            return {
              text: $(link).text().trim(),
              url: $(link).attr("href"),
            };
          })
          .get();
        return {
          quality: quality.trim(),
          size: size ? size.replace(/[()]/g, "").trim() : "",
          links,
        };
      })
      .get();

    return {
      title,
      imageUrl,
      publishDate,
      updatedDate,
      author,
      infoTable,
      synopsis,
      downloadLinks,
    };
  } catch (error) {
    console.error(error);
  }
}

export { ongoing, detail, search };
