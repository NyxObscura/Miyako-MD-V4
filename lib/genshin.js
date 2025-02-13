import axios from "axios";
import cheerio from "cheerio";

async function info(query) {
  try {
    const url = `https://genshin.gg/characters/${query}/`; // Replace with your URL
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const character = {
      name: $(".character-name").text(),
      element: $(".character-element").attr("alt"),
      weapon: $(".character-path-icon").attr("alt"),
      role: $(".character-role").text(),
      portrait: $(".character-portrait").attr("src"),
      materials: [],
      bestWeapons: [],
      bestArtifacts: [],
      stats: {},
      teams: [],
      talents: [],
      passives: [],
      constellations: [],
    };

    // Get upgrade materials
    $(".character-materials-item").each((i, el) => {
      const material = {
        name: $(el).find(".character-materials-name").text(),
        icon: $(el).find(".character-materials-icon").attr("src"),
      };
      character.materials.push(material);
    });

    // Get best weapons
    $(".character-build-weapon").each((i, el) => {
      const weapon = {
        rank: $(el).find(".character-build-weapon-rank").text(),
        name: $(el).find(".character-build-weapon-name").text(),
        icon: $(el).find(".character-build-weapon-icon").attr("src"),
      };
      character.bestWeapons.push(weapon);
    });

    // Get best artifacts
    $(".character-build-section")
      .eq(1)
      .find(".character-build-weapon")
      .each((i, el) => {
        const artifact = {
          rank: $(el).find(".character-build-weapon-rank").text(),
          name: $(el).find(".character-build-weapon-name").text(),
          icon: $(el).find(".character-build-weapon-icon").attr("src"),
          count: $(el).find(".character-build-weapon-count").text(),
        };
        character.bestArtifacts.push(artifact);
      });

    // Get best stats
    $(".character-stats-item").each((i, el) => {
      const key = $(el)
        .html()
        .split(":")[0]
        .replace(/<\/?b>/g, "");
      const value = $(el).text().split(": ")[1];
      character.stats[key] = value;
    });

    // Get teams
    $(".character-team").each((i, el) => {
      const team = {
        name: $(el).find(".character-team-name").text(),
        characters: [],
      };
      $(el)
        .find(".character-portrait")
        .each((j, charEl) => {
          const character = {
            name: $(charEl).find("img").attr("alt"),
            icon: $(charEl).find("img").attr("src"),
            element: $(charEl).find(".character-type").attr("alt"),
          };
          team.characters.push(character);
        });
      character.teams.push(team);
    });

    // Get talents
    $("#talents .character-skill").each((i, el) => {
      const talent = {
        title: $(el).find(".character-skill-title").text(),
        name: $(el).find(".character-skill-name").text(),
        description: $(el).find(".character-skill-description").text(),
        icon: $(el).find(".character-skill-icon").attr("src"),
      };
      character.talents.push(talent);
    });

    // Get passives
    $("#passives .character-skill").each((i, el) => {
      const passive = {
        title: $(el).find(".character-skill-title").text(),
        name: $(el).find(".character-skill-name").text(),
        description: $(el).find(".character-skill-description").text(),
        icon: $(el).find(".character-skill-icon").attr("src"),
      };
      character.passives.push(passive);
    });

    // Get constellations
    $("#constellations .character-skill").each((i, el) => {
      const constellation = {
        title: $(el).find(".character-skill-title").text(),
        name: $(el).find(".character-skill-name").text(),
        description: $(el).find(".character-skill-description").text(),
        icon: $(el).find(".character-skill-icon").attr("src"),
      };
      character.constellations.push(constellation);
    });
    return {
      creator: global.wm,
      status: true,
      result: character,
    };
    console.log(character);
  } catch (error) {
    return {
      creator: global.wm,
      status: false,
      result: error.data,
    };
    console.error(error);
  }
}

