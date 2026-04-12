import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import CompetitionCard from '../components/CompetitionCard';
import { competitions } from '../lib/data';

export default function CompetitionsPage() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>('all');

  const filtered = filter === 'all' ? competitions : competitions.filter(c => c.status === filter);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          overline="Calendrier"
          title="Comp\u00e9titions"
          subtitle="Tous les tournois et championnats du Scrabble francophone africain"
        />

        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { key: 'all', label: 'Tous' },
            { key: 'upcoming', label: '\u00c0 venir' },
            { key: 'ongoing', label: 'En cours' },
            { key: 'completed', label: 'Termin\u00e9s' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                filter === key
                  ? 'bg-gold/20 text-gold border border-gold/30'
                  : 'bg-bg-card text-text-secondary border border-border-subtle hover:border-gold/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((comp, i) => (
            <CompetitionCard key={comp.id} competition={comp} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-text-muted">Aucune comp\u00e9tition trouv\u00e9e.</div>
        )}
      </div>
    </div>
  );
}
