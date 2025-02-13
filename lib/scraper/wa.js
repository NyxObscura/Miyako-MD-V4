import axios from 'axios'
import cheerio from 'cheerio'

const apkbeta = 'https://www.techspot.com/downloads/5748-whatsapp-for-android.html';
const apkbusines = 'https://www.techspot.com/downloads/7210-whatsapp-business.html'


function wabeta() {
  return new Promise((resolve, reject) => {
    axios
      .get(apkbeta)
      .then(response => {
        const $ = cheerio.load(response.data);

        const info = {
          apkName: $('h1.large').text().trim(),
          lastUpdated: $('#specs .last-updated .item time').text().trim(),
          developer: $('#specs .developer .item a').text().trim(),
          license: $('#specs .license .item').text().trim(),
          os: $('#specs .os-support .item').text().trim(),
          fileSize: $('#specs .file-size .item').text().trim(),
          downloads: $('#specs .downloads .item').text().trim(),
          userRating: $('#specs .user-rating title').text().trim(),
          votes: $('#specs .user-rating .votecount span').text().trim(),
          image: $('img[fetchpriority="high"]').attr('src'),
        };

        const relativeFirstLink = $('a[href*="/downloads/downloadnow/"]').attr('href');
        if (!relativeFirstLink) {
          return reject('Link tahap pertama tidak ditemukan');
        }

        const firstLink = new URL(relativeFirstLink, apkbeta).href;

        return axios.get(firstLink).then(response => ({ response, info }));
      })
      .then(({ response, info }) => {
        const $ = cheerio.load(response.data);

        const relativeSecondLink = $('a[href*="/downloads/downloadnowfile/"]').attr('href');
        if (!relativeSecondLink) {
          return reject('Link tahap kedua tidak ditemukan');
        }

        const finalLink = new URL(relativeSecondLink, apkbeta).href;

        resolve({ info, downloadLink: finalLink });
      })
      .catch(error => reject(`Error scraping: ${error.message}`));
  });
}

function wabetabisnis() {
  return new Promise((resolve, reject) => {
    axios
      .get(apkbusines)
      .then(response => {
        const $ = cheerio.load(response.data);

        const info = {
          apkName: $('h1.large').text().trim(),
          lastUpdated: $('#specs .last-updated .item time').text().trim(),
          developer: $('#specs .developer .item a').text().trim(),
          license: $('#specs .license .item').text().trim(),
          os: $('#specs .os-support .item').text().trim(),
          fileSize: $('#specs .file-size .item').text().trim(),
          downloads: $('#specs .downloads .item').text().trim(),
          userRating: $('#specs .user-rating title').text().trim(),
          votes: $('#specs .user-rating .votecount span').text().trim(),
          image: $('img[fetchpriority="high"]').attr('src'),
        };

        const relativeFirstLink = $('a[href*="/downloads/downloadnow/"]').attr('href');
        if (!relativeFirstLink) {
          return reject('Link tahap pertama tidak ditemukan');
        }

        const firstLink = new URL(relativeFirstLink, apkbusines).href;

        return axios.get(firstLink).then(response => ({ response, info }));
      })
      .then(({ response, info }) => {
        const $ = cheerio.load(response.data);

        const relativeSecondLink = $('a[href*="/downloads/downloadnowfile/"]').attr('href');
        if (!relativeSecondLink) {
          return reject('Link tahap kedua tidak ditemukan');
        }

        const finalLink = new URL(relativeSecondLink, apkbusines).href;

        resolve({ info, downloadLink: finalLink });
      })
      .catch(error => reject(`Error scraping: ${error.message}`));
  });
}

async function getapk () {
  const apk = await wabeta()
  const apk2 = await wabetabisnis()
  return ({
    info: apk.info,
    wabeta: apk.downloadLink,
    wabussinesbeta: apk2.downloadLink
  })
}

export default getapk;