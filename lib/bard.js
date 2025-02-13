import fetch from "node-fetch";
class Gemini {
  constructor(key, apikey) {
    this.conversation_id = "";
    this.response_id = "";
    this.choice_id = "";
    this.image_url = null;
    this.image_name = null;
    this.tools = [];
    this.params = {
      bl: "",
      _reqid: "",
      rt: "c",
    };
    this.data = {
      "f.req": "",
      at: "",
    };
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
  async question(query) {
    try {
      const response = await fetch("https://gemini.google.com/", {
        method: "GET",
        headers: this.headers,
      });
      const geminiText = await response.text();
      const snlM0e = geminiText.match(/"SNlM0e":"(.*?)"/)?.[1] || "";
      const blValue = geminiText.match(/"cfb2h":"(.*?)"/)?.[1] || "";
      if (!snlM0e) {
        console.log(
          "Authentication Error! Failed to retrieve SNlM0e pattern. Provide a valid __Secure-1PSID or __Secure-3PSID value.",
        );
        return {
          content:
            "Authentication Error! Ensure correct __Secure-1PSID or __Secure-3PSID value.",
        };
      }
      if (!blValue) {
        console.log(
          "Value Error! Failed to retrieve bl value. Handle this case accordingly.",
        );
        return {
          content: "Value Error! Handle this case accordingly.",
        };
      }
      this.data.at = snlM0e;
      this.params.bl = blValue;
      let req_id = parseInt(Math.random().toString().slice(2, 6));
      const imageList = this.image_url
        ? [[[this.image_url, 1], this.image_name]]
        : [];
      const requestArray = [
        [query, 0, null, imageList, null, null, 0],
        ["en"],
        [
          this.conversation_id,
          this.response_id,
          this.choice_id,
          null,
          null,
          [],
        ],
        null,
        null,
        null,
        [1],
        0,
        [],
        this.tools,
        1,
        0,
      ];
      this.params._reqid = String(req_id);
      this.data["f.req"] = JSON.stringify([null, JSON.stringify(requestArray)]);
      const postData = `f.req=${encodeURIComponent(this.data["f.req"])}&at=${this.data.at}`;
      const urlWithParams = `${this.post_url}?${new URLSearchParams(this.params)}`;
      const responsePost = await fetch(urlWithParams, {
        method: "POST",
        headers: this.headers,
        body: postData,
      });
      if (!responsePost.ok) {
        console.log(`Response Status: ${responsePost.status}`);
        return {
          content: `Response Status: ${responsePost.status}`,
        };
      }
      const resp_dict = JSON.parse(
        (await responsePost.text()).split("\n")[3],
      )[0][2];
      if (resp_dict === null) {
        console.log(`Response Error: ${responsePost.text}.`);
        return {
          content: `Response Error: ${responsePost.text}.`,
        };
      }
      const parsed_answer = JSON.parse(resp_dict);
      const bard_answer = {
        content: parsed_answer[4][0][1][0],
        conversation_id: parsed_answer[1][0],
        response_id: parsed_answer[1][1],
        factualityQueries: parsed_answer[3],
        textQuery: parsed_answer[2] ? parsed_answer[2][0] : "",
        choices: parsed_answer[4].map((i) => ({
          id: i[0],
          content: i[1],
        })),
      };
      this.conversation_id = bard_answer.conversation_id;
      this.response_id = bard_answer.response_id;
      this.choice_id = bard_answer.choices[0]?.id;
      req_id += 100000;
      return bard_answer;
    } catch (error) {
      console.error(error);
      return {
        content: `Error: ${error.message}`,
      };
    }
  }
}
export { Gemini };
