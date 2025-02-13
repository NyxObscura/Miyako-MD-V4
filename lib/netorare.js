import axios from "axios";
import { fileTypeFromBuffer } from "file-type";
import FormData from "form-data";

async function netorare(buffer) {
  const { mime, ext } = await fileTypeFromBuffer(buffer);
  const form = new FormData();
  form.append("file", buffer, {
    filename: `${Date.now()}.${ext}`,
    contentType: mime,
  });

  try {
    const { data } = await axios.post(
      "https://storage.netorare.codes/upload",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Accept: "application/json",
        },
      },
    );
    return data.filePath;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}
export { netorare };
