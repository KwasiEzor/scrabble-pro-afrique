import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, TrendingUp, Star, MapPin, Users } from 'lucide-react';
import { players, articles } from '../lib/data';
import ArticleCard from '../components/ArticleCard';

export default function PlayerDetailPage() {
  const { id } = useParams();
  const player = players.find(p => p.id === id);
  const relatedArticles = articles.filter(a => a.country === player?.country).slice(0, 3);

  if (!player) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold text-text-primary">Joueur non trouv\u00e9</h1>
        <Link to="/joueurs" className="text-emerald-light mt-4 inline-block">Retour</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Link to="/joueurs" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-emerald-light transition-colors mb-8">
          <ArrowLeft size={16} /> Retour aux joueurs
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="glass rounded-3xl overflow-hidden">
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
              <div className="md:col-span-3 p-8 lg:p-10">
                <div className="text-4xl mb-3">{player.countryFlag}</div>
                <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-text-primary mb-2">
                  {player.name}
                </h1>
                <p className="text-emerald-light font-medium text-lg mb-6">{player.country}</p>

                <p className="text-text-secondary leading-relaxed mb-8">{player.bio}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-bg-tertiary rounded-xl p-5 text-center">
                    <TrendingUp size={20} className="text-emerald-light mx-auto mb-2" />
                    <div className="text-3xl font-bold font-mono text-emerald-light">{player.rating}</div>
                    <div className="text-xs text-text-muted mt-1">Rating</div>
                  </div>
                  <div className="bg-bg-tertiary rounded-xl p-5 text-center">
                    <Trophy size={20} className="text-gold mx-auto mb-2" />
                    <div className="text-3xl font-bold font-mono text-gold">{player.titles.length}</div>
                    <div className="text-xs text-text-muted mt-1">Titres</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
                  <Users size={14} className="text-emerald-light" />
                  {player.club}
                </div>

                <h3 className="font-semibold text-text-primary mb-3">Palmar\u00e8s</h3>
                <div className="space-y-2">
                  {player.titles.map((title, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                      <Star size={14} className="text-gold flex-shrink-0" />
                      {title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <h3 className="font-[var(--font-display)] text-xl font-bold text-text-primary mb-6">Actualit\u00e9s li\u00e9es</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
