import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import type { Player } from '../lib/data';

export default function PlayerCard({ player, index = 0 }: { player: Player; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/joueurs/${player.id}`}
        className="group block bg-bg-card rounded-2xl overflow-hidden border border-border-subtle hover:border-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-gold/5"
      >
        <div className="relative">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          {/* Ranking badge */}
          <div className="absolute top-3 right-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono text-sm ${
              player.ranking === 1 ? 'bg-gold/90 text-bg-primary' :
              player.ranking === 2 ? 'bg-gray-300/90 text-bg-primary' :
              player.ranking === 3 ? 'bg-amber-700/90 text-white' :
              'bg-bg-tertiary/90 text-text-primary'
            } backdrop-blur-sm`}>
              #{player.ranking}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="text-2xl mb-1">{player.countryFlag}</div>
            <h3 className="font-[var(--font-display)] font-bold text-xl text-white mb-1 group-hover:text-gold transition-colors">
              {player.name}
            </h3>
            <p className="text-sm text-white/70">{player.country}</p>
          </div>
        </div>
        
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-light" />
              <span className="text-sm text-text-secondary">Rating</span>
            </div>
            <span className="font-mono font-bold text-emerald-light">{player.rating}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy size={14} className="text-gold" />
              <span className="text-sm text-text-secondary">Titres</span>
            </div>
            <span className="font-mono font-bold text-gold">{player.titles.length}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Star size={11} />
            {player.club}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
