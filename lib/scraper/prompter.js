 /*
  Ini weem
https://whatsapp.com/channel/0029VaezPea1t90dvAkhNg3k
*/

import axios from 'axios'

export default async function imgToPrompt(link) {
    try {
        let {
            data: image
        } = await axios.get('https://cococlip.ai/api/v1/imagetoprompt/imageclip?image=' + link, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
                'Referer': 'https://cococlip.ai/features/image-to-prompt'
            }
        });

        let id = image.id;
        let retry = 0;
        const maxRetries = 10;

        async function queue(id) {
            let {
                data: response
            } = await axios.get('https://cococlip.ai/api/v1/checkqueue?promptId=' + id, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
                    'Referer': 'https://cococlip.ai/features/image-to-prompt'
                }
            }).catch(e => e.response);
            return response.nums
        }

        while (retry < maxRetries) {
            let num = await queue(id);
            if (num > 1) {
                retry++;
                await new Promise(resolve => setTimeout(resolve, 2000)); // Tambahkan jeda waktu sebelum mencoba lagi
            } else {
                let {
                    data: res
                } = await axios.get('https://cococlip.ai/api/v1/imagetoprompt/imageclippoll?promptId=' + id, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
                        'Referer': 'https://cococlip.ai/features/image-to-prompt'
                    }
                }).catch(e => e.response);
                if (!res.prompt) continue
                return res
            }
        }
    } catch (error) {
        throw "Error fetching prompt:" + error.message
        return null;
    }
}