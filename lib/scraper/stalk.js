const { run } = await import('shannz-playwright');
const cheerio = require('cheerio');

/**
 * Stalk an Instagram user by their username and retrieve their profile information,
 * posts, stories, and reels.
 *
 * @param {string} username - The Instagram username to stalk.
 * @returns {Promise<Object>} - A promise that resolves to an object containing user information,
 *                              media posts, stories, and reels.
 */
async function igStalk(username) {
    // Define the Playwright code that will be run using shannz-playwright
    const code = `
    const { chromium } = require('playwright');

    (async () => {
        let browser;
        let context;
        try {
            browser = await chromium.launch({ headless: true });
            context = await browser.newContext();
            const page = await context.newPage();
            const baseURL = \`https://anonyig.com/en/\`;
            await page.goto(baseURL);

            await page.fill(".search-form__input", "${username}");
            await page.click(".search-form__button");
            await page.waitForSelector(".user-info__username-text");

            const content = await page.content();
            await browser.close();
            return content;  // Return the page content to be processed later with cheerio
        } catch (error) {
            console.error("Error in igStalk:", error);
            throw error; 
        }
    })();
    `;

    // Run the Playwright code using shannz-playwright
    const result = await run('javascript', code);
    
    // Parse the returned HTML content using cheerio
    /*const $ = cheerio.load(result);

    const userInfo = await parseProfile($);
    userInfo.media.posts = await parsePosts($);
    userInfo.media.stories = await parseStories($);
    userInfo.media.reels = await parseReels($);

    return userInfo;
}*/

/**
 * Parse the user's profile information from the loaded HTML using cheerio.
 *
 * @param {CheerioStatic} $ - The Cheerio instance for parsing HTML.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the user's profile information.
 */
/*async function parseProfile($) {
    return {
        username: $(".user-info__username-text").text(),
        fullName: $(".user-info__full-name").text(),
        biography: $(".user-info__biography").text(),
        profileUrl: $(".avatar__image").attr("src"),
        stats: {
            posts: $(".stats__item:nth-child(1) .stats__value").text().trim(),
            followers: $(".stats__item:nth-child(2) .stats__value").text().trim(),
            following: $(".stats__item:nth-child(3) .stats__value").text().trim(),
        },
        media: {
            stories: [],
            reels: [],
            posts: [],
            highlights: [],
        },
    };
}*/

/**
 * Parse the user's posts from the loaded HTML using cheerio.
 *
 * @param {CheerioStatic} $ - The Cheerio instance for parsing HTML.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects containing post information.
 */
/*async function parsePosts($) {
    const posts = [];
    $(".profile-media-list__item").each((index, element) => {
        const mediaImage = $(element).find(".media-content__image").attr("src");
        const mediaTime = $(element).find(".media-content__meta-time").text().trim();
        const mediaLikes = $(element).find(".media-content__meta-like span").text().trim();
        const mediaComments = $(element).find(".media-content__meta-comment span").text().trim();
        const mediaCaption = $(element).find(".media-content__caption").text();
        const downloadLink = $(element).find(".button__download").attr("href");
        const isVideo = $(element).find(".tags__item--video").length > 0;

        posts.push({
            image: mediaImage,
            caption: mediaCaption,
            downloadLink: downloadLink,
            time: mediaTime,
            likes: mediaLikes,
            comments: mediaComments,
            isVideo
        });
    });
    return posts;
}*/

/**
 * Parse the user's stories from the loaded HTML using cheerio.
 *
 * @param {CheerioStatic} $ - The Cheerio instance for parsing HTML.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects containing story information.
 */
/*async function parseStories($) {
    const stories = [];
    $(".profile-media-list__item").each((index, element) => {
        const storyImage = $(element).find(".media-content__image").attr("src");
        const storyDownloadLink = $(element).find(".button__download").attr("href");
        const storyTime = $(element).find(".media-content__meta-time").text().trim();
        const isVideo = $(element).find(".tags__item--video").length > 0;

        stories.push({
            image: storyImage,
            downloadLink: storyDownloadLink,
            time: storyTime,
            isVideo
        });
    });
    return stories;
}*/

/**
 * Parse the user's reels from the loaded HTML using cheerio.
 *
 * @param {CheerioStatic} $ - The Cheerio instance for parsing HTML.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects containing reel information.
 */
/*async function parseReels($) {
    const reels = [];
    $(".profile-media-list__item").each((index, element) => {
        const mediaImage = $(element).find(".media-content__image").attr("src");
        const mediaTime = $(element).find(".media-content__meta-time").text().trim();
        const mediaCaption = $(element).find(".media-content__caption").text();
        const downloadLink = $(element).find(".button__download").attr("href");
        const isVideo = $(element).find(".tags__item--video").length > 0;

        reels.push({
            image: mediaImage,
            caption: mediaCaption,
            downloadLink: downloadLink,
            time: mediaTime,
            isVideo,
        });
    });
    return reels;
}*/
}
// Example usage
return igStalk("aelyncos")