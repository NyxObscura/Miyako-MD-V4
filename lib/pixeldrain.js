import convertSize from "convert-size";
import got from "got";

function Pixeldrain(url) {
  return new Promise((resolve, reject) => {
    got
      .get(url)
      .then((response) => {
        const script = response.body.match(/window.viewer_data.=.(.*?);/);
        const data = JSON.parse(script[1]);
        resolve({
          name: data.api_response.name,
          mime_type: data.api_response.mime_type,
          size: convertSize(data.api_response.size, {
            accuracy: 2,
          }),
          size: convertSize(data.api_response.size),
          views: data.api_response.views,
          downloads: data.api_response.downloads,
          download_speed_limit: convertSize(
            data.api_response.download_speed_limit,
            {
              accuracy: 2,
            },
          ),
          bandwidth_used: convertSize(data.api_response.bandwidth_used, {
            accuracy: 2,
          }),
          bandwidth_used_paid: convertSize(
            data.api_response.bandwidth_used_paid,
            {
              accuracy: 2,
            },
          ),
          upload: data.api_response.date_upload,
          last_view: data.api_response.date_last_view,
          link: `https://pixeldrain.com/api/file/${data.api_response.id}`,
        });
      })
      .catch((error) => {
        reject(error);
      });
  }).catch((error) => {
    return error;
  });
}
export default Pixeldrain;
