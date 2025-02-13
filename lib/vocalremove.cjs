const axios = require("axios");
const FormData = require("form-data");

const api = axios.create({ baseURL: "https://aivocalremover.com" });

const getKey = async () => (await api.get("/")).data.match(/key:"(\w+)/)[1];

const vocalRemover = async (audioBuffer = Buffer.from("")) => {
  const form = new FormData();
  const fileName = Math.random().toString(36).substr(2, 9) + ".mpeg"; // Fix to generate a shorter random string
  form.append("fileName", audioBuffer, fileName);

  const [key, fileUpload] = await Promise.all([
    getKey(),
    api
      .post("/api/v2/FileUpload", form, { headers: form.getHeaders() })
      .catch((e) => e.response),
  ]);

  if (fileUpload.status !== 200) throw fileUpload.data || fileUpload.statusText;

  const processFile = await api
    .post(
      "/api/v2/ProcessFile",
      new URLSearchParams({
        file_name: fileUpload.data.file_name,
        action: "watermark_video",
        key,
        web: "web",
      }),
    )
    .catch((e) => e.response);

  if (processFile.status !== 200)
    throw processFile.data || processFile.statusText;

  return processFile.data;
};

module.exports = { vocalRemover };

/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY DEXZZ
* NAMA SCRIPT EMILIA-MD
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN DEXZZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/
