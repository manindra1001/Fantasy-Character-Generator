import { CharacterClass } from '../types/character';

export const PORTRAITS = {
  Warrior: '/src/assets/images/char_warrior_portrait_1793792349587.jpg',
  Mage: '/src/assets/images/char_mage_portrait_1793792350388.jpg',
  Rogue: '/src/assets/images/char_rogue_portrait_1793792351081.jpg',
  TavernBackdrop: '/src/assets/images/char_tavern_backdrop_1793792351581.jpg',
  AlchemistWorkbench: '/src/assets/images/alchemist_workbench_dark_1793793718763.jpg',
};

export const CARTOON_PORTRAITS: Record<CharacterClass, string[]> = {
  Warrior: [
    '/src/assets/images/vg_warrior_cartoon_1793792827637.jpg',
    '/src/assets/images/vg_warrior_brawler_1793792829522.jpg',
  ],
  Mage: [
    '/src/assets/images/vg_mage_cartoon_1793792828038.jpg',
    '/src/assets/images/vg_mage_elemental_1793792830787.jpg',
  ],
  Rogue: [
    '/src/assets/images/vg_rogue_cartoon_1793792827957.jpg',
    '/src/assets/images/vg_rogue_shadow_1793792846986.jpg',
  ],
};

export const FIRST_NAMES = [
  'Theron', 'Lyra', 'Kaelen', 'Morwen', 'Cedric', 'Branoc', 'Elowen', 'Rhiannon',
  'Garrick', 'Seraphina', 'Valerius', 'Astrid', 'Morgana', 'Ignatius', 'Sylas',
  'Jorah', 'Talia', 'Rowena', 'Fenric', 'Cassandra', 'Gideon', 'Isolde', 'Balthazar',
  'Vivienne', 'Dorian', 'Evander', 'Lucian', 'Riona', 'Kieran', 'Toren', 'Aria',
  'Alden', 'Caelum', 'Vespera', 'Eldrin', 'Faelan', 'Gwendolyn', 'Harlan', 'Kaelith',
  'Orion', 'Sariel', 'Thalor', 'Valen', 'Zarek', 'Mirella', 'Brynn', 'Corvus'
];

export const EPITHETS = [
  'the Undaunted', 'Shadowveil', 'Ironclad', 'Stormbringer', 'Silverfang',
  'the Swift', 'Frostweaver', 'Emberheart', 'the Unbroken', 'Blackwood',
  'Sunstrider', 'Wyrmslayer', 'Runehand', 'the Silent', 'Starcaller',
  'the Steadfast', 'Gloomstride', 'Dawnseeker', 'Oathkeeper', 'the Relentless',
  'Stonebreaker', 'Nightshade', 'the Vigilant', 'Bloodhound', 'Moonwhisper'
];

