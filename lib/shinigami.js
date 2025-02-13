import axios from "axios";
import cheerio from "cheerio";

let cifumo = "Cifumo Ogiwara (emilia-bots)";

async function chapter(url) {
  try {
    const response = await axios.get('https://webcache.googleusercontent.com/search?q=cache:' + url);
    const $ = cheerio.load(response.data);

    const ivCards = $(".iv-card");
    const imageUrls = [];

    ivCards.each((index, element) => {
      const imgSrc = $(element).find("img").attr("src");
      if (imgSrc) {
        imageUrls.push(imgSrc);
      }
    });

    return imageUrls;
  } catch (error) {
    console.error("Error fetching chapter images:", error);
    return error;
  }
}

async function detail(url) {
  try {
    const response = await axios.get('https://webcache.googleusercontent.com/search?q=cache:' + url);
    const $ = cheerio.load(response.data);

    const rank = $(
      '#nav-info .post-content_item:contains("Rank") .summary-content',
    )
      .text()
      .trim();
    const alternative = $(
      '#nav-info .post-content_item:contains("Alternative") .summary-content',
    )
      .text()
      .trim();
    const author = $(
      '#nav-info .post-content_item:contains("Author(s)") .author-content a',
    )
      .map((i, el) => $(el).text().trim())
      .get()
      .join(", ");
    const artist = $(
      '#nav-info .post-content_item:contains("Artist(s)") .artist-content a',
    )
      .map((i, el) => $(el).text().trim())
      .get()
      .join(", ");
    const genres = $(
      '#nav-info .post-content_item:contains("Genre(s)") .genres-content a',
    )
      .map((i, el) => $(el).text().trim())
      .get()
      .join(", ");
    const type = $(
      '#nav-info .post-content_item:contains("Type") .summary-content',
    )
      .text()
      .trim();
    const tags = $(
      '#nav-info .post-content_item:contains("Tag(s)") .summary-content .tags-content',
    )
      .text()
      .trim();
    const release = $(
      '#nav-info .post-content_item:contains("Release") .summary-content a',
    )
      .text()
      .trim();
    const status = $(
      '#nav-info .post-content_item:contains("Status") .summary-content',
    )
      .text()
      .trim();
    const bookmarkCount = $(".add-bookmark .action_detail span").text().trim();

    const chapters = [];

    $("li.wp-manga-chapter.has-thumb").each((index, element) => {
      const thumbnail = $(element)
        .find(".chapter-thumbnail img.thumb")
        .attr("src");
      const link = $(element).find(".chapter-link a").attr("href");
      const title = $(element)
        .find(".chapter-link .chapter-manhwa-title")
        .text()
        .trim();
      const releaseDate = $(element)
        .find(".chapter-link .chapter-release-date i")
        .text()
        .trim();

      chapters.push({ thumbnail, link, title, releaseDate });
    });

    return {
      creator: cifumo,
      status: true,
      result: {
        rank,
        alternative,
        author,
        artist,
        genres,
        type,
        tags,
        release,
        status,
        bookmarkCount,
        chapters,
      },
    };
  } catch (error) {
    console.error("Error fetching chapter detail:", error);
    return {
      creator: cifumo,
      status: false,
      msg: "error try again later",
    };
  }
}

async function latest() {
  try {
    const response = await axios.get('https://webcache.googleusercontent.com/search?q=cache:' + "https://shinigami03.com/");
    const $ = cheerio.load(response.data);
    const comics = [];

    $(".col-6.col-sm-6.col-md-6.col-xl-3").each((i, elem) => {
      const comic = {};
      comic.link = $(elem).find(".series-link").attr("href");
      comic.image = $(elem).find(".thumb-img").attr("src");
      comic.title = $(elem).find(".series-title").text().trim();
      comic.chapters = [];
      $(elem)
        .find(".series-chapter-item")
        .each((i, chapterElem) => {
          const chapter = {
            link: $(chapterElem).parent().attr("href"),
            badge: $(chapterElem).find(".series-badge").text().trim(),
            time: $(chapterElem).find(".series-time").text().trim(),
          };
          comic.chapters.push(chapter);
        });
      comics.push(comic);
    });

    return {
      creator: cifumo,
      status: true,
      result: comics,
    };
  } catch (error) {
    console.error("Error fetching latest comics:", error);
    return {
      creator: cifumo,
      status: false,
      msg: "error please try again later",
    };
  }
}

export { chapter, detail, latest };
