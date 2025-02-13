const axios = require('axios')
const cheerio = require('cheerio')

async function latest(pages = 1) {
  try {
    const { data } = await axios.get(await Proxy(`https://kuramanime.red/anime?order_by=updated&page=${pages}`), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);
    let animeList = [];

    $('#animeList .product__item').each((index, element) => {
      let anime = {
        title: $(element).find('.product__item__text h5 a').text(),
        url: $(element).find('a').attr('href'),
        imageUrl: $(element).find('.product__item__pic').data('setbg'),
        rating: $(element).find('.ep span').text().trim(),
        comments: $(element).find('.view-end .fa-comments').next().text().trim(),
        views: $(element).find('.view-end .fa-eye').next().text().trim(),
        type: $(element).find('.product__item__text ul a').eq(0).text(),
        quality: $(element).find('.product__item__text ul a').eq(1).text()
      };
      animeList.push(anime);
    });

    return animeList;
  } catch (error) {
    console.error('Error fetching the page: ', error);
    return error
  }
}

async function detail(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);
    const animeDetails = {};

    // Mendapatkan URL gambar
    animeDetails.imageUrl = $('.anime__details__pic').attr('data-setbg');

    // Mendapatkan judul anime
    animeDetails.title = $('.anime__details__title h3').text().trim();

    // Mendapatkan alias judul
    animeDetails.alias = $('.anime__details__title span').text().trim();

    // Mendapatkan sinopsis
    animeDetails.synopsis = $('#synopsisField').text().trim();

    // Mendapatkan informasi lain
    animeDetails.type = $('.anime__details__widget li:contains("Tipe:") a').text().trim();
    animeDetails.episodes = $('.anime__details__widget li:contains("Episode:") a').text().trim();
    animeDetails.status = $('.anime__details__widget li:contains("Status:") a').text().trim();
    animeDetails.aired = $('.anime__details__widget li:contains("Tayang:")').text().replace('Tayang:', '').trim();
    animeDetails.season = $('.anime__details__widget li:contains("Musim:") a').text().trim();
    animeDetails.duration = $('.anime__details__widget li:contains("Durasi:")').text().replace('Durasi:', '').trim();
    animeDetails.quality = $('.anime__details__widget li:contains("Kualitas:") a').text().trim();
    animeDetails.country = $('.anime__details__widget li:contains("Negara:") a').text().trim();
    animeDetails.adaptation = $('.anime__details__widget li:contains("Adaptasi:") a').text().trim();
    animeDetails.studio = $('.anime__details__widget li:contains("Studio:") a').text().trim();
    animeDetails.score = $('.anime__details__widget li:contains("Skor:")').text().replace('Skor:', '').trim();
    animeDetails.members = $('.anime__details__widget li:contains("Peminat:") a').text().trim();
    animeDetails.rating = $('.anime__details__widget li:contains("Rating:") a').text().trim();
    animeDetails.credit = $('.anime__details__widget li:contains("Kredit:") a').text().trim();

    // Mendapatkan jumlah views dan comments
    animeDetails.comments = $('.view-end .fa-comments').next().text().trim();
    animeDetails.views = $('.view-end .fa-eye').next().text().trim();

    // Mendapatkan genre
    animeDetails.genres = [];
    $('.anime__details__widget li:contains("Genre:") a').each((index, element) => {
      animeDetails.genres.push($(element).text().trim());
    });

    // Mendapatkan tema
    animeDetails.themes = [];
    $('.anime__details__widget li:contains("Tema:") a').each((index, element) => {
      animeDetails.themes.push($(element).text().trim());
    });

    // Mendapatkan URL dasar episode
    const episodeBaseUrl = $('#shareLink').attr('href');
    const totalEpisodes = parseInt(animeDetails.episodes) || 0;
    animeDetails.episodeList = [];

    // Membuat daftar URL episode
    for (let i = 1; i <= totalEpisodes; i++) {
      animeDetails.episodeList.push(`${episodeBaseUrl}/episode/${i}`);
    }

    return animeDetails;
  } catch (error) {
    console.error('Error fetching the page: ', error);
    return null;
  }
}

