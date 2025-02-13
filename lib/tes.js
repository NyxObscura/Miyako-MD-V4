import fetch from "node-fetch";

class Gemini {
  constructor(key, apikey) {
    this.conversation_id = "";
    this.response_id = "";
    this.choice_id = "";
    this.image_url = null;
    this.image_name = null;
    this.tools = [];
    this.params = { bl: "", _reqid: "", rt: "c" };
    this.data = { "f.req": "", at: "" };
    this.post_url =
      "https://gemini.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate";
    this.headers = this.setupHeaders(key, apikey);
  }

  setupHeaders(key, apikey) {
    return {
      Host: "gemini.google.com",
      "X-Same-Domain": "1",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      Origin: "https://gemini.google.com",
      Referer: "https://gemini.google.com/",
      Cookie: `${key || "__Secure-1PSID"}=${apikey || "g.a000gQhbTE4WvC7mwVL4CcWSxbt1Bde7Ady6qpt6951pafinWART4EEKmcskZMFX08uuSKwbvAACgYKAVYSAQASFQHGX2Mi1KAIQT0oz9dXZXKy0ioMBBoVAUF8yKpem3c3iJtHRDMQF3nSHOxU0076"}`,
    };
  }
}

export default Gemini;
