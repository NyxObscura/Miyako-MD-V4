/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

// File://home/rose/BOT/SuryaRB/Message/Features/gfpgan.js
import Uploader from "../lib/uploadImage.js";
import axios from 'axios';

const handler = async(m, { conn }) => {
		const q = m.quoted ? m.quoted : m;
		const mime = q.mtype || "";
		if (!/image/g.test(mime)) {
			return m.reply("Please reply/send an image with the command");
		}
		await m.reply(wait)
		const media = await q.download();
		//const buffer = Buffer.isBuffer(media) ? media : Buffer.from(media, "utf-8");
		const url = await Uploader(media);
		
		try {
			const { data } = await axios.post('https://api.itsrose.rest/image/gfpgan', {
				init_image: url,
				enhance_bg: true,
				enhance_faces: true,
				fix_scratches: false
			}, {
				headers: {
					'accept': 'application/json',
					'Authorization': APIKeys[APIs["rose"]],
					'Content-Type': 'application/json'
				}
			});

			const { status, message, result } = data;

			if (!status) {
				return m.reply(message);
			}

			await conn.sendMessage(
				m.chat,
				{ image: { url: result.images } },
				{ quoted: m }
			);
		} catch (error) {
			m.reply(`Failed to enhance the image: ${error.message}`);
		}
	}
	handler.command = ["gfpgan", "gfp"]
	handler.tags = ["tools"]
	handler.help = ["gfpgan", "gfp"]
	handler.limit = true
	export default handler;