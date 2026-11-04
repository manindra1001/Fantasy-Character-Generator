import { Character, CharacterClass } from '../types/character';

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

interface StoryFragment {
  opening: (name: string, origin: string, subclass: string) => string;
  inciting: (weapon: string, alignment: string) => string;
  resolution: (name: string, ability: string) => string;
}

const WARRIOR_STORIES: StoryFragment[] = [
  {
    opening: (name, origin, subclass) =>
      `Forged in the unforgiving bastions of ${origin}, ${name} rose to prominence as a feared ${subclass} after surviving a devastating siege alone.`,
    inciting: (weapon) =>
      `Armed with their heirloom ${weapon}, they abandoned the imperial legions when ordered to execute an innocent town.`,
    resolution: (name, ability) =>
      `Now ${name} wanders the fractured frontier as a wandering protector, relying on their devastating ${ability} to crush tyrant warlords.`,
  },
  {
    opening: (name, origin, subclass) =>
      `Raised in the fierce shield-brotherhoods of ${origin}, ${name} was hailed as an undefeated ${subclass} before their clan's ancestral fortress fell to betrayal.`,
    inciting: (weapon) =>
      `Carrying only their scarred ${weapon} from the ruins, they swore an oath upon blood and iron to avenge the fallen.`,
    resolution: (name, ability) =>
      `They now sell their martial prowess to righteous causes, turning the tide of hopeless battles with their legendary ${ability}.`,
  },
  {
    opening: (name, origin, subclass) =>
      `A battle-hardened veteran of ${origin}, ${name} fought on the front lines as a vanguard ${subclass} during the Great Border Wars.`,
    inciting: (weapon) =>
      `Refusing to lay down their ${weapon} after peace was declared, they uncovered an ancient conspiracy festering within the royal citadel.`,
    resolution: (name, ability) =>
      `Today, ${name} travels the outer badlands, striking down highwaymen and beast herds with unrelenting ${ability}.`,
  },
  {
    opening: (name, origin, subclass) =>
      `Born to a humble blacksmith clan near ${origin}, ${name} forged their reputation as a steadfast ${subclass} by defending their village from a marauding wyrm.`,
    inciting: (weapon) =>
      `Bonded to their mastercrafted ${weapon}, they were chosen to carry the crest of the realm into untamed territories.`,
    resolution: (name, ability) =>
      `Never wavering in combat, ${name} leads companions through the darkest perils using their indomitable ${ability}.`,
  },
];

const MAGE_STORIES: StoryFragment[] = [
  {
    opening: (name, origin, subclass) =>
      `Apprenticed in the soaring spires of ${origin}, ${name} manifested rare arcane affinity as a brilliant ${subclass} at a prodigiously young age.`,
    inciting: (weapon) =>
      `While communing through their ${weapon}, they glimpsed a tear in the astral veil threatening to swallow the mortal realm.`,
    resolution: (name, ability) =>
      `Now exiled for seeking forbidden truths, ${name} journeys to stabilize ancient leyline rifts with their terrifying ${ability}.`,
  },
  {
    opening: (name, origin, subclass) =>
      `Marked by celestial celestial eclipses over ${origin}, ${name} mastered the mysteries of the ${subclass} by decoding forgotten pre-cataclysm scrolls.`,
    inciting: (weapon) =>
      `Channeling esoteric planar energies through their ${weapon}, they accidentally awakened a slumbering primordial entity beneath the earth.`,
    resolution: (name, ability) =>
      `Driven by cryptic prophecies, ${name} now seeks ancient wardstones to banish the dark using their signature ${ability}.`,
  },
  {
    opening: (name, origin, subclass) =>
      `Once the chief archivist in ${origin}, ${name} dedicated decades to studying mystical anomalies as a reclusive ${subclass}.`,
    inciting: (weapon) =>
      `When inquisitors burnt the grand archives to ashes, they fled with only their sacred ${weapon} and an unfinished grimoire.`,
    resolution: (name, ability) =>
      `Now living as an itinerant scholar, ${name} defends traveling adventurers with explosive demonstrations of their ${ability}.`,
  },
  {
    opening: (name, origin, subclass) =>
      `Born beneath a convergence of astral comets in ${origin}, ${name} was chosen by the high council to train as a mystic ${subclass}.`,
    inciting: (weapon) =>
      `Wielding a resonant ${weapon} tuned to celestial frequencies, they survived a catastrophic laboratory surge that vaporized their mentors.`,
    resolution: (name, ability) =>
      `Sole heir to an enigmatic lost magical tradition, ${name} weaves reality-bending miracles on the battlefield with ${ability}.`,
  },
];

