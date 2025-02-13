import axios from 'axios';
import yts from 'yt-search';

const getVideoId = (url) => {
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)(?<videoId>[\w-]{11})/);
  return match ? match.groups.videoId : '';
};

const formatNumber = (number) => Number(number).toLocaleString();

const detectLang = async (text) => {
  try {
    const response = await axios.get(`https://translate.google.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`);
    return response.data[2][0][0];
  } catch (error) {
    return 'Error detecting language';
  }
};

const Ytdl = {
  search: async (query) => {
    try {
      const results = (await yts(query)).videos;
      return {
        status: true,
        creator: '@Bang_syaii',
        data: results.map(video => ({
          title: video.title,
          url: 'https://youtu.be/' + video.videoId,
          img: video.image,
          author: {
            name: video.author.name,
            url: video.author.url
          }
        }))
      };
    } catch (error) {
      return {
        status: false,
        msg: 'Data tidak dapat ditemukan!',
        err: error.message
      };
    }
  },

  mp3: async (url) => {
    try {
      const videoId = getVideoId(url);
      const videoUrl = `https://youtu.be/${videoId}`;

      // Coba API pertama
      try {
        const media = await SaveTube.dl(url, 3, 1)
        

        const info = await getInfo(videoId);
        return {
          status: true,
          creator: '@cifumo',
          title: info.title || '',
          metadata: {
            duration: info.duration || '',
            thumbnail: info.thumbnail || '',
            views: formatNumber(info.view) || '',
            description: info.desc || '',
            channel: info.channel || ''
          },
          url: videoUrl,
          media: await toBuffer(media.link),
        };
      } catch (error) {
        console.log("Gagal menggunakan API pertama:", error.message);

        // Coba API kedua jika API pertama gagal
        const mp32 = await axios.get(`https://api.maelyn.tech/api/youtube/audio?url=${url}&apikey=${APIKeys[APIs['maelyn']]}`);
        const info = await getInfo(videoId);

        return {
          status: true,
          creator: '@cifumo',
          title: info.title || '',
          metadata: {
            duration: info.duration || '',
            thumbnail: info.thumbnail || '',
            views: formatNumber(info.view) || '',
            description: info.desc || '',
            channel: info.channel || ''
          },
          url: videoUrl,
          media: await toBuffer(mp32.data.result.url),
        };
      }
    } catch (error) {
      return {
        status: false,
        msg: 'Gagal saat mengambil data!',
        err: error.message
      };
    }
  },

  mp4: async (url) => {
    try {
      const videoId = getVideoId(url);
      const videoUrl = `https://youtu.be/${videoId}`;

      // Coba API pertama
      try {
        
        const media = await SaveTube.dl(url, 3, 2)
        
        const info = await getInfo(videoId);

        return {
          status: true,
          creator: '@cifumo',
          title: info.title || '',
          metadata: {
            duration: info.duration || '',
            thumbnail: info.thumbnail || '',
            views: formatNumber(info.view) || '',
            description: info.desc || '',
            channel: info.channel || ''
          },
          url: videoUrl,
          media: await toBuffer(media.link),
        };
      } catch (error) {
        console.log("Gagal menggunakan API pertama:", error.message);

        // Coba API kedua jika API pertama gagal
        const mp42 = await axios.get(`https://api.maelyn.tech/api/youtube/video?url=${url}&apikey=${APIKeys[APIs['maelyn']]}`);
        const info = await getInfo(videoId);

        return {
          status: true,
          creator: '@cifumo',
          title: info.title || '',
          metadata: {
            duration: info.duration || '',
            thumbnail: info.thumbnail || '',
            views: formatNumber(info.view) || '',
            description: info.desc || '',
            channel: info.channel || ''
          },
          url: videoUrl,
          media: await toBuffer(mp42.data.result.url),
        };
      }
    } catch (error) {
      return {
        status: false,
        msg: 'Gagal saat mengambil data!',
        err: error
      };
    }
  }
};

// Fungsi tambahan
async function getFileSize(url) {
  try {
    const res = await axios.head(url);
    return parseInt(res.headers["content-length"], 10);
  } catch (err) {
    return 0;
  }
}

async function toBuffer(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    return Buffer.from(response.data, "binary");
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw error;
  }
}

function durasi(isoDuration) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = isoDuration.match(regex);

  const hours = parseInt(matches[1]) || 0;
  const minutes = parseInt(matches[2]) || 0;
  const seconds = parseInt(matches[3]) || 0;

  const formattedTime =
    (hours > 0 ? hours + ":" : "") +
    (minutes < 10 && hours > 0 ? "0" : "") + minutes +
    ":" +
    (seconds < 10 ? "0" : "") + seconds;

  return formattedTime;
}

