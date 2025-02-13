import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

/**
 * Upload image to telegra.ph
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`s
 * @param {Buffer} buffer Image Buffer
 * @return {Promise<string>}
 */
/*export default async (buffer) => {
  const { ext, mime } = await fileTypeFromBuffer(buffer);
  let form = new FormData();
  const blob = new Blob([buffer.toArrayBuffer()], { type: mime });
  form.append("file", blob, "tmp." + ext);
  let res = await fetch("https://telegra.ph/upload", {
    method: "POST",
    body: form,
  });
  let img = await res.json();
  if (img.error) throw img.error;
  return "https://telegra.ph" + img[0].src;
};*/
export default async function (content) {
  const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
  const blob = new Blob([content.toArrayBuffer()], { type: mime });
  const formData = new FormData();
  const randomBytes = crypto.randomBytes(5).toString("hex");
  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", blob, randomBytes + "." + ext);

  const response = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: formData,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36",
    },
  });

  return await response.text();
}
/*import FormData from 'form-data'

export default async function (buffer) {
    let data = new FormData();
    data.append("files[]", buffer, "upload.jpg"); // Nama file bisa disesuaikan

    let response = await fetch("https://uguu.se/upload.php", {
        method: "POST",
        body: data
    });

    let res = await response.json()
return res.files[0].url
}*/
/*import axios from "axios";
import FormData from "form-data";
import { fileTypeFromBuffer } from "file-type";

export default async function uploadImage(buffer) {
  const fileType = await fileTypeFromBuffer(buffer);

  if (!fileType) {
    throw new Error("Could not determine file type");
  }

  const { ext, mime } = fileType;
  const form = new FormData();
  form.append("files[]", buffer, { filename: `tmp.${ext}`, contentType: mime });

  try {
    const { data } = await axios.post("https://pomf.lain.la/upload.php", form, {
      headers: form.getHeaders(),
    });
    console.log(data);
    return data.files[0]?.url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}*/