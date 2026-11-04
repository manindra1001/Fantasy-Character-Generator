import React, { useState } from 'react';
import {
  Shield,
  Wand2,
  Footprints,
  Heart,
  Zap,
  Sword,
  Copy,
  Check,
  BookmarkPlus,
  RefreshCw,
  Sparkles,
  ScrollText,
  Compass,
  Gamepad2,
  Flame,
  Award,
  Layers
} from 'lucide-react';
import { Character, CharacterClass } from '../types/character';
import { formatModifier, calculateModifier } from '../utils/characterGenerator';

interface CharacterCardProps {
  character: Character;
  onRerollStats: () => void;
  onSaveToDeck: (char: Character) => void;
  isSavedInDeck: boolean;
  onGenerateCartoonPortrait: () => void;
  onRegenerateCartoonPortrait: () => void;
  onTogglePortraitStyle?: () => void;
  isPortraitGenerating?: boolean;
  onGenerateBackstory: () => void;
  isBackstoryGenerating?: boolean;
  // Backward compatibility aliases
  onSaveToRoster?: (char: Character) => void;
  isSaved?: boolean;
}

const CLASS_THEMES: Record<CharacterClass, {
  color: string;
  badgeBorder: string;
  badgeBg: string;
  badgeText: string;
  glow: string;
  accentBorder: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  Warrior: {
    color: 'rose',
    badgeBorder: 'border-rose-500/50',
    badgeBg: 'bg-rose-950/60',
    badgeText: 'text-rose-200',
    glow: 'from-rose-500/25 via-transparent to-transparent',
    accentBorder: 'border-rose-600/40',
    icon: Shield,
  },
  Mage: {
    color: 'purple',
    badgeBorder: 'border-purple-500/50',
    badgeBg: 'bg-purple-950/60',
    badgeText: 'text-purple-200',
    glow: 'from-purple-500/25 via-transparent to-transparent',
    accentBorder: 'border-purple-600/40',
    icon: Wand2,
  },
  Rogue: {
    color: 'emerald',
    badgeBorder: 'border-emerald-500/50',
    badgeBg: 'bg-emerald-950/60',
    badgeText: 'text-emerald-200',
    glow: 'from-emerald-500/25 via-transparent to-transparent',
    accentBorder: 'border-emerald-600/40',
    icon: Footprints,
  },
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onRerollStats,
  onSaveToDeck,
  isSavedInDeck,
  onGenerateCartoonPortrait,
  onRegenerateCartoonPortrait,
  onTogglePortraitStyle,
  isPortraitGenerating = false,
  onGenerateBackstory,
  isBackstoryGenerating = false,
  onSaveToRoster,
  isSaved,
}) => {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleSave = () => {
    if (onSaveToDeck) {
      onSaveToDeck(character);
    } else if (onSaveToRoster) {
      onSaveToRoster(character);
    }
  };

  const isInDeck = isSavedInDeck ?? isSaved ?? false;

  const theme = CLASS_THEMES[character.characterClass];
  const ClassIcon = theme.icon;

  const isCartoon = character.activePortraitStyle === 'cartoon';
  const displayPortraitUrl = isCartoon && character.cartoonPortraitUrl
    ? character.cartoonPortraitUrl
    : character.portraitUrl;

  const copyToClipboard = () => {
    const text = `
⚔️ [MYTHIC FORGE PLAYER CARD]
Name: ${character.name}
Class: ${character.characterClass} (${character.subclass})
Title: ${character.title}
Level: ${character.level} · Rarity: ${character.rarity} · Origin: ${character.origin}

[CORE PLAYER STATS]
❤️ Health: ${character.health || character.hp}
🔷 Mana: ${character.mana || 50}
⚔️ Strength: ${character.strength || character.stats.str}

[COMBAT STATS]
Armor Class: ${character.ac} | Speed: ${character.speed}ft | Initiative: ${formatModifier(character.initiative)}

[ATTRIBUTES]
STR: ${character.stats.str} | DEX: ${character.stats.dex} | CON: ${character.stats.con}
INT: ${character.stats.int} | WIS: ${character.stats.wis} | CHA: ${character.stats.cha}

[EQUIPMENT & ABILITY]
Weapon: ${character.primaryWeapon}
Gear: ${character.secondaryGear}
Signature Ability: ${character.signatureAbility.name} (${character.signatureAbility.cost}): ${character.signatureAbility.description}

[ORIGIN STORY]
"${character.personalityTrait}"
${character.backstory}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statItems = [
    { label: 'STR', value: character.stats.str },
    { label: 'DEX', value: character.stats.dex },
    { label: 'CON', value: character.stats.con },
    { label: 'INT', value: character.stats.int },
    { label: 'WIS', value: character.stats.wis },
    { label: 'CHA', value: character.stats.cha },
  ];

  return (
    <article
      aria-label={`Player Card for ${character.name}`}
      className="relative overflow-hidden rounded-2xl border-4 border-amber-500/80 bg-slate-950/95 shadow-[0_0_40px_rgba(245,158,11,0.3)] backdrop-blur-md transition-all duration-300 magical-border-glow"
    >
      {/* Ornate Inset Card Border Ring */}
      <div className="absolute inset-1.5 rounded-xl border border-amber-400/30 pointer-events-none" />

      {/* Alchemical Runic Corner Anchors */}
      <div className="absolute top-3 left-3 text-sm font-mono text-amber-400/80 rune-glow select-none pointer-events-none z-20" aria-hidden="true">᚛ᛟ᚜</div>
      <div className="absolute top-3 right-3 text-sm font-mono text-amber-400/80 rune-glow select-none pointer-events-none z-20" aria-hidden="true">᚛ᚦ᚜</div>
      <div className="absolute bottom-3 left-3 text-sm font-mono text-amber-400/80 rune-glow select-none pointer-events-none z-20" aria-hidden="true">᚛ᚱ᚜</div>
      <div className="absolute bottom-3 right-3 text-sm font-mono text-amber-400/80 rune-glow select-none pointer-events-none z-20" aria-hidden="true">᚛ᛉ᚜</div>

      {/* Top ambient card glow */}
      <div className={`absolute top-0 inset-x-0 h-44 bg-gradient-to-b ${theme.glow} pointer-events-none opacity-50`} />

      {/* PLAYER CARD TOP BANNER */}
      <div className="relative border-b-2 border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-slate-900/80 to-amber-950/40 px-6 py-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Card Left: Name & Title */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400/90 tracking-widest uppercase">
              <Layers className="h-3.5 w-3.5" />
              <span>PLAYER CARD</span>
              <span>·</span>
              <span className="text-slate-400">LVL {character.level}</span>
              <span>·</span>
              <span className="text-amber-300 font-semibold">{character.rarity}</span>
            </div>
            <h2
              className="character-fantasy-title font-fantasy text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 drop-shadow-[0_2px_14px_rgba(245,158,11,0.4)] leading-tight mt-1"
              style={{ fontFamily: "'MedievalSharp', cursive, serif" }}
            >
              {character.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium flex items-center gap-2 mt-0.5">
              <span>{character.title}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">{character.origin}</span>
            </p>
          </div>

          {/* Card Right: Class Sigil & Save to Deck Action */}
          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
            {/* Class Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border-2 ${theme.badgeBorder} ${theme.badgeBg} ${theme.badgeText} shadow-md`}>
              <ClassIcon className="h-4 w-4" />
              <span className="font-display font-bold tracking-wider text-xs uppercase">
                {character.characterClass}
              </span>
            </div>

            {/* Prominent "Save to Deck" button in the card header */}
            <button
              onClick={handleSave}
              className={`cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 font-display text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-md ${
                isInDeck
                  ? 'border-emerald-500 bg-emerald-950/80 text-emerald-200 hover:bg-emerald-900/80'
                  : 'border-amber-400 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500'
              }`}
              title={isInDeck ? 'Character is saved in My Deck' : 'Save this character to My Deck'}
            >
              {isInDeck ? (
                <>
                  <Check className="h-4 w-4 text-emerald-300" />
                  <span>Saved to Deck</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="h-4 w-4 text-slate-950" />
                  <span>Save to Deck</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="relative p-6 sm:p-8 lg:p-10 space-y-6">
        {/* Main Card Body: Portrait + Details */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* LEFT: Portrait Frame + Portrait Controls */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* The Bordered Portrait Window */}
            <div className="relative group w-full aspect-square max-w-[320px] rounded-xl overflow-hidden border-4 border-amber-500/70 bg-slate-950 shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] transition-all duration-300">
              {/* Inner frame line */}
              <div className="absolute inset-1 rounded-lg border border-amber-400/40 pointer-events-none z-10" />

              {!imgError && displayPortraitUrl ? (
                <img
                  key={displayPortraitUrl}
                  src={displayPortraitUrl}
                  alt={`${isCartoon ? 'Cartoon video game' : 'Painterly'} portrait of ${character.name}, a fantasy ${character.characterClass}`}
                  onError={() => setImgError(true)}
                  referrerPolicy="no-referrer"
                  className={`h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105 ${
                    isPortraitGenerating ? 'opacity-30 scale-95 blur-xs' : 'opacity-100 scale-100'
                  }`}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 to-slate-950 text-slate-400">
                  <ClassIcon className="h-16 w-16 mb-2 opacity-60 text-amber-400" />
                  <span className="text-xs uppercase tracking-wider font-mono">{character.characterClass}</span>
                </div>
              )}

              {/* Generating Animation Overlay */}
              {isPortraitGenerating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xs z-20">
                  <RefreshCw className="h-9 w-9 text-amber-400 animate-spin mb-2" />
                  <span className="text-xs font-mono text-amber-300 uppercase tracking-widest font-bold">
                    Rendering Art...
                  </span>
                </div>
              )}

              {/* Top Left: Level Badge */}
              <div className="absolute top-2.5 left-2.5 z-20 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded border border-amber-500/40 text-[11px] font-mono font-bold text-amber-300 shadow">
                LVL {character.level}
              </div>

              {/* Top Right: Cartoon / Video Game Style Pill */}
              <div className="absolute top-2.5 right-2.5 z-20 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded border border-amber-500/40 text-[10px] font-mono uppercase tracking-wider text-amber-300 flex items-center gap-1 shadow">
                {isCartoon ? (
                  <>
                    <Gamepad2 className="h-3 w-3 text-amber-400" />
                    <span>Cartoon Art</span>
                  </>
                ) : (
                  <span>Painterly</span>
                )}
              </div>

              {/* Bottom Class Tag */}
              <div className="absolute bottom-2.5 right-2.5 z-20 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700/80 text-[11px] font-mono uppercase tracking-wider text-slate-300 shadow">
                {character.subclass}
              </div>
            </div>

            {/* Cartoon Video Game Portrait Controls (Generate & Regenerate) */}
            <div className="w-full max-w-[320px] mt-3.5 p-3.5 rounded-xl border-2 border-slate-800 bg-slate-950/90 shadow-md">
              <div className="flex items-center justify-between text-xs mb-2.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <Gamepad2 className="h-4 w-4 text-amber-400" />
                  <span>Cartoon Portrait</span>
                </div>
                <span className="text-[10px] uppercase font-mono text-slate-400">
                  Matches {character.characterClass}
                </span>
              </div>

              {/* The required two buttons: Generate and Regenerate */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onGenerateCartoonPortrait}
                  disabled={isPortraitGenerating}
                  className="cursor-pointer inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
                  title={`Generate cartoon portrait matching ${character.characterClass}`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Generate</span>
                </button>

                <button
                  onClick={onRegenerateCartoonPortrait}
                  disabled={isPortraitGenerating}
                  className="cursor-pointer inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold border border-slate-700 bg-slate-800/90 hover:bg-slate-700 text-slate-100 hover:text-amber-400 transition-all active:scale-95 disabled:opacity-50"
                  title={`Regenerate new cartoon portrait variation for ${character.characterClass}`}
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isPortraitGenerating ? 'animate-spin' : ''}`} />
                  <span>Regenerate</span>
                </button>
              </div>

              {/* Style Switcher */}
              {onTogglePortraitStyle && (
                <button
                  onClick={onTogglePortraitStyle}
                  className="cursor-pointer w-full mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-400 hover:text-slate-200 transition-colors text-center block"
                >
                  {isCartoon ? 'Switch to Classic Painterly' : 'Switch to Cartoon / Video Game'}
                </button>
              )}
            </div>

            {/* Quick Actions Bar below portrait */}
            <div className="mt-3 flex w-full max-w-[320px] items-center gap-2">
              <button
                onClick={handleSave}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border py-2 px-3 text-xs font-semibold transition-all cursor-pointer ${
                  isInDeck
                    ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-950/60'
                    : 'border-amber-500/40 bg-amber-950/30 text-amber-300 hover:bg-amber-950/60'
                }`}
              >
                {isInDeck ? <Check className="h-3.5 w-3.5" /> : <BookmarkPlus className="h-3.5 w-3.5" />}
                <span>{isInDeck ? 'In Deck' : 'Save to Deck'}</span>
              </button>

              <button
                onClick={copyToClipboard}
                title="Copy full player card to clipboard"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>

              <button
                onClick={onRerollStats}
                title="Reroll Health, Mana, Strength & attributes"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 p-2 text-slate-300 hover:bg-slate-700 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* RIGHT: Stats, Story & Abilities */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* PROMINENT PLAYER CARD TRI-STATS: HEALTH, MANA, STRENGTH */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="text-xs font-display font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-amber-400" />
                  <span>Core Player Card Stats</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Class: {character.characterClass}</span>
              </div>

              {/* 3 Prominent Stat Boxes */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {/* 1. HEALTH STAT */}
                <div className="relative overflow-hidden rounded-xl border-2 border-rose-500/50 bg-gradient-to-b from-rose-950/50 to-slate-950 p-3 sm:p-4 shadow-md">
                  <div className="flex items-center gap-1.5 text-xs text-rose-300 font-bold uppercase tracking-wider mb-1">
                    <Heart className="h-4 w-4 text-rose-400 shrink-0 fill-rose-500/30" />
                    <span>Health</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white tabular-nums tracking-tight">
                    {character.health || character.hp}
                  </div>
                  <div className="mt-1 text-[10px] font-mono text-rose-400/90 font-medium">
                    Hit Points
                  </div>
                  {/* Subtle decorative progress bar */}
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full"
                      style={{ width: `${Math.min(100, Math.round(((character.health || character.hp) / 220) * 100))}%` }}
                    />
                  </div>
                </div>

                {/* 2. MANA STAT */}
                <div className="relative overflow-hidden rounded-xl border-2 border-sky-500/50 bg-gradient-to-b from-sky-950/50 to-slate-950 p-3 sm:p-4 shadow-md">
                  <div className="flex items-center gap-1.5 text-xs text-sky-300 font-bold uppercase tracking-wider mb-1">
                    <Zap className="h-4 w-4 text-sky-400 shrink-0 fill-sky-500/30" />
                    <span>Mana</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white tabular-nums tracking-tight">
                    {character.mana || 75}
                  </div>
                  <div className="mt-1 text-[10px] font-mono text-sky-400/90 font-medium">
                    Arcane Power
                  </div>
                  {/* Subtle decorative progress bar */}
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-600 to-sky-400 rounded-full"
                      style={{ width: `${Math.min(100, Math.round(((character.mana || 75) / 230) * 100))}%` }}
                    />
                  </div>
                </div>

                {/* 3. STRENGTH STAT */}
                <div className="relative overflow-hidden rounded-xl border-2 border-amber-500/50 bg-gradient-to-b from-amber-950/50 to-slate-950 p-3 sm:p-4 shadow-md">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold uppercase tracking-wider mb-1">
                    <Sword className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Strength</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white tabular-nums tracking-tight">
                    {character.strength || character.stats.str}
                  </div>
                  <div className="mt-1 text-[10px] font-mono text-amber-400/90 font-medium">
                    Power ({formatModifier(calculateModifier(character.strength || character.stats.str))})
                  </div>
                  {/* Subtle decorative progress bar */}
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                      style={{ width: `${Math.min(100, Math.round(((character.strength || character.stats.str) / 20) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Combat Vitals Strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 py-2 border-y border-slate-800/80">
              <div className="text-center p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block">Armor Class</span>
                <span className="text-base font-mono font-bold text-slate-100">{character.ac} AC</span>
              </div>
              <div className="text-center p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block">Speed</span>
                <span className="text-base font-mono font-bold text-slate-100">{character.speed} ft</span>
              </div>
              <div className="text-center p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block">Initiative</span>
                <span className="text-base font-mono font-bold text-amber-300">{formatModifier(character.initiative)}</span>
              </div>
            </div>

            {/* 6 Core Attribute Scores (STR, DEX, CON, INT, WIS, CHA) */}
            <div>
              <div className="text-xs font-display font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Detailed Attributes
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {statItems.map((stat) => {
                  const mod = calculateModifier(stat.value);
                  return (
                    <div
                      key={stat.label}
                      className="flex flex-col items-center justify-center p-2 rounded-lg border border-slate-800 bg-slate-950/60"
                    >
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">{stat.label}</span>
                      <span className="text-sm font-mono font-bold text-slate-100 tabular-nums">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 font-medium">
                        {formatModifier(mod)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Signature Ability & Equipment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Signature Technique</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                    {character.signatureAbility.cost}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-200">
                  {character.signatureAbility.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {character.signatureAbility.description}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  <Sword className="h-3.5 w-3.5 text-slate-400" />
                  <span>Equipped Gear</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div>
                    <span className="text-slate-500">Weapon:</span>{' '}
                    <span className="text-slate-200 font-medium">{character.primaryWeapon}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Gear:</span>{' '}
                    <span className="text-slate-300">{character.secondaryGear}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lore & Origin Story with Generate Backstory Button */}
            <div className="rounded-xl border-2 border-amber-500/30 bg-slate-950/70 p-4 shadow-inner">
              <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  <ScrollText className="h-4 w-4 text-amber-400" />
                  <span>Origin Story</span>
                </div>

                {/* The required Generate Backstory Button */}
                <button
                  onClick={onGenerateBackstory}
                  disabled={isBackstoryGenerating}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
                  title="Generate a unique 1-2 sentence origin story for this character"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{isBackstoryGenerating ? 'Inscribing...' : 'Generate Backstory'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-300 italic mb-2 pl-2 border-l-2 border-amber-500/50">
                &ldquo;{character.personalityTrait}&rdquo;
              </p>

              <div className="relative">
                <p
                  className={`text-xs sm:text-sm text-slate-200 leading-relaxed font-sans transition-all duration-300 ${
                    isBackstoryGenerating ? 'opacity-30 blur-xs scale-[0.99]' : 'opacity-100 scale-100'
                  }`}
                >
                  {character.backstory}
                </p>
                {isBackstoryGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-mono text-amber-300 font-semibold animate-pulse bg-slate-950/90 px-3 py-1 rounded-md border border-amber-500/40">
                      Inscribing chronicle...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
