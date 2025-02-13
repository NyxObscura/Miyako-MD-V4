import axios from "axios";
import fetch from "node-fetch";
import https from "https";
import cheerio from "cheerio";
import sharp from "sharp";
const agent = new https.Agent({
  rejectUnauthorized: false,
});
const headers = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
};
const Svgai = async (prompt) => {
  try {
    const { data } = await axios.post(
      "https://api.svg.io:10003/api/createimg/ai",
      {
        prompt,
      },
      {
        headers,
        httpsAgent: agent,
      },
    );
    const svgBase64 = data.images[0];
    const base64Data = svgBase64.replace(/^data:image\/svg\+xml;base64,/, "");
    const svgBuffer = Buffer.from(base64Data, "base64");
    const pngBuffer = await sharp(svgBuffer)
      .png({
        quality: 100,
      })
      .toBuffer();
    return {
      svg: svgBuffer,
      png: pngBuffer,
    };
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};
const MyInstant = class {
  async scrape(url) {
    try {
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);
      return $(".instant")
        .map((_, el) => {
          const title = $(el).find(".instant-link").text().trim();
          const soundLink = `https://www.myinstants.com${
            $(el)
              .find("button.small-button")
              .attr("onclick")
              .match(/play\('(.+?)'/)[1]
          }`;
          const pageLink = `https://www.myinstants.com${$(el).find(".instant-link").attr("href")}`;
          return {
            title,
            soundLink,
            pageLink,
          };
        })
        .get();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  async home() {
    return await this.scrape("https://www.myinstants.com/en/index/id/");
  }
  async best() {
    return await this.scrape(
      "https://www.myinstants.com/en/best_of_all_time/id/",
    );
  }
  async recent() {
    return await this.scrape("https://www.myinstants.com/en/recent/");
  }
  async category(cat) {
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
    if (!categories.includes(cat)) {
      console.error("Invalid category.");
      return categories;
    }
    return await this.scrape(`https://www.myinstants.com/en/categories/${cat}`);
  }
  async new() {
    return await this.scrape("https://www.myinstants.com/en/new/");
  }
  async fav() {
    return await this.scrape("https://www.myinstants.com/en/favorites/");
  }
  async search(query) {
    return await this.scrape(
      `https://www.myinstants.com/en/search/?name=${query}`,
    );
  }
};
const Zmoai = async (
  prompt,
  identify = "f944236b0480a21d0344ad661b0bae9f",
  categoryId = "b8001af87354413387180815c5f250cf",
  styleCategoryIds = ["cdf3fddfee364bcfa31a38a9bb4d63fe"],
  scale = "1280x720",
  resolution = "1280x720",
  numOfImages = 1,
) => {
  const urlCreate =
    "https://web-backend-prod.zmo.ai/api/v1.0/microTask/makeUp/anonymous/create";
  const headers = {
    "Content-Type": "application/json",
    "App-Code": "dalle",
    identify: identify,
  };
  const data = {
    subject: prompt,
    categoryId,
    styleCategoryIds,
    scale,
    resolution,
    numOfImages,
  };
  try {
    const createResponse = await fetch(urlCreate, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!createResponse.ok) {
      throw new Error(`Error creating task: ${createResponse.statusText}`);
    }
    const { batchTaskId } = await createResponse.json();
    const urlGet = `https://web-backend-prod.zmo.ai/api/v1.0/microTask/makeUp/get?batchTaskId=${batchTaskId}`;
    let taskDetails;
    let attempts = 0;
    const maxAttempts = 5;
    do {
      await new Promise((resolve) => setTimeout(resolve, 15000));
      const getResponse = await fetch(urlGet, {
        method: "GET",
        headers,
      });
      if (!getResponse.ok) {
        throw new Error(
          `Error getting task details: ${getResponse.statusText}`,
        );
      }
      taskDetails = await getResponse.json();
      attempts += 1;
    } while (!taskDetails.images && attempts < maxAttempts);
    if (!taskDetails.images) {
      throw new Error("Failed to get task details after maximum attempts.");
    }
    return taskDetails;
  } catch (error) {
    console.error("Error creating task or getting task details:", error);
    throw error;
  }
};
const Arthub = async (
  prompt,
  censor_nsfw = false,
  nsfw = true,
  cfg_scale = 7.5,
  height = 512,
  n = 1,
  sampler_name = "k_dpm_2",
  seed = "",
  steps = 25,
  width = 512,
  post_processing = ["RealESRGAN_x4plus"],
  r2 = true,
  trusted_workers = false,
  models = ["Deliberate"],
) => {
  const urlCreate =
    "https://arthub-gen-worker.repalash.workers.dev/api/v1/generate";
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6Ikd5OEFFbmtua3JCMXJhN3QiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE3MzQ1MzEyLCJpYXQiOjE3MTczNDE3MTIsImlzcyI6Imh0dHBzOi8vZml3ZHVhZWpteHd0aWRibnlveHkuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjIzMDQzNGM0LWUxZTUtNDg2Zi1hYTBjLWFhYjdiYjg0MGNjMCIsImVtYWlsIjoiYWJkbWFsaWthbHFhZHJpMjAwMUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImdpdGh1YiIsInByb3ZpZGVycyI6WyJnaXRodWIiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS85MTk0NTExOT92PTQiLCJlbWFpbCI6ImFiZG1hbGlrYWxxYWRyaTIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkF5R2VtdXkiLCJpc3MiOiJodHRwczovL2FwaS5naXRodWIuY29tIiwibmFtZSI6IkF5R2VtdXkiLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6IkF5R2VtdXkiLCJwcm92aWRlcl9pZCI6IjkxOTQ1MTE5Iiwic3ViIjoiOTE5NDUxMTkiLCJ1c2VyX25hbWUiOiJBeUdlbXV5In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3MTczNDE3MTJ9XSwic2Vzc2lvbl9pZCI6IjM1ODVjMDk1LTA5ODAtNDY3Yy05N2JiLTBmOTAzZjJiMmEwMiIsImlzX2Fub255bW91cyI6ZmFsc2V9.ioeuL0KCI-_VQOKi4cODQUZ249EAypssRXTu7NoPAYk",
  };
  const data = {
    censor_nsfw,
    nsfw,
    params: {
      cfg_scale,
      height,
      n,
      sampler_name,
      seed,
      steps,
      width,
      post_processing,
    },
    r2,
    prompt,
    trusted_workers,
    models,
  };
  try {
    const createResponse = await fetch(urlCreate, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!createResponse.ok) {
      throw new Error(`Error creating task: ${createResponse.statusText}`);
    }
    const { id: batchTaskId } = await createResponse.json();
    const urlGet = `https://arthub-gen-worker.repalash.workers.dev/api/v1/check/${batchTaskId}`;
    let taskDetails;
    let attempts = 0;
    const maxAttempts = 5;
    do {
      await new Promise((resolve) => setTimeout(resolve, 15000));
      const getResponse = await fetch(urlGet, {
        method: "GET",
        headers,
      });
      if (!getResponse.ok) {
        throw new Error(
          `Error getting task details: ${getResponse.statusText}`,
        );
      }
      taskDetails = await getResponse.json();
      attempts += 1;
    } while (!taskDetails.done && attempts < maxAttempts);
    if (!taskDetails.done) {
      throw new Error("Failed to get task details after maximum attempts.");
    }
    return taskDetails;
  } catch (error) {
    console.error("Error creating task or getting task details:", error);
    throw error;
  }
};
const Limewire = async (
  prompt = "A cute baby sea otter",
  negative_prompt = "",
  samples = 1,
  quality = "LOW",
  guidance_scale = 50,
  aspect_ratio = "1:1",
  style = "PHOTOREALISTIC",
) => {
  const url = "https://api.limewire.com/api/image/generation";
  const headers = {
    "Content-Type": "application/json",
    "X-Api-Version": "v1",
    Accept: "application/json",
    Authorization:
      "Bearer lmwr_sk_qVretommpl_vw8PBAgja0oO8SG20NlR0eIFQa4xGDng71utP",
  };
  const body = {
    prompt,
    negative_prompt,
    samples,
    quality,
    guidance_scale,
    aspect_ratio,
    style,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error creating task: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating task or getting task details:", error);
    throw error;
  }
};
export { Svgai, MyInstant, Zmoai, Arthub, Limewire };
