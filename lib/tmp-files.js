import axios from 'axios'
import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'

export async function tmp(buffer) {

  const { ext, mime } = (await fileTypeFromBuffer(buffer)) || {};

  const form = new FormData();

  form.append("file", buffer, { filename: `tmp.${ext}`, contentType: mime });

  try {

    const { data } = await axios.post("https://tmpfiles.org/api/v1/upload", form, {

      headers: form.getHeaders(),

    });   

    console.log(data);  

    const match = /https?:\/\/tmpfiles.org\/(.*)/.exec(data.data.url);

    return `https://tmpfiles.org/dl/${match[1]}`;

  } catch (error) {

    throw error;

  }

};