import fs from "fs";
import axios from "axios";
import FormData from "form-data";

async function svc(Path, modelId) {
  return new Promise(async (resolve, reject) => {
    try {
      const form = new FormData();
      form.append("file", fs.createReadStream(Path));
      form.append("model_id", modelId);

      const response = await axios({
        url: "https://lovita.io/sovits/vc/inference",
        method: "POST",
        headers: {
          ...form.getHeaders(),
          Authorization: APIKeys[APIs["rose"]],
        },
        data: form,
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
export { svc };
