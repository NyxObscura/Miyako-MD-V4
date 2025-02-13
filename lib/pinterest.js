import { fetch } from "undici";
import { URL } from "url";
class PinterestDownloader {
  constructor() {
    this.maxVideoDuration = Infinity;
  }
  getId(input) {
    const regex = /(?:pin\/|\/pin\/)?(\d+)/;
    const matchResult = input.match(regex);
    return matchResult
      ? matchResult[1] ?? "ID tidak ditemukan"
      : "ID tidak ditemukan";
  }
  async videoDown(link) {
    const pinId = this.getId(link);
    if (!pinId) {
      return {
        error: "Gagal mendapatkan ID",
      };
    }
    try {
      const response = await fetch(
        "https://www.pinterest.com/resource/PinResource/get?data=" +
          encodeURIComponent(
            JSON.stringify({
              options: {
                field_set_key: "unauth_react_main_pin",
                id: pinId,
              },
            }),
          ),
      );
      if (!response.ok) {
        console.error("Gagal mengambil data");
        return {
          error: "Gagal mengambil data",
        };
      }
      const responseData = (await response.json()).resource_response.data;
      if (!responseData) {
        console.error("Gagal mengambil data");
        return {
          error: "Gagal mengambil data",
        };
      }
      const video =
        responseData.videos?.video_list?.V_720P ??
        responseData.story_pin_data?.pages[0]?.blocks[0]?.video?.video_list
          ?.V_EXP7;
      if (!video) {
        console.error("Gagal mengambil video");
        return {
          error: "Gagal mengambil video",
        };
      }
      if (video.duration > this.maxVideoDuration) {
        console.warn(
          `Durasi video melebihi batas: ${this.maxVideoDuration / 60000} menit`,
        );
      }
      return {
        url: video.url,
      };
    } catch (error) {
      console.error("Error:", error.message);
      return {
        error: "Gagal mengambil video",
      };
    }
  }
  async imageDown(link) {
    const pinId = this.getId(link);
    if (!pinId) {
      return {
        error: "Gagal mendapatkan ID",
      };
    }
    try {
      const response = await fetch(
        "https://www.pinterest.com/resource/PinResource/get?data=" +
          encodeURIComponent(
            JSON.stringify({
              options: {
                field_set_key: "unauth_react_main_pin",
                id: pinId,
              },
            }),
          ),
      );
      if (!response.ok) {
        console.error("Gagal mengambil data");
        return {
          error: "Gagal mengambil data",
        };
      }
      const responseData = (await response.json()).resource_response.data;
      if (!responseData) {
        console.error("Gagal mengambil data");
        return {
          error: "Gagal mengambil data",
        };
      }
      const images = responseData.images.orig;
      if (!images) {
        console.error("Gagal mengambil gambar");
        return {
          error: "Gagal mengambil gambar",
        };
      }
      return {
        url: images.url,
      };
    } catch (error) {
      console.error("Error:", error.message);
      return {
        error: "Gagal mengambil gambar",
      };
    }
  }
  async searchPinterest(query) {
    const baseUrl =
      "https://www.pinterest.com/resource/BaseSearchResource/get/";
    const queryParams = {
      source_url: "/search/pins/?q=" + encodeURIComponent(query),
      data: JSON.stringify({
        options: {
          isPrefetch: false,
          query,
          scope: "pins",
          no_fetch_context_on_resource: false,
        },
        context: {},
      }),
      _: Date.now(),
    };
    const url = new URL(baseUrl);
    Object.entries(queryParams).forEach((entry) =>
      url.searchParams.set(entry[0], entry[1]),
    );
    try {
      const json = await (await fetch(url.toString())).json();
      const results = json.resource_response?.data?.results ?? [];
      return results.map((item) => ({
        pin: "https://www.pinterest.com/pin/" + item.id ?? "",
        link: item.link ?? "",
        created_at:
          new Date(item.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }) ?? "",
        id: item.id ?? "",
        images_url: item.images?.["736x"].url ?? "",
        grid_title: item.grid_title ?? "",
      }));
    } catch (error) {
      console.error("Error mengambil data:", error);
      return [];
    }
  }
}
export { PinterestDownloader };
