import axios from 'axios'

async function getRandomIP() {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
  }

async function animagine(
    prompt,
    model = '(None)',
    negative = '(deformed, distorted, disfigured:1.3), poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, (mutated hands and fingers:1.4), disconnected limbs, mutation, mutated, ugly, disgusting, blurry, amputation, (NSFW:1.25)',
  ) {
    const baseurl =
      'https://akimitsujiro-stable-diffusion-xl.hf.space/queue/join?';
    const base2url =
      'https://akimitsujiro-stable-diffusion-xl.hf.space/queue/data?session_hash=';
    const headers = {
      'x-forwarded-for': await getRandomIP(),
      'user-agent':
        'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
    };

    const session_hash = createHash(10);
    try {
      await axios.post(baseurl, {
        data: [
          prompt,
          negative,
          Math.floor(Math.random() * 2147483647),
          1024,
          1024,
          7,
          28,
          'Euler a',
          '896 x 1152',
          model,
          'Standard v3.1',
          true,
          0.55,
          1.5,
          true,
        ],
        event_data: null,
        fn_index: 4,
        trigger_id: 48,
        session_hash,
      });

      const generation = await new Promise((resolve, reject) => {
        axios
          .get(base2url + session_hash, {
            headers: {
              'Cache-Control': 'no-cache',
              'Content-Type': 'text/event-stream',
              'Connection': 'keep-alive',
              ...headers,
            },
            responseType: 'stream',
          })
          .then((response) => {
            response.data.on('data', async (data) => {
              const son = JSON.parse(data.toString().split('data:')[1].trim());
              const msg = son.msg;
              if (msg) {
                switch (msg) {
                  case 'estimation':
                    console.log(`Rank: ${son.rank}`);
                    break;
                  case 'process_completed':
                    !son.success && console.log(son);
                    let res = son?.output?.data?.[0]?.[0]?.image?.url;
                    if (!res) reject({ status: false });
                    resolve({
metadata: son?.output?.data?.[1],
url: res
});
                    break;
                }
              }
            });
          })
          .catch((error) => reject(error));
      });

      return generation;
    } catch (error) {
      console.error('Error in animediff:', error);
      throw error;
    }
  };
function createHash(length) {
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var text = '';
  var hashLength = length ? length : 6;

  for (var i = 0; i < hashLength; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return text;
}

export default animagine;