async function character() {
  try {
    const { data } = await axios.get("https://genshin.gg/");
    const $ = cheerio.load(data);

    const characters = [];

    $(".character-portrait").each((index, element) => {
      const name = $(element).find(".character-name").text();
      const rarity = $(element)
        .find(".character-icon")
        .attr("class")
        .includes("rarity-5")
        ? 5
        : 4;
      const type = $(element).find(".character-type").attr("alt");
      const imageUrl = $(element).find(".character-icon").attr("src");

      characters.push({ name, rarity, type, imageUrl });
    });

    return {
      creator: global.wm,
      status: true,
      result: characters,
    };
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    return {
      creator: global.wm,
      status: false,
      result: error.data,
    };
  }
}

async function build() {
  try {
    // Fetch the HTML page
    const { data } = await axios.get("https://genshin.gg/builds/");
    const $ = cheerio.load(data);

    // Parse the character builds
    const builds = [];

    $(".builds-list-item").each((i, element) => {
      const characterName = $(element).find(".build-name").text().trim();
      const role = $(element).find(".build-role").text().trim();
      const weaponName = $(element)
        .find(".build-weapon-name")
        .first()
        .text()
        .trim();
      const artifactName = $(element)
        .find(".build-weapon-name")
        .last()
        .text()
        .trim();

      const stats = [];
      $(element)
        .find(".build-stats-item")
        .each((j, statElement) => {
          const stat = $(statElement).text().trim();
          stats.push(stat);
        });

      builds.push({ characterName, role, weaponName, artifactName, stats });
    });

    return {
      creator: global.wm,
      status: true,
      result: builds,
    };
  } catch (error) {
    return {
      creator: global.wm,
      status: false,
      result: error.data,
    };
    console.error("Error fetching the builds:", error);
  }
}

//team

async function team() {
  try {
    // URL halaman yang ingin di-scrape
    const url = "https://genshin.gg/teams/";

    // Memuat halaman HTML dengan Axios
    const { data } = await axios.get(url);

    // Memuat HTML ke Cheerio
    const $ = cheerio.load(data);

    // Objek untuk menyimpan data yang di-scrape
    const teams = [];

    // Menelusuri setiap tim
    $(".teams-item").each((index, element) => {
      const teamName = $(element).find(".team-name").text();
      const characters = [];

      // Menelusuri setiap karakter dalam tim
      $(element)
        .find(".character-portrait")
        .each((i, el) => {
          const characterName = $(el).find(".character-name").text();
          const characterIcon = $(el).find(".character-icon").attr("src");
          const characterType = $(el).find(".character-type").attr("alt");

          characters.push({
            name: characterName,
            icon: characterIcon,
            type: characterType,
          });
        });

      teams.push({ teamName, characters });
    });

    return {
      creator: global.wm,
      status: true,
      result: teams,
    };
    console.log(teams);
  } catch (error) {
    return {
      creator: global.wm,
      status: false,
      result: error.data,
    };
    console.error("Error:", error);
  }
}

//Tier
// Function to scrape the HTML content
async function tier() {
  try {
    // Fetch the HTML content
    const { data } = await axios.get("https://genshin.gg/tier-list/");

    // Load the HTML into Cheerio
    const $ = cheerio.load(data);

    // Extracting the title
    const title = $(".content-title").text().trim();

    // Extracting the version
    const version = $('.tierlist-disclaimer:contains("Version")')
      .text()
      .replace("Version ", "")
      .trim();

    // Extracting the character details
    const characters = [];
    $(".dropzone-row .tierlist-portrait.lg").each((index, element) => {
      const characterElement = $(element);
      const name = characterElement.find(".tierlist-name").text().trim();
      const role = characterElement.find(".tierlist-role").text().trim();
      const rarity = characterElement
        .find(".tierlist-icon")
        .attr("class")
        .includes("rarity-5")
        ? 5
        : 4;
      const elementt = characterElement
        .find(".tierlist-type")
        .attr("alt")
        .trim();
      const tier = characterElement.attr("tier").trim();

      characters.push({ name, role, rarity, elementt, tier });
    });

    return {
      creator: global.wm,
      status: true,
      result: title,
      version,
      characters,
    };
  } catch (error) {
    return {
      creator: global.wm,
      status: true,
      result: error.data,
    };
    console.error("Error scraping data:", error);
  }
}

export { info, character, build, tier, team };
