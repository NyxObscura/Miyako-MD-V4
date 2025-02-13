import axios from "axios";
import cheerio from "cheerio";

const excludedImages = [
  "/img/logo.png",
  "/img/banner.jpeg",
  "/img/btn_close.webp",
];

async function latest() {
  try {
    const url = "https://sektekomik.xyz/";
    const { data } = await axios.get(global.proxy + url);
    const $ = cheerio.load(data);
    let results = [];

    $(".product__item").each((index, element) => {
      const title = $(element).find(".product__item__text h5 a").text().trim();
      const link = $(element).find(".product__item__text h5 a").attr("href");
      const image = $(element).find(".product__item__pic").attr("data-setbg");
      const type = $(element).find(".ep a").text().trim();
      const views = $(element).find(".view").text().trim();
      const comments = $(element).find(".comment a").text().trim();
      const categories = [];

      $(element)
        .find(".product__item__text ul li a")
        .each((i, cat) => {
          categories.push($(cat).text().trim());
        });

      results.push({
        title,
        link: `https://sektekomik.xyz${link}`,
        image,
        type,
        views,
        comments,
        categories,
      });
    });

    return {
      creator: global.wm,
      status: 200,
      result: results,
    };
  } catch (error) {
    console.error("Error fetching the data: ", error);
    return {
      creator: global.wm,
      status: 400,
      msg: "error om",
    };
  }
}

async function chapter(url) {
  try {
    const response = await axios.get(global.proxy + url);
    const $ = cheerio.load(response.data);
    const images = [];

    const title = $(".row.justify-content-center.mb-4.text-center h3")
      .text()
      .trim();

    $("img").each((index, element) => {
      const imageUrl = $(element).attr("src");
      if (!excludedImages.includes(imageUrl)) {
        images.push(imageUrl);
      }
    });

    return {
      creator: global.wm,
      status: 200,
      result: {
        title,
        images,
      },
    };
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return {
      creator: global.wm,
      status: 400,
      msg: "error om",
    };
  }
}

async function search(query) {
  try {
    const response = await axios.get(
      global.proxy + `https://sektekomik.xyz/manga?search=${query}`,
    );
    const $ = cheerio.load(response.data);
    const results = [];

    $("div.col-6.col-sm-6.col-md-3.col-xl-3").each((index, element) => {
      const title = $(element).find(".product__item__text h5 a").text().trim();
      const imageUrl = $(element)
        .find(".product__item__pic")
        .attr("data-setbg");
      const mangaUrl = $(element).find(".product__item__pic a").attr("href");
      const type = $(element).find(".ep.m-type a").text().trim();
      const views = $(element).find(".view").text().trim();
      results.push({
        title,
        imageUrl,
        mangaUrl: `https://sektekomik.xyz${mangaUrl}`,
        type,
        views,
      });
    });

    return {
      creator: global.wm,
      status: 200,
      result: results,
    };
  } catch (error) {
    console.error("Error fetching search results:", error);
    return {
      creator: global.wm,
      status: 400,
      msg: "aduhai emror loh om",
    };
  }
}

async function detail(url) {
  try {
    const response = await axios.get(global.proxy + url);
    const $ = cheerio.load(response.data);

    const title = $(".anime__details__title h3").text().trim();
    const image = $("div.anime__details__pic").data("setbg");
    const comments = $("div.comment a").text().trim();
    const views = $("div.view").text().trim();
    const rating = $(".anime__details__rating span").text().trim();
    const description = $(".anime__details__text p").text().trim();
    const type = $(".anime__details__widget ul li:nth-child(1) a")
      .text()
      .trim();
    const status = $(".anime__details__widget ul li:nth-child(2)")
      .text()
      .trim();
    const categories = [];
    $(".anime__details__widget ul li:nth-child(5) a").each((index, element) => {
      categories.push($(element).text().trim());
    });
    const chapter = [];
    $(".anime__details__episodes a").each((index, element) => {
      chapter.push({
        title: $(element).text().trim(),
        url: "https://sektekomik.xyz" + $(element).attr("href"),
      });
    });

    return {
      creator: global.wm,
      status: 200,
      result: {
        title,
        image,
        views,
        comments,
        rating,
        description,
        type,
        status,
        categories,
        chapter,
      },
    };
  } catch (error) {
    console.error("Error fetching and parsing data:", error);
    return {
      creator: global.wm,
      status: 400,
      msg: "aduhai emror loh om",
    };
  }
}

export { latest, chapter, search, detail };
