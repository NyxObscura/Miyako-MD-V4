import fetch from 'node-fetch'


async function postToTikWM(endpoint, data) {
  const url = `https://tikwm.com/api/${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'Referer': 'https://tikwm.com/'
    },
    body: new URLSearchParams(data).toString()
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Function untuk download video TikTok
async function download(url) {
  const data = {
    url: url,
    count: 12,
    cursor: 0,
    web: 1,
    hd: 2
  };

  try {
    const result = await postToTikWM('', data);
    console.log('Download Result:', result);
    return result;
  } catch (error) {
    console.error('Error in download:', error);
  }
}

// Function untuk melakukan search berdasarkan keyword
async function search(keywords) {
  const searchData = {
    keywords: keywords,
    count: 12,
    cursor: 0,
    web: 1,
    hd: 1
  };

  try {
    const result = await postToTikWM('feed/search', searchData);
    console.log('Search Result:', result);
    return result;
  } catch (error) {
    console.error('Error in search:', error);
  }
}

// Function untuk mendapatkan video trending berdasarkan region
async function trending(region = 'id') {
  const trendingData = {
    region: region,
    count: 12,
    cursor: 0,
    web: 1,
    hd: 1
  };

  try {
    const result = await postToTikWM('feed/list', trendingData);
    console.log('Trending Videos:', result);
    return result;
  } catch (error) {
    console.error('Error fetching trending videos:', error);
  }
}

export { download, search, trending }