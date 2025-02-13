import axios from "axios";
import fetch from "node-fetch";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
import { randomBytes, randomUUID } from "crypto";

class Blackbox {
  constructor() {
    this.userId = randomUUID();
    this.chatId = randomBytes(16).toString("hex");
  }

  async blackbox(prompt, logic, webSearchMode) {
    const body = {
      messages: [
        {
          role: "assistant",
          content: logic,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      previewToken: null,
      codeModelMode: true,
      agentMode: {},
      trendingAgentMode: {},
      isMicMode: false,
      isChromeExt: false,
      githubToken: null,
      webSearchMode: webSearchMode,
    };
    const url = "https://www.blackbox.ai/api/chat";
    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = response.data;
      if (typeof result === "string") {
        result = result.replace(/\$@\$.+?\$@\$/gs, "").trim();
        result = result.replace(/\$~~~\$.*?\$~~~\$/gs, "").trim();
        result = result.replace(/\*\*/g, "*").trim();
      }
      if (webSearchMode && result.includes("Sources:")) {
        result = this.formatWebSearchResult(result);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  formatWebSearchResult(result) {
    const sourcesIndex = result.indexOf("Sources:");
    if (sourcesIndex !== -1) {
      const sourcesSection = result.substring(sourcesIndex);
      const formattedSources = sourcesSection
        .split("\n")
        .map((source) => source.trim())
        .filter((source) => source)
        .map((source) => `- ${source}`)
        .join("\n");
      const answerSection = result.substring(0, sourcesIndex).trim();
      return `${answerSection}\n\nSumber:\n${formattedSources}`;
    }
    return result;
  }

  async combinedResponse(prompt, logic) {
    const webSearchResult = await this.blackbox(prompt, logic, true);
    const formattedWebSearchResult = `Hasil pencarian dari internet:\n\n${webSearchResult}`;
    const finalResult = await this.blackbox(
      prompt,
      formattedWebSearchResult,
      false,
    );
    return finalResult;
  }

  async chat(
    messages,
    userSystemPrompt = "You are Realtime AI. Follow the user's instructions carefully.",
    webSearchMode = true,
    playgroundMode = false,
    codeModelMode = false,
    isMicMode = false,
  ) {
    try {
      const response = await axios.post(
        "https://www.blackbox.ai/api/chat",
        {
          messages,
          id: this.chatId || "chat-free",
          previewToken: null,
          userId: this.userId,
          codeModelMode,
          agentMode: {},
          trendingAgentMode: {},
          isMicMode,
          userSystemPrompt,
          maxTokens: 1024,
          playgroundMode,
          webSearchMode,
          promptUrls: "",
          isChromeExt: false,
          githubToken: null,
        },
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            Accept: "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            Referer: "https://www.blackbox.ai/",
            "Content-Type": "application/json",
            Origin: "https://www.blackbox.ai",
            DNT: "1",
            "Sec-GPC": "1",
            "Alt-Used": "www.blackbox.ai",
            Connection: "keep-alive",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  async image(imageBuffer, input) {
    try {
      const { ext, mime } = (await fileTypeFromBuffer(imageBuffer)) || {};
      if (!ext || !mime) return null;
      const form = new FormData();
      const blob = new Blob([imageBuffer], {
        type: mime,
      });
      form.append("image", blob, "image." + ext);
      form.append("fileName", "image." + ext);
      form.append("userId", this.userId);
      const response = await fetch("https://www.blackbox.ai/api/upload", {
        method: "POST",
        body: form,
      });
      const data = await response.json();
      const messages = [
        {
          role: "user",
          content: data.response + "\n#\n" + input,
        },
      ];
      const response2 = await this.chat(
        messages,
        "Realtime",
        true,
        false,
        false,
        false,
      );
      return response2;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

export { Blackbox };