async function getInfo(id) {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=AIzaSyD8CUcwY40UbZW7CGvRIFSEpIRIZTN9fqw&part=snippet,contentDetails,statistics,status`;

  const response = await axios.get(url);
  const js = response.data;

  return {
    title: js.items[0].snippet.title,
    thumbnail: js.items[0].snippet.thumbnails.high.url,
    desc: js.items[0].snippet.description,
    tags: js.items[0].snippet.tags,
    channel: js.items[0].snippet.channelTitle,
    view: js.items[0].statistics.viewCount,
    duration: durasi(js.items[0].contentDetails.duration)
  };
}

function toMenit(detik) {
  const jam = Math.floor(detik / 3600);
  const menit = Math.floor((detik % 3600) / 60);
  const sisaDetik = detik % 60;
  if (jam > 0) {
    return `${jam}:${String(menit).padStart(2, '0')}:${String(sisaDetik).padStart(2, '0')}`;
  } else {
    return `${menit}:${String(sisaDetik).padStart(2, '0')}`;
  }
}

async function dl(url, format) {

  let downloadUrl;
  if (format === 'audio') {
    downloadUrl = `https://ab.cococococ.com/ajax/download.php?format=mp3&url=${encodeURIComponent(url)}`;
  } else if (format === 'video') {
    downloadUrl = `https://ab.cococococ.com/ajax/download.php?format=360&url=${encodeURIComponent(url)}`;
  } else {
    return "Unsupported format. Please use 'audio' or 'video'.";
  }

  try {
    const response = await fetch(downloadUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://y2down.cc/ja/'
      }
    });

    if (response.ok) {
      const result = await response.json();
      const id = result.id; 
      const downloadMessage = `${format.charAt(0).toUpperCase() + format.slice(1)} downloaded successfully, ID: ${id}`;

      return { message: downloadMessage, result: await checkProgress(id) }; 
    } else {
      return 'Failed to download media: ' + response.status; 
    }
  } catch (error) {
    return 'Error: ' + error.message;
  }
}

async function checkProgress(id) {
  const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;

  while (true) { 
    try {
      const response = await fetch(progressUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
          'Referer': 'https://y2down.cc/ja/'
        }
      });

      if (response.ok) {
        const progress = await response.json();
        
        if (progress.success === 1) {
          return progress.download_url
        } else if (progress.success === 0) {
          await new Promise(resolve => setTimeout(resolve, 5000));
        } else {
          return "Unexpected progress status: " + progress.success;
        }
      } else {
        return 'Failed to check progress: ' + response.status;
      }
    } catch (error) {
      return 'Error: ' + error.message;
    }
  }
}



const SaveTube = {
    qualities: {
        audio: { 1: '32', 2: '64', 3: '128', 4: '192' },
        video: { 1: '144', 2: '240', 3: '360', 4: '480', 5: '720', 6: '1080', 7: '1440', 8: '2160' }
    },
    
    headers: {
        'accept': '*/*',
        'referer': 'https://ytshorts.savetube.me/',
        'origin': 'https://ytshorts.savetube.me/',
        'user-agent': 'Postify/1.0.0',
        'Content-Type': 'application/json'
    },
    
    cdn() {
        return Math.floor(Math.random() * 11) + 51;
    },
    
    checkQuality(type, qualityIndex) {
        if (!(qualityIndex in this.qualities[type])) {
            throw new Error(`❌ Kualitas ${type} tidak valid. Pilih salah satu: ${Object.keys(this.qualities[type]).join(', ')}`);
        }
    },
    
    async fetchData(url, cdn, body = {}) {
        const headers = {
            ...this.headers,
            'authority': `cdn${cdn}.savetube.su`
        };

        try {
            const response = await axios.post(url, body, { headers });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    
    dLink(cdnUrl, type, quality, videoKey) {
        return `https://${cdnUrl}/download`;
    },
    
    async dl(link, qualityIndex, typeIndex) {
        const type = typeIndex === 1 ? 'audio' : 'video';
        const quality = SaveTube.qualities[type][qualityIndex];
        if (!type) throw new Error('❌ Tipe tidak valid. Pilih 1 untuk audio atau 2 untuk video.');
        SaveTube.checkQuality(type, qualityIndex);
        const cdnNumber = SaveTube.cdn();
        const cdnUrl = `cdn${cdnNumber}.savetube.su`;
        
        const videoInfo = await SaveTube.fetchData(`https://${cdnUrl}/info`, cdnNumber, { url: link });
        const badi = {
            downloadType: type,
            quality: quality,
            key: videoInfo.data.key
        };

        const dlRes = await SaveTube.fetchData(SaveTube.dLink(cdnUrl, type, quality, videoInfo.data.key), cdnNumber, badi);

        return {
            link: dlRes.data.downloadUrl,
            duration: videoInfo.data.duration,
            durationLabel: videoInfo.data.durationLabel,
            fromCache: videoInfo.data.fromCache,
            id: videoInfo.data.id,
            key: videoInfo.data.key,
            thumbnail: videoInfo.data.thumbnail,
            thumbnail_formats: videoInfo.data.thumbnail_formats,
            title: videoInfo.data.title,
            titleSlug: videoInfo.data.titleSlug,
            videoUrl: videoInfo.data.url,
            quality,
            type
        };
    }
};

export default Ytdl;