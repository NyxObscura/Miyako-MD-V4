import axios from 'axios'
import cheerio from 'cheerio'

async function search(q) {
    try {
        // Menambahkan User-Agent di header permintaan
        const { data } = await axios.get('https://www.jurnalnime.xyz/search?q=' + q, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
            }
        });
        const $ = cheerio.load(data);

        // Array untuk menyimpan hasil scraping dari banyak artikel/item
        const results = [];

        // Iterasi melalui setiap artikel/item yang ditemukan
        $('article.post-outer-container').each((i, el) => {
            const element = $(el);

            // Mengambil judul dan link-nya
            const titleElement = element.find('h3.post-title.entry-title a');
            const title = titleElement.text().trim();
            const titleLink = titleElement.attr('href');

            // Mengambil URL gambar
            const imageUrl = element.find('div.thumbnail img').attr('src');

            // Mengambil episode dan rating
            const episode = element.find('span.epsid i').text().trim();
            const rating = element.find('span.rate-archive').text().trim();

            // Mengambil nama poster dan tanggal rilis
            const postedBy = element.find('li.post-by span').next().text().trim();
            const releaseDate = element.find('li.post-date time').attr('datetime');

            // Mengambil seri, label lainnya, dan link-nya
            const seriesLabels = [];
            element.find('li.post-series a').each((j, lbl) => {
                seriesLabels.push({
                    label: $(lbl).text().trim(),
                    link: $(lbl).attr('href')
                });
            });

            // Menambahkan data artikel/item ke dalam array results
            results.push({
                title,
                titleLink,
                imageUrl,
                episode,
                rating,
                postedBy,
                releaseDate,
                seriesLabels
            });
        });

        // Mengembalikan hasil scraping sebagai array dari objek
        return results;
    } catch (error) {
        console.error('Error scraping data:', error);
        return [];
    }
}


async function detail(url) {
  try {
    // Define the User-Agent
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    
    // Request HTML data from the URL with User-Agent
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': userAgent
      }
    });
    
    // Load the HTML into Cheerio
    const $ = cheerio.load(data);
    
    // Extracting data from JSON-LD script tags
    const jsonData = [];
    $('script[type="application/ld+json"]').each((i, el) => {
      const json = JSON.parse($(el).html().trim());
      jsonData.push(json);
    });
    
    // Extracting the thumbnail image URL
    const thumbnailUrl = $('.separator img').attr('src');
    
    // Extracting the synopsis
    const synopsis = $('.sinoposis').text().trim();
    
    // Extracting download links
    const downloads = [];
    $('.dl-box2 li:not(.head)').each((i, el) => {
      const server = $(el).find('.s span').text().trim();
      const quality = $(el).find('.q').text().trim();
      const downloadLink = $(el).find('.b a').attr('href');
      downloads.push({ server, quality, downloadLink });
    });
    
    // Extracting episode list
    const episodes = [];
    $('#episodeNime .myUL li').each((i, el) => {
      const episodeTitle = $(el).find('.chapternum').text().trim();
      const episodeDate = $(el).find('.chapterdate').text().trim();
      const episodeLink = $(el).find('.eph-num a').attr('href');
      episodes.push({ episodeTitle, episodeDate, episodeLink });
    });

    // Outputting the scraped data
    return {
      jsonData,
      thumbnailUrl,
      synopsis,
      downloads,
      episodes
    };
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}

export { search, detail }