import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, TrendingUp, Star, Users } from 'lucide-react';
import { playerService } from '../lib/services';
import { players as staticPlayers, articles as staticArticles } from '../lib/data';
import type { Player, Article } from '../lib/data';
import ArticleCard from '../components/ArticleCard';
import SEO from '../components/SEO';

export default function PlayerDetailPage() {
  const { slug } = useParams();
  const [player, setPlayer] = useState<Player | null>(staticPlayers.find(p => p.slug === slug) || null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>(staticArticles.filter(a => a.country === player?.country).slice(0, 3));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      try {
        const data = await playerService.getBySlug(slug).catch(() => null);
        if (data) {
          setPlayer(data);
          setRelatedArticles(staticArticles.filter(a => a.country === data.country).slice(0, 3));
        }
      } catch (error) {
        console.error("Error loading player from Supabase:", error);
      }
    }
    loadData();
  }, [slug]);

  if (!player) {
    return (
      <div className="pt-32 pb-20 text-center bg-bg-primary min-h-screen">
        <h1 className="text-2xl font-bold text-text-primary">Joueur non trouvé</h1>
        <Link to="/joueurs" className="text-emerald-light mt-4 inline-block">Retour</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-bg-primary min-h-screen">
      <SEO 
        title={player.name} 
        description={`${player.name} - #${player.ranking} mondial de Scrabble. ${player.bio}`} 
        image={player.image}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Link to="/joueurs" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-emerald-light transition-colors mb-8">
          <ArrowLeft size={16} /> Retour aux joueurs
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="glass rounded-3xl overflow-hidden shadow-2xl border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2 relative">
                <img src={player.image} alt={player.name} className="w-full h-full object-cover min-h-[300px]" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 hidden md:block" />
                <div className="absolute top-4 left-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold font-mono text-lg ${
                    player.ranking === 1 ? 'bg-gold/90 text-bg-primary' : 'bg-bg-tertiary/90 text-text-primary'
                  } backdrop-blur-sm`}>
                    #{player.ranking}
                  </div>
                </div>
              </div>
              <div className="md:col-span-3 p-8 lg:p-10 bg-white/[0.01]">
                <div className="text-4xl mb-3">{player.countryFlag}</div>
                <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                  {player.name}
                </h1>
                <p className="text-emerald-light font-bold uppercase tracking-widest text-sm mb-6">{player.country}</p>

                <p className="text-text-secondary leading-relaxed mb-8 text-lg font-light italic">"{player.bio}"</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5 transition-colors hover:border-emerald/20">
                    <TrendingUp size={20} className="text-emerald-light mx-auto mb-2" />
                    <div className="text-3xl font-bold font-mono text-emerald-light">{player.rating}</div>
                    <div className="text-[10px] text-text-muted mt-1 uppercase font-bold tracking-widest">Rating ELO</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5 transition-colors hover:border-gold/20">
                    <Trophy size={20} className="text-gold mx-auto mb-2" />
                    <div className="text-3xl font-bold font-mono text-gold">{player.titles.length}</div>
                    <div className="text-[10px] text-text-muted mt-1 uppercase font-bold tracking-widest">Titres</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-bold text-text-muted mb-8 bg-white/5 w-fit px-4 py-2 rounded-xl border border-white/5">
                  <Users size={14} className="text-emerald-light" />
                  {player.club}
                </div>

                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-light mb-4 pb-2 border-b border-white/5">Palmarès Majeur</h3>
                <div className="space-y-3">
                  {player.titles.map((title, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-text-secondary group hover:text-white transition-colors">
                      <Star size={14} className="text-gold flex-shrink-0 group-hover:scale-110 transition-transform" />
                      {title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {relatedArticles.length > 0 && (
          <div className="mt-20">
            <h3 className="font-[var(--font-display)] text-2xl font-bold text-white mb-8">Actualités liées</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((a, i) => (
                <ArticleCard key={a.id} article={a} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
