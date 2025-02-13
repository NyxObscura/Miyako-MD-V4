/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

// File://home/rose/BOT/SuryaRB/Message/Features/gfp_superres.js
import Uploader from "../lib/uploadImage.js";
import axios from "axios";

const handler = async(m, { conn, args}) => {
		const q = m.quoted ? m.quoted : m;
		const mime = q.mtype || "";
		if (!/image/g.test(mime)) {
			return m.reply("Please reply/send an image with the command");
		}
		const outscale = args[0] || 5; // default is 5 (if u without using value), usage: gfpsuper <value>
		const media = await q.download();
		//const buffer = Buffer.isBuffer(media) ? media : Buffer.from(media, "utf-8");
		const url = await Uploader(media);
		
		try {
			const response = await axios.post('https://api.itsrose.rest/image/gfp_superres', {
				init_image: url,
				outscale,
			}, {
				headers: {
					'accept': 'application/json',
					'Authorization': APIKeys[APIs["rose"]],
					'Content-Type': 'application/json'
				}
			});

			const { status, message, result } = response.data;

			if (!status) {
				return m.reply(message);
			}

			await conn.sendMessage(
				m.chat,
				{ image: { url: result.images } },
				{ quoted: m }
			);
		} catch (error) {
			return m.reply(`Failed to execute the command: ${error.message}`);
		}
	}
	handler.command = ['gfpsuper']
	handler.tags = ['tools']
	handler.help = ['gfpsuper']
	handler.limit = true
	export default handler;