export const CLASS_CONFIG: Record<CharacterClass, {
  tagline: string;
  role: string;
  subclasses: string[];
  primaryStat: 'str' | 'int' | 'dex';
  hitDie: number;
  armorTypes: string;
  weapons: string[];
  secondaryGear: string[];
  abilities: Array<{ name: string; description: string; cost: string }>;
  origins: string[];
}> = {
  Warrior: {
    tagline: 'Master of steel, heavy armor, and frontline battlefield discipline.',
    role: 'Frontline Guardian / Heavy Bruiser',
    subclasses: ['Battlemaster', 'Champion Knight', 'Berserker Vanguard', 'Dragon Warden'],
    primaryStat: 'str',
    hitDie: 10,
    armorTypes: 'Full Plate, Chainmail, Tower Shields',
    weapons: [
      'Engraved Dragonforged Greatsword',
      'Tempered Valyrian Bastard Sword & Kite Shield',
      'Dual-Headed Heavy War Cleaver',
      'Spiked Morningstar & Iron Heater Shield',
      'Runed Steel Halberd of the Vanguard'
    ],
    secondaryGear: [
      'Embossed Crested Plate & Whetstone Kit',
      'Heavy Riveted Greaves & Iron Rations',
      'War Horn & Fur-Lined Mantle',
      'Fortified Pauldrons & Armorer Tongs'
    ],
    abilities: [
      { name: 'Shield Slam', description: 'Crushes opponent poise with an armored shield, dazing them for 1 turn.', cost: '15 Stamina' },
      { name: 'Whirlwind Cleave', description: 'Sweeps weapon in a lethal 360-degree arc hitting all adjacent foes.', cost: '25 Stamina' },
      { name: 'Unbreakable Bastion', description: 'Braces into immovable defense, absorbing incoming blows for 2 turns.', cost: '30 Stamina' },
      { name: 'Battle Cry', description: 'Roars a thunderous cadence that rallies party morale and boosts attack.', cost: '20 Stamina' }
    ],
    origins: [
      'Citadel of Ironspire',
      'Highland Clans of Dunmoor',
      'Imperial Royal Guard of Oakhaven',
      'Sunken Bastion of the North',
      'Order of the Silver Griffin'
    ]
  },
  Mage: {
    tagline: 'Weaver of ancient arcane energies, elemental forces, and celestial wards.',
    role: 'Ranged Arcane Blaster / Battlefield Controller',
    subclasses: ['Arcanist', 'Pyromancer', 'Frost Elementalist', 'Starlight Diviner'],
    primaryStat: 'int',
    hitDie: 6,
    armorTypes: 'Enchanted Silk, Runed Cowls, Astral Sigils',
    weapons: [
      'Celestial Quartz Staff with Glowing Focus',
      'Prismatic Leyline Wand & Bound Grimoire',
      'Spire Orb of Elemental Resonance',
      'Carved Yew Staff Inlaid with Moonstone',
      'Runed Glass Ritual Athame'
    ],
    secondaryGear: [
      'Vellum Spellbook of Ancient Incantations',
      'Alchemical Reagents Pouch & Hourglass',
      'Astral Starchart & Scrying Crystal',
      'Embroidered Runed Cloak of Deflection'
    ],
    abilities: [
      { name: 'Arcane Nova', description: 'Unleashes a detonating sphere of raw mystic resonance.', cost: '30 Mana' },
      { name: 'Glacial Lance', description: 'Fires a piercing bolt of sub-zero ice that pins targets in place.', cost: '22 Mana' },
      { name: 'Astral Rift', description: 'Bends local spacetime to phase through barriers and blink across distance.', cost: '35 Mana' },
      { name: 'Chain Lightning', description: 'Discharges crackling high-voltage arcs jumping between enemy ranks.', cost: '28 Mana' }
    ],
    origins: [
      'Grand Library of Aethelgard',
      'Spire of the Whispering Leylines',
      'Hidden Conclave of the Starlit Valley',
      'Ruins of the Sunken Academy',
      'Floating Observatory of Celestine'
    ]
  },
  Rogue: {
    tagline: 'Infiltrator of shadows, master of dual daggers, precision, and subterfuge.',
    role: 'High-Burst Stealth Skirmisher / Scout',
    subclasses: ['Shadow Assassin', 'Arcane Trickster', 'Phantom Scout', 'Gloom Infiltrator'],
    primaryStat: 'dex',
    hitDie: 8,
    armorTypes: 'Smoked Leather, Shadow Cowls, Cloaks',
    weapons: [
      'Twin Serrated Obsidian Daggers',
      'Silent Recurve Hand-Crossbow & Poison Bolts',
      'Weighted Parrying Dagger & Steel Foil',
      'Twin Curved Shadowflint Kukris',
      'Throwing Spikes & Concealed Dirk'
    ],
    secondaryGear: [
      'Masterwork Lockpick & Trap Defusing Kit',
      'Spool of Silk Grappling Wire & Smoke Pellets',
      'Vials of Concentrated Nightshade Venom',
      'Padded Boots of Silent Striding'
    ],
    abilities: [
      { name: 'Shadowstep', description: 'Dissolves into shadows to reappear instantly behind an unwary foe.', cost: '20 Energy' },
      { name: 'Poison Flourish', description: 'Applies fast-acting paralytic toxin to twin blades for critical strikes.', cost: '15 Energy' },
      { name: 'Smoke Veil', description: 'Drops a blinding sulfur cloud, breaking line of sight and guaranteeing escape.', cost: '25 Energy' },
      { name: 'Assassinate', description: 'Executes a lethal strike aimed at vital armor gaps from stealth.', cost: '40 Energy' }
    ],
    origins: [
      'Underbelly Guild of Ravenport',
      'Mist-Veiled Docks of Oakhaven',
      'Black Market Syndicate of Valen',
      'Whispering Catacombs of the Exiles',
      'Nomadic Smugglers of the Red Dunes'
    ]
  }
};

export const PERSONALITY_TRAITS = [
  'Never backs down from a tavern wager or an honorable duel.',
  'Speaks in measured, quiet tones and observes every doorway.',
  'Fiercely protective of traveling companions and vulnerable folk.',
  'Carries an ancient heirloom coin they flip before making critical choices.',
  'Has a wicked sense of humor even in the face of imminent dragon fire.',
  'Keeps a meticulous handwritten chronicle of every beast defeated.',
  'Prefers sleeping under open stars rather than inside stuffy stone walls.',
  'Always leaves a single marked copper coin at the scene of an escape.'
];

export const BACKSTORY_SNIPPETS = [
  'Once sworn to a forgotten guild of realm protectors, now walks the continent taking bounties to repay an inherited family oath.',
  'Survived the collapse of an ancient mountain stronghold, escaping with only their signature weapon and a burning desire for truth.',
  'Apprenticed to an eccentric master who mysteriously vanished through an arcane portal, leaving behind an unfinished codex.',
  'Exiled from noble lineage after refusing to execute an unjust decree; now sells their blade solely for righteous causes.',
  'Rose from the shadowed alleys of the port city to become one of the most sought-after freelancers across the continent.',
  'Marked by celestial portents at birth, drawn by strange dreams toward the uncharted badlands in search of ancient relics.'
];

export const ALIGNMENTS = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral'
];
