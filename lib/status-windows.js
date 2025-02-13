import { createCanvas, loadImage } from 'canvas'

const roles = [
    "Knight", "Mage", "Rogue", "Archer", "Paladin", "Blacksmith", "Healer", "Assassin", "Saint", "Tamer",
    "Necromancer", "Unknown", "Death Knight", "Farmer", "Demon King", "Swordman", "Magic Swordman",
    "Martial Artist", "Trader", "Archmage", "Slave", "Chef"
];

const races = [
    "Human", "Elf", "Dwarf", "Orc", "Beast", "Dark Elf", "Dragon", "Half Dragon", "Half Elf", "Demon",
    "Werewolf", "Succubus", "Divine Being", "Feline", "Frogman", "Lizardman", "Slime", "Jawir",
    "Sarkaz", "Liberi", "Sankta", "Deer", "Fishman", "Unknown"
];

const roleSkills = {
    "Knight": ["Sword Mastery", "Shield Mastery", "Mounted Combat", "War Cry", "Heavy Armor", "Tactical Strategy", "Battle Charge", "Shield Bash", "Combat Reflexes", "Defensive Stance", "Sword Block", "Battlefield Awareness", "Parry", "Shield Slam", "Armor Reinforcement", "Toughness", "Sword Precision", "Holy Vow", "Defender's Resolve", "Battle Endurance"],
    "Mage": ["Fire Magic", "Water Magic", "Earth Magic", "Wind Magic", "Lightning Magic", "Arcane Magic", "Teleportation", "Time Manipulation", "Illusion", "Energy Bolt", "Mana Control", "Dark Magic", "Summon Elementals", "Meteor Shower", "Magic Shield", "Mana Drain", "Arcane Blast", "Magic Ward", "Mana Burst", "Elemental Mastery"],
    "Rogue": ["Stealth", "Sneak Attack", "Lockpicking", "Pickpocketing", "Backstab", "Evasion", "Poison Crafting", "Agility Boost", "Silent Step", "Ambush", "Trap Detection", "Shadow Step", "Dagger Mastery", "Dual Wielding", "Smoke Bomb", "Shadow Meld", "Thievery", "Quick Escape", "Decoy", "Cloak of Shadows"],
    "Archer": ["Archery", "Tracking", "Trap Setting", "Camouflage", "Eagle Eye", "Quick Shot", "Bow Mastery", "Arrow Crafting", "Precision Shot", "Wind Guidance", "Critical Strike", "Multi Shot", "Long Range Mastery", "Animal Companion", "Piercing Arrow", "Explosive Arrow", "Double Shot", "Sniper Focus", "Hawk Eye", "Rapid Fire"],
    "Paladin": ["Holy Strike", "Divine Protection", "Healing", "Sword Mastery", "Shield of Faith", "Blessing of Light", "Aura of Courage", "Smite Evil", "Guardian's Shield", "Divine Resilience", "Holy Aura", "Purification", "Divine Judgement", "Divine Shield", "Light's Wrath", "Sacred Sword", "Healing Light", "Holy Hammer", "Divine Crusade", "Faith Barrier"],
    "Blacksmith": ["Blacksmithing", "Crafting", "Metal Manipulation", "Weapon Forging", "Armor Crafting", "Enchanting", "Repairing", "Mining", "Material Refinement", "Tool Crafting", "Metalworking", "Rune Engraving", "Weapon Enhancement", "Resource Management", "Hammer Strike", "Metal Shaping", "Smith's Endurance", "Ore Detection", "Forge Mastery", "Anvil Strike"],
    "Healer": ["Healing", "Potion Brewing", "Herbalism", "Light Magic", "First Aid", "Divine Touch", "Cure Disease", "Revitalize", "Holy Ward", "Life Restoration", "Group Healing", "Resurrection", "Mana Regeneration", "Protective Aura", "Restoration Surge", "Healing Circle", "Cleanse", "Renewal", "Sanctified Healing", "Restorative Light"],
    "Assassin": ["Stealth", "Poison Crafting", "Sneak Attack", "Dagger Mastery", "Critical Strike", "Dual Wielding", "Silent Step", "Shadow Meld", "Smoke Bomb", "Assassination", "Death Strike", "Vanish", "Shadow Clone", "Nerve Strike", "Ambush", "Silent Kill", "Toxin Expert", "Blinding Powder", "Heart Strike", "Deadly Precision"],
    "Saint": ["Blessing Magic", "Divine Protection", "Healing", "Charisma", "Inspiration", "Holy Flame", "Sanctuary", "Holy Light", "Miracle", "Divine Aura", "Sacred Shield", "Purify", "Light of Hope", "Holy Wrath", "Blessed Words", "Divine Intervention", "Blessing of Strength", "Holy Song", "Sacred Prayer", "Eternal Light"],
    "Tamer": ["Animal Training", "Beast Communication", "Taming Magic", "Summon Beast", "Beast Mastery", "Animal Bond", "Feral Rage", "Beast Riding", "Track Animals", "Command Beast", "Wild Frenzy", "Animal Empathy", "Beast Whisperer", "Tame Elemental", "Summon Spirit Beast", "Feral Protection", "Nature's Call", "Primal Roar", "Savage Charge", "Pack Leader"],
    "Necromancer": ["Necromancy", "Curse Magic", "Soul Magic", "Bone Magic", "Dark Ritual", "Raise Dead", "Undead Mastery", "Corpse Explosion", "Soul Drain", "Lich Transformation", "Plague Magic", "Life Drain", "Dark Pact", "Death's Embrace", "Graveborn", "Soul Reaver", "Spirit Shackles", "Shadow of Death", "Soul Harvest", "Deathly Aura"],
    "Unknown": ["Unknown Skill", "Mystery", "Hidden Talent", "Adaptability", "Survival Instinct", "Random Burst", "Eternal Enigma", "Shifting Powers", "Unpredictable Talent", "Foresight", "Chaos Manipulation", "Arcane Puzzle", "Reality Bending", "Anomalous Strength", "Unstable Magic", "Flicker Strike", "Quantum Leap", "Temporal Shift", "Mimic", "Darkness Within"],
    "Death Knight": ["Death Blade", "Soul Drain", "Plague Strike", "Undead Mastery", "Dark Armor", "Cursed Shield", "Death Charge", "Grim Command", "Necrotic Slash", "Unholy Aura", "Corpse Explosion", "Bone Shield", "Life Steal", "Dark Pact", "Vampiric Strike", "Reaper's Touch", "Soul Reaper", "Dark Command", "Death's Advance", "Doom Strike"],
    "Farmer": ["Harvesting", "Soil Knowledge", "Crop Mastery", "Animal Husbandry", "Seed Crafting", "Irrigation Mastery", "Plowing", "Plant Growth", "Land Fertility", "Livestock Care", "Crop Rotation", "Agricultural Trade", "Farming Tools", "Pest Control", "Farm Management", "Compost Creation", "Breeding Mastery", "Crop Forecasting", "Herbology", "Barn Construction"],
    "Demon King": ["Dark Command", "Infernal Flames", "Demon Summoning", "Absolute Domination", "Demonic Aura", "Soul Corruption", "Hellfire", "Dark Rebirth", "Demon Lord's Might", "Dark Pact", "Summon Demon Hordes", "Hellstorm", "Infernal Protection", "Shadow Flame", "Doom Prophecy", "Chaos Control", "Abyssal Magic", "Soul Reaver", "Eternal Torment", "Cursed Throne"],
    "Swordman": ["Sword Mastery", "Blade Dance", "Quick Strike", "Deflect", "Parry", "Sword Combo", "Sharp Focus", "Sword Spin", "Deadly Slash", "Sword Precision", "Sword Reflection", "Blade Guard", "Heavy Strike", "Sword Blitz", "Raging Slash", "Sword of Fury", "Rapid Slash", "Sword Counter", "Blade Crush", "Whirling Blade"],
    "Magic Swordman": ["Sword Mastery", "Elemental Blade", "Arcane Strike", "Mana Infusion", "Sword Dance", "Enchanted Weapon", "Magic Burst", "Quick Slash", "Spellblade", "Blade of Flames", "Ice Blade", "Lightning Edge", "Earth Cleave", "Wind Cutter", "Sword of Light", "Darkness Slash", "Sword Aura", "Mystic Edge", "Arcane Barrier", "Mana Shield"],
    "Martial Artist": ["Hand-to-Hand Combat", "Pressure Point Strike", "Fists of Fury", "Agility Boost", "Palm Strike", "Roundhouse Kick", "Counterattack", "Chi Focus", "Tiger Stance", "Dragon Kick", "Iron Fist", "Body Hardening", "Mental Focus", "Chi Channeling", "Flurry of Blows", "Disarm", "Sweeping Kick", "Nerve Strike", "Power Punch", "Energy Burst"],
    "Trader": ["Bartering", "Market Analysis", "Negotiation", "Wealth Accumulation", "Merchant's Eye", "Inventory Management", "Contract Drafting", "Supply Chain", "Risk Assessment", "Sales Mastery", "Trade Secrets", "Customer Rapport", "Trade Route Knowledge", "Investment Strategies", "Merchant's Luck", "Price Manipulation", "Logistics Expertise", "Market Expansion", "Haggling", "Wealth Control"],
    "Archmage": ["Ultimate Fireball", "Meteor Shower", "Elemental Mastery", "Arcane Surge", "Mystic Explosion", "Mana Mastery", "Teleportation", "Time Warp", "Mana Storm", "Reality Shatter", "Infinite Wisdom", "Arcane Barrage", "Planar Rift", "Arcane Manipulation", "Elemental Fury", "Cosmic Insight", "Eternal Flame", "Mana Explosion", "Spellsurge", "Mana Infusion"],
    "Slave": ["Endurance", "Survival Instinct", "Pain Tolerance", "Obedience", "Escape Artist", "Servitude Mastery", "Submission", "Silent Endurance", "Servant's Will", "Willpower", "Stealth Work", "Escape Plan", "Unseen Movement", "Rebellious Mind", "Survival Expert", "Hidden Talent", "Chained Strength", "Mental Resilience", "Resistance", "Hidden Strength"],
    "Chef": ["Cooking", "Ingredient Sourcing", "Flavor Mastery", "Knife Skills", "Heat Control", "Herb Knowledge", "Food Presentation", "Recipe Creation", "Gourmet Crafting", "Culinary Expertise", "Meal Preparation", "Food Preservation", "Baking Mastery", "Herb Infusion", "Ingredient Substitution", "Food Safety", "Multitasking", "Culinary Innovation", "Taste Testing", "Plating Expertise"]
};

