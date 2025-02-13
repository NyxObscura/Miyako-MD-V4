import axios from "axios";

const api = axios.create({
  baseURL: "https://thinkany.ai/api",
  headers: {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
    Referer: "https://thinkany.ai/",
  },
});

/**
 * Scraper By QanyPaw
 * Dilarang menjual dan menghapus watermark saya, hormati pembuatnya
 */

async function thinkany(content) {
  try {
    const newConversationData = {
      content,
      locale: "en",
      mode: "search",
      model: "claude-3-haiku",
      source: "all",
    };
    const { data } = await api.post("/new-conversation", newConversationData);

    const chatData = {
      role: "user",
      content: data.data.content,
      conv_uuid: data.data.uuid,
      mode: data.data.mode,
      is_new: true,
      model: data.data.llm_model,
    };

    const chatResponse = await api.post("/chat", chatData);
    return chatResponse.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// example
// return thinkany("kapan Indonesia merdeka")

export { thinkany };
