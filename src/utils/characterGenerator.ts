import { Character, CharacterClass, AttributeScores } from '../types/character';
import {
  FIRST_NAMES,
  EPITHETS,
  CLASS_CONFIG,
  PERSONALITY_TRAITS,
  BACKSTORY_SNIPPETS,
  ALIGNMENTS,
  PORTRAITS,
  CARTOON_PORTRAITS
} from '../data/fantasyData';

export function getNextCartoonPortrait(characterClass: CharacterClass, currentUrl?: string): string {
  const list = CARTOON_PORTRAITS[characterClass] || [];
  if (list.length === 0) return PORTRAITS[characterClass];
  if (!currentUrl) return list[0];
  const currentIndex = list.indexOf(currentUrl);
  if (currentIndex === -1) return list[0];
  const nextIndex = (currentIndex + 1) % list.length;
  return list[nextIndex];
}

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rollD6(): number {
  return Math.floor(Math.random() * 6) + 1;
}

// 4d6 drop lowest (standard D&D rolling)
function rollAttribute(bonus = 0): number {
  const rolls = [rollD6(), rollD6(), rollD6(), rollD6()].sort((a, b) => b - a);
  const total = rolls[0] + rolls[1] + rolls[2] + bonus;
  return Math.min(18, Math.max(6, total));
}

export function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(modifier: number): string {
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}

export function generateRandomCharacter(preferredClass?: CharacterClass | 'Random'): Character {
  const classes: CharacterClass[] = ['Warrior', 'Mage', 'Rogue'];
  const characterClass: CharacterClass =
    !preferredClass || preferredClass === 'Random'
      ? getRandomItem(classes)
      : preferredClass;

  const config = CLASS_CONFIG[characterClass];

  // Generate Name: e.g. "Theron Ironclad" or "Lyra Starcaller" or "Garrick the Undaunted"
  const firstName = getRandomItem(FIRST_NAMES);
  const epithet = getRandomItem(EPITHETS);
  const name = `${firstName} ${epithet}`;

  // Generate Stats with archetype weighting
  const baseStats: AttributeScores = {
    str: rollAttribute(),
    dex: rollAttribute(),
    con: rollAttribute(),
    int: rollAttribute(),
    wis: rollAttribute(),
    cha: rollAttribute(),
  };

  // Archetype bonuses to guarantee class flavor
  if (characterClass === 'Warrior') {
    baseStats.str = Math.max(baseStats.str, 15 + Math.floor(Math.random() * 4)); // 15-18
    baseStats.con = Math.max(baseStats.con, 14 + Math.floor(Math.random() * 4)); // 14-17
  } else if (characterClass === 'Mage') {
    baseStats.int = Math.max(baseStats.int, 16 + Math.floor(Math.random() * 3)); // 16-18
    baseStats.wis = Math.max(baseStats.wis, 13 + Math.floor(Math.random() * 4)); // 13-16
  } else if (characterClass === 'Rogue') {
    baseStats.dex = Math.max(baseStats.dex, 16 + Math.floor(Math.random() * 3)); // 16-18
    baseStats.cha = Math.max(baseStats.cha, 13 + Math.floor(Math.random() * 4)); // 13-16
  }

  const conMod = calculateModifier(baseStats.con);
  const dexMod = calculateModifier(baseStats.dex);

  const level = 3 + Math.floor(Math.random() * 3); // Level 3-5 adventurer
  const maxHp = config.hitDie + conMod + (level - 1) * (Math.floor(config.hitDie / 2) + 1 + conMod);
  const ac = characterClass === 'Warrior' ? 18 : characterClass === 'Rogue' ? 14 + dexMod : 11 + dexMod;
  const speed = characterClass === 'Rogue' ? 35 : 30;
  const initiative = dexMod;

  const totalStatSum = Object.values(baseStats).reduce((a, b) => a + b, 0);
  let rarity: Character['rarity'] = 'Common';
  if (totalStatSum >= 86) rarity = 'Legendary';
  else if (totalStatSum >= 80) rarity = 'Epic';
  else if (totalStatSum >= 74) rarity = 'Rare';

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name,
    title: `${getRandomItem(config.subclasses)} of the ${getRandomItem(config.origins).split(' of ')[1] || 'Realm'}`,
    characterClass,
    subclass: getRandomItem(config.subclasses),
    level,
    origin: getRandomItem(config.origins),
    alignment: getRandomItem(ALIGNMENTS),
    stats: baseStats,
    hp: Math.max(12, maxHp),
    maxHp: Math.max(12, maxHp),
    ac,
    speed,
    initiative,
    primaryWeapon: getRandomItem(config.weapons),
    secondaryGear: getRandomItem(config.secondaryGear),
    signatureAbility: getRandomItem(config.abilities),
    personalityTrait: getRandomItem(PERSONALITY_TRAITS),
    backstory: getRandomItem(BACKSTORY_SNIPPETS),
    portraitUrl: PORTRAITS[characterClass],
    cartoonPortraitUrl: getRandomItem(CARTOON_PORTRAITS[characterClass]),
    activePortraitStyle: 'cartoon',
    createdAt: Date.now(),
    rarity
  };
}
