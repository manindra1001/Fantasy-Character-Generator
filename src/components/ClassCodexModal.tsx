import React from 'react';
import { X, Shield, Wand2, Footprints, Check } from 'lucide-react';
import { CLASS_CONFIG } from '../data/fantasyData';
import { CharacterClass } from '../types/character';

interface ClassCodexModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectClassAndGenerate: (c: CharacterClass) => void;
}

export const ClassCodexModal: React.FC<ClassCodexModalProps> = ({
  isOpen,
  onClose,
  onSelectClassAndGenerate,
}) => {
  if (!isOpen) return null;

  const classes: Array<{ id: CharacterClass; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'Warrior', icon: Shield },
    { id: 'Mage', icon: Wand2 },
    { id: 'Rogue', icon: Footprints },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-100">
              Adventurer Class Codex
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Detailed breakdown of the three archetypes forged across the realm
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close codex"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
          {classes.map(({ id, icon: Icon }) => {
            const config = CLASS_CONFIG[id];
            return (
              <div
                key={id}
                className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-amber-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-medium">
                      Hit Die d{config.hitDie}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-slate-100">{id}</h4>
                  <p className="text-xs text-amber-400/80 font-medium mt-0.5 mb-2">{config.role}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {config.tagline}
                  </p>

                  <div className="space-y-2 text-xs border-t border-slate-800/80 pt-3">
                    <div>
                      <span className="text-slate-500 font-medium">Primary Stat:</span>{' '}
                      <span className="text-slate-200 uppercase font-mono font-bold">{config.primaryStat}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Armor Proficiency:</span>{' '}
                      <span className="text-slate-300">{config.armorTypes}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Archetypes:</span>
                      <div className="flex flex-wrap gap-1 mt-1 text-[11px] text-slate-400">
                        {config.subclasses.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => {
                      onSelectClassAndGenerate(id);
                      onClose();
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-slate-800 text-slate-100 hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Roll {id}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
          >
            Close Codex
          </button>
        </div>
      </div>
    </div>
  );
};
