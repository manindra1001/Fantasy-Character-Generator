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
  Gamepad2
} from 'lucide-react';
import { Character, CharacterClass } from '../types/character';
import { formatModifier, calculateModifier } from '../utils/characterGenerator';

interface CharacterCardProps {
  character: Character;
  onRerollStats: () => void;
  onSaveToRoster: (char: Character) => void;
  isSaved: boolean;
  onGenerateCartoonPortrait: () => void;
  onRegenerateCartoonPortrait: () => void;
  onTogglePortraitStyle?: () => void;
  isPortraitGenerating?: boolean;
}

const CLASS_THEMES: Record<CharacterClass, {
  color: string;
  badgeBorder: string;
  badgeBg: string;
  badgeText: string;
  glow: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  Warrior: {
    color: 'rose',
    badgeBorder: 'border-rose-500/40',
    badgeBg: 'bg-rose-950/40',
    badgeText: 'text-rose-300',
    glow: 'from-rose-500/20 via-transparent to-transparent',
    icon: Shield,
  },
  Mage: {
    color: 'purple',
    badgeBorder: 'border-purple-500/40',
    badgeBg: 'bg-purple-950/40',
    badgeText: 'text-purple-300',
    glow: 'from-purple-500/20 via-transparent to-transparent',
    icon: Wand2,
  },
  Rogue: {
    color: 'emerald',
    badgeBorder: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-950/40',
    badgeText: 'text-emerald-300',
    glow: 'from-emerald-500/20 via-transparent to-transparent',
    icon: Footprints,
  },
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onRerollStats,
  onSaveToRoster,
  isSaved,
  onGenerateCartoonPortrait,
  onRegenerateCartoonPortrait,
  onTogglePortraitStyle,
  isPortraitGenerating = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const theme = CLASS_THEMES[character.characterClass];
  const ClassIcon = theme.icon;

  const isCartoon = character.activePortraitStyle === 'cartoon';
  const displayPortraitUrl = isCartoon && character.cartoonPortraitUrl
    ? character.cartoonPortraitUrl
    : character.portraitUrl;

  const copyToClipboard = () => {
    const text = `
⚔️ ${character.name.toUpperCase()}
Class: ${character.characterClass} (${character.subclass})
Level: ${character.level} · Alignment: ${character.alignment}
Origin: ${character.origin}
Portrait Style: ${isCartoon ? 'Cartoon / Video Game Style' : 'Classic Painterly'}

[VITALS]
HP: ${character.hp}/${character.maxHp} | AC: ${character.ac} | Speed: ${character.speed}ft | Initiative: ${formatModifier(character.initiative)}

[ATTRIBUTES]
STR: ${character.stats.str} (${formatModifier(calculateModifier(character.stats.str))})
DEX: ${character.stats.dex} (${formatModifier(calculateModifier(character.stats.dex))})
CON: ${character.stats.con} (${formatModifier(calculateModifier(character.stats.con))})
INT: ${character.stats.int} (${formatModifier(calculateModifier(character.stats.int))})
WIS: ${character.stats.wis} (${formatModifier(calculateModifier(character.stats.wis))})
CHA: ${character.stats.cha} (${formatModifier(calculateModifier(character.stats.cha))})

[EQUIPMENT]
Weapon: ${character.primaryWeapon}
Gear: ${character.secondaryGear}

[SIGNATURE ABILITY]
${character.signatureAbility.name} (${character.signatureAbility.cost}): ${character.signatureAbility.description}

[LORE]
Trait: ${character.personalityTrait}
Backstory: ${character.backstory}
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
    <article className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-sm transition-all duration-300">
      {/* Subtle top class glow */}
      <div className={`absolute top-0 inset-x-0 h-48 bg-gradient-to-b ${theme.glow} pointer-events-none opacity-40`} />

      <div className="relative p-6 sm:p-8 lg:p-10">
        {/* Main Header / Identification Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          {/* Portrait Column */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
            <div className={`relative group w-full aspect-square max-w-[280px] rounded-xl overflow-hidden border-2 bg-slate-950 shadow-inner transition-all duration-300 ${
              isCartoon ? 'border-amber-500/60 ring-2 ring-amber-500/20' : 'border-slate-700/80'
            }`}>
              {!imgError && displayPortraitUrl ? (
                <img
                  key={displayPortraitUrl}
                  src={displayPortraitUrl}
                  alt={`${isCartoon ? 'Cartoon video game' : 'Painterly'} portrait of ${character.name}, a fantasy ${character.characterClass}`}
                  onError={() => setImgError(true)}
                  referrerPolicy="no-referrer"
                  className={`h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105 ${
                    isPortraitGenerating ? 'opacity-40 scale-95 blur-xs' : 'opacity-100 scale-100'
                  }`}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 to-slate-950 text-slate-400">
                  <ClassIcon className="h-16 w-16 mb-2 opacity-60" />
                  <span className="text-xs uppercase tracking-wider">{character.characterClass}</span>
                </div>
              )}

              {/* Generating Animation Overlay */}
              {isPortraitGenerating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-xs">
                  <RefreshCw className="h-8 w-8 text-amber-400 animate-spin mb-2" />
                  <span className="text-xs font-mono text-amber-300 uppercase tracking-widest font-semibold">
                    Rendering Art...
                  </span>
                </div>
              )}

              {/* Rarity & Level Overlay */}
              <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700/60 text-[11px] font-mono font-medium text-amber-300">
                LVL {character.level}
              </div>

              {/* Portrait Style Badge Overlay */}
              <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700/60 text-[10px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1">
                {isCartoon ? (
                  <>
                    <Gamepad2 className="h-3 w-3" />
                    <span>Cartoon</span>
                  </>
                ) : (
                  <span>Painterly</span>
                )}
              </div>

              <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700/60 text-[11px] font-mono uppercase tracking-wider text-slate-300">
                {character.rarity}
              </div>
            </div>

            {/* Cartoon Video Game Portrait Controls */}
            <div className="w-full max-w-[280px] mt-3.5 p-3 rounded-xl border border-slate-800 bg-slate-950/70 shadow-sm">
              <div className="flex items-center justify-between text-xs mb-2">
                <div className="flex items-center gap-1.5 font-semibold text-amber-400">
                  <Gamepad2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>Cartoon / Video Game Style</span>
                </div>
                <span className="text-[10px] uppercase font-mono text-slate-400">
                  {character.characterClass}
                </span>
              </div>

              {/* The two required buttons: Generate and Regenerate */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onGenerateCartoonPortrait}
                  disabled={isPortraitGenerating}
                  className="cursor-pointer inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
                  title={`Generate cartoon portrait matching ${character.characterClass}`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Generate</span>
                </button>

                <button
                  onClick={onRegenerateCartoonPortrait}
                  disabled={isPortraitGenerating}
                  className="cursor-pointer inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border border-slate-700 bg-slate-800/90 hover:bg-slate-700 text-slate-100 hover:text-amber-400 transition-all active:scale-95 disabled:opacity-50"
                  title={`Regenerate new cartoon portrait variation for ${character.characterClass}`}
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isPortraitGenerating ? 'animate-spin' : ''}`} />
                  <span>Regenerate</span>
                </button>
              </div>

              {/* Subtle Style Switcher */}
              {onTogglePortraitStyle && (
                <button
                  onClick={onTogglePortraitStyle}
                  className="cursor-pointer w-full mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 hover:text-slate-200 transition-colors text-center block"
                >
                  {isCartoon ? 'View Classic Painterly Art' : 'View Cartoon / Video Game Art'}
                </button>
              )}
            </div>

            {/* Quick Actions beneath portrait */}
            <div className="mt-3 flex w-full max-w-[280px] items-center gap-2">
              <button
                onClick={() => onSaveToRoster(character)}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border py-2 px-3 text-xs font-medium transition-colors cursor-pointer ${
                  isSaved
                    ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/50'
                    : 'border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 hover:border-slate-600'
                }`}
              >
                {isSaved ? <Check className="h-3.5 w-3.5" /> : <BookmarkPlus className="h-3.5 w-3.5" />}
                <span>{isSaved ? 'In Roster' : 'Save to Roster'}</span>
              </button>

              <button
                onClick={copyToClipboard}
                title="Copy character sheet to clipboard"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>

              <button
                onClick={onRerollStats}
                title="Reroll attributes"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 p-2 text-slate-300 hover:bg-slate-700 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Details & Info Column */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              {/* Category & Origin Metadata (Clean Unboxed Text with Separators) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-medium mb-1.5">
                <span className="flex items-center gap-1">
                  <Compass className="h-3.5 w-3.5 text-slate-500" />
                  {character.origin}
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{character.alignment}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{character.subclass}</span>
              </div>

              {/* Character Name & Class Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
                    {character.name}
                  </h2>
                  <p className="text-sm text-slate-400 mt-0.5">
                    {character.title}
                  </p>
                </div>

                {/* Primary Class Badge */}
                <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border ${theme.badgeBorder} ${theme.badgeBg} ${theme.badgeText} shrink-0 self-start sm:self-center`}>
                  <ClassIcon className="h-4 w-4" />
                  <span className="font-display font-bold tracking-wider text-xs uppercase">
                    Class: {character.characterClass}
                  </span>
                </div>
              </div>

              {/* Combat Vitals Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium mb-1">
                    <Heart className="h-3.5 w-3.5" />
                    <span>Hit Points</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-slate-100 tabular-nums">
                    {character.hp} <span className="text-xs text-slate-500">/ {character.maxHp}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-sky-400 font-medium mb-1">
                    <Shield className="h-3.5 w-3.5" />
                    <span>Armor Class</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-slate-100 tabular-nums">
                    {character.ac} <span className="text-xs text-slate-500">AC</span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-1">
                    <Footprints className="h-3.5 w-3.5" />
                    <span>Base Speed</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-slate-100 tabular-nums">
                    {character.speed} <span className="text-xs text-slate-500">ft</span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium mb-1">
                    <Zap className="h-3.5 w-3.5" />
                    <span>Initiative</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-slate-100 tabular-nums">
                    {formatModifier(character.initiative)}
                  </div>
                </div>
              </div>

              {/* 6 Core Attributes (Tabular Numerals) */}
              <div className="mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Attribute Scores
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {statItems.map((stat) => {
                    const mod = calculateModifier(stat.value);
                    return (
                      <div
                        key={stat.label}
                        className="flex flex-col items-center justify-center p-2.5 rounded-lg border border-slate-800/80 bg-slate-950/40"
                      >
                        <span className="text-[11px] font-mono text-slate-400 font-semibold">{stat.label}</span>
                        <span className="text-base font-mono font-bold text-slate-100 tabular-nums mt-0.5">
                          {stat.value}
                        </span>
                        <span className="text-[11px] font-mono text-amber-400/90 font-medium">
                          {formatModifier(mod)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Signature Ability & Gear */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Signature Ability</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
                      {character.signatureAbility.cost}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200">
                    {character.signatureAbility.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {character.signatureAbility.description}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    <Sword className="h-3.5 w-3.5 text-slate-400" />
                    <span>Equipped Arsenal</span>
                  </div>
                  <div className="space-y-1.5 text-xs">
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

              {/* Lore & Personality */}
              <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-950/30 p-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  <ScrollText className="h-3.5 w-3.5 text-amber-400/80" />
                  <span>Lore & Demeanor</span>
                </div>
                <p className="text-xs text-slate-300 italic mb-2">
                  &ldquo;{character.personalityTrait}&rdquo;
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {character.backstory}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