const ranks = ["F", "E", "D", "C", "B", "A", "S"];
const guilds = ["PSHT", "RHODES", "Silverthorn", "Dragonshade", "Shadowspire"];
const titles = [
    "Champion of Light", "Dark Lord", "Master Swordsman", "Adept of Shadows", "Guardian of the Forest",
    "Slayer of Beasts", "Bringer of Death", "Harbinger of Doom", "Master of Elements", "Stormcaller",
    "Divine Protector", "Beast Master", "Necromancer King", "Archmage Supreme", "Emperor of Flames",
    "Eternal Warrior", "Master of Stealth", "Undying Warrior", "Lightbringer", "Shadow Stalker",
    "Mage of the Arcane", "Grand Healer", "Ultimate Chef", "Master Blacksmith", "Savior of the Realm", "King of Shadows", "Champion of the Arena", "Silent Blade", "Storm Bringer",
    "Warden of the North", "Guardian of Souls", "Wong Ireng", "Penyuka Anak Kecil",
    "Player Genshin", "Doctor Furry", "Kang Rasis", "Klemer", "Karbit", "Solid Solid Solid", "LET HIM COOK", "Menyala Abangku", "Pria Misterius", "Jomok", "What The Sigma", "Newbie Killer", "Weeb"
];

function getRandomElement(arr) {
    if (!arr || arr.length === 0) {
        return null; // Ubah ini agar tidak melempar error, tetapi mengembalikan null jika array kosong
    }
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate(name) {
    if (!name) {
        throw new Error("Name cannot be empty.");
    }

    const race = getRandomElement(races);
    let role;

    // Ensuring Demon race doesn't get specific roles
    do {
        role = getRandomElement(roles);
    } while (race === "Demon" && ["Healer", "Paladin", "Saint"].includes(role));

    const strength = getRandomNumber(1, 100);
    const health = getRandomNumber(25, 100);
    const mana = getRandomNumber(1, 100);
    const agi = getRandomNumber(1, 100);
    const lev = getRandomNumber(1, 100);
    const guild = getRandomElement(guilds);
    const rank = getRandomElement(ranks);

    // Assigning skills
    const characterSkills = [];
    const numberOfSkills = getRandomNumber(3, 5);
    const availableSkills = roleSkills[role] || []; // Default empty array if role has no skills

    if (availableSkills.length === 0) {
        console.warn(`No skills found for role: ${role}`);
    }

    for (let i = 0; i < numberOfSkills; i++) {
        const skill = getRandomElement(availableSkills);
        if (skill) { // Pastikan skill tidak null
            const skillRank = getRandomElement(ranks);
            if (!characterSkills.includes(skill)) {
                characterSkills.push(`${skill} (Rank ${skillRank})`);
            }
        }
    }

    // Assigning titles
    const characterTitles = [];
    const titlesCount = getRandomNumber(1, 2);
    
    for (let i = 0; i < titlesCount; i++) {
        const title = getRandomElement(titles);
        if (title) { // Pastikan title tidak null
            const titleRank = getRandomElement(ranks);
            characterTitles.push(`${title} (Rank ${titleRank})`);
        }
    }

    // If the role has divine power
    let divinePower;
    if (["Healer", "Paladin", "Saint"].includes(role)) {
        divinePower = getRandomNumber(50, 100);
    }
    let darkEnergy
    if (["Necromancer", "Unknown", "Death Knight", "Demon King"].includes(role) || race === "Demon") {
      darkEnergy = getRandomNumber(50, 100)
    }

    return {
        name,
        race,
        role,
        stats: {
            strength,
            health,
            mana,
            agility: agi,
            level: lev,
        },
        rank,
        guild,
        skills: characterSkills,
        titles: characterTitles,
        divinePower: divinePower || 0,
        darkEnergy: darkEnergy || 0,
    };
}

async function buatcanvas(data) {
    // Create a canvas with specified dimensions
    const canvas = createCanvas(600, 800);
    const ctx = canvas.getContext('2d');

    // Background and border styling
    ctx.fillStyle = '#3E5266';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#C0C0C0';
    ctx.lineWidth = 8;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Add decorative corners
    ctx.strokeStyle = '#8CD3DB';
    ctx.lineWidth = 5;
    drawCorners(ctx);

    // Title text
    ctx.font = 'bold 40px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText('STATUS', canvas.width / 2, 60);

    // General information section
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Name: ${data.name}`, 50, 120);
    ctx.fillText(`Lv ${data.level}`, 450, 120);
    ctx.fillText(`Race: ${data.race}`, 50, 160);
    ctx.fillText(`Guild: ${data.guild}`, 450, 160);
    ctx.fillText(`Role: ${data.role}`, 50, 200);
    ctx.fillText(`Rank: ${data.rank}`, 450, 200);

    // Stats section
    ctx.fillText(`Strength: ${data.stats.strength}`, 50, 260);
    ctx.fillText(`Mana: ${data.stats.mana}`, 450, 260);
    ctx.fillText(`Health: ${data.stats.health}`, 50, 300);
    ctx.fillText(`Agility: ${data.stats.agility}`, 450, 300);
    ctx.fillText(`Dark Energy: ${data.darkEnergy}`, 50, 340);
    ctx.fillText(`Divine Energy: ${data.divineEnergy}`, 50, 380);

    // Skills section
    ctx.fillText(`Skills:`, 50, 440);
    data.skills.forEach((skill, index) => {
        ctx.fillText(`• ${skill}`, 50, 470 + index * 30);
    });

    // Titles section
    ctx.fillText(`Titles:`, 50, 580);
    data.titles.forEach((title, index) => {
        ctx.fillText(`• ${title}`, 50, 610 + index * 30);
    });

    // Return the canvas buffer
    return canvas.toBuffer();
};

// Function to draw decorative corners
const drawCorners = (ctx) => {
    const cornerDesign = (x, y, width, height) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x, y + height);
        ctx.stroke();
    };
    // Top left
    cornerDesign(10, 10, 60, 60);
    // Top right
    cornerDesign(600 - 70, 10, 60, 60);
    // Bottom left
    cornerDesign(10, 800 - 70, 60, 60);
    // Bottom right
    cornerDesign(600 - 70, 800 - 70, 60, 60);
};

async function status(name) {
 let gen = await generate(name)
 
const characterData = {
    name: gen.name,
    level: gen.stats.level,
    race: gen.race,
    guild: gen.guild,
    role: gen.role,
    rank: gen.rank,
    stats: {
        strength: gen.stats.strength,
        health: gen.stats.health,
        mana: gen.stats.mana,
        agility: gen.stats.agility
    },
    darkEnergy: gen.darkEnergy,
    divineEnergy: gen.divinePower,
    skills: gen.skills,
    titles: gen.titles
}
const res = buatcanvas(characterData)
return res
};

export default status