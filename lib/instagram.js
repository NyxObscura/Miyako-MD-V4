import axios from "axios";
import cheerio from "cheerio";

class instagram {
  constructor() {}
  static async v1(url) {
    try {
      const { data, headers } = await axios
        .request({
          url: "https://downloadgram.org",
          method: "POST",
          headers: {
            ["Content-Type"]: "application/x-www-form-urlencoded",
            ["Upgrade-Insecure-Requests"]: "1",
            ["Referer"]: "https://downloadgram.org",
            ["Referrer-Policy"]: "strict-origin-when-cross-origin",
          },
          data: new URLSearchParams({ url, submit: "" }),
        })
        .catch((e) => e?.response);
      const $ = cheerio.load(data);
      const _temp = [];
      $("#downloadhere > a[download='']").each((i, e) => {
        _temp.push({ url: $(e).attr("href") });
      });
      if (Array.isArray(_temp) && _temp.length) {
        return _temp;
      } else {
        throw new Error(
          $(".alert-danger").text() || "v1: Failed to retrieve data.",
        );
      }
    } catch (e) {
      return {
        error: true,
        message: String(e?.Error || e),
      };
    }
  }
  static async v2(url) {
    try {
      const { data: _data, headers } = await axios
        .request({
          baseURL: "https://indown.io",
          method: "GET",
          headers: {
            ["User-Agent"]: "okhttp/4.20.0",
          },
        })
        .catch((e) => e?.response);
      const _$ = cheerio.load(_data);
      const _opts = {
        referer: _$("input[name='referer']").attr("value"),
        locale: _$("input[name='locale']").attr("value"),
        _token: _$("input[name='_token']").attr("value"),
        link: url,
      };
      const { data } = await axios
        .request({
          baseURL: "https://indown.io",
          url: "/download",
          method: "POST",
          headers: {
            ["User-Agent"]: "okhttp/4.20.0",
            cookie: headers["set-cookie"],
          },
          data: new URLSearchParams({ ..._opts }),
        })
        .catch((e) => e?.response);
      const $ = cheerio.load(data);
      const _temp = [];
      $("#result")
        .find("a[target='_blank']")
        .each((i, e) => {
          const url = $(e).attr("href");
          _temp.push({ url });
        });
      if (_temp.length) {
        return _temp;
      } else {
        throw new Error("Probably wrong url or private post/reel");
      }
    } catch (e) {
      return {
        error: true,
        message: String(e),
      };
    }
  }
}

export { instagram };
