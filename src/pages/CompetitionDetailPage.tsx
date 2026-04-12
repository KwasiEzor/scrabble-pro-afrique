import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Users, Trophy, Clock } from 'lucide-react';
import { competitions } from '../lib/data';

export default function CompetitionDetailPage() {
  const { id } = useParams();
  const comp = competitions.find(c => c.id === id);

  if (!comp) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold text-text-primary">Comp\u00e9tition non trouv\u00e9e</h1>
        <Link to="/competitions" className="text-emerald-light mt-4 inline-block">Retour</Link>
      </div>
    );
  }

  const statusConfig: Record<string, { label: string; color: string }> = {
    upcoming: { label: '\u00c0 venir', color: 'bg-emerald/20 text-emerald-light' },
    ongoing: { label: 'En cours', color: 'bg-gold/20 text-gold-light' },
    completed: { label: 'Termin\u00e9', color: 'bg-text-muted/20 text-text-muted' },
  };
  const status = statusConfig[comp.status];

  return (
    <div className="pt-20 pb-20">
      <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        <img src={comp.image} alt={comp.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-24 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/competitions" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-emerald-light transition-colors mb-6">
            <ArrowLeft size={16} /> Retour aux comp\u00e9titions
          </Link>

          <div className="glass rounded-2xl p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>{status.label}</span>
              <span className="px-3 py-1 rounded-full bg-bordeaux/20 text-bordeaux-light text-xs font-semibold">{comp.type}</span>
            </div>

            <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-text-primary mb-6">{comp.name}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-bg-tertiary rounded-xl p-4 flex items-center gap-3">
                <MapPin size={20} className="text-emerald-light flex-shrink-0" />
                <div>
                  <div className="text-xs text-text-muted">Lieu</div>
                  <div className="text-sm font-medium text-text-primary">{comp.location}</div>
                </div>
              </div>
              <div className="bg-bg-tertiary rounded-xl p-4 flex items-center gap-3">
                <Calendar size={20} className="text-gold flex-shrink-0" />
                <div>
                  <div className="text-xs text-text-muted">Dates</div>
                  <div className="text-sm font-medium text-text-primary">
                    {new Date(comp.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - {new Date(comp.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
              <div className="bg-bg-tertiary rounded-xl p-4 flex items-center gap-3">
                <Users size={20} className="text-bordeaux-light flex-shrink-0" />
                <div>
                  <div className="text-xs text-text-muted">Participants</div>
                  <div className="text-sm font-medium text-text-primary">{comp.participants}</div>
                </div>
              </div>
            </div>

            <p className="text-text-secondary leading-relaxed mb-8">{comp.description}</p>

            {comp.results && comp.results.length > 0 && (
              <div className="border-t border-border-subtle pt-8">
                <h3 className="font-[var(--font-display)] text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Trophy size={20} className="text-gold" /> R\u00e9sultats
                </h3>
                <div className="space-y-3">
                  {comp.results.map(r => (
                    <div key={r.rank} className="flex items-center justify-between bg-bg-tertiary rounded-xl p-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                          r.rank === 1 ? 'bg-gold/20 text-gold' : r.rank === 2 ? 'bg-gray-300/20 text-gray-300' : 'bg-amber-700/20 text-amber-600'
                        }`}>
                          {r.rank}
                        </div>
                        <div>
                          <div className="font-medium text-text-primary">{r.player}</div>
                          <div className="text-xs text-text-muted">{r.country}</div>
                        </div>
                      </div>
                      <div className="font-mono font-bold text-emerald-light">{r.score} pts</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
