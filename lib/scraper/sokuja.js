import cheerio from 'cheerio';
import fetch from 'node-fetch';

class Sokuja {
  constructor() {
    this.baseUrl = 'https://x1.sokuja.uk';
  }

  async latest() {
    try {
      const response = await fetch(`${this.baseUrl}/anime/?status=&type=&order=update`);
      if (!response.ok) {
        throw new Error('Failed to fetch the page');
      }

      const data = await response.text();
      const $ = cheerio.load(data);

      const latestAnime = [];
      $('.listupd .bs').each((index, element) => {
        const title = $(element).find('.tt h2').text().trim();
        const link = $(element).find('a').attr('href');
        const image = $(element).find('img').attr('src');
        const status = $(element).find('.status').text().trim() || 'Unknown';

        latestAnime.push({ title, link, image, status });
      });

      if (latestAnime.length === 0) {
        throw new Error('No anime found on the page');
      }

      return latestAnime;
    } catch (error) {
      throw new Error(`Error scraping the page: ${error.message}`);
    }
  }

  async search(query) {
    try {
      const url = `${this.baseUrl}/?s=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.text();
      const $ = cheerio.load(data);

      const searchResults = [];
      $('.listupd .bs').each((index, element) => {
        const title = $(element).find('.tt h2').text().trim();
        const link = $(element).find('a').attr('href');
        const image = $(element).find('img').attr('src');
        const status = $(element).find('.status').text().trim() || 'Unknown';
        const type = $(element).find('.typez').text().trim() || 'Unknown';

        searchResults.push({ title, link, image, status, type });
      });

      if (searchResults.length === 0) {
        throw new Error('No results found for the search query');
      }

      return searchResults;
    } catch (error) {
      throw new Error(`Error searching for anime: ${error.message}`);
    }
  }

  async detail(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch the page');
      }

      const data = await response.text();
      const $ = cheerio.load(data);

      const breadcrumb = [];
      $('div.ts-breadcrumb .bixbox ol li').each((i, el) => {
        breadcrumb.push({
          name: $(el).find('span[itemprop="name"]').text(),
          link: $(el).find('a[itemprop="item"]').attr('href'),
        });
      });

      const animeTitle = $('h1.entry-title').text();
      const rating = $('div.rating strong').text().trim();
      const releaseDate = $('span.split time').text();
      const synopsis = $('div.entry-content').text().trim();

      const galleryImages = [];
      $('#gallery .owl-item a').each((i, el) => {
        galleryImages.push($(el).attr('href'));
      });

      const ninfo = {
        description: $('div.ninfo .mindesc').text().trim(),
        alternativeTitles: $('div.ninfo .alter').text().trim(),
        status: $('div.ninfo .spe span:contains("Status:")').text().replace('Status:', '').trim(),
        studio: $('div.ninfo .spe span:contains("Studio:") a').text().trim(),
        releaseDateAlt: $('div.ninfo .spe span:contains("Tanggal Rilis:")').text().replace('Tanggal Rilis:', '').trim(),
        season: $('div.ninfo .spe span:contains("Season:") a').text().trim(),
        type: $('div.ninfo .spe span:contains("Tipe:")').text().replace('Tipe:', '').trim(),
        totalEpisodes: $('div.ninfo .spe span:contains("Total Episode:")').text().replace('Total Episode:', '').trim(),
        director: $('div.ninfo .spe span:contains("Director:") a').text().trim(),
        cast: $('div.ninfo .spe span:contains("Casts:") a').map((i, el) => $(el).text()).get(),
        postedBy: $('div.ninfo .spe .author i.fn').text().trim(),
        postedDate: $('div.ninfo .spe time').first().text().trim(),
        updatedDate: $('div.ninfo .spe time').last().text().trim(),
        genres: $('div.ninfo .genxed a').map((i, el) => $(el).text()).get(),
        additionalDescription: $('div.ninfo .desc').text().trim(),
      };

      const episodes = [];
      $('div.eplister ul li').each((i, el) => {
        const episode = {
          number: $(el).find('.epl-num').text().trim(),
          title: $(el).find('.epl-title').text().trim(),
          date: $(el).find('.epl-date').text().trim(),
          link: $(el).find('a').attr('href'),
        };
        episodes.push(episode);
      });

      const thumbnail = $('div.thumbook .thumb img').attr('src');

      return {
        animeTitle,
        thumbnail,
        rating,
        releaseDate,
        synopsis,
        galleryImages,
        ninfo,
        episodes,
      };
    } catch (error) {
      throw new Error(`Error scraping the anime details: ${error.message}`);
    }
  }

  async episode(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch page');
      }

      const body = await response.text();
      const $ = cheerio.load(body);
      const data = [];

      $('.soraurlx').each((index, element) => {
        const quality = $(element).find('strong').text();
        const mirrors = [];

        $(element).find('a').each((i, link) => {
          mirrors.push({
            text: $(link).text(),
            url: $(link).attr('href')
          });
        });

        data.push({
          quality: quality,
          mirrors: mirrors
        });
      });

      return data;
    } catch (error) {
      throw new Error(`Error scraping data: ${error.message}`);
    }
  }

  async download(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch page');
      }

      const body = await response.text();
      const $ = cheerio.load(body);

      const encodedLink = $('script').html().match(/link":"([^"]+)"/);

      if (encodedLink) {
        const decodedLink = atob(encodedLink[1]);
        return decodedLink;
      } else {
        throw new Error('Failed to find the encoded link');
      }
    } catch (error) {
      throw new Error(`Error scraping data: ${error.message}`);
    }
  }
}
export const anime = {
  sokuja: new Sokuja()
}