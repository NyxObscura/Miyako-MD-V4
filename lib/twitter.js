import axios from "axios";
const cleanTwitterURL = (url) => {
  const regex =
    /(https:\/\/twitter\.com\/[^\/]+\/status\/\d+)(\/photo\/\d+)?(\/\d+)?/i;
  const match = url.match(regex);
  return match ? match[1] : url;
};
const getTwitterMedia = async (url, options = {}) => {
  try {
    const input =
      typeof url === "object"
        ? url.url
          ? url
          : {
              found: false,
              error: "No URL provided",
            }
        : {
            url,
          };
    const { buffer, text } = options;
    if (buffer || text) {
      input.buffer = buffer;
      input.text = text;
    }
    const cleanedURL = cleanTwitterURL(input.url);
    if (!/\/\/twitter.com/.test(cleanedURL)) {
      return {
        found: false,
        error: `Invalid URL: ${cleanedURL}`,
      };
    }
    const apiURL = cleanedURL.replace("//twitter.com", "//api.vxtwitter.com");
    const result = await axios
      .get(apiURL)
      .then((res) => res.data)
      .catch(() => ({
        found: false,
        error: "An issue occurred. Make sure the Twitter link is valid.",
      }));
    if (!result.media_extended) {
      return {
        found: false,
        error: "No media found",
      };
    }
    const output = {
      found: true,
      media: result.media_extended.map(({ url, type }) => ({
        url,
        type,
      })),
      date: result.date,
      likes: result.likes,
      replies: result.replies,
      retweets: result.retweets,
      authorName: result.user_name,
      authorUsername: result.user_screen_name,
      ...(input.text && {
        text: result.text,
      }),
    };
    if (input.buffer) {
      for (const media of output.media) {
        media.buffer = await axios
          .get(media.url, {
            responseType: "arraybuffer",
          })
          .then((res) => Buffer.from(res.data, "binary"))
          .catch(() => undefined);
      }
    }
    return output;
  } catch (error) {
    console.error("Error in getTwitterMedia:", error.message);
    throw new Error("Failed to get Twitter media");
  }
};
export { getTwitterMedia };
