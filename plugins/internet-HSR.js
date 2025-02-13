/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*
*[Plugins Char hsr]* (ESM)
By Fruatre
wa.me/6285817597752
Saluran : https://whatsapp.com/channel/0029VaNR2B6BadmioY6mar3N
*/

import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, args }) => {
  const query = args[0];
  if (!query) return conn.reply(m.chat, "Masukkan nama karakter! Contoh: .hsrsearch Seele", m);

  try {
    const hsr = new HSR();
    const characterData = await hsr.getCharacterDetails(query);
    const formattedResult = hsr.formatResult(characterData);
    conn.reply(m.chat, formattedResult, m);
  } catch (err) {
    conn.reply(m.chat, "Karakter tidak ditemukan atau terjadi kesalahan! Pastikan nama karakter benar.", m);
  }
};

handler.help = ['charhsr <nama karakter>'];
handler.tags = ['internet'];
handler.command = /^charhsr$/i;

export default handler;

class HSR {
  async getCharacterDetails(query) {
    const url = `https://genshin.gg/star-rail/characters/${encodeURIComponent(query)}/`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const result = {
      name: $(".character-info-name").text().trim(),
      element: $(".character-info-element").attr("alt"),
      path: $(".character-info-path-icon").attr("alt"),
      stats: {},
      relics: [],
      ornaments: [],
      lightCones: [],
      upgradeMaterials: [],
      skills: [],
      eidolons: [],
    };

    // Statistik karakter
    $(".character-info-stat").each((_, el) => {
      const statName = $(el).find(".character-info-stat-name").text().trim();
      const statValue = $(el).find(".character-info-stat-value").text().trim();
      result.stats[statName] = statValue;
    });

    // Material upgrade
    $(".character-info-materials-item").each((_, el) => {
      result.upgradeMaterials.push({
        name: $(el).find(".character-info-materials-name").text().trim(),
        image: $(el).find(".character-info-materials-icon").attr("src"),
      });
    });

    // Relics (gear)
    $(".character-info-gear .character-info-weapon").each((_, el) => {
      let rank = $(el).find(".character-info-weapon-rank").text().trim();
      let items = [];
      $(el).find(".character-info-weapon-content").each((_, item) => {
        items.push({
          name: $(item).find(".character-info-weapon-name").text().trim(),
          image: $(item).find("img").attr("src"),
          count: $(item).find(".character-info-weapon-count").text().trim(),
        });
      });
      result.relics.push({ rank, items });
    });

    // Ornaments
    $(".character-info-gear .character-info-weapon").each((_, el) => {
      let rank = $(el).find(".character-info-weapon-rank").text().trim();
      let item = $(el).find(".character-info-weapon-content");
      result.ornaments.push({
        rank,
        name: item.find(".character-info-weapon-name").text().trim(),
        image: item.find("img").attr("src"),
      });
    });

    // Light Cones
    $(".character-info-gear .character-info-weapon-content").each((_, el) => {
      result.lightCones.push({
        name: $(el).find(".character-info-weapon-name").text().trim(),
        image: $(el).find("img").attr("src"),
      });
    });

    // Skills
    $(".character-info-skills .character-info-skill").each((_, element) => {
      const title = $(element).find('.character-info-skill-title').text().trim();
      const description = $(element).find('.character-info-skill-description').text().trim();
      result.skills.push({ title, description });
    });

    // Eidolons
    $(".character-info-skills .character-info-skill").each((_, element) => {
      const title = $(element).find('.character-info-skill-title').text().trim();
      const description = $(element).find('.character-info-skill-description').text().trim();
      result.eidolons.push({ title, description });
    });

    return result;
  }

  formatResult(data) {
    return `
💫 **Karakter: ${data.name}**  
🌟 **Elemen:** ${data.element}  
🛤️ **Path:** ${data.path}

📊 **Stats:**
${Object.entries(data.stats).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

🛡️ **Relics:**
${data.relics.map((relic) => `★ ${relic.rank}\n${relic.items.map(item => `- ${item.name} (${item.count})`).join('\n')}`).join('\n\n')}

✨ **Ornaments:**
${data.ornaments.map((ornament) => `★ ${ornament.rank}: ${ornament.name}`).join('\n')}

📜 **Light Cones:**
${data.lightCones.map((cone) => `- ${cone.name}`).join('\n')}

⚔️ **Skills:**
${data.skills.map((skill) => `- ${skill.title}: ${skill.description}`).join('\n')}

🌀 **Eidolons:**
${data.eidolons.map((eidolon) => `- ${eidolon.title}: ${eidolon.description}`).join('\n')}
    `.trim();
  }
}