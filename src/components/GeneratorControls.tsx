import React from 'react';
import { Dices, Shield, Wand2, Footprints, Sparkles } from 'lucide-react';
import { CharacterClass } from '../types/character';

interface GeneratorControlsProps {
  selectedClass: CharacterClass | 'Random';
  onSelectClass: (c: CharacterClass | 'Random') => void;
  onGenerate: () => void;
  isRolling: boolean;
}

export const GeneratorControls: React.FC<GeneratorControlsProps> = ({
  selectedClass,
  onSelectClass,
  onGenerate,
  isRolling,
}) => {
  const classOptions: Array<{
    id: CharacterClass | 'Random';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'Random', label: 'Any Class (Random)', icon: Dices },
    { id: 'Warrior', label: 'Warrior', icon: Shield },
    { id: 'Mage', label: 'Mage', icon: Wand2 },
    { id: 'Rogue', label: 'Rogue', icon: Footprints },
  ];

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Interactive Segmented Filter Controls */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl shadow-lg">
        {classOptions.map((opt) => {
          const Icon = opt.icon;
          const isActive = selectedClass === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelectClass(opt.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Primary Hero Generation CTA Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={onGenerate}
          disabled={isRolling}
          className={`cursor-pointer relative group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-display font-bold uppercase tracking-wider text-slate-950 transition-all shadow-xl active:scale-95 whitespace-nowrap ${
            isRolling
              ? 'bg-amber-400 opacity-90 cursor-wait'
              : 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 hover:shadow-amber-500/25'
          }`}
        >
          <Dices className={`h-6 w-6 text-slate-950 transition-transform ${isRolling ? 'animate-spin' : 'group-hover:rotate-45'}`} />
          <span>
            {isRolling ? 'Summoning Adventurer...' : 'Generate Character'}
          </span>
          <Sparkles className="h-4 w-4 text-slate-950/70" />
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center max-w-md">
        Click to forge a random fantasy character with authentic RPG attributes, equipment, signature techniques, and backstory.
      </p>
    </div>
  );
};
