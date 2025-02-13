import axios from "axios";
import cheerio from "cheerio";
/*
Wm: By Miftah
https://github.com/miftahganzz
*/
async function soundMeme() {
  try {
    const response = await axios.get("https://www.myinstants.com/en/index/id/");
    const html = response.data;
    const $ = cheerio.load(html);
    const results = [];

    $(".instant").each((index, element) => {
      const title = $(element).find(".instant-link").text().trim();
      const soundLinkRelative = $(element)
        .find("button.small-button")
        .attr("onclick")
        .match(/play\('(.+?)'/)[1];
      const soundLink = "https://www.myinstants.com" + soundLinkRelative;
      const pageLink =
        "https://www.myinstants.com" +
        $(element).find(".instant-link").attr("href");

      results.push({ title, soundLink, pageLink });
    });

    return results;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function newSoundMeme() {
  try {
    const response = await axios.get("https://www.myinstants.com/en/recent");
    const html = response.data;
    const $ = cheerio.load(html);
    const results = [];

    $(".instant").each((index, element) => {
      const title = $(element).find(".instant-link").text().trim();
      const soundLinkRelative = $(element)
        .find("button.small-button")
        .attr("onclick")
        .match(/play\('(.+?)'/)[1];
      const soundLink = "https://www.myinstants.com" + soundLinkRelative;
      const pageLink =
        "https://www.myinstants.com" +
        $(element).find(".instant-link").attr("href");

      results.push({ title, soundLink, pageLink });
    });

    return results;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function searchSound(query) {
  try {
    const response = await axios.get(
      `https://www.myinstants.com/en/search/?name=${query}`,
    );
    const html = response.data;
    const $ = cheerio.load(html);
    const results = [];

    $(".instant").each((index, element) => {
      const title = $(element).find(".instant-link").text().trim();
      const soundLinkRelative = $(element)
        .find("button.small-button")
        .attr("onclick")
        .match(/play\('(.+?)'/)[1];
      const soundLink = "https://www.myinstants.com" + soundLinkRelative;
      const pageLink =
        "https://www.myinstants.com" +
        $(element).find(".instant-link").attr("href");

      results.push({ title, soundLink, pageLink });
    });

    return results;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function categorySound(category) {
  const categories = [
    "games",
    "anime manga",
    "memes",
    "movies",
    "music",
    "politics",
    "pranks",
    "reactions",
    "sound effects",
    "sports",
    "television",
    "tiktok trends",
    "viral",
    "whatsapp audios",
  ];

  if (!categories.includes(category)) {
    console.error("Invalid category.");
    return categories;
  }

  try {
    const response = await axios.get(
      `https://www.myinstants.com/en/categories/${category}`,
    );
    const html = response.data;
    const $ = cheerio.load(html);
    const results = [];

    $(".instant").each((index, element) => {
      const title = $(element).find(".instant-link").text().trim();
      const soundLinkRelative = $(element)
        .find("button.small-button")
        .attr("onclick")
        .match(/play\('(.+?)'/)[1];
      const soundLink = "https://www.myinstants.com" + soundLinkRelative;
      const pageLink =
        "https://www.myinstants.com" +
        $(element).find(".instant-link").attr("href");

      results.push({ title, soundLink, pageLink });
    });

    return results;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export { soundMeme, newSoundMeme, searchSound, categorySound };
