import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Users, Trophy } from 'lucide-react';
import { competitions as staticCompetitions } from '../lib/data';
import type { Competition } from '../lib/data';
import { loadCompetitionBySlug } from '../lib/siteContent';
import SEO from '../components/SEO';

export default function CompetitionDetailPage() {
  const { slug } = useParams();
  const [comp, setComp] = useState<Competition | null>(staticCompetitions.find(c => c.slug === slug) || null);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      setComp(await loadCompetitionBySlug(slug));
    }
    loadData();
  }, [slug]);

  if (!comp) {
    return (
      <div className="pt-32 pb-20 text-center bg-bg-primary min-h-screen">
        <h1 className="text-2xl font-bold text-text-primary">Compétition non trouvée</h1>
        <Link to="/competitions" className="text-emerald-light mt-4 inline-block">Retour</Link>
      </div>
    );
  }

  const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
    upcoming: { label: 'À venir', color: 'bg-emerald/20 text-emerald-light', dot: 'bg-emerald-light' },
    ongoing: { label: 'En cours', color: 'bg-gold/20 text-gold-light', dot: 'bg-gold animate-pulse' },
    completed: { label: 'Terminé', color: 'bg-white/10 text-text-muted', dot: 'bg-text-muted' },
  };
  const status = statusConfig[comp.status];

  return (
    <div className="pt-20 pb-20 bg-bg-primary min-h-screen">
      <SEO 
        title={comp.name} 
        description={`${comp.name} à ${comp.location}. ${comp.description}`} 
        image={comp.image}
      />
      
      <div className="relative h-[40vh] sm:h-[55vh] overflow-hidden">
        <img src={comp.image} alt={comp.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-32 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/competitions" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors mb-8 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
            <ArrowLeft size={16} /> Retour au calendrier
          </Link>

          <div className="glass rounded-[2.5rem] p-8 lg:p-12 border-white/5 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8">
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-xl border border-white/10 ${status.color}`}>
                <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            </div>

            <div className="inline-flex px-3 py-1 rounded-lg bg-bordeaux/20 text-bordeaux-light text-[10px] font-black uppercase tracking-widest mb-6 border border-bordeaux/10">
              {comp.type}
            </div>

            <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl font-bold text-white mb-8 tracking-tight leading-tight">{comp.name}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 transition-colors hover:border-emerald/20 group">
                <MapPin size={24} className="text-emerald-light mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-1">Localisation</div>
                <div className="text-lg font-bold text-white tracking-tight">{comp.location}</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 transition-colors hover:border-gold/20 group">
                <Calendar size={24} className="text-gold mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-1">Dates</div>
                <div className="text-lg font-bold text-white tracking-tight leading-snug">
                  {new Date(comp.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} — {new Date(comp.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 transition-colors hover:border-bordeaux-light/20 group">
                <Users size={24} className="text-bordeaux-light mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-1">Affluence</div>
                <div className="text-lg font-bold text-white tracking-tight">{comp.participants} inscrits</div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <h3 className="text-lg font-bold text-emerald-light uppercase tracking-widest mb-4">À propos de l'événement</h3>
              <p className="text-xl text-text-secondary leading-relaxed font-light italic">"{comp.description}"</p>
            </div>

            {comp.results && comp.results.length > 0 && (
              <div className="mt-12 pt-12 border-t border-white/5">
                <h3 className="font-[var(--font-display)] text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Trophy size={24} className="text-gold" /> Podium & Classement
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {comp.results.map(r => (
                    <div key={r.rank} className="flex items-center justify-between bg-white/5 hover:bg-white/[0.08] border border-white/5 rounded-2xl p-5 transition-all group">
                      <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shadow-xl ${
                          r.rank === 1 ? 'bg-gradient-to-br from-gold to-gold-dark text-bg-primary' : 
                          r.rank === 2 ? 'bg-gradient-to-br from-gray-200 to-gray-400 text-bg-primary' : 
                          'bg-gradient-to-br from-amber-700 to-amber-900 text-white'
                        }`}>
                          {r.rank}
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white group-hover:text-gold transition-colors">{r.player}</div>
                          <div className="text-xs text-text-muted font-bold uppercase tracking-widest">{r.country}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black font-mono text-emerald-light leading-none">{r.score}</div>
                        <div className="text-[9px] text-text-muted font-bold uppercase tracking-widest mt-1">Points cumulés</div>
                      </div>
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
