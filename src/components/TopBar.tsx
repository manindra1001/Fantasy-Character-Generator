import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface TopBarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onQuickGenerate: () => void;
  onOpenCodex: () => void;
  onOpenRoster: () => void;
  rosterCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  isMuted,
  onToggleMute,
  onQuickGenerate,
  onOpenCodex,
  onOpenRoster,
  rosterCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <a
            href="/"
            className="font-display text-lg sm:text-xl font-bold tracking-wider text-slate-100 hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            Mythic Forge
          </a>
        </div>

        {/* Zone 2: Concise text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a
            href="#generator"
            className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0"
          >
            Hero Generator
          </a>
          <button
            onClick={onOpenCodex}
            className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Class Codex
          </button>
          <button
            onClick={onOpenRoster}
            className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>My Deck</span>
            {rosterCount > 0 && (
              <span className="text-xs font-mono text-amber-400 font-semibold">({rosterCount})</span>
            )}
          </button>
          <a
            href="#lore"
            className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0"
          >
            Realm Lore
          </a>
        </nav>

        {/* Zone 3: 1 primary action & sound toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <button
            onClick={onQuickGenerate}
            className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 hover:bg-amber-400 active:scale-95 transition-all shadow-md shadow-amber-950/20 whitespace-nowrap shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Summon Adventurer</span>
          </button>
        </div>
      </div>
    </header>
  );
};
