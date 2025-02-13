// src/rule34/rule34_function.ts
import axios2 from "axios";

// src/rule34/rule34_main.ts
import axios from "axios";
import { load } from "cheerio";
async function r34_pid(tags) {
  const customAxios = axios.create({
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.2535.92"
    }
  });
  const response = await customAxios.get(
    `https://rule34.xxx/index.php?page=post&s=list&tags=${tags}+&pid=0`
  );
  const $ = load(response.data);
  const last = $(".pagination a").map((i, el) => $(el).attr("href")).get();
  if (last.length != 0) {
    let rem = Number(last[last.length - 1].split("=")[4]);
    if (rem > 168e3) rem = 168e3;
    return rem;
  }
  return 0;
}
function total_api_pages(pid) {
  const totalImages = pid;
  const imagesPerPage = 100;
  const numberOfPages = Math.ceil(totalImages / imagesPerPage);
  return numberOfPages;
}

// src/rule34/rule34_function.ts
async function r34_random({ gay_block }) {
  let pages = total_api_pages(168e3);
  let random = Math.floor(Math.random() * pages);
  let { data } = await axios2(
    `https://api.rule34.xxx/index.php?page=dapi&s=post&pid=${random}&q=index&json=1`
  );
  let ray = [...data.map((obj) => obj.file_url)];
  if (gay_block == true) {
    let urlSet = /* @__PURE__ */ new Set();
    let block = [
      "male",
      "gay",
      "trap",
      "yaoi",
      "balls",
      "dick",
      "boy",
      "trap",
      "furry",
      "bovid",
      "demon",
      "dog",
      "penis"
    ];
    data.forEach((obj) => {
      if (block.some((element) => obj.tags.includes(element))) {
        urlSet.add(obj.file_url);
      }
    });
    ray = ray.filter((url) => !urlSet.has(url));
    return ray;
  } else {
    return ray;
  }
}
async function r34_search({ search_tag = "", block_tags = [] }) {
  const pid = await r34_pid(search_tag);
  if (pid == 0 || search_tag.length === 0) return { status: 400 };
  const pages = total_api_pages(pid);
  if (pages != 0) {
    const random = Math.floor(Math.random() * pages);
    const { data } = await axios2(
      `https://api.rule34.xxx/index.php?page=dapi&s=post&tags=${search_tag}&pid=${random}&q=index&json=1`
    );
    let ray = [...data.map((obj) => obj.file_url)];
    if (block_tags.length != 0) {
      let urlSet = /* @__PURE__ */ new Set();
      data.forEach((obj) => {
        if (block_tags.some((element) => obj.tags.includes(element))) {
          urlSet.add(obj.file_url);
        }
      });
      const clean_array = ray.filter((url) => !urlSet.has(url));
      return clean_array;
    } else {
      return ray;
    }
  }
}
export {
  r34_random,
  r34_search
};