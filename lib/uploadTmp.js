import axios from "axios";
import FormData from "form-data";
import { fileTypeFromBuffer } from "file-type";

async function tmpFiles(buffer) {
  return new Promise(async (resolve, reject) => {
    try {
      const { ext, mime } = await fileTypeFromBuffer(buffer);
      const form = new FormData();
      form.append("file", buffer, {
        filename: new Date() * 1 + "." + ext,
        contentType: mime,
      });

      const { data } = await axios.post(
        "https://tmpfiles.org/api/v1/upload",
        form,
        {
          headers: {
            ...form.getHeaders(),
          },
        },
      );

      const match = /https?:\/\/tmpfiles.org\/(.*)/.exec(data.url);
      resolve(`https://tmpfiles.org/dl/${match[1]}`);
    } catch (error) {
      reject(error.response);
    }
  });
}

async function pomf(media) {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append("files[]", media, {
        filename: new Date() * 1 + ".jpg",
      });

      const response = await axios.post(
        "https://pomf2.lain.la/upload.php",
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        },
      );

      resolve(response.data);
    } catch (error) {
      reject(error.response);
    }
  });
}

export { tmpFiles, pomf };
