import React, { useState, useEffect } from 'react';
import { Sparkles, Dices, Users, BookOpen, Scroll, Shield, Wand2, Footprints, Gamepad2 } from 'lucide-react';
import { TopBar } from './components/TopBar';
import { CharacterCard } from './components/CharacterCard';
import { GeneratorControls } from './components/GeneratorControls';
import { RosterDrawer } from './components/RosterDrawer';
import { ClassCodexModal } from './components/ClassCodexModal';
import { Character, CharacterClass } from './types/character';
import { generateRandomCharacter, getNextCartoonPortrait } from './utils/characterGenerator';
import { soundEffects } from './utils/audioSynth';
import { PORTRAITS, CARTOON_PORTRAITS } from './data/fantasyData';

const LOCAL_STORAGE_ROSTER_KEY = 'mythic_forge_roster_v1';
const LOCAL_STORAGE_MUTE_KEY = 'mythic_forge_muted_v1';

export default function App() {
  // Initialize with a default generated character immediately
  const [character, setCharacter] = useState<Character>(() => generateRandomCharacter('Random'));
  const [selectedClass, setSelectedClass] = useState<CharacterClass | 'Random'>('Random');
  const [isRolling, setIsRolling] = useState(false);
  const [isPortraitGenerating, setIsPortraitGenerating] = useState(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(LOCAL_STORAGE_MUTE_KEY) === 'true';
    }
    return false;
  });
  const [roster, setRoster] = useState<Character[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_ROSTER_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return [];
  });
  const [isRosterOpen, setIsRosterOpen] = useState(false);
  const [isCodexOpen, setIsCodexOpen] = useState(false);

  // Sync mute setting with audio synth
  useEffect(() => {
    soundEffects.setMuted(isMuted);
    localStorage.setItem(LOCAL_STORAGE_MUTE_KEY, String(isMuted));
  }, [isMuted]);

  // Sync roster with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ROSTER_KEY, JSON.stringify(roster));
    } catch {
      // Ignore
    }
  }, [roster]);

  const handleGenerate = (targetClass?: CharacterClass | 'Random') => {
    const classToRoll = targetClass || selectedClass;
    setIsRolling(true);
    soundEffects.playClick();

    // Brief tactile transition for roll effect
    setTimeout(() => {
      const newChar = generateRandomCharacter(classToRoll);
      setCharacter(newChar);
      soundEffects.playSummonSound(newChar.characterClass);
      setIsRolling(false);
    }, 180);
  };

  const handleRerollStats = () => {
    if (!character) return;
    soundEffects.playClick();
    const freshStatsChar = generateRandomCharacter(character.characterClass);
    setCharacter(prev => ({
      ...prev,
      stats: freshStatsChar.stats,
      hp: freshStatsChar.hp,
      maxHp: freshStatsChar.maxHp,
      ac: freshStatsChar.ac,
      initiative: freshStatsChar.initiative,
      rarity: freshStatsChar.rarity,
    }));
  };

  const handleGenerateCartoonPortrait = () => {
    if (!character) return;
    setIsPortraitGenerating(true);
    soundEffects.playArcadeJingle();

    setTimeout(() => {
      const portraits = CARTOON_PORTRAITS[character.characterClass] || [];
      const newPortrait = portraits[0] || character.portraitUrl;
      setCharacter(prev => ({
        ...prev,
        cartoonPortraitUrl: newPortrait,
        activePortraitStyle: 'cartoon'
      }));
      setIsPortraitGenerating(false);
    }, 200);
  };

  const handleRegenerateCartoonPortrait = () => {
    if (!character) return;
    setIsPortraitGenerating(true);
    soundEffects.playRegenerateSound();

    setTimeout(() => {
      const nextPortrait = getNextCartoonPortrait(character.characterClass, character.cartoonPortraitUrl);
      setCharacter(prev => ({
        ...prev,
        cartoonPortraitUrl: nextPortrait,
        activePortraitStyle: 'cartoon'
      }));
      setIsPortraitGenerating(false);
    }, 200);
  };

  const handleTogglePortraitStyle = () => {
    soundEffects.playClick();
    setCharacter(prev => ({
      ...prev,
      activePortraitStyle: prev.activePortraitStyle === 'cartoon' ? 'realistic' : 'cartoon'
    }));
  };

  const handleSaveToRoster = (char: Character) => {
    soundEffects.playClick();
    setRoster(prev => {
      const exists = prev.some(item => item.id === char.id);
      if (exists) {
        return prev.filter(item => item.id !== char.id);
      } else {
        return [char, ...prev];
      }
    });
  };

  const handleRemoveFromRoster = (id: string) => {
    soundEffects.playClick();
    setRoster(prev => prev.filter(c => c.id !== id));
  };

  const handleClearRoster = () => {
    soundEffects.playClick();
    setRoster([]);
  };

  const isCurrentSaved = roster.some(c => c.id === character.id);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Top Bar Contract (Wordmark — 4 nav links — 1 action) */}
      <TopBar
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(prev => !prev)}
        onQuickGenerate={() => handleGenerate()}
        onOpenCodex={() => setIsCodexOpen(true)}
        onOpenRoster={() => setIsRosterOpen(true)}
        rosterCount={roster.length}
      />

      {/* Atmospheric Hero Header with Tavern Backdrop */}
      <div className="relative border-b border-slate-800/80 bg-slate-950 overflow-hidden">
        {/* Background Image Scrim */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <img
            src={PORTRAITS.TavernBackdrop}
            alt="Atmospheric fantasy tavern"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Fantasy Hero Forge</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white text-balance max-w-3xl mx-auto">
            Summon Legends of the Realm
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 text-balance max-w-2xl mx-auto leading-relaxed">
            Generate unique fantasy characters with randomized names, classes, attributes, combat gear, and lore snippets.
          </p>

          {/* Interactive Generator Controls */}
          <section id="generator" className="mt-6">
            <GeneratorControls
              selectedClass={selectedClass}
              onSelectClass={(c) => {
                setSelectedClass(c);
                soundEffects.playClick();
              }}
              onGenerate={() => handleGenerate()}
              isRolling={isRolling}
            />
          </section>
        </div>
      </div>

      {/* Main Content Area: Character Sheet Viewport */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Quick Notification of Generated Character */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Scroll className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Active Adventurer Sheet
              </div>
              <div className="text-sm font-medium text-slate-200">
                {character.name} &mdash; <span className="text-amber-400 font-bold">{character.characterClass}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Cartoon Portrait Controls */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900/90 text-xs">
              <Gamepad2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span className="text-slate-400 hidden md:inline">Cartoon Art:</span>
              <button
                onClick={handleGenerateCartoonPortrait}
                disabled={isPortraitGenerating}
                className="cursor-pointer px-2.5 py-1 rounded text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors disabled:opacity-50"
                title={`Generate cartoon portrait matching ${character.characterClass}`}
              >
                Generate
              </button>
              <button
                onClick={handleRegenerateCartoonPortrait}
                disabled={isPortraitGenerating}
                className="cursor-pointer px-2.5 py-1 rounded text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-amber-400 transition-colors disabled:opacity-50"
                title={`Regenerate new cartoon portrait variation for ${character.characterClass}`}
              >
                Regenerate
              </button>
            </div>

            <button
              onClick={() => setIsCodexOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <BookOpen className="h-3.5 w-3.5 text-amber-400" />
              <span>Class Guide</span>
            </button>

            <button
              onClick={() => setIsRosterOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Users className="h-3.5 w-3.5 text-amber-400" />
              <span>Roster ({roster.length})</span>
            </button>
          </div>
        </div>

        {/* The Detailed Character Card */}
        <div className="transition-all duration-300">
          <CharacterCard
            character={character}
            onRerollStats={handleRerollStats}
            onSaveToRoster={handleSaveToRoster}
            isSaved={isCurrentSaved}
            onGenerateCartoonPortrait={handleGenerateCartoonPortrait}
            onRegenerateCartoonPortrait={handleRegenerateCartoonPortrait}
            onTogglePortraitStyle={handleTogglePortraitStyle}
            isPortraitGenerating={isPortraitGenerating}
          />
        </div>

        {/* Quick Class Preview Cards (Warrior, Mage, Rogue) */}
        <section id="classes" className="mt-14 pt-10 border-t border-slate-800/80">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-slate-100">
              Archetypes of the Frontier
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto">
              Select any archetype to immediately roll an adventurer specialized in that discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Warrior Card */}
            <div className="group rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-rose-500/40 hover:bg-slate-900/80 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <Shield className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">d10 Hit Die</span>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-100">Warrior</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Frontline champions clad in heavy plate and wielding formidable greatswords, halberds, and tower shields.
                </p>
                <div className="mt-4 text-xs text-slate-400 space-y-1">
                  <div><span className="text-slate-500">Key Stat:</span> <span className="text-slate-200 font-semibold">Strength</span></div>
                  <div><span className="text-slate-500">Core Role:</span> Guardian &amp; High Defense</div>
                </div>
              </div>
              <button
                onClick={() => handleGenerate('Warrior')}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 hover:bg-rose-900/50 transition-colors cursor-pointer"
              >
                <Dices className="h-3.5 w-3.5" />
                <span>Roll a Warrior</span>
              </button>
            </div>

            {/* Mage Card */}
            <div className="group rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-purple-500/40 hover:bg-slate-900/80 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Wand2 className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">d6 Hit Die</span>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-100">Mage</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Scholars of the arcane mysteries, wielding glowing staves, crystal focuses, and reality-bending incantations.
                </p>
                <div className="mt-4 text-xs text-slate-400 space-y-1">
                  <div><span className="text-slate-500">Key Stat:</span> <span className="text-slate-200 font-semibold">Intelligence</span></div>
                  <div><span className="text-slate-500">Core Role:</span> Area Blaster &amp; Controller</div>
                </div>
              </div>
              <button
                onClick={() => handleGenerate('Mage')}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-300 hover:bg-purple-900/50 transition-colors cursor-pointer"
              >
                <Dices className="h-3.5 w-3.5" />
                <span>Roll a Mage</span>
              </button>
            </div>

            {/* Rogue Card */}
            <div className="group rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-emerald-500/40 hover:bg-slate-900/80 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Footprints className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">d8 Hit Die</span>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-100">Rogue</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Stealthy infiltrators armed with twin poisoned daggers and grappling cables, striking critical hits from the dark.
                </p>
                <div className="mt-4 text-xs text-slate-400 space-y-1">
                  <div><span className="text-slate-500">Key Stat:</span> <span className="text-slate-200 font-semibold">Dexterity</span></div>
                  <div><span className="text-slate-500">Core Role:</span> Burst Damage &amp; Infiltration</div>
                </div>
              </div>
              <button
                onClick={() => handleGenerate('Rogue')}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50 transition-colors cursor-pointer"
              >
                <Dices className="h-3.5 w-3.5" />
                <span>Roll a Rogue</span>
              </button>
            </div>
          </div>
        </section>

        {/* Realm Lore Section */}
        <section id="lore" className="mt-14 pt-10 border-t border-slate-800/80">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold text-slate-100 mb-2">
              The Adventurers of Aethelgard
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              In an age of ancient ruins, dragon-haunted badlands, and fractured alliances, travelers from distant realms gather at hearthside taverns. Whether answering an imperial summons, seeking redemption for a broken oath, or chasing stolen relics of the first mages, every character forged possesses unique attributes, martial prowess, and a story waiting to unfold.
            </p>
          </div>
        </section>
      </main>

      {/* Roster Drawer */}
      <RosterDrawer
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        roster={roster}
        onSelectCharacter={(char) => setCharacter(char)}
        onRemoveCharacter={handleRemoveFromRoster}
        onClearRoster={handleClearRoster}
        activeCharacterId={character.id}
      />

      {/* Class Codex Modal */}
      <ClassCodexModal
        isOpen={isCodexOpen}
        onClose={() => setIsCodexOpen(false)}
        onSelectClassAndGenerate={(c) => {
          setSelectedClass(c);
          handleGenerate(c);
        }}
      />

      {/* Clean Footer */}
      <footer className="mt-16 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-display font-semibold text-slate-400">
            Mythic Forge &middot; Fantasy Character Generator
          </div>
          <div>
            Built with procedural tabletop RPG mechanics and authentic attribute dice rolls.
          </div>
        </div>
      </footer>
    </div>
  );
}
