export type CharacterClass = 'Warrior' | 'Mage' | 'Rogue';

export interface AttributeScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  characterClass: CharacterClass;
  subclass: string;
  level: number;
  origin: string;
  alignment: string;
  stats: AttributeScores;
  health: number; // Explicit Health stat
  mana: number;   // Explicit Mana stat
  strength: number; // Explicit Strength stat
  hp: number;
  maxHp: number;
  ac: number;
  speed: number;
  initiative: number;
  primaryWeapon: string;
  secondaryGear: string;
  signatureAbility: {
    name: string;
    description: string;
    cost: string;
  };
  personalityTrait: string;
  backstory: string;
  portraitUrl: string;
  cartoonPortraitUrl?: string;
  activePortraitStyle: 'realistic' | 'cartoon';
  createdAt: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}
