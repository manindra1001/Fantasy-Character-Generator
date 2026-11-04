import React from 'react';
import { X, Trash2, ArrowRight, Shield, Wand2, Footprints, Users } from 'lucide-react';
import { Character, CharacterClass } from '../types/character';

interface RosterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  roster: Character[];
  onSelectCharacter: (char: Character) => void;
  onRemoveCharacter: (id: string) => void;
  onClearRoster: () => void;
  activeCharacterId?: string;
}

const CLASS_ICONS: Record<CharacterClass, React.ComponentType<{ className?: string }>> = {
  Warrior: Shield,
  Mage: Wand2,
  Rogue: Footprints,
};

export const RosterDrawer: React.FC<RosterDrawerProps> = ({
  isOpen,
  onClose,
  roster,
  onSelectCharacter,
  onRemoveCharacter,
  onClearRoster,
  activeCharacterId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="flex h-full w-full max-w-md flex-col border-l border-slate-800 bg-slate-950 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-100">My Deck</h3>
              <p className="text-xs text-slate-400">{roster.length} Player Cards in Deck</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close deck drawer"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {roster.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4">
              <Users className="h-10 w-10 text-slate-700 mb-3" />
              <p className="text-sm font-semibold text-slate-300">Your deck is empty</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Generate characters and click &ldquo;Save to Deck&rdquo; to add cards to your collection.
              </p>
            </div>
          ) : (
            roster.map((char) => {
              const Icon = CLASS_ICONS[char.characterClass];
              const isActive = char.id === activeCharacterId;
              return (
                <div
                  key={char.id}
                  className={`group relative flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'border-amber-500/60 bg-amber-950/30 shadow-md ring-1 ring-amber-500/30'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                  onClick={() => {
                    onSelectCharacter(char);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-slate-950 text-amber-400 overflow-hidden shadow-inner">
                      {char.cartoonPortraitUrl || char.portraitUrl ? (
                        <img
                          src={char.activePortraitStyle === 'cartoon' && char.cartoonPortraitUrl ? char.cartoonPortraitUrl : (char.portraitUrl || char.cartoonPortraitUrl)}
                          alt={char.name}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-100 truncate font-fantasy text-amber-200">
                        {char.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-0.5">
                        <span className="text-amber-400 font-medium">{char.characterClass}</span>
                        <span>·</span>
                        <span className="text-rose-400">{char.health || char.hp} HP</span>
                        <span>·</span>
                        <span className="text-sky-400">{char.mana || 50} MP</span>
                        <span>·</span>
                        <span className="text-amber-300">{char.strength || char.stats.str} STR</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveCharacter(char.id);
                      }}
                      title="Remove from deck"
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-slate-300 transition-colors" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {roster.length > 0 && (
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onClearRoster}
              className="text-xs text-rose-400/80 hover:text-rose-300 transition-colors cursor-pointer"
            >
              Clear Entire Deck
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
