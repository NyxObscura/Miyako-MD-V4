import axios from "axios";
import cheerio from "cheerio";

async function latest() {
  try {
    const response = await axios.get('https://webcache.googleusercontent.com/search?q=cache:' + "https://v4.animasu.cc/");
    const html = response.data;
    const $ = cheerio.load(html);

    const data = [];

    $("#terupdate .bs").each((index, element) => {
      const title = $(element).find(".tt").text().trim();
      const link = $(element).find("a").attr("href");
      const type = $(element).find(".typez").text().trim();
      const status = $(element).find(".sb").text().trim();
      const image =
        $(element).find("img").attr("data-src") ||
        $(element).find("img").attr("src");
      const episodes = $(element).find(".epx").text().trim();

      data.push({ title, link, type, status, image, episodes });
    });

    return {
      creator: global.wm,
      status: true,
      result: data,
    };
  } catch (error) {
    //console.error(`Error: ${error.message}`);
    return {
      creator: global.wm,
      status: false,
      result: error.data,
    };
  }
}
//search

async function search(query) {
  try {
    const response = await axios.get(
      'https://webcache.googleusercontent.com/search?q=cache:' + "https://v4.animasu.cc/?s=" + query,
    );
    const html = response.data;
    const $ = cheerio.load(html);
    const animeList = [];

    $(".listupd .bs").each((index, element) => {
      const title = $(element).find(".tt").text();
      const type = $(element).find(".typez").text();
      const episodes = $(element).find(".epx").text();
      const image = $(element).find("img").attr("data-src");
      const link = $(element).find("a").attr("href"); // Update here

      animeList.push({ title, type, episodes, image, link });
    });

    return {
      creator: global.wm,
      status: true,
      result: animeList,
    };
  } catch (error) {
    return {
      creator: global.wm,
      status: false,
      result: error.data,
    };
  }
}

//detail

async function detail(url) {
  try {
    const response = await axios.get('https://webcache.googleusercontent.com/search?q=cache:' + url);
    const html = response.data;
    const $ = cheerio.load(html);

    const title = $('h1[itemprop="headline"]').text().trim();
    const alternativeTitle = $(".alter").text().trim();
    const description = $(".desc p").text().trim();
    const genres = [];
    $(".spe span:nth-child(1) a").each((index, element) => {
      genres.push($(element).text().trim());
    });
    const status = $(".spe span:nth-child(3)").text().trim();
    const releaseYear = parseInt(
      $(".spe .split:nth-child(4)").text().trim().replace("Rilis: ", ""),
    );
    const type = $(".spe span:nth-child(5)").text().trim();
    const episodes = parseInt(
      $(".spe span:nth-child(6)").text().trim().replace("Episode: ", ""),
    );
    const duration = $(".spe span:nth-child(7)")
      .text()
      .trim()
      .replace("Durasi: ", "");
    const author = $(".spe span:nth-child(8) a").text().trim();
    const studio = $(".spe span:nth-child(9) a").text().trim();
    const postedBy = $('.spe span[itemprop="author"] i').text().trim();
    const updatedAt = $(".spe .split:nth-child(10) time").attr("datetime");

    // Mendapatkan episode links
    const episodeLinks = [];
    $("#daftarepisode li").each((index, element) => {
      const episodeNumber = $(element).find(".lchx a").text().trim();
      const episodeUrl = $(element).find(".lchx a").attr("href");
      episodeLinks.push({ episodeNumber, episodeUrl });
    });

    // Mendapatkan download links
    const downloadLinks = [];
    $(".mctnx .soraddlx").each((index, element) => {
      const quality = $(element).find("strong").text().trim();
      const links = [];
      $(element)
        .find("a")
        .each((index, el) => {
          links.push({
            link: $(el).attr("href"),
            title: $(el).text().trim(),
          });
        });
      downloadLinks.push({ quality, links });
    });

    return {
      creator: global.wm,
      status: true,
      result: {
        title,
        alternativeTitle,
        description,
        genres,
        status,
        releaseYear,
        type,
        episodes,
        duration,
        author,
        studio,
        postedBy,
        updatedAt,
        episodeLinks,
        downloadLinks,
      },
    };
  } catch (error) {
    return {
      creator: global.wm,
      status: false,
      result: error.data,
    };
  }
}

export { latest, detail, search };
