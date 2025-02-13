import axios from "axios";
import FormData from "form-data";

/*
  Created by https://github.com/ztrdiamond !
  Source: https://whatsapp.com/channel/0029VagFeoY9cDDa9ulpwM0T
  "Aku janji jika hapus watermark ini maka aku rela miskin hingga 7 turunan"
*/

async function video2audio(buffer) {
  try {
    return await new Promise(async(resolve, reject) => {
      if (!buffer) return reject("undefined reading buffer");
      if (!Buffer.isBuffer(buffer)) return reject("invalid buffer input!");
      const form = new FormData();
      form.append("userfile", buffer, `${Date.now()}.mp4`);
      axios.post("https://service5.coolutils.org/upload.php", form, {
        headers: form.getHeaders(),
      })
      .then(async uploadRes => {
        const uploadedFile = uploadRes.data;
        if (!uploadedFile) return reject("failed converting while uploading media!");
        const payload = new URLSearchParams();
        payload.append("Flag", 5);
        payload.append("srcfile", uploadedFile);
        payload.append("Ref", "/convert/MP4-to-MP3");
        payload.append("fmt", "mp3");
        payload.append("resize_constraint", "on");
        axios.post("https://service5.coolutils.org/movie_convert.php", payload.toString(), {
          headers: {
            'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            'Content-Type': "application/x-www-form-urlencoded"
          },
          responseType: "arraybuffer"
        })
        .then(res => {
          if (!Buffer.isBuffer(res.data)) return reject("failed converting video to audio!");
          resolve({
            status: true,
            data: {
              audio: Buffer.from(res.data, "binary")
            }
          });
        })
        .catch(error => reject(`Error during conversion: ${error.message}`));
      })
      .catch(error => reject(`Error during upload: ${error.message}`));
    });
  } catch (e) {
    return { status: false, message: e.message || e };
  }
}

export default video2audio;