import axios from 'axios'
import cheerio from 'cheerio'

async function list() {
    try {
        const response = await axios.get('https://bluearchive.fandom.com/wiki/Category:Characters');
        const $ = cheerio.load(response.data);

        const data = [];

        $('div[style*="position: relative; display: inline-block;"]').each((index, element) => {
            const name = $(element).find('div[style*="position: absolute;"]').text().trim();
            const link = $(element).find('a').attr('href');
            const imgSrc = $(element).find('img').attr('src');
            const title = $(element).find('a').attr('title');
            const altText = $(element).find('img').attr('alt');

            data.push({
                name,
                link,
                imgSrc,
                title,
                altText
            });
        });

        return data
    } catch (error) {
        return error
    }
}

async function detail(url) {
    try {
        const response = await axios.get('https://bluearchive.fandom.com' + url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(response.data);

        // Ambil judul karakter
        const characterTitle = $('h2.pi-title').text();

        // Ambil data gambar berdasarkan tab
        const icons = [];
        $('div.pi-image-collection[data-source="image"] .wds-tab__content img').each((i, el) => {
            icons.push({ type: 'Icon', alt: $(el).attr('alt'), url: $(el).attr('src') });
        });

        const portraits = [];
        $('div.pi-image-collection[data-source="image2"] .wds-tab__content img').each((i, el) => {
            portraits.push({ type: 'Portrait', alt: $(el).attr('alt'), url: $(el).attr('src') });
        });

        // Ambil data stats berdasarkan tab
        const stats = [];
        $('section.pi-item.pi-panel.pi-border-color.wds-tabber .wds-tab__content').each((i, el) => {
            const statGroup = {};
            $(el).find('table.pi-horizontal-group').each((j, table) => {
                const level = $(table).find('caption.pi-header').text().trim();
                const statData = {};

                $(table).find('tbody tr').each((k, row) => {
                    $(row).find('td').each((l, cell) => {
                        const label = $(cell).attr('data-source');
                        const value = $(cell).text().trim();
                        if (label) {
                            statData[label] = value;
                        }
                    });
                });

                statGroup[level] = statData;
            });

            stats.push(statGroup);
        });

        // Ekstrak informasi dari tabel lainnya
        const additionalInfo = {};
        $('.pi-horizontal-group').each((index, table) => {
            const tableData = {};
            $(table).find('th').each((i, th) => {
                tableData[$(th).text()] = $(th).next('td').text();
            });
            additionalInfo[`table${index + 1}`] = tableData;
        });

        // Ekstrak informasi skill
        const biodata = {};
        $('.pi-item.pi-data').each((index, skillInfo) => {
            const skillName = $(skillInfo).find('.pi-data-label').text();
            const skillDescription = $(skillInfo).find('.pi-data-value').text();
            biodata[skillName] = skillDescription;
        });

        // Ekstrak informasi tambahan
        const extraInfo = {};
        $('.pi-item.pi-group').each((index, group) => {
            const groupName = $(group).find('.pi-data-label').text();
            const groupValue = $(group).find('.pi-data-value').text();

            // Handle multiple values separated by commas
            if (groupValue.includes(',')) {
                extraInfo[groupName] = groupValue.split(',').map(item => item.trim());
            } else {
                extraInfo[groupName] = groupValue;
            }
        });

        // Ekstrak trivia
        const triviaList = [];
        $('.pi-item.pi-data.pi-item-spacing.pi-border-color').each((index, triviaItem) => {
            triviaList.push($(triviaItem).text().trim());
        });
        const skills = [];
        $('.tabber').each((i, tabber) => {
            const skillType = $(tabber).find('.wds-tabs__tab-label').first().text().trim();
            const skillDetails = $(tabber).find('.wds-tab__content').first().find('td').last().text().trim();
            skills.push({ type: skillType, details: skillDetails });
        });

        return {
            title: characterTitle,
            audio: url + '/Audio',
            icons: icons,
            portraits: portraits,
            stats: stats,
            //additionalInfo: additionalInfo,
            skills: skills,
            biodata: biodata,
            //extraInfo: extraInfo,
            //trivia: triviaList
        };
    } catch (error) {
        console.error('Error scraping data:', error);
        return null;
    }
}

async function audio(url) {
    try {
        const response = await axios.get('https://bluearchive.fandom.com' + url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        const $ = cheerio.load(response.data);
        let audioData = [];

        $('table').each((index, element) => {
            let title = $(element).find('td[colspan="2"] b').text().trim();
            let audioLink = $(element).find('audio').attr('src');
            let jpTitle = $(element).find('td:contains("[JP]")').next().text().trim();
            let engTitle = $(element).find('td:contains("[ENG]")').next().text().trim();

            audioData.push({
                title: title,
                audioLink: audioLink,
                jpTitle: jpTitle,
                engTitle: engTitle
            });
        });

        return audioData;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export {
  list,
  detail,
  audio
}