const ROGUE_STORIES: StoryFragment[] = [
  {
    opening: (name, origin, subclass) =>
      `Reared among the shadowed alleys and misty rooftops of ${origin}, ${name} earned a legendary reputation as a phantom ${subclass}.`,
    inciting: (weapon) =>
      `After infiltrating a corrupt syndicate vault with their ${weapon}, they discovered a list of marked targets that included their closest friend.`,
    resolution: (name, ability) =>
      `Severing ties with the guild, ${name} now operates independently from the gloom, dispatching pursuers with lethal ${ability}.`,
  },
  {
    opening: (name, origin, subclass) =>
      `Exiled from noble lineage in ${origin} following a staged palace coup, ${name} survived by adopting the cunning mantle of a ${subclass}.`,
    inciting: (weapon) =>
      `Concealing their deadly ${weapon} beneath worn traveler cloaks, they spent years gathering secrets on those who usurped their birthright.`,
    resolution: (name, ability) =>
      `A shadow against injustice, ${name} now rights unpunished wrongs across the continent, disappearing into thin air via ${ability}.`,
  },
  {
    opening: (name, origin, subclass) =>
      `A master of silent infiltration trained in ${origin}, ${name} operated as the premier ${subclass} for high-stakes treasure retrieval.`,
    inciting: (weapon) =>
      `Armed with a pair of custom ${weapon}, they broke into an ancient catacomb and triggered a curse that marked their soul with shadow.`,
    resolution: (name, ability) =>
      `Constantly one step ahead of bounty hunters, ${name} leverages their supernatural agility and ${ability} to secure their freedom.`,
  },
  {
    opening: (name, origin, subclass) =>
      `Born to nomadic smugglers operating across the outskirts of ${origin}, ${name} honed the deceptive arts of a master ${subclass}.`,
    inciting: (weapon) =>
      `When their caravan was ambushed by imperial patrols, they escaped into the fog with only their trusty ${weapon}.`,
    resolution: (name, ability) =>
      `Now an elusive mercenary for hire, ${name} strikes from the blind spots of arrogant foes with lightning-quick ${ability}.`,
  },
];

const SHORT_TWISTS = [
  'They now wander the realm with a heavy conscience, sworn never to let another innocent bloodline fall.',
  'Driven by recurring visions of an ancient dragon awakening, their every move is calculated toward that inevitable battle.',
  'Though wanted by imperial magistrates across three kingdoms, they continue to secretly send stolen fortunes to the poor.',
  'Their blade is pledged solely to righteous traveling companions until the ancestral blood-debt is fully repaid.',
  'Carrying a mysterious sealed parchment they cannot open until their final breath, they press into uncharted frontiers.',
  'Behind their stoic demeanor lies a burning determination to rebuild the fallen order that first gave them purpose.',
];

/**
 * Generates a unique, tailored 1-2 sentence origin story for any fantasy character.
 */
export function generateUniqueBackstory(character: Character): string {
  const storyPool: Record<CharacterClass, StoryFragment[]> = {
    Warrior: WARRIOR_STORIES,
    Mage: MAGE_STORIES,
    Rogue: ROGUE_STORIES,
  };

  const pool = storyPool[character.characterClass] || WARRIOR_STORIES;
  const fragment = pickRandom(pool);
  const twist = pickRandom(SHORT_TWISTS);

  // Extract firstName for punchy storytelling
  const firstName = character.name.split(' ')[0] || character.name;
  const weapon = character.primaryWeapon.replace(/^Engraved\s+|^Tempered\s+|^Prismatic\s+|^Twin\s+/i, '');
  const ability = character.signatureAbility.name;

  // Format Sentence 1: Inciting backstory
  const sentence1 = fragment.opening(firstName, character.origin, character.subclass);

  // Sentence 2: Combined drive or resolution (strictly 1-2 sentences in total)
  const sentence2Options = [
    `${fragment.inciting(weapon, character.alignment)} ${twist}`,
    fragment.resolution(firstName, ability),
    `${fragment.inciting(weapon, character.alignment)} Now they turn their lethal precision toward protecting their companions.`,
  ];

  const sentence2 = pickRandom(sentence2Options);

  return `${sentence1} ${sentence2}`;
}
