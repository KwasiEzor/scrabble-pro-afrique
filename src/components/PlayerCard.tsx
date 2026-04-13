import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Star, TrendingUp, Award, ArrowRight } from 'lucide-react';
import type { Player } from '../lib/data';

export default function PlayerCard({ player, index = 0 }: { player: Player; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      <Link
        to={`/joueurs/${player.slug}`}
        className="group block relative bg-[#121212] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
      >
        <div className="relative">
          {/* Main Image */}
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
            />
          </div>
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Ranking badge */}
          <div className="absolute top-6 right-6">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-2xl backdrop-blur-xl border border-white/10 ${
                player.ranking === 1 ? 'bg-gradient-to-br from-gold to-gold-dark text-bg-primary' :
                player.ranking === 2 ? 'bg-gradient-to-br from-gray-200 to-gray-400 text-bg-primary' :
                player.ranking === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white' :
                'bg-white/10 text-white'
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-tighter opacity-70">Rank</span>
              <span className="text-xl font-black font-mono -mt-1">#{player.ranking}</span>
            </motion.div>
          </div>

          {/* Player Identity */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl filter drop-shadow-2xl transform group-hover:scale-125 transition-transform duration-500">{player.countryFlag}</span>
              <span className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-[10px] text-white font-black uppercase tracking-[0.2em]">
                {player.country}
              </span>
            </div>
            <h3 className="font-[var(--font-display)] font-bold text-3xl text-white mb-2 group-hover:text-gold transition-colors duration-500 tracking-tight">
              {player.name}
            </h3>
            <div className="flex items-center gap-2 text-gold/80 text-xs font-bold uppercase tracking-widest">
              <Award size={14} />
              {player.titles[0] || 'Joueur Professionnel'}
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="p-8 space-y-6 bg-white/[0.01]">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 group-hover:border-emerald/20 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-emerald-light" />
                <span className="text-[10px] text-text-muted font-black uppercase tracking-widest">Rating</span>
              </div>
              <div className="text-2xl font-black font-mono text-emerald-light">{player.rating}</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 group-hover:border-gold/20 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Trophy size={14} className="text-gold" />
                <span className="text-[10px] text-text-muted font-black uppercase tracking-widest">Titres</span>
              </div>
              <div className="text-2xl font-black font-mono text-gold">{player.titles.length}</div>
            </div>
          </div>

          <div className="flex items-center justify-between group-hover:translate-x-1 transition-transform">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted">
                <Star size={16} />
              </div>
              <div className="text-xs text-text-secondary font-bold tracking-wide">{player.club}</div>
            </div>
            <ArrowRight size={18} className="text-white/20 group-hover:text-gold transition-colors" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
