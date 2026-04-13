import { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import CompetitionCard from '../components/CompetitionCard';
import { competitions as staticCompetitions } from '../lib/data';
import type { Competition } from '../lib/data';
import { loadCompetitions as fetchCompetitions } from '../lib/siteContent';
import SEO from '../components/SEO';

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>(staticCompetitions);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>('all');

  useEffect(() => {
    async function loadCompetitions() {
      setCompetitions(await fetchCompetitions());
    }
    loadCompetitions();
  }, []);

  const filtered = filter === 'all' ? competitions : competitions.filter(c => c.status === filter);

  return (
    <div className="pt-24 pb-20 bg-bg-primary min-h-screen">
      <SEO 
        title="Compétitions & Calendrier" 
        description="Consultez le calendrier officiel du Scrabble francophone africain. Tournois nationaux, Opens internationaux et Championnats d'Afrique." 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          overline="Calendrier"
          title="Circuit Africain"
          subtitle="Tous les tournois et championnats du Scrabble francophone africain"
        />

        <div className="flex flex-wrap gap-3 mb-12">
          {[
            { key: 'all', label: 'Toutes les dates' },
            { key: 'upcoming', label: 'À venir' },
            { key: 'ongoing', label: 'En cours' },
            { key: 'completed', label: 'Historique' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as typeof filter)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                filter === key
                  ? 'bg-gold text-bg-primary shadow-lg shadow-gold/20 border border-gold'
                  : 'bg-white/5 text-text-secondary border border-white/5 hover:border-gold/30 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((comp, i) => (
              <CompetitionCard key={comp.id} competition={comp} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
            <p className="text-text-muted text-lg font-light italic">Aucune compétition trouvée pour cette période.</p>
          </div>
        )}
      </div>
    </div>
  );
}
