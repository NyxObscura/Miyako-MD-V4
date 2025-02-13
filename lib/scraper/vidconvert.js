/*💥 *TOOLS VIDEO*

🔗 Base Url: https://www.videotoconvert.com

🌀 *Options* :
- Convert
- Compress
- Upscale
- Trim
- Grayscale
- Mute
- Repair
- Loop

🧑‍💻 Script Code by Daffa
*/

import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import path from 'path';
import cheerio from 'cheerio';

const vid2convert = {
  options: {
    compress: ['1280', '800', '720', '640', '480', '320', '240'],
    convert: ['mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv'],
    upscale: ['1280x720', '1920x1080', '2560x1440', '3840x2160'],
  },

  headers: {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'origin': 'https://www.videotoconvert.com',
    'user-agent': 'Postify/1.0.0',
  },

  async process(url, file, additionalData = {}) {
    const mimetype = path.extname(file);
    const name = `${Math.random().toString(36).substring(2, 15)}${mimetype}`;
    
    const form = new FormData();
    form.append('upfile', fs.createReadStream(file), { filename: name, contentType: `video/${mimetype.substring(1)}` });
    
    for (const [key, value] of Object.entries(additionalData)) {
      form.append(key, value);
    }
    form.append('submitfile', '1');

    const config = {
      headers: {
        ...this.headers,
        ...form.getHeaders(),
      },
    };

    try {
      const response = await axios.post(url, form, config);
      const $ = cheerio.load(response.data);

      while (!$('.alert.alert-success a').attr('href')) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      return this.response($);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  response($) {
    const downloadLink = $('.alert.alert-success a').attr('href');
    let deleteLink = $('.alert.alert-success .text-danger').attr('href');
    deleteLink = deleteLink ? deleteLink : null; 
    const downloadText = $('.alert.alert-success a').text();
    const sizeFile = downloadText.match(/\((.*?)\)/)[1].split(',')[0].trim();

    return {
      downloadLink,
      deleteLink,
      sizeFile,
    };
  },

  convert: async function(file, outputFormat = 1) {
    return this.process('https://www.videotoconvert.com/', file, { output: this.options.convert[outputFormat] });
  },

  compress: async function(file, scaleOption = 1) {
    return this.process('https://www.videotoconvert.com/compress/', file, { scale: this.options.compress[scaleOption] });
  },

  upscale: async function(file, upscaleOption = 1) {
    return this.process('https://www.videotoconvert.com/upscale/', file, { upscale: this.options.upscale[upscaleOption] });
  },

  trim: async function(file, startTime = '00:00:00', endTime = '00:00:05') {
    return this.process('https://www.videotoconvert.com/trim/', file, { start_time: startTime, end_time: endTime });
  },

  grayscale: async function(file) {
    return this.process('https://www.videotoconvert.com/black-white/', file);
  },

  mute: async function(file) {
    return this.process('https://www.videotoconvert.com/mute/', file);
  },

  repair: async function(file) {
    return this.process('https://www.videotoconvert.com/repair/', file);
  },

  loop: async function(file, loopCount = 2) {
    return this.process('https://www.videotoconvert.com/loop/', file, { loop_value: loopCount });
  },
};

export { vid2convert };