// Fungsi untuk scrape data dari HTML
async function search(text) {
  try {
    // Ini hanya contoh, Anda mungkin perlu mengganti URL dengan yang sebenarnya
    const { data } = await axios.get(`https://kuramanime.red/anime?order_by=latest&search=${text}&page=1`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);
    const animeList = [];

    // Loop melalui setiap elemen anime dalam daftar
    $('#animeList .col-lg-4.col-md-6.col-sm-6').each((index, element) => {
      const anime = {};

      // Mengambil URL detail anime
      anime.detailUrl = $(element).find('.product__item a').attr('href');

      // Mengambil URL gambar
      anime.imageUrl = $(element).find('.product__item__pic').attr('data-setbg');

      // Mengambil skor anime
      anime.score = $(element).find('.ep span').text().trim();

      // Mengambil jumlah komentar
      anime.comments = $(element).find('.view-end .fa-comments').next().text().trim();

      // Mengambil jumlah views
      anime.views = $(element).find('.view-end .fa-eye').next().text().trim();

      // Mengambil tipe anime
      anime.type = $(element).find('.product__item__text ul a:first-child li').text().trim();

      // Mengambil kualitas anime
      anime.quality = $(element).find('.product__item__text ul a:last-child li').text().trim();

      // Mengambil judul anime
      anime.title = $(element).find('.product__item__text h5 a').text().trim();

      animeList.push(anime);
    });

    return animeList;
  } catch (error) {
    console.error('Error fetching the page: ', error);
    return error;
  }
}


async function download(url) {
  try {
    let param = await getparam(url)
    let token = await (await fetch(await Proxy(`https://kuramanime.dad/assets/${param.c}`))).text()

    const { data } = await axios.get(await Proxy(url + `?${param.a}=${token}&${param.b}=kuramadrive&page=1`));
    const $ = cheerio.load(data);

    const downloadLinks = [];

    // Mengambil setiap elemen <h6> yang berisi kualitas dan ukuran file
    $('#animeDownloadLink h6').each((i, element) => {
      const quality = $(element).text().trim(); // Mengambil teks dari <h6>
      const links = $(element).next('hr').nextAll('a'); // Mengambil semua <a> setelah <h6> sampai menemukan <hr>

      links.each((j, linkElement) => {
        const linkText = $(linkElement).text().trim();
        const link = $(linkElement).attr('href');

        downloadLinks.push({
          quality,
          linkText,
          link,
        });
      });
    });

    if (downloadLinks.length > 0) {
      console.log(downloadLinks);
    } else {
      console.log('No download links found.');
    }

    return downloadLinks;
  } catch (error) {
    console.error('Error fetching download links:', error);
  }
}

async function getVideo(link) {
  try {
    let barier = await barrier()
    const ht = await (await fetch(link)).text()
    const $ = cheerio.load(ht);

    // Mengambil nilai dari atribut data-domain
    const dataDomain = $('button').attr('data-domain');
    const id = await link.split('/')[4]
    const response = await axios.post(
      `https://kuramadrive.com/api/v1/drive/file/${id}/check`,
      new URLSearchParams({
        domain: dataDomain,
        token: ''
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Authorization': `Bearer ${barier}`,
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
          'Referer': link
        },
        maxRedirects: 0, // equivalent to `--compressed` in curl
      }
    );
    return response.data
  } catch (error) {
    return error
  }
}

async function barrier() {
  const bepas = await Proxy('https://kuramadrive.com/api/v1/var/js/master.js')
  const response = await fetch(bepas);
  const scriptText = await response.text();


  const tokenMatch = scriptText.match(/globalBearerToken:\s*'([^']+)'/);

  if (tokenMatch) {
    return tokenMatch[1]; // Mengembalikan token
  } else {
    throw new Error('Token not found');
  }
};

async function getparam(link) {
  try {
    const anu = await axios.get(link)
    const $ = await cheerio.load(anu.data)
    const dataKps = $('.col-lg-12.mt-3').attr('data-kps');
    const response = await axios.get(await Proxy(`https://kuramanime.dad/assets/js/${dataKps}.js`));
    const jsContent = response.data;
    const data = extractEnvVariables(jsContent);

    return {
      a: data.MIX_PAGE_TOKEN_KEY,
      b: data.MIX_STREAM_SERVER_KEY,
      c: data.MIX_AUTH_ROUTE_PARAM
    };
  } catch (error) {
    console.error('Error fetching the JavaScript file:', error);
    return null;
  }
}

function extractEnvVariables(jsContent) {
  const regex = /window\.process\s*=\s*{[^}]+env\s*:\s*{([^}]+)}/;
  const match = jsContent.match(regex);

  if (match && match[1]) {
    const envContent = match[1];
    const envVariables = {};

    envContent.split(',').forEach(pair => {
      const [key, value] = pair.split(':').map(str => str.trim().replace(/['"]/g, ''));
      envVariables[key] = value;
    });

    console.log('Extracted env variables:', envVariables);
    return envVariables;
  } else {
    console.log('No environment variables found');
    return {};
  }
}

async function Proxy(url) {
  const apalah = `https://translate.google.com/translate?sl=en&tl=fr&hl=en&u=${encodeURIComponent(url)}&client=webapp`
  return apalah
}


export { search, latest, detail, download, getVideo }