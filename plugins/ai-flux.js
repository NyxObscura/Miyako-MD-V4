/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
    if (!text) throw `*• Contoh :* ${usedPrefix + command} *[prompt]*`;
    let [teks, size] = text.split("--")
    m.reply(wait);
    if (size === "16:9") {
        let data = await flux({
            prompt: teks,
            width: 680,
            height: 360,
        });
        for (let i of data.data.images) {
            await conn.sendMessage(
                m.chat, {
                    image: {
                        url: i,
                    },
                    caption: `*• Prompt :* ${text}`,
                }, {
                    quoted: m,
                },
            );
        }
    } else if (size === "1:1") {
        let data = await flux({
            prompt: teks,
            width: 512,
            height: 512,
        });
        for (let i of data.data.images) {
            await conn.sendMessage(
                m.chat, {
                    image: {
                        url: i,
                    },
                    caption: `*• Prompt :* ${text}`,
                }, {
                    quoted: m,
                },
            );
        }
    } else {
        let data = await flux({
            prompt: teks,
        });
        for (let i of data.data.images) {
            await conn.sendMessage(
                m.chat, {
                    image: {
                        url: i,
                    },
                    caption: `*• Prompt :* ${text}`,
                }, {
                    quoted: m,
                },
            );
        }
    }
}
handler.help = handler.command = ['flux']
handler.tags = ['ai']
handler.premium = true;
export default handler

async function flux(options) {
    try {
        options = {
            prompt: options?.prompt,
            seed: options?.seed || Math.floor(Math.random() * 2147483647) + 1,
            random_seed: options?.random_seed ?? true,
            width: options?.width ?? 512,
            height: options?.height ?? 512,
            steps: options?.steps ?? 8,
        };
        if (!options.prompt)
            return {
                status: false,
                message: "undefined reading prompt!",
            };
        const session_hash = string(11);
        const joinResponse = await fetch(
            "https://black-forest-labs-flux-1-schnell.hf.space/queue/join", {
                method: "POST",
                headers: {
                    authority: "black-forest-labs-flux-1-schnell.hf.space",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: [
                        options.prompt,
                        options.seed,
                        options.random_seed,
                        options.width,
                        options.height,
                        options.steps,
                    ],
                    event_data: null,
                    fn_index: 2,
                    trigger_id: 5,
                    session_hash: session_hash,
                }),
            },
        );
        if (!joinResponse.ok) throw new Error("Failed to join queue");
        const dataResponse = await fetch(
            `https://black-forest-labs-flux-1-schnell.hf.space/queue/data?session_hash=${session_hash}`, {
                headers: {
                    authority: "black-forest-labs-flux-1-schnell.hf.space",
                },
            },
        );
        if (!dataResponse.ok) throw new Error("Failed to retrieve data");
        const rawData = await dataResponse.text();
        const lines = rawData.split("\n");
        const jsonObjects = [];
        lines.forEach((line) => {
            if (line.startsWith("data: ")) {
                try {
                    const jsonString = line.substring(6).trim();
                    const jsonObject = JSON.parse(jsonString);
                    jsonObjects.push(jsonObject);
                } catch (error) {
                    throw new Error("Failed to parse JSON");
                }
            }
        });
        const result = jsonObjects.find((d) => d.msg === "process_completed") || {};
        if (!result?.success)
            return {
                status: false,
                message: result,
            };
        const images = result.output.data
            .filter((d) => typeof d === "object")
            .map((d) => d.url);
        return {
            status: true,
            data: {
                images: images,
            },
        };

        function string(length) {
            const characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let result = "";
            for (let i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * characters.length),
                );
            }
            return result;
        }
    } catch (e) {
        return {
            status: false,
            message: e.message,
        };
    }
}