import cheerio from "cheerio"
import axios from "axios"

async function latest() {
    try {
        // Ganti URL dengan URL halaman yang ingin Anda scraping
        const response = await axios.get('https://zerokaito.blogspot.com/');
        const html = response.data;
        const $ = cheerio.load(html);
        
        const articles = [];
        
        $('.blog-post').each((index, element) => {
            const title = $(element).find('.entry-title-link').text().trim();
            const link = $(element).find('.entry-title-link').attr('href');
            const date = $(element).find('time.published').text().trim();
            const tag = $(element).find('.entry-tag').first().text().trim();
            const image = $(element).find('.entry-thumb').data('image');
            
            articles.push({
                title,
                link,
                date,
                tag,
                image
            });
        });

        return articles
    } catch (error) {
        return error
        console.error('Error:', error);
    }
}