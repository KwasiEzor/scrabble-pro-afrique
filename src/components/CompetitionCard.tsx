import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Trophy } from 'lucide-react';
import type { Competition } from '../lib/data';

const statusConfig = {
  upcoming: { label: 'À venir', color: 'bg-emerald/20 text-emerald-light', dot: 'bg-emerald-light' },
  ongoing: { label: 'En cours', color: 'bg-gold/20 text-gold-light', dot: 'bg-gold animate-pulse' },
  completed: { label: 'Terminé', color: 'bg-text-muted/20 text-text-muted', dot: 'bg-text-muted' },
};

export default function CompetitionCard({ competition, index = 0 }: { competition: Competition; index?: number }) {
  const status = statusConfig[competition.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/competitions/${competition.slug}`}
        className="group block bg-bg-card rounded-2xl overflow-hidden border border-border-subtle hover:border-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-gold/5"
      >
        <div className="relative overflow-hidden aspect-[16/9]">
          <img
            src={competition.image}
            alt={competition.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${status.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 rounded-lg bg-bordeaux/80 text-white text-xs font-medium backdrop-blur-sm">
              {competition.type}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-[var(--font-display)] font-bold text-lg text-text-primary mb-3 group-hover:text-gold transition-colors">
            {competition.name}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <MapPin size={14} className="text-emerald-light flex-shrink-0" />
              {competition.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Calendar size={14} className="text-emerald-light flex-shrink-0" />
              {new Date(competition.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - {new Date(competition.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Users size={14} className="text-emerald-light flex-shrink-0" />
              {competition.participants} participants
            </div>
          </div>
          {competition.results && competition.results.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border-subtle">
              <div className="flex items-center gap-2 mb-2">
                <Trophy size={14} className="text-gold" />
                <span className="text-xs font-semibold text-gold">Résultats</span>
              </div>
              {competition.results.slice(0, 3).map((r) => (
                <div key={r.rank} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      r.rank === 1 ? 'bg-gold/20 text-gold' : r.rank === 2 ? 'bg-text-secondary/20 text-text-secondary' : 'bg-bordeaux/20 text-bordeaux-light'
                    }`}>{r.rank}</span>
                    <span className="text-xs text-text-primary">{r.player}</span>
                  </div>
                  <span className="text-xs font-mono text-text-muted">{r.